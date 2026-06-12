import React from 'react';
import { PlantType } from '../types';
import { Sprout, Cherry, Sun, ShieldCheck } from 'lucide-react';

interface PlantProgressViewerProps {
  plant: PlantType;
  currentDay: number;
}

export default function PlantProgressViewer({ plant, currentDay }: PlantProgressViewerProps) {
  // Constrain day within bounds
  const totalDays = plant.daysToHarvest;
  const day = Math.max(1, Math.min(totalDays, currentDay));
  const progressFraction = day / totalDays;

  // Determine current stage
  const currentStage = plant.stages.find(
    (s, index) => {
      const nextStage = plant.stages[index + 1];
      if (!nextStage) return true;
      return day <= s.dayRange[1];
    }
  ) || plant.stages[plant.stages.length - 1];

  // Calculate dynamic heights & aesthetic features
  const estimatedHeight = Math.round(
    plant.stages[0].heightInches +
    (currentStage.heightInches - plant.stages[0].heightInches) *
    (progressFraction)
  );

  // Generate SVG procedural structures
  const renderProceduralPlant = () => {
    const isTomato = plant.id.includes('tomato');
    const isPepper = plant.id.includes('pepper');
    const isCucumber = plant.id.includes('cucumber');
    const isBasil = plant.id.includes('basil');
    const isEggplant = plant.id.includes('eggplant');
    const isLettuce = plant.id.includes('lettuce');
    const isBean = plant.id.includes('bean');

    // Color definitions
    const stemColor = isEggplant ? '#54466b' : '#4d7c0f'; // Purple-toned for eggplant
    const foliageColor = isLettuce ? '#a3e635' : isEggplant ? '#1e3a1e' : '#15803d';
    const bloomColor = isTomato ? '#F59E0B' : isPepper ? '#FFFFFF' : isCucumber ? '#EAB308' : isEggplant ? '#C084FC' : '#F472B6';
    const fruitColor = isTomato ? '#EF4444' : isPepper ? '#EAB308' : isCucumber ? '#15803d' : isEggplant ? '#3B0764' : isBean ? '#4ade80' : '#84cc16';

    const renderFoliageNode = (x: number, y: number, size: number, angle: number) => {
      // Scale-dependent leaf drawing based on progress
      const length = size * Math.max(0.2, progressFraction);
      return (
        <path
          key={`leaf-${x}-${y}-${angle}`}
          d={`M ${x} ${y} Q ${x - length * 0.7} ${y - length * 0.3} ${x - length} ${y - length} Q ${x} ${y - length * 0.5} ${x} ${y} Z`}
          fill={foliageColor}
          transform={`rotate(${angle}, ${x}, ${y})`}
          className="transition-all duration-700 ease-out fill-current"
          opacity={0.85 + Math.random() * 0.15}
        />
      );
    };

    const renderBlossom = (x: number, y: number, scale: number) => {
      if (progressFraction < 0.4) return null;
      return (
        <g key={`bloom-${x}-${y}`} className="transition-all duration-700" transform={`scale(${scale * Math.min(1.2, progressFraction * 1.5)}) translate(${x / (scale * Math.min(1.2, progressFraction * 1.5)) - x}, ${y / (scale * Math.min(1.2, progressFraction * 1.5)) - y})`}>
          {/* Flower petals */}
          <circle cx={x} cy={y} r={5} fill={bloomColor} />
          <circle cx={x - 6} cy={y} r={4} fill={bloomColor} opacity={0.9} />
          <circle cx={x + 6} cy={y} r={4} fill={bloomColor} opacity={0.9} />
          <circle cx={x} cy={y - 6} r={4} fill={bloomColor} opacity={0.9} />
          <circle cx={x} cy={y + 6} r={4} fill={bloomColor} opacity={0.9} />
          {/* Yellow center pistil */}
          <circle cx={x} cy={y} r={2} fill="#FCD34D" />
        </g>
      );
    };

    const renderFruitNode = (x: number, y: number, baseWeight: number) => {
      if (progressFraction < 0.65) return null;
      const scale = Math.max(0.1, (progressFraction - 0.6) * 2.5) * baseWeight;

      if (isTomato) {
        return (
          <g key={`fruit-${x}-${y}`} className="transition-transform duration-700" transform={`translate(${x},${y}) scale(${scale})`}>
            {/* Shaded glossy sphere */}
            <circle cx="0" cy="0" r="12" fill={fruitColor} />
            <circle cx="-4" cy="-4" r="4" fill="#FFFFFF" opacity="0.65" /> {/* Gloss highlight */}
            {/* Crown star */}
            <path d="M -3 -12 L 0 -8 L 3 -12 L 1 -8 L 4 -7 L 0 -6 L -4 -7 Z" fill="#3f6212" />
          </g>
        );
      }

      if (isPepper) {
        return (
          <g key={`fruit-${x}-${y}`} className="transition-transform duration-700" transform={`translate(${x},${y}) scale(${scale})`}>
            {/* Lobed pepper body */}
            <path d="M -7 -10 C -12 -10 -15 0 -8 15 C -5 20 5 20 8 15 C 15 0 12 -10 7 -10 C 3 -10 0 -7 -3 -10 Z" fill={fruitColor} />
            <ellipse cx="-3" cy="-3" rx="2" ry="4" fill="#FFFFFF" opacity="0.4" />
            {/* Stem */}
            <path d="M 0 -10 Q 3 -16 8 -15" stroke="#3f6212" strokeWidth="2.5" fill="none" />
          </g>
        );
      }

      if (isEggplant) {
        return (
          <g key={`fruit-${x}-${y}`} className="transition-transform duration-700" transform={`translate(${x},${y}) scale(${scale})`}>
            {/* Tear-drop eggplant */}
            <path d="M -4 -8 C -6 -4 -16 6 -10 20 C -5 28 8 26 12 18 C 16 8 8 -2 4 -8 Z" fill={fruitColor} />
            <path cx="-2" cy="5" d="M -5 10 C -8 15 -5 22 2 20" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.15" />
            {/* Thorn green cap */}
            <path d="M -5 -8 L 0 -1 L 5 -8 L 2 -4 L 0 -10 Z" fill="#1e3a1e" />
          </g>
        );
      }

      if (isCucumber) {
        return (
          <g key={`fruit-${x}-${y}`} className="transition-transform duration-700" transform={`translate(${x},${y}) scale(${scale})`}>
            {/* Curved cucumber */}
            <path d="M -3 -12 Q 8 2 2 16 Q -2 22 -6 18 Q 0 8 -4 -8 Z" fill="#064e3b" />
            <path d="M -2 -10 Q 7 2 1 14" stroke="#047857" strokeWidth="2.5" fill="none" opacity="0.6" />
          </g>
        );
      }

      if (isBean) {
        return (
          <g key={`fruit-${x}-${y}`} className="transition-transform duration-700" transform={`translate(${x},${y}) scale(${scale})`}>
            {/* Slender green bean pod hang */}
            <path d="M 0 0 C 4 8 2 20 -4 32 C -5 34 -3 33 -1 31 C 4 20 6 8 1 -2 Z" fill="#4ade80" />
          </g>
        );
      }

      return null;
    };

    // Calculate stem nodes
    // As the plant matures, the stem grows taller and branches out
    const baseHeight = 220;
    const finalHeight = baseHeight - (progressFraction * 160);
    const midY = baseHeight - (progressFraction * 80);

    return (
      <svg viewBox="0 0 200 240" className="w-full h-full max-h-72 drop-shadow-md">
        {/* Dynamic Background Grid Lines for Technical Layout */}
        <line x1="20" y1="20" x2="180" y2="20" stroke="#e9eed9" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="20" y1="120" x2="180" y2="120" stroke="#e9eed9" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="20" y1="220" x2="180" y2="220" stroke="#b5c786" strokeWidth="2" />
        
        {/* Height Meter Ruler */}
        <text x="12" y="27" className="font-mono text-[9px] fill-earth-500 font-bold">42"</text>
        <line x1="25" y1="24" x2="30" y2="24" stroke="#8da152" strokeWidth="1" />
        <text x="12" y="123" className="font-mono text-[9px] fill-earth-500 font-bold">20"</text>
        <line x1="25" y1="120" x2="30" y2="120" stroke="#8da152" strokeWidth="1" />
        <text x="12" y="223" className="font-mono text-[9px] fill-earth-500">0"</text>
        <line x1="25" y1="220" x2="30" y2="220" stroke="#8da152" strokeWidth="1" />
        <line x1="28" y1="24" x2="28" y2="220" stroke="#8da152" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Earthbox Dirt Layer Cross-Section */}
        <rect x="35" y="218" width="130" height="15" fill="#3b2b1a" rx="4" />
        {/* Sub-irrigated Water Reservoir Simulator at bottom */}
        <rect x="35" y="233" width="130" height="5" fill="#38bdf8" rx="1" className="animate-pulse" />

        {/* Climbing Frame / Trellis Render (if required) */}
        {plant.climbingFrameRequired && (
          <g opacity={0.25} stroke="#64748b" strokeWidth="1.5" fill="none">
            {/* Back Cage poles */}
            <line x1="60" y1="15" x2="60" y2="218" />
            <line x1="140" y1="15" x2="140" y2="218" />
            <line x1="100" y1="10" x2="100" y2="218" />
            {/* Cross rungs */}
            <ellipse cx="100" cy="40" rx="42" ry="8" />
            <ellipse cx="100" cy="100" rx="42" ry="8" />
            <ellipse cx="100" cy="160" rx="42" ry="8" />
          </g>
        )}

        {/* Plant Roots underground (highly informative!) */}
        <g opacity={Math.max(0.3, progressFraction)} stroke="#fbe5c8" strokeWidth={1 + progressFraction} fill="none">
          <path d={`M 100 220 Q 95 226 90 231 M 100 220 Q 105 228 112 233 Q 108 235 110 238`} />
          <path d={`M 100 220 C 102 225 96 230 101 236 M 100 220 C 97 222 103 226 97 229`} />
        </g>

        {/* THE MAIN PLANT STEM STRUCTURAL SYSTEM (Drawn dynamically based on growth) */}
        <g className="plant-sway">
          {/* Main active stem */}
          {progressFraction > 0.05 && (
            <path
              d={`M 100 220 Q ${100 + Math.sin(day) * 6} ${midY} 100 ${finalHeight}`}
              fill="none"
              stroke={stemColor}
              strokeWidth={Math.max(1.5, progressFraction * 10)}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          )}

          {/* Core cotyledons / early foliage */}
          {progressFraction >= 0.01 && progressFraction < 0.3 && (
            <g>
              {renderFoliageNode(100, 215, 12, -45)}
              {renderFoliageNode(100, 215, 12, 225)}
            </g>
          )}

          {/* Branch Set A (Low Height) */}
          {progressFraction >= 0.2 && (
            <g>
              {/* Left Branch */}
              <path d={`M 100 180 Q 75 160 65 155`} fill="none" stroke={stemColor} strokeWidth={Math.max(1, progressFraction * 5)} strokeLinecap="round" />
              {renderFoliageNode(65, 155, 16, -60)}
              {renderFoliageNode(75, 162, 14, -40)}
              
              {/* Right Branch */}
              <path d={`M 100 183 Q 125 165 135 160`} fill="none" stroke={stemColor} strokeWidth={Math.max(1, progressFraction * 5)} strokeLinecap="round" />
              {renderFoliageNode(135, 160, 16, 120)}
              {renderFoliageNode(122, 166, 13, 100)}

              {/* Flowers/Fruits on Branch A */}
              {renderBlossom(73, 160, 0.9)}
              {renderFruitNode(73, 168, 1)}
              {renderBlossom(126, 164, 0.9)}
              {renderFruitNode(126, 172, 1)}
            </g>
          )}

          {/* Branch Set B (Mid Height) */}
          {progressFraction >= 0.45 && (
            <g>
              {/* Left Branch */}
              <path d={`M 100 130 Q 70 120 55 110`} fill="none" stroke={stemColor} strokeWidth={Math.max(1, progressFraction * 6)} strokeLinecap="round" />
              {renderFoliageNode(55, 110, 18, -75)}
              {renderFoliageNode(72, 116, 15, -45)}

              {/* Right Branch */}
              <path d={`M 100 135 Q 130 115 145 105`} fill="none" stroke={stemColor} strokeWidth={Math.max(1, progressFraction * 6)} strokeLinecap="round" />
              {renderFoliageNode(145, 105, 18, 135)}
              {renderFoliageNode(125, 114, 15, 105)}

              {/* Flowers/Fruits on Branch B */}
              {renderBlossom(62, 112, 1)}
              {renderFruitNode(62, 122, 1.2)}
              {renderBlossom(136, 108, 1)}
              {renderFruitNode(136, 118, 1.2)}
            </g>
          )}

          {/* Branch Set C (High Crown / Peak foliage) */}
          {progressFraction >= 0.65 && (
            <g>
              {/* Crown leaves */}
              {renderFoliageNode(100, finalHeight, 18, -90)}
              {renderFoliageNode(100 - 5, finalHeight + 8, 16, -110)}
              {renderFoliageNode(100 + 5, finalHeight + 8, 16, -70)}

              {/* Peak Flowers/Fruit buds */}
              {renderBlossom(100, finalHeight + 4, 1.1)}
              {renderFruitNode(105, finalHeight + 14, 0.8)}
            </g>
          )}
        </g>
        
        {/* Interactive Growth Tag Card */}
        <g transform="translate(142, 35)">
          <rect width="46" height="15" fill="#fcfdf9" stroke="#b5c786" strokeWidth="1" rx="6" />
          <text x="23" y="10" textAnchor="middle" className="font-mono text-[8px] fill-earth-800 font-bold">
            Day {day}/{totalDays}
          </text>
        </g>
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center bg-earth-100/50 p-4 rounded-3xl border border-earth-200/60 overflow-hidden relative" id="growth-canvas-container">
      {/* Decorative sun accent behind plant simulation */}
      <Sun className="absolute text-yellow-300/10 top-2 r-2 w-28 h-28 animate-spin-slow pointer-events-none" />

      <div className="w-full relative flex justify-center items-center h-72">
        {renderProceduralPlant()}
      </div>

      <div className="w-full mt-3 bg-white/85 backdrop-blur-xs p-3 rounded-2xl border border-earth-200">
        <div className="flex justify-between items-center mb-1">
          <span className="font-display font-bold text-xs uppercase tracking-wide text-earth-800 flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-earth-600 animate-bounce" />
            Phase details
          </span>
          <span className="font-mono text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
            {estimatedHeight} inches tall
          </span>
        </div>
        <h4 className="font-display font-semibold text-earth-900 text-sm">{currentStage.name}</h4>
        <p className="text-[11px] text-zinc-600 leading-normal mt-1">{currentStage.description}</p>
        
        {/* Dynamic Growth Actions Tip */}
        <div className="mt-2.5 pt-2.5 border-t border-dashed border-earth-200/80 flex items-start gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-display font-medium text-[10px] text-zinc-500 block">LOCAL COURIER ACTION REMINDER</span>
            <span className="text-[10px] text-earth-800 leading-normal font-sans">{currentStage.careTips}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
