import React, { useState } from 'react';
import { PlantType, PlanterBox } from '../types';
import { EXHAUSTIVE_PLANT_CATALOG } from '../data/plants';
import { PlusCircle, Sprout, Layout, Info, AlertCircle, X } from 'lucide-react';
import { motion } from 'motion/react';
import { getLocalPlantName, localizeMessage } from '../utils/localization';

interface AddPlanterModalProps {
  onClose: () => void;
  onAddPlanter: (planter: PlanterBox) => void;
  postcode: string;
}

export default function AddPlanterModal({ onClose, onAddPlanter, postcode }: AddPlanterModalProps) {
  const [boxName, setBoxName] = useState('');
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

    const newBox: PlanterBox = {
      id: Math.random().toString(36).substr(2, 9),
      name: boxName.trim(),
      createdAt: Date.now(),
      plantId: chosenPlantId,
      plantCount: selectedPlant.earthboxLayout.totalPlants,
      plantingDate,
      waterReservoirLevel: 100, // Starts full
      soilMoisture: 85,
      notes: [`Commissioned planter box with ${selectedPlant.earthboxLayout.totalPlants} ${localName} seedlings. Ready for sub-irrigation reservoir intake.`]
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
          Add new Earthbox planter
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          Earthboxes hold exactly 2 cubic feet of growing medium and have highly specific crop seating densities.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
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
              Select Earthbox Crop Category
            </label>
            <select
              value={chosenPlantId}
              onChange={(e) => setChosenPlantId(e.target.value)}
              className="w-full px-3 py-2 bg-earth-50/50 border border-earth-200 rounded-xl text-xs font-sans text-earth-800 focus:outline-none focus:border-earth-500 cursor-pointer"
            >
              {EXHAUSTIVE_PLANT_CATALOG.map((p) => (
                <option key={p.id} value={p.id}>
                  {getLocalPlantName(p.id, postcode, p.name)} ({p.earthboxLayout.totalPlants} Plants Required)
                </option>
              ))}
            </select>
          </div>

          {/* Crop summary card display */}
          <div className="p-3 bg-earth-50 rounded-2xl border border-earth-100 flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between font-display font-bold text-earth-800 text-xs">
              <span className="text-earth-800 font-serif">Layout Specifications</span>
              <span>{selectedPlant.earthboxLayout.totalPlants} Plants total</span>
            </div>
            <p className="text-zinc-650 text-[11px] leading-relaxed mt-1">
              {localizeMessage(selectedPlant.description, postcode)}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-earth-200/40 text-[10px] text-zinc-500">
              <span><strong>Climbing frame:</strong> {selectedPlant.climbingFrameRequired ? 'Required' : 'Self-Standing'}</span>
              <span><strong>Weekly need:</strong> {selectedPlant.waterGallonsPerWeekLocal} Gallons</span>
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
              <span>Plant Earthbox</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
