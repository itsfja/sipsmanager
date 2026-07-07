import React, { useState } from 'react';
import { PlantType, PlanterBox } from '../types';
import { EXHAUSTIVE_PLANT_CATALOG } from '../data/plants';
import { PlusCircle, Sprout, Layout, Info, AlertCircle, X } from 'lucide-react';
import { motion } from 'motion/react';
import { getLocalPlantName, localizeMessage, isUSPostcode } from '../utils/localization';

export const PLANTER_SPECS = [
  {
    id: 'earthbox',
    name: 'Earthbox Classic',
    desc: '2 cu ft soil, 3 Gal (11L) reservoir, official crop layout grid.'
  },
  {
    id: 'hozelock_growbag',
    name: 'Hozelock Grow Bag',
    desc: '15L reservoir, 4 capillary spikes, grow bag support, cane slots.'
  },
  {
    id: 'emsco_citypicker',
    name: 'Emsco City Picker',
    desc: '1.5 cu ft soil, 2 Gal (7.5L) reservoir, mobile caster wheels.'
  },
  {
    id: 'linex_raised',
    name: 'Linex Raised Bed',
    desc: '1.2 cu ft soil, 1.8 Gal (6.8L) reservoir, water level float.'
  },
  {
    id: 'ourwarm_windowsill',
    name: 'OurWarm Windowsill Herb Planter Box',
    desc: 'Triple-pot design, self-watering wicking cotton rope, water level indicator window.'
  },
  {
    id: 'biolan_planter',
    name: 'Biolan Watering Basin',
    desc: '40L large sub-irrigation basin, dual wicking tubes, ideal for greenhouse crops.'
  },
  {
    id: 'oasesbox',
    name: 'Oasesbox Modular',
    desc: '15L reservoir, compact square modular sub-irrigation system, water level float.'
  },
  {
    id: 'earthbox_junior',
    name: 'Earthbox Junior',
    desc: '1 cu ft soil, 1 Gal (3.8L) reservoir, compact official sub-irrigation grid.'
  }
] as const;

export const UK_GROW_BAGS = [
  { id: 'standard_uk_33', name: 'Standard UK Grow Bag (33L)', desc: 'Standard 33-litre multipurpose compost bag' },
  { id: 'levington_tomorite_giant', name: 'Levington Tomorite Giant (40L)', desc: 'Enriched with seaweed for high yield tomatoes' },
  { id: 'westland_bigtom', name: 'Westland Big Tom Super Soil (50L)', desc: 'Deep-fill giant grow bag with nutrient-rich compost' },
  { id: 'clover_organic_choice', name: 'Clover Organic Choice (33L)', desc: '105cm extra-wide, fully certified organic grow bag' },
] as const;

export const getPlanterMaxPlants = (type: string, baseTotal: number) => {
  if (type === 'hozelock_growbag') return Math.min(3, baseTotal);
  if (type === 'emsco_citypicker') return Math.min(4, baseTotal);
  if (type === 'linex_raised') return Math.min(4, baseTotal);
  if (type === 'ourwarm_windowsill') return Math.min(3, baseTotal);
  if (type === 'biolan_planter') return Math.min(4, baseTotal);
  if (type === 'oasesbox') return Math.min(3, baseTotal);
  if (type === 'earthbox_junior') return Math.min(2, baseTotal);
  return baseTotal; // earthbox
};

interface AddPlanterModalProps {
  onClose: () => void;
  onAddPlanter: (planter: PlanterBox) => void;
  postcode: string;
}

export default function AddPlanterModal({ onClose, onAddPlanter, postcode }: AddPlanterModalProps) {
  const [boxName, setBoxName] = useState('');
  
  // Choose a random planter system type by default
  const [planterType, setPlanterType] = useState<'earthbox' | 'hozelock_growbag' | 'emsco_citypicker' | 'linex_raised' | 'ourwarm_windowsill' | 'biolan_planter' | 'oasesbox' | 'earthbox_junior'>(() => {
    const types: ('earthbox' | 'hozelock_growbag' | 'emsco_citypicker' | 'linex_raised' | 'ourwarm_windowsill' | 'biolan_planter' | 'oasesbox' | 'earthbox_junior')[] = [
      'earthbox', 'hozelock_growbag', 'emsco_citypicker', 'linex_raised', 'ourwarm_windowsill', 'biolan_planter', 'oasesbox', 'earthbox_junior'
    ];
    return types[Math.floor(Math.random() * types.length)];
  });

  // Randomize the order of planter specs each time the modal mounts
  const randomizedSpecs = React.useMemo(() => {
    return [...PLANTER_SPECS].sort(() => Math.random() - 0.5);
  }, []);

  const [growBagType, setGrowBagType] = useState<string>('standard_uk_33');
  const [chosenPlantId, setChosenPlantId] = useState(EXHAUSTIVE_PLANT_CATALOG[0].id);
  const [plantingPreset, setPlantingPreset] = useState<'today' | 'vegetative' | 'flowering'>('today');

  const selectedPlant = EXHAUSTIVE_PLANT_CATALOG.find(p => p.id === chosenPlantId) || EXHAUSTIVE_PLANT_CATALOG[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boxName.trim()) return;

    // Calculate simulated planting date based on growing phase chosen
    let msOffset = 0;
    if (plantingPreset === 'vegetative') {
      // Planted 20 days ago
      msOffset = 20 * 24 * 60 * 60 * 1000;
    } else if (plantingPreset === 'flowering') {
      // Planted 42 days ago
      msOffset = 42 * 24 * 60 * 60 * 1000;
    }

    const plantingDate = Date.now() - msOffset;

    const localName = getLocalPlantName(chosenPlantId, postcode, selectedPlant.name);
    
    let plantCount = selectedPlant.earthboxLayout.totalPlants;
    let commissionNote = '';

    if (planterType === 'hozelock_growbag') {
      const selectedBag = UK_GROW_BAGS.find(b => b.id === growBagType) || UK_GROW_BAGS[0];
      plantCount = Math.min(3, selectedPlant.earthboxLayout.totalPlants);
      commissionNote = `Commissioned Hozelock Grow Bag Waterer with 15-litre reservoir and 3 capillary spikes. Planted ${plantCount} ${localName} seedlings directly on a ${selectedBag.name} placed on top.`;
    } else if (planterType === 'emsco_citypicker') {
      plantCount = Math.min(4, selectedPlant.earthboxLayout.totalPlants);
      commissionNote = `Commissioned Emsco City Picker Grow Box with 1.5 cu ft capacity, 2-gallon reservoir, and caster wheels. Planted ${plantCount} ${localName} seedlings.`;
    } else if (planterType === 'linex_raised') {
      plantCount = Math.min(4, selectedPlant.earthboxLayout.totalPlants);
      commissionNote = `Commissioned Linex Raised Self-Watering Planter with 1.2 cu ft soil capacity, 1.8-gallon reservoir, and water float indicator. Planted ${plantCount} ${localName} seedlings.`;
    } else if (planterType === 'ourwarm_windowsill') {
      plantCount = Math.min(3, selectedPlant.earthboxLayout.totalPlants);
      commissionNote = `Commissioned OurWarm Windowsill Herb Planter Box with triple-pot wicking ropes and water indicator level. Planted ${plantCount} ${localName} seedlings.`;
    } else if (planterType === 'biolan_planter') {
      plantCount = Math.min(4, selectedPlant.earthboxLayout.totalPlants);
      commissionNote = `Commissioned Biolan sub-irrigation Watering Basin with 40-litre large water reservoir. Planted ${plantCount} ${localName} seedlings.`;
    } else if (planterType === 'oasesbox') {
      plantCount = Math.min(3, selectedPlant.earthboxLayout.totalPlants);
      commissionNote = `Commissioned Oasesbox modular sub-irrigation planter with 15-litre reservoir and float indicator. Planted ${plantCount} ${localName} seedlings.`;
    } else if (planterType === 'earthbox_junior') {
      plantCount = Math.min(2, selectedPlant.earthboxLayout.totalPlants);
      commissionNote = `Commissioned Earthbox Junior planter with 1 cubic foot growing medium and 1-gallon reservoir. Planted ${plantCount} ${localName} seedlings.`;
    } else {
      // earthbox
      plantCount = selectedPlant.earthboxLayout.totalPlants;
      commissionNote = `Commissioned Earthbox planter with 2 cubic feet growing medium and 3-gallon reservoir. Planted ${plantCount} ${localName} seedlings.`;
    }

    const newBox: PlanterBox = {
      id: Math.random().toString(36).substr(2, 9),
      name: boxName.trim(),
      createdAt: Date.now(),
      plantId: chosenPlantId,
      plantCount,
      plantingDate,
      waterReservoirLevel: 100, // Starts full
      soilMoisture: 85,
      planterType,
      growBagType: planterType === 'hozelock_growbag' ? growBagType : undefined,
      notes: [commissionNote]
    };

    onAddPlanter(newBox);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/65 backdrop-blur-xs" id="add-planter-overlay">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-white rounded-3xl border border-earth-200 p-5 relative max-h-[90vh] overflow-y-auto shadow-xl"
      >
        {/* Close trigger */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-400 hover:text-earth-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif font-black text-lg text-earth-800 flex items-center gap-2 mb-1">
          <Sprout className="w-5 h-5 text-earth-600" />
          Add sub-irrigated planter
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          Choose from high-efficiency sub-irrigated planting systems to monitor precise watering schedules, soil moisture, and layout specifications.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Planter System Type */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-450 block mb-1">
              Planter System Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-zinc-100 rounded-2xl p-2 bg-zinc-50/50">
              {randomizedSpecs.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setPlanterType(spec.id)}
                  className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    planterType === spec.id
                      ? 'border-earth-600 bg-earth-50 text-earth-800 ring-2 ring-earth-600/20'
                      : 'border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-display font-bold text-[10.5px] text-earth-900 leading-tight">{spec.name}</div>
                  <p className="text-[9px] text-zinc-500 mt-0.5 leading-snug">{spec.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Conditional UK Grow Bag Selection for Hozelock */}
          {planterType === 'hozelock_growbag' && (
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200">
              <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-450 block mb-1.5">
                UK Grow Bag Brand & Volume
              </label>
              <select
                value={growBagType}
                onChange={(e) => setGrowBagType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-250 rounded-xl text-xs font-sans text-earth-800 focus:outline-none focus:border-earth-500 cursor-pointer mb-1"
              >
                {UK_GROW_BAGS.map((bag) => (
                  <option key={bag.id} value={bag.id}>
                    {bag.name}
                  </option>
                ))}
              </select>
              <p className="text-[9.5px] text-zinc-500">
                {UK_GROW_BAGS.find(b => b.id === growBagType)?.desc}
              </p>
              <p className="text-[9px] text-zinc-400 italic mt-1.5">
                *The Hozelock waterer provides a 15-litre reservoir underneath your chosen soil bag.
              </p>
            </div>
          )}

          {/* Box Nickname input */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-450 block mb-1">
              Planter Box Nickname
            </label>
            <input
              type="text"
              required
              value={boxName}
              onChange={(e) => setBoxName(e.target.value)}
              placeholder="e.g. Back Terrace Beefsteaks"
              className="w-full px-3 py-2 border border-earth-200 rounded-xl text-xs font-sans text-earth-800 placeholder-zinc-400 focus:outline-none focus:border-earth-500 bg-earth-50/50"
            />
          </div>

          {/* Plant selector catalog drop list */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-450 block mb-1">
              Select Crop Category
            </label>
            <select
              value={chosenPlantId}
              onChange={(e) => setChosenPlantId(e.target.value)}
              className="w-full px-3 py-2 bg-earth-50/50 border border-earth-200 rounded-xl text-xs font-sans text-earth-800 focus:outline-none focus:border-earth-500 cursor-pointer"
            >
              {EXHAUSTIVE_PLANT_CATALOG.map((p) => {
                const totalPlants = getPlanterMaxPlants(planterType, p.earthboxLayout.totalPlants);
                return (
                  <option key={p.id} value={p.id}>
                    {getLocalPlantName(p.id, postcode, p.name)} ({totalPlants} Plants Required)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Crop summary card display */}
          <div className="p-3 bg-earth-50 rounded-2xl border border-earth-100 flex flex-col gap-1 text-[11px] max-h-[140px] overflow-y-auto pr-1">
            <div className="flex justify-between font-display font-bold text-earth-800 text-xs">
              <span className="text-earth-800 font-serif">Layout Specifications</span>
              <span>{getPlanterMaxPlants(planterType, selectedPlant.earthboxLayout.totalPlants)} Plants total</span>
            </div>
            <p className="text-zinc-650 text-[11px] leading-relaxed mt-1">
              {localizeMessage(selectedPlant.description, postcode)}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-earth-200/40 text-[10px] text-zinc-500">
              <span><strong>Climbing frame:</strong> {selectedPlant.climbingFrameRequired ? 'Required' : 'Self-Standing'}</span>
              <span><strong>Weekly need:</strong> {isUSPostcode(postcode) ? `${selectedPlant.waterGallonsPerWeekLocal} Gallons` : `${(selectedPlant.waterGallonsPerWeekLocal * 3.78541).toFixed(1)} Litres`}</span>
              <span><strong>Shade match:</strong> {selectedPlant.shadeRequirement}</span>
              <span><strong>Damp cycle:</strong> {selectedPlant.waterConsumption} Consumption</span>
            </div>
          </div>

          {/* Simulate different growth phases (For ease of review) */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-450 block mb-1">
              Test Simulation preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPlantingPreset('today')}
                className={`py-2 text-[10.5px] font-display font-semibold rounded-xl text-center border transition-all cursor-pointer ${
                  plantingPreset === 'today' 
                  ? 'bg-earth-600 text-white border-earth-500' 
                  : 'bg-earth-50/50 border-earth-200 text-earth-700 hover:bg-earth-100/50'
                }`}
              >
                🌱 Day 1 (Seedling)
              </button>
              <button
                type="button"
                onClick={() => setPlantingPreset('vegetative')}
                className={`py-2 text-[10.5px] font-display font-semibold rounded-xl text-center border transition-all cursor-pointer ${
                  plantingPreset === 'vegetative' 
                  ? 'bg-earth-600 text-white border-earth-500' 
                  : 'bg-earth-50/50 border-earth-200 text-earth-700 hover:bg-earth-100/50'
                }`}
              >
                🌿 Day 20 (Vegetative)
              </button>
              <button
                type="button"
                onClick={() => setPlantingPreset('flowering')}
                className={`py-2 text-[10.5px] font-display font-semibold rounded-xl text-center border transition-all cursor-pointer ${
                  plantingPreset === 'flowering' 
                  ? 'bg-earth-600 text-white border-earth-500' 
                  : 'bg-earth-50/50 border-earth-200 text-earth-700 hover:bg-earth-100/50'
                }`}
              >
                🌸 Day 42 (Flowering)
              </button>
            </div>
            <p className="text-[9.5px] text-zinc-400 mt-1.5 leading-relaxed">
              *Choose vegetative or flowering presets to instantly review high-definition growing images without waiting real weeks.
            </p>
          </div>

          {/* Action triggers */}
          <div className="flex gap-2.5 pt-2 border-t border-earth-200/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-earth-100 hover:bg-earth-200 text-earth-800 border border-earth-150 font-display font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-earth-600 hover:bg-earth-700 text-white font-display font-semibold text-xs py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plant Planter</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
