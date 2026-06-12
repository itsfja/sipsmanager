import React, { useState } from 'react';
import { PlanterBox, PlantType, WeatherData, GeocodeResult } from '../types';
import PlantProgressViewer from './PlantProgressViewer';
import EarthboxLayoutDiagram from './EarthboxLayoutDiagram';
import { calculateLocalWaterMultiplier } from '../utils/weather';
import { getLocalPlantName, localizeMessage } from '../utils/localization';
import { Droplet, Calendar, ShieldAlert, Sun, Info, PlusCircle, HelpCircle, PenTool, CheckSquare, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlanterCardProps {
  key?: string;
  planter: PlanterBox;
  plant: PlantType;
  weather: WeatherData | null;
  geocode: GeocodeResult | null;
  onUpdatePlanter: (planter: PlanterBox) => void;
  onDeletePlanter: (id: string) => void;
  postcode: string;
}

export type PlacementLocation = 'Full Sun Patio' | 'Partial Shade Deck' | 'Deep Shade Yard' | 'Indoor Solarium' | 'Unheated Greenhouse' | 'Heated Greenhouse' | 'Conservatory';
export type AspectDirection = 'North (N)' | 'South (S)' | 'East (E)' | 'West (W)' | 'North-East (NE)' | 'North-West (NW)' | 'South-East (SE)' | 'South-West (SW)';

export default function PlanterCard({
  planter,
  plant,
  weather,
  geocode,
  onUpdatePlanter,
  onDeletePlanter,
  postcode
}: PlanterCardProps) {
  const [newNote, setNewNote] = useState('');
  const [placement, setPlacement] = useState<PlacementLocation>('Full Sun Patio');
  const [aspect, setAspect] = useState<AspectDirection>('South (S)');
  const [frameInstalled, setFrameInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'growth' | 'layout'>('status');

  // Calculates days since planting date
  const timeDifferenceMs = Date.now() - planter.plantingDate;
  const daysPlantedRaw = Math.max(0, Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24)));
  const daysPlanted = daysPlantedRaw === 0 ? 1 : daysPlantedRaw; // Treat first day as day 1

  // Dynamic remaining days until harvest calculation
  const daysRemaining = Math.max(0, plant.daysToHarvest - daysPlanted);
  const progressPercent = Math.min(100, Math.round((daysPlanted / plant.daysToHarvest) * 100));

  // Determine local water evaporation coefficient matching meteorological data
  const latFactor = geocode ? geocode.latitude : 34;
  const tempFactor = weather ? weather.temp : 72;
  const localCoeff = calculateLocalWaterMultiplier(latFactor, tempFactor);

  // Daily water depletion calculation matching plant category water requirements
  // Extreme: 0.9g/day. High: 0.6g/day. Moderate: 0.4g/day. Low: 0.2g/day.
  const baseBurnRate = 
    plant.waterConsumption === 'Extreme' ? 1.0 :
    plant.waterConsumption === 'High' ? 0.75 :
    plant.waterConsumption === 'Moderate' ? 0.45 : 0.25;

  const adjustedDailyBurn = baseBurnRate * localCoeff;
  // Reservoir volume is 3 Gallons
  const totalVolumeGallons = 3.0;
  
  // Calculate simulated current reservoir level based on last refill timestamp
  // Let's assume reservoir diminishes hourly, unless refilled
  const msInADay = 24 * 60 * 60 * 1000;
  const lastRefill = planter.refilledAt || planter.plantingDate;
  const daysSinceRefill = Math.max(0, (Date.now() - lastRefill) / msInADay);
  const waterConsumed = daysSinceRefill * adjustedDailyBurn;
  
  const currentReservoirPercent = Math.max(
    0, 
    Math.round(((totalVolumeGallons - waterConsumed) / totalVolumeGallons) * 100)
  );
  
  const daysUntilEmpty = Math.max(0, parseFloat(((totalVolumeGallons * (currentReservoirPercent / 100)) / adjustedDailyBurn).toFixed(1)));

  // Analyze solar compatibility mismatch
  const getSolarMismatches = () => {
    const preferences: Record<string, string[]> = {
      'Full Sun': ['Full Sun Patio', 'Indoor Solarium', 'Unheated Greenhouse', 'Heated Greenhouse', 'Conservatory'],
      'Partial Shade': ['Partial Shade Deck', 'Indoor Solarium', 'Unheated Greenhouse', 'Heated Greenhouse', 'Conservatory'],
      'Full Shade': ['Deep Shade Yard'],
      'Indirect Light': ['Partial Shade Deck', 'Indoor Solarium', 'Unheated Greenhouse', 'Heated Greenhouse', 'Conservatory']
    };

    const allowed = preferences[plant.shadeRequirement] || [];
    if (!allowed.includes(placement)) {
      const localizedName = getLocalPlantName(plant.id, postcode, plant.name);
      return `Light Mismatch: ${localizedName} requires ${plant.shadeRequirement}, but is situated in ${placement}. Consider relocating.`;
    }
    return null;
  };

  const getAspectAdvice = () => {
    if (aspect === 'North (N)' || aspect === 'North-West (NW)' || aspect === 'North-East (NE)') {
      if (plant.shadeRequirement === 'Full Sun') {
        const localizedName = getLocalPlantName(plant.id, postcode, plant.name);
        return `Orientation Alert: North-facing aspects receive significantly less daily sunshine. Your ${localizedName} prefers a South (S) or West (W) facing aspect.`;
      }
    }
    if (aspect === 'South (S)' || aspect === 'South-West (SW)' || aspect === 'South-East (SE)') {
      if (plant.shadeRequirement === 'Full Shade') {
        const localizedName = getLocalPlantName(plant.id, postcode, plant.name);
        return `Full Sun Alert: South-facing elements receive intense light. Be sure to protect shade-loving ${localizedName} or transition it to a North (N) aspect.`;
      }
    }
    return null;
  };

  const handleRefill = () => {
    onUpdatePlanter({
      ...planter,
      refilledAt: Date.now(),
      waterReservoirLevel: 100,
      soilMoisture: Math.min(100, planter.soilMoisture + 15) // Rehydrate soil slightly
    });
  };

  const addNoteLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onUpdatePlanter({
      ...planter,
      notes: [newNote.trim(), ...planter.notes]
    });
    setNewNote('');
  };

  const lightMismatch = getSolarMismatches();

  return (
    <div className="bg-white rounded-3xl border border-earth-200 shadow-sm overflow-hidden flex flex-col" id={`planter-card-${planter.id}`}>
      {/* Planter Header Block */}
      <div className="bg-earth-600 text-white p-4 flex justify-between items-start">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-earth-200">
            Earthbox Model #01
          </span>
          <h2 className="text-md font-serif font-black text-white leading-tight mt-0.5">
            {planter.name}
          </h2>
          <span className="text-xs text-earth-100 font-sans flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-earth-300 animate-ping" />
            Active Crop: {getLocalPlantName(plant.id, postcode, plant.name)} <span className="italic opacity-80">({plant.scientificName})</span>
          </span>
        </div>
        <button
          onClick={() => onDeletePlanter(planter.id)}
          className="text-xs text-earth-100 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
        >
          Retire Box
        </button>
      </div>

      {/* Navigation Sub-Tabs for High Density Mobile Layout */}
      <div className="flex border-b border-earth-100 bg-earth-50/50">
        <button
          type="button"
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-3 text-xs font-display font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'status' ? 'border-earth-600 text-earth-800 bg-white' : 'border-transparent text-zinc-400 hover:text-zinc-650'
          }`}
        >
          Planter Status
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('growth')}
          className={`flex-1 py-3 text-xs font-display font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'growth' ? 'border-earth-600 text-earth-800 bg-white' : 'border-transparent text-zinc-400 hover:text-zinc-650'
          }`}
        >
          Growth Stages
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('layout')}
          className={`flex-1 py-3 text-xs font-display font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'layout' ? 'border-earth-600 text-earth-800 bg-white' : 'border-transparent text-zinc-400 hover:text-zinc-650'
          }`}
        >
          Layout Diagram
        </button>
      </div>

      {/* Main active sub-view content container */}
      <div className="p-4 flex-1 flex flex-col gap-4">
        {activeTab === 'status' && (
          <div className="flex flex-col gap-4">
            {/* 1. Dynamic Water depletion meter with automatic warnings */}
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                  SUB-IRRIGATED RESERVOIR LEVEL (3G CAP)
                </span>
                <span className="font-mono text-xs font-black text-cyan-700">
                  {currentReservoirPercent}% FULL
                </span>
              </div>

              {/* Graphical water reservoir status tube */}
              <div className="w-full h-4 bg-zinc-200 rounded-full overflow-hidden relative border border-zinc-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentReservoirPercent}%` }}
                  className={`h-full transition-all duration-1000 ${
                    currentReservoirPercent < 20 
                    ? 'bg-rose-500 animate-pulse' 
                    : currentReservoirPercent < 50 
                    ? 'bg-amber-400' 
                    : 'bg-cyan-500'
                  }`}
                />
              </div>

              {/* Critical alerts or reminders */}
              {currentReservoirPercent < 25 ? (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs flex gap-2 items-start animate-pulse">
                  <ShieldAlert className="w-4.5 h-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display font-bold">Refill Alert Triggered!</h5>
                    <p className="mt-0.5 text-rose-700">
                      Empty danger state detected. Extreme local transpiration. Fill water channel soon to prevent crop shock.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-baseline text-[11px] text-zinc-500 px-0.5">
                  <span>Consumption burn Rate: {adjustedDailyBurn.toFixed(2)} Gallons/day</span>
                  <span className="font-medium text-zinc-700">Empty in ~{daysUntilEmpty} days</span>
                </div>
              )}

              {/* Action filler button */}
              <button
                onClick={handleRefill}
                className="w-full mt-1 bg-cyan-600 text-white hover:bg-cyan-500 text-xs font-display font-semibold py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Droplet className="w-3.5 h-3.5" />
                <span>Fill Water Channel Reservoir</span>
              </button>
            </div>

            {/* 2. Micro timeline stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center flex flex-col items-center justify-center">
                <Calendar className="w-5 h-5 text-earth-600 mb-1" />
                <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-wide">PLANTED DAYS</span>
                <span className="text-md font-display font-bold text-zinc-800 mt-0.5">{daysPlanted} days</span>
                <span className="text-[9.5px] text-zinc-400 block mt-0.5">Since {new Date(planter.plantingDate).toLocaleDateString()}</span>
              </div>
              
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center flex flex-col items-center justify-center">
                <Sun className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-wide">EST. HARVEST</span>
                <span className="text-md font-display font-bold text-zinc-800 mt-0.5">~{daysRemaining} days left</span>
                <span className="text-[9.5px] text-zinc-400 block mt-0.5">{progressPercent}% Grow complete</span>
              </div>
            </div>

            {/* 3. Safety Checklists for trellis & solar compatibility */}
            <div className="p-3 bg-earth-50 rounded-2xl border border-earth-100 flex flex-col gap-2">
              <h4 className="text-xs font-display font-extrabold uppercase tracking-wide text-zinc-700 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-earth-600" />
                Planter Requirements Checklist
              </h4>

              {/* Climbing Frame Status */}
              {plant.climbingFrameRequired ? (
                <div className="flex items-center justify-between border-b border-earth-100/60 pb-2 text-xs">
                  <div className="flex flex-col pr-2">
                    <span className="font-semibold text-zinc-900 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                      Climbing Frame / Cage Frame
                    </span>
                    <span className="text-[10.5px] text-zinc-500">Requires sturdy external framework</span>
                  </div>
                  <div>
                    <button
                      onClick={() => setFrameInstalled(!frameInstalled)}
                      className={`text-[10px] font-display font-black px-2.5 py-1 rounded-lg border transition-all ${
                        frameInstalled 
                        ? 'bg-emerald-600 text-white border-emerald-500' 
                        : 'bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200'
                      }`}
                    >
                      {frameInstalled ? 'Installed ✓' : 'Setup Trellis'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between border-b border-earth-100/60 pb-2 text-xs text-zinc-500">
                  <span>Self-supporting structure. No frame or cage required.</span>
                  <span className="text-[10px] bg-zinc-200/60 text-zinc-500 px-2 py-0.5 rounded">None</span>
                </div>
              )}

              {/* Solar alignment & interactive placement selector */}
              <div className="flex flex-col gap-2 pt-1 border-t border-earth-100/50">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-semibold text-zinc-900">Planter Location</span>
                    <select
                      value={placement}
                      onChange={(e) => setPlacement(e.target.value as PlacementLocation)}
                      className="bg-white border border-zinc-200 rounded-lg px-2 py-1 text-[11px] text-zinc-800 font-sans focus:outline-none cursor-pointer w-full"
                    >
                      <option value="Full Sun Patio">Full Sun Patio</option>
                      <option value="Partial Shade Deck">Partial Shade Deck</option>
                      <option value="Deep Shade Yard">Deep Shade Yard</option>
                      <option value="Indoor Solarium">Indoor Solarium</option>
                      <option value="Unheated Greenhouse">Unheated Greenhouse</option>
                      <option value="Heated Greenhouse">Heated Greenhouse</option>
                      <option value="Conservatory">Conservatory</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-semibold text-zinc-900 flex items-center gap-1">
                      🧭 Aspect (Compass)
                    </span>
                    <select
                      value={aspect}
                      onChange={(e) => setAspect(e.target.value as AspectDirection)}
                      className="bg-white border border-zinc-200 rounded-lg px-2 py-1 text-[11px] text-zinc-800 font-sans focus:outline-none cursor-pointer w-full"
                    >
                      <option value="North (N)">North (N)</option>
                      <option value="South (S)">South (S)</option>
                      <option value="East (E)">East (E)</option>
                      <option value="West (W)">West (W)</option>
                      <option value="North-East (NE)">North-East (NE)</option>
                      <option value="North-West (NW)">North-West (NW)</option>
                      <option value="South-East (SE)">South-East (SE)</option>
                      <option value="South-West (SW)">South-West (SW)</option>
                    </select>
                  </div>
                </div>

                {lightMismatch && (
                  <div className="mt-1 bg-amber-500/10 border border-amber-500/20 text-amber-955 rounded-lg p-2 text-[10.5px] leading-normal flex gap-1.5 items-start">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{lightMismatch}</span>
                  </div>
                )}

                {getAspectAdvice() && (
                  <div className="bg-sky-500/10 border border-sky-500/20 text-sky-950 rounded-lg p-2 text-[10.5px] leading-normal flex gap-1.5 items-start">
                    <Info className="w-4.5 h-4.5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span>{getAspectAdvice()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Planter notes section (Real-time storage) */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-500">Planter Log Entries</span>
              
              <form onSubmit={addNoteLog} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record note e.g. Saw first leaf node sprout"
                  className="flex-1 border border-earth-200 bg-earth-50 rounded-xl px-3 py-1.5 text-xs text-earth-800 placeholder-zinc-400 focus:outline-none focus:border-earth-500"
                />
                <button
                  type="submit"
                  className="bg-earth-600 text-white hover:bg-earth-700 px-3 py-1.5 rounded-xl text-xs font-display font-semibold cursor-pointer transition-colors"
                >
                  Post Note
                </button>
              </form>

              {/* Note scroll pane */}
              <div className="max-h-24 overflow-y-auto flex flex-col gap-1.5 pt-1">
                {planter.notes.length === 0 ? (
                  <p className="text-[10px] text-zinc-400 text-center py-2 italic">No custom notes added to this box yet.</p>
                ) : (
                  planter.notes.map((note, index) => (
                    <div key={`n-${index}`} className="p-2 bg-zinc-50/80 rounded-xl border border-zinc-100 text-[10.5px] text-zinc-600 flex justify-between">
                      <span>{note}</span>
                      <span className="font-mono text-[8.5px] text-zinc-400 self-center">✓ logged</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <PlantProgressViewer plant={plant} currentDay={daysPlanted} />
        )}

        {activeTab === 'layout' && (
          <EarthboxLayoutDiagram plant={plant} />
        )}
      </div>
    </div>
  );
}
