import React from 'react';
import { PlantType } from '../types';
import { LayoutGrid, Info } from 'lucide-react';

interface EarthboxLayoutDiagramProps {
  plant: PlantType;
  planterType?: 'earthbox' | 'hozelock_growbag' | 'emsco_citypicker' | 'linex_raised' | 'ourwarm_windowsill' | 'biolan_planter' | 'oasesbox' | 'earthbox_junior';
  plantCount?: number;
}

export default function EarthboxLayoutDiagram({ plant, planterType = 'earthbox', plantCount }: EarthboxLayoutDiagramProps) {
  const layout = plant.earthboxLayout;
  const displayCount = plantCount !== undefined ? plantCount : layout.totalPlants;

  if (planterType === 'hozelock_growbag') {
    const hozelockCount = Math.min(3, displayCount);
    let plantPositions: number[] = [];
    if (hozelockCount === 1) {
      plantPositions = [50];
    } else if (hozelockCount === 2) {
      plantPositions = [25, 75];
    } else {
      plantPositions = [20, 50, 80];
    }

    return (
      <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-emerald-600" />
              Hozelock Grow Bag Layout
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Accommodates {hozelockCount} {plant.name} {hozelockCount === 1 ? 'plant' : 'plants'} on standard grow bag
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded-full">
            15L Reservoir Spikes
          </span>
        </div>

        {/* Scaled Top-Down view of Hozelock Grow Bag Waterer */}
        <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 overflow-hidden aspect-[29/12] flex flex-col justify-between">
          <div className="absolute inset-x-4 inset-y-3 bg-zinc-850 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center">
            <span className="font-mono text-[8px] text-zinc-650 tracking-widest uppercase">Standard Grow Bag</span>
          </div>

          {/* Spikes */}
          {[20, 40, 60, 80].map((pos, idx) => (
            <div
              key={`spike-${idx}`}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
              style={{ left: `${pos}%` }}
            >
              <div className="w-5.5 h-5.5 rounded-full bg-cyan-950 border-2 border-cyan-500/70 flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-[6.5px] font-mono text-cyan-400 font-bold tracking-tight mt-0.5 bg-zinc-900/80 px-1 rounded">SPIKE {idx + 1}</span>
            </div>
          ))}

          {/* Integrated Cane Supports (Along the same line as the spikes, interleaved) */}
          {[30, 50, 70].map((pos, idx) => (
            <div
              key={`cane-${idx}`}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10 cursor-help"
              style={{ left: `${pos}%` }}
              title="Integrated wooden cane support holder slot"
            >
              <div className="w-4 h-4 rounded-full bg-amber-950 border border-amber-600/80 flex items-center justify-center shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <span className="text-[6.5px] font-mono text-amber-300 font-bold mt-0.5 bg-zinc-950/80 px-1 rounded-sm">CANE {idx + 1}</span>
            </div>
          ))}

          {/* Water Inlet Port (Front Central) */}
          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-zinc-700 border-2 border-slate-500 flex items-center justify-center shadow-lg z-10" title="Reservoir Inlet Port (Front Central)">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-100" />
            </div>
            <span className="absolute left-7 top-1/2 transform -translate-y-1/2 text-[7px] font-mono text-cyan-400 font-bold tracking-wider drop-shadow-md whitespace-nowrap bg-zinc-900/95 px-1 rounded">WATER INLET</span>
          </div>

          {/* Active Plant Positions */}
          {plantPositions.map((pos, idx) => (
            <div
              key={`plant-dot-${idx}`}
              className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-20"
              style={{ left: `${pos}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <span className="font-mono text-[9px] font-bold text-white">{idx + 1}</span>
              </div>
            </div>
          ))}

          <div className="absolute bottom-1 left-2 pointer-events-none">
            <span className="font-mono text-[7.5px] text-zinc-500">100cm L x 40cm W (Grow Bag)</span>
          </div>
        </div>

        <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-900 font-display font-semibold">Setup: </strong>
              Place the standard grow bag directly over the Hozelock base. Pierce slots below the bag above the capillary spikes. Insert support canes through the cane slots to secure tall plants and plant seedlings directly above spikes.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (planterType === 'emsco_citypicker') {
    const emscoCount = Math.min(4, displayCount);
    let points: { x: number; y: number }[] = [];
    if (emscoCount === 1) {
      points = [{ x: 50, y: 50 }];
    } else if (emscoCount === 2) {
      points = [{ x: 30, y: 50 }, { x: 70, y: 50 }];
    } else if (emscoCount === 3) {
      points = [{ x: 25, y: 35 }, { x: 75, y: 35 }, { x: 50, y: 70 }];
    } else {
      points = [{ x: 25, y: 30 }, { x: 75, y: 30 }, { x: 25, y: 70 }, { x: 75, y: 70 }];
    }

    return (
      <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-amber-600" />
              Emsco City Picker Layout
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Placement details for {emscoCount} {plant.name} {emscoCount === 1 ? 'plant' : 'plants'} (1.5 cu ft capacity)
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
            Mobile Casters
          </span>
        </div>

        {/* Emsco Patio Box Top-Down (Wider rectangular container) */}
        <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 overflow-hidden aspect-[24/20] flex flex-col justify-between">
          {/* Caster Wheel Indicators at the four corners */}
          <div className="absolute top-1 left-1 w-3.5 h-3.5 bg-zinc-750 rounded-full border border-zinc-600 flex items-center justify-center text-[6px] text-zinc-500 font-mono">◌</div>
          <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-zinc-750 rounded-full border border-zinc-600 flex items-center justify-center text-[6px] text-zinc-500 font-mono">◌</div>
          <div className="absolute bottom-1 left-1 w-3.5 h-3.5 bg-zinc-750 rounded-full border border-zinc-600 flex items-center justify-center text-[6px] text-zinc-500 font-mono">◌</div>
          <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-zinc-750 rounded-full border border-zinc-600 flex items-center justify-center text-[6px] text-zinc-500 font-mono">◌</div>

          {/* Water Fill Tube (Usually front-right corner) */}
          <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-zinc-700 border-2 border-slate-500 flex items-center justify-center shadow-lg" title="Water Fill Tube">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="absolute bottom-6 right-0 text-[7px] font-mono text-cyan-400 font-bold">TUBE</span>
          </div>

          {/* Fertilizer Band Row (Single center band) */}
          <div className="absolute top-1/2 left-6 right-6 h-3 bg-amber-600/80 border border-dashed border-amber-400 rounded flex items-center justify-center" title="Fertilizer Band Track">
            <span className="text-[7px] font-mono text-amber-100 font-bold uppercase">Fertilizer Band</span>
          </div>

          {/* Active Plant Positions */}
          {points.map((pt, idx) => (
            <div
              key={`plant-dot-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <span className="font-mono text-[9px] font-bold text-white">{idx + 1}</span>
              </div>
            </div>
          ))}

          <div className="absolute bottom-1 left-2 pointer-events-none">
            <span className="font-mono text-[7.5px] text-zinc-500">24.5" L x 20.5" W (Patio Grow Box)</span>
          </div>
        </div>

        <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-900 font-display font-semibold">Setup: </strong>
              Fill the 2-gallon reservoir below the aeration screen. Pack moist compost into the four capillary corners to act as water wicks. Pack soil, create a narrow trench for the fertilizer band opposite to the plant roots, and fit the mulch cover securely.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (planterType === 'linex_raised') {
    const linexCount = Math.min(4, displayCount);
    let points: { x: number; y: number }[] = [];
    if (linexCount === 1) {
      points = [{ x: 50, y: 50 }];
    } else if (linexCount === 2) {
      points = [{ x: 30, y: 50 }, { x: 70, y: 50 }];
    } else if (linexCount === 3) {
      points = [{ x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 }];
    } else {
      points = [{ x: 20, y: 30 }, { x: 80, y: 30 }, { x: 20, y: 70 }, { x: 80, y: 70 }];
    }

    return (
      <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-indigo-600" />
              Linex Raised Planter Layout
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Placement details for {linexCount} {plant.name} {linexCount === 1 ? 'plant' : 'plants'} (1.2 cu ft on sturdy legs)
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
            Water Indicator Float
          </span>
        </div>

        {/* Linex Raised Bed Top-Down */}
        <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 overflow-hidden aspect-[30/15] flex flex-col justify-between">
          {/* Water Float gauge */}
          <div className="absolute top-2 right-2 w-5 h-5 rounded bg-zinc-800 border border-slate-600 flex flex-col items-center justify-center shadow-lg" title="Water Level Float Gauge">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[6px] font-mono text-zinc-400 mt-0.5">FLOAT</span>
          </div>

          <div className="absolute bottom-1 right-1/2 transform translate-x-1/2 w-4 h-2 bg-zinc-700 border border-zinc-500 rounded-sm" title="Drainage Overflow Plug" />

          {/* Active Plant Positions */}
          {points.map((pt, idx) => (
            <div
              key={`plant-dot-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <span className="font-mono text-[9px] font-bold text-white">{idx + 1}</span>
              </div>
            </div>
          ))}

          <div className="absolute bottom-1 left-2 pointer-events-none">
            <span className="font-mono text-[7.5px] text-zinc-500">30" L x 15" W (Self-Watering Raised Bed)</span>
          </div>
        </div>

        <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-900 font-display font-semibold">How to Set Up: </strong>
              Fill the 1.8-gallon bottom chamber. Monitor water levels using the integrated float indicator (red gauge rises when full). Open the drainage overflow plug during heavy rain to avoid soil waterlogging.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (planterType === 'ourwarm_windowsill') {
    const ourwarmCount = Math.min(3, displayCount);
    let points: { x: number; y: number }[] = [];
    if (ourwarmCount === 1) {
      points = [{ x: 50, y: 50 }];
    } else if (ourwarmCount === 2) {
      points = [{ x: 30, y: 50 }, { x: 70, y: 50 }];
    } else {
      points = [{ x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 }];
    }

    return (
      <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-emerald-600" />
              OurWarm Windowsill Herb Box
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Ideal spacing for {ourwarmCount} {plant.name} {ourwarmCount === 1 ? 'plant' : 'plants'} in triple-cell herb planter
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            1.2L Reservoir / Wicks
          </span>
        </div>

        {/* OurWarm windowsill rectangular top-down diagram */}
        <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 overflow-hidden aspect-[15/5] flex flex-col justify-center items-center">
          <div className="w-full h-full rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-850 flex items-center justify-around relative shadow-inner">
            
            {/* 3 distinct circular pot slots */}
            {[20, 50, 80].map((cx, idx) => (
              <div 
                key={`pot-circle-${idx}`}
                className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full border border-zinc-600 bg-zinc-900 flex items-center justify-center"
                style={{ left: `${cx}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* Wicking rope in each pot */}
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center" title="Cotton Wicking Rope">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                </div>
              </div>
            ))}

            {/* Water indicator window/gauge in bottom right */}
            <div className="absolute bottom-1 right-2 w-7 h-2.5 bg-zinc-850 border border-zinc-700 rounded flex items-center px-0.5" title="Water Level Indicator Window">
              <div className="w-2/3 h-full bg-cyan-500 rounded-sm" />
              <span className="text-[4.5px] font-mono text-zinc-400 ml-1">LVL</span>
            </div>

            {/* Active Plant Positions */}
            {points.map((pt, idx) => (
              <div
                key={`plant-dot-${idx}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              >
                <div className="w-6.5 h-6.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <span className="font-mono text-[8.5px] font-bold text-white">{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-1 left-2 pointer-events-none">
            <span className="font-mono text-[7px] text-zinc-500">15.5" L x 4.8" W Windowsill Herb Box</span>
          </div>
        </div>

        <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-900 font-display font-semibold">How to Set Up: </strong>
              Thread the cotton wicking ropes through the bottom holes of each of the 3 inner pots. Fill the outer reservoir base with water (~1.2L) and add premium potting mix inside. Place up to 3 herb plants for continuous sub-irrigation.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (planterType === 'biolan_planter') {
    const biolanCount = Math.min(4, displayCount);
    let points: { x: number; y: number }[] = [];
    if (biolanCount === 1) {
      points = [{ x: 50, y: 50 }];
    } else if (biolanCount === 2) {
      points = [{ x: 30, y: 50 }, { x: 70, y: 50 }];
    } else if (biolanCount === 3) {
      points = [{ x: 25, y: 50 }, { x: 50, y: 50 }, { x: 75, y: 50 }];
    } else {
      points = [{ x: 25, y: 30 }, { x: 75, y: 30 }, { x: 25, y: 70 }, { x: 75, y: 70 }];
    }

    return (
      <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-emerald-700" />
              Biolan Watering Basin Layout
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Ideal setup for {biolanCount} {plant.name} {biolanCount === 1 ? 'plant' : 'plants'} in massive 40L reservoir
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            40L Reservoir / Dual Wicks
          </span>
        </div>

        {/* Biolan Large Basin Top-Down view */}
        <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-3 overflow-hidden aspect-[30/22] flex flex-col justify-between">
          {/* Water filling pipe */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-emerald-850 border-2 border-emerald-500 flex items-center justify-center shadow-lg" title="Biolan Water Filling Pipe">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>

          {/* Dual capillary wicking chambers */}
          <div className="absolute top-[35%] left-[20%] w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[7px] text-zinc-500 font-mono" title="Wicking Tube Left">
            WICK
          </div>
          <div className="absolute top-[35%] right-[20%] w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[7px] text-zinc-500 font-mono" title="Wicking Tube Right">
            WICK
          </div>

          <div className="absolute bottom-1 right-2 pointer-events-none">
            <span className="font-mono text-[7.5px] text-zinc-500">Biolan 60cm Basin</span>
          </div>

          {/* Active Plant Positions */}
          {points.map((pt, idx) => (
            <div
              key={`plant-dot-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <span className="font-mono text-[9px] font-bold text-white">{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-900 font-display font-semibold">How to Set Up: </strong>
              Pack the two vertical wicking tubes tightly with organic compost first. This ensures capillary action. Fill the 40-litre reservoir via the corner inlet pipe. Water rises continuously through the soil, keeping it perfectly aerated.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (planterType === 'oasesbox') {
    const oasesCount = Math.min(3, displayCount);
    let points: { x: number; y: number }[] = [];
    if (oasesCount === 1) {
      points = [{ x: 50, y: 50 }];
    } else if (oasesCount === 2) {
      points = [{ x: 35, y: 50 }, { x: 65, y: 50 }];
    } else {
      points = [{ x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 }];
    }

    return (
      <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-cyan-600" />
              Oasesbox Modular Layout
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Optimal spacing for {oasesCount} {plant.name} {oasesCount === 1 ? 'plant' : 'plants'} in Oasesbox modular unit
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold text-cyan-800 bg-cyan-100 px-2.5 py-1 rounded-full">
            15L Reservoir / Float Gauge
          </span>
        </div>

        {/* Oasesbox modular square Top-Down */}
        <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 overflow-hidden aspect-[1/1] flex flex-col justify-center items-center">
          <div className="w-[90%] h-[90%] rounded-xl border-4 border-dashed border-zinc-700 bg-zinc-850 flex items-center justify-center relative shadow-inner">
            {/* Water Indicator float on top edge */}
            <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-zinc-800 border border-slate-600 flex flex-col items-center justify-center shadow-md" title="Water Level Indicator Float">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[5px] font-mono text-zinc-400 mt-0.5">FLOAT</span>
            </div>

            {/* Capillary wick pod */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyan-950/80 border-2 border-dashed border-cyan-500/50 flex items-center justify-center" title="Central Capillary Pod">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Link tabs to indicate modular expansion */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-cyan-800 border border-cyan-600 rounded-r" title="Modular Link Slot" />
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-cyan-800 border border-cyan-600 rounded-l" title="Modular Link Slot" />

            {/* Active Plant Positions */}
            {points.map((pt, idx) => (
              <div
                key={`plant-dot-${idx}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <span className="font-mono text-[9px] font-bold text-white">{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-2 left-3 pointer-events-none">
            <span className="font-mono text-[7.5px] text-zinc-500">Oasesbox 34cm Modular Square</span>
          </div>
        </div>

        <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-900 font-display font-semibold">How to Set Up: </strong>
              Insert the wicking filter material into the central pod. Ensure it reaches down into the 15-litre water reservoir. Keep an eye on the side indicator float; when the float drops, add water to the reservoir through the filling hole. Link multiple Oasesboxes together for a beautiful, modular row.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (planterType === 'earthbox_junior') {
    const juniorCount = Math.min(2, displayCount);
    let plantPoints = juniorCount === 1 ? [{ x: 50, y: 50 }] : [{ x: 30, y: 50 }, { x: 70, y: 50 }];

    return (
      <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-emerald-600" />
              Earthbox Junior Layout
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Recommended placement for {juniorCount} {plant.name} {juniorCount === 1 ? 'plant' : 'plants'} in compact size
            </p>
          </div>
          <span className="font-mono text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            1.0 cu ft • 1 Gal Reservoir
          </span>
        </div>

        {/* Scaled Top-Down Top View of Earthbox Junior (23" x 9.5" Aspect Ratio) */}
        <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 overflow-hidden aspect-[23/9.5] flex flex-col justify-between">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `radial-gradient(#ffffff 2px, transparent 2px)`,
            backgroundSize: '8px 8px'
          }} />

          {/* Water Fill Tube */}
          <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-zinc-700 border-2 border-slate-500 flex items-center justify-center shadow-lg" title="Water Fill Tube">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse">
              <div className="w-1 h-1 rounded-full bg-cyan-200" />
            </div>
            <span className="absolute left-6 top-0.5 text-[7.5px] font-mono text-cyan-400 font-bold tracking-widest drop-shadow-md">TUBE</span>
          </div>

          {/* Fertilizer Band in Center or opposite from plants */}
          <div className="absolute top-1/2 left-4 right-4 h-3 transform -translate-y-1/2 bg-amber-600/80 border border-dashed border-amber-400/40 rounded flex items-center justify-center" title="Fertilizer Band Track">
            <span className="text-[7px] font-mono text-amber-50 font-bold uppercase tracking-wider px-1">Junior Fertilizer Band (1 Cup)</span>
          </div>

          {/* Active Plant Positions */}
          {plantPoints.map((pt, idx) => (
            <div
              key={`junior-plant-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              <div className="w-6.5 h-6.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-md animate-scale group-hover:scale-110 transition-transform">
                <span className="font-mono text-[8.5px] font-bold text-white">{idx + 1}</span>
              </div>
            </div>
          ))}

          {/* Scale label */}
          <div className="absolute bottom-1 right-2 pointer-events-none">
            <span className="font-mono text-[7.5px] text-zinc-500">23" L x 9.5" W</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
            <Info className="w-4 h-4 text-earth-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-900 font-display font-semibold">Junior setup: </strong>
              Fill reservoir, secure wicking screen. Apply 1 cup of dolomite lime throughout the container soil mix. Lay down a continuous center strip with 1 cup of standard organic fertilizer before covering with the elasticized mulch cover. Plant seedlings in designated slots.
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Fallback to standard Earthbox layout
  return (
    <div className="bg-white p-4 rounded-3xl border border-zinc-200" id="layout-diagram-card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-earth-600" />
            Official Earthbox layout
          </h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Recommended placement for {layout.totalPlants} {plant.name} {layout.totalPlants === 1 ? 'plant' : 'plants'}
          </p>
        </div>
        <span className="font-mono text-[9px] font-bold text-earth-700 bg-earth-100 px-2.5 py-1 rounded-full">
          {layout.rows === 1 ? 'Single Row' : 'Double Row'}
        </span>
      </div>

      {/* Scaled Top-Down Top View of official Earthbox (29" x 14" Aspect Ratio) */}
      <div className="w-full relative bg-zinc-900 rounded-2xl border-4 border-zinc-800 p-2 overflow-hidden aspect-[29/14] flex flex-col justify-between">
        {/* Aerated Mulch Cover Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `radial-gradient(#ffffff 2px, transparent 2px)`,
          backgroundSize: '8px 8px'
         }} />

        {/* 1. Water Fill Tube (Always upper right corner of standard Earthbox) */}
        <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-zinc-700 border-2 border-slate-500 flex items-center justify-center shadow-lg" title="Water Fill Tube">
          <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
          </div>
          {/* Label tube */}
          <span className="absolute left-7 top-1 text-[8px] font-mono text-cyan-400 font-bold tracking-widest drop-shadow-md">TUBE</span>
        </div>

        {/* 2. Official Fertilizer Band Overlay */}
        {layout.fertilizerBand === 'center' ? (
          <div className="absolute top-1/2 left-4 right-4 h-3.5 transform -translate-y-1/2 bg-amber-600/85 border border-dashed border-amber-400/50 rounded flex items-center justify-center" title="Fertilizer Band Track">
            <span className="text-[7.5px] font-mono text-amber-50 font-bold uppercase tracking-wider px-1">Center Fertilizer Band (2 Cups)</span>
          </div>
        ) : (
          <div className="absolute top-2 left-10 right-10 h-3.5 bg-amber-600/85 border border-dashed border-amber-300/55 rounded flex items-center justify-center" title="Side Fertilizer Band Track">
            <span className="text-[7.5px] font-mono text-amber-50 font-bold uppercase tracking-wider px-1">Side Fertilizer Band (2 Cups - opposite from plants)</span>
          </div>
        )}

        {/* 3. Plant Positions */}
        {layout.diagramPoints.map((pt, idx) => {
          return (
            <div
              key={`plant-dot-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/90 border-2 border-white flex items-center justify-center shadow-md animate-scale group-hover:scale-110 transition-transform">
                <span className="font-mono text-[9px] font-bold text-white">{idx + 1}</span>
              </div>
            </div>
          );
        })}

        {/* Grid Scale Annotations */}
        <div className="absolute bottom-1 right-2 pointer-events-none flex items-center gap-1">
          <span className="font-mono text-[8px] text-zinc-500">29" L x 14" W</span>
        </div>
      </div>

      {/* Explanatory layout details */}
      <div className="mt-3.5 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
        <p className="text-zinc-700 text-xs leading-normal flex items-start gap-2">
          <Info className="w-4 h-4 text-earth-500 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-zinc-900 font-display font-semibold">Instructions: </strong>
            {layout.instructions}
          </span>
        </p>

        <div className="mt-2.5 pt-2 border-t border-zinc-200/60 flex items-center gap-4 text-[10.5px]">
          <div className="flex items-center gap-1.5 text-zinc-600">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Seedling Node</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <div className="w-5 h-2.5 bg-amber-600 rounded-xs" />
            <span>Fertilizer Strip</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400" />
            <span>Water tube location</span>
          </div>
        </div>
      </div>
    </div>
  );
}