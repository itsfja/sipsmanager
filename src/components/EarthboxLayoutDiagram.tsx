import React from 'react';
import { PlantType } from '../types';
import { LayoutGrid, Info, FlameKindling } from 'lucide-react';

interface EarthboxLayoutDiagramProps {
  plant: PlantType;
}

export default function EarthboxLayoutDiagram({ plant }: EarthboxLayoutDiagramProps) {
  const layout = plant.earthboxLayout;
  
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
          // Map percentage points representation
          return (
            <div
              key={`plant-dot-${idx}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help z-10"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/90 border-2 border-white flex items-center justify-center shadow-md animate-scale group-hover:scale-110 transition-transform">
                <span className="font-mono text-[9px] font-bold text-white">{idx + 1}</span>
              </div>
              
              {/* Tooltip detail tag */}
              <div className="absolute top-8 pointer-events-none bg-zinc-950/95 text-white border border-zinc-800 text-[8.5px] rounded-sm py-0.5 px-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Plant Node {idx + 1} Position
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
