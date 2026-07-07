import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Heart, Award, ShieldAlert, HeartHandshake } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[85vh] z-10"
          id="credits-modal-sheet"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-100 flex justify-between items-center bg-earth-600 text-white">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-300" />
              <h2 className="font-display font-bold text-base tracking-tight text-white">
                Project Credits & Legal Trademarks
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-zinc-700 text-xs leading-relaxed">
            
            {/* Design & Collaboration Section */}
            <div className="space-y-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60">
              <h3 className="font-display font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                The Collaboration Story
              </h3>
              <p className="text-zinc-700">
                This software application is a harmonious collaborative effort:
              </p>
              <ul className="space-y-2 list-none pl-1">
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-emerald-600 font-bold font-mono">💻 AI</span>
                  <span>
                    <strong className="text-zinc-900">Gemini (AI Assistant)</strong> designed the technical implementation structure, coded the sub-irrigation logic, styled the Tailwind user interfaces, and built the meteorological calculations.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-emerald-600 font-bold font-mono">🌱 PATH</span>
                  <span>
                    <strong className="text-zinc-900">Francis Armstrong</strong> beautifully meandered, refined, and directed the path — testing layouts, tweaking parameters, integrating windowsill box profiles, and guiding the overall soul and functionality of this application.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-zinc-700">
                  <span className="text-emerald-600 font-bold font-mono">🍎 GROWER</span>
                  <span>
                    <strong className="text-zinc-900">You (The Grower)</strong>, cultivating fresh fruits and vegetables at home for health, peace of mind, and sanity. Grounding ourselves in soil and watching seeds flourish is a powerful therapeutic anchor in today's fast-paced world.
                  </span>
                </li>
              </ul>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-medium text-emerald-800">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>Crafted together to promote efficient urban gardening.</span>
              </div>
            </div>

            {/* Trademark Acknowledgements */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-zinc-400" />
                Trademarks & Legal Acknowledgements
              </h3>
              <p className="text-zinc-500 text-[11px]">
                All brand names, product models, logos, and trademarks referenced inside this companion app belong exclusively to their respective owners. Their mention in this application serves strictly educational and illustrative informational purposes for sub-irrigation gardening enthusiasts:
              </p>

              <div className="grid grid-cols-1 gap-2.5 font-mono text-[10px] text-zinc-600 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100">
                <div>
                  <strong className="text-zinc-900 font-sans font-semibold">EarthBox®</strong>
                  <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-normal">
                    EarthBox®, EarthBox® Junior, and Root & Veg™ are registered trademarks or trademarks of Novelty Manufacturing Co. or their original creators.
                  </p>
                </div>
                
                <hr className="border-zinc-200/50" />

                <div>
                  <strong className="text-zinc-900 font-sans font-semibold">City Picker®</strong>
                  <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-normal">
                    City Picker® and Patio Picker® are registered trademarks of Emsco Group.
                  </p>
                </div>

                <hr className="border-zinc-200/50" />

                <div>
                  <strong className="text-zinc-900 font-sans font-semibold">Hozelock®</strong>
                  <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-normal">
                    Hozelock® and Hozelock Grow Bag System are registered trademarks of Hozelock Ltd.
                  </p>
                </div>

                <hr className="border-zinc-200/50" />

                <div>
                  <strong className="text-zinc-900 font-sans font-semibold">Biolan®</strong>
                  <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-normal">
                    Biolan® is a registered trademark of Biolan Oy.
                  </p>
                </div>

                <hr className="border-zinc-200/50" />

                <div>
                  <strong className="text-zinc-900 font-sans font-semibold">OurWarm®</strong>
                  <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-normal">
                    OurWarm® Windowsill Herb Planter Box is a trademark of OurWarm or its affiliates.
                  </p>
                </div>

                <hr className="border-zinc-200/50" />

                <div>
                  <strong className="text-zinc-900 font-sans font-semibold">Oasesbox™ & Linex®</strong>
                  <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-normal">
                    Oasesbox™ and Linex® are trademarks of their respective manufacturers and legal holders.
                  </p>
                </div>

                <hr className="border-zinc-200/50" />

                <div>
                  <strong className="text-zinc-900 font-sans font-semibold">Meteorological Data</strong>
                  <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-normal">
                    Weather API feeds and geocoding resources are courtesy of the open-source Open-Meteo meteorological platform, provided under the CC BY 4.0 Attribution License.
                  </p>
                </div>
              </div>
            </div>

            {/* Gratitude Footer inside Modal */}
            <div className="flex items-center justify-center gap-1.5 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 font-serif italic text-center">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>Happy growing & wicking!</span>
            </div>

          </div>

          {/* Action Footer */}
          <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
            <button
              onClick={onClose}
              className="bg-zinc-900 hover:bg-zinc-800 text-white font-display font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm"
            >
              Close Credits
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
