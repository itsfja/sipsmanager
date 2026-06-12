import React, { useState, useRef, useEffect } from 'react';
import { EXHAUSTIVE_PEST_DISEASE_CATALOG, DiagnosticIssue } from '../data/pests';
import { EXHAUSTIVE_PLANT_CATALOG } from '../data/plants';
import { isUSPostcode, getLocalPlantName, localizeMessage, getDisplayTemp } from '../utils/localization';
import { 
  Bug, 
  UploadCloud, 
  Camera, 
  Activity, 
  Sparkles, 
  RefreshCw, 
  AlertTriangle, 
  HeartPulse, 
  Bookmark, 
  Check, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PestDiagnosticModuleProps {
  postcode: string;
}

export default function PestDiagnosticModule({ postcode }: PestDiagnosticModuleProps) {
  const [selectedCropId, setSelectedCropId] = useState<string>('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosticIssue | null>(null);
  const [showAllLibrary, setShowAllLibrary] = useState(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'library'>('scan');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Collect all unique symptoms from catalog for symptom picker
  const allSymptoms = Array.from(
    new Set(EXHAUSTIVE_PEST_DISEASE_CATALOG.flatMap(p => p.symptoms))
  );

  // Toggle symptom selection
  const handleToggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    // Clear previous diagnosis when options change to force run scan
    setDiagnosisResult(null);
  };

  // Simulated leaf scan triggers for ease of review
  const runSimulatedScan = (sampleType: 'ber' | 'mildew' | 'flea', mockImageName: string) => {
    // Pick associated target issue
    let targetId = 'blossom_end_rot';
    let symptomsToInject: string[] = [];

    if (sampleType === 'ber') {
      targetId = 'blossom_end_rot';
      symptomsToInject = [
        'Dark sunken leathery patches at the bottom of the fruit',
        'Water-soaked spots on the blossom-end of maturing tomatoes or peppers'
      ];
    } else if (sampleType === 'mildew') {
      targetId = 'powdery_mildew';
      symptomsToInject = [
        'White, talcum powder-like spots on leaf tops and stalks',
        'Leaves turning yellow, dry, curling upwards, and displaying brittle texture'
      ];
    } else if (sampleType === 'flea') {
      targetId = 'flea_beetles';
      symptomsToInject = [
        'Dozens of tiny circular holes on leaf blades (shothole look)',
        'Tiny black bugs hopping quickly off foliage upon physical touch'
      ];
    }

    setUploadedImage(mockImageName);
    setSelectedSymptoms(symptomsToInject);
    triggerScan(targetId);
  };

  // Trigger manual file selection dialogue
  const triggerFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Convert uploaded image file into object URL display
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(URL.createObjectURL(file));

      // Auto-extract partial random symptoms to make scanning interactive!
      const randomIssueIndex = Math.floor(Math.random() * EXHAUSTIVE_PEST_DISEASE_CATALOG.length);
      const chosenIssue = EXHAUSTIVE_PEST_DISEASE_CATALOG[randomIssueIndex];
      setSelectedSymptoms([chosenIssue.symptoms[0]]);
      
      triggerScan(chosenIssue.id);
    }
  };

  // Perform animated matrix bio-mesh scan cycle
  const triggerScan = (forcedId?: string) => {
    setIsScanning(true);
    setScanProgress(0);
    setDiagnosisResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          resolveDiagnosis(forcedId);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Identify matching diagnostics based on symptoms list
  const resolveDiagnosis = (forcedId?: string) => {
    setIsScanning(false);
    
    if (forcedId) {
      const match = EXHAUSTIVE_PEST_DISEASE_CATALOG.find(p => p.id === forcedId);
      if (match) {
        setDiagnosisResult(match);
        return;
      }
    }

    // Otherwise, match symptoms mathematically
    if (selectedSymptoms.length === 0) {
      // Just pick random or highest overlap
      setDiagnosisResult(EXHAUSTIVE_PEST_DISEASE_CATALOG[0]);
      return;
    }

    let topMatch = EXHAUSTIVE_PEST_DISEASE_CATALOG[0];
    let highestOverlap = -1;

    EXHAUSTIVE_PEST_DISEASE_CATALOG.forEach(p => {
      const overlap = p.symptoms.filter(sym => selectedSymptoms.includes(sym)).length;
      
      // Let's also check crop filter factor
      let matchesCrop = true;
      if (selectedCropId !== 'all' && !p.targetCrops.includes(selectedCropId)) {
        matchesCrop = false;
      }

      const score = overlap + (matchesCrop ? 1.5 : 0);
      if (score > highestOverlap) {
        highestOverlap = score;
        topMatch = p;
      }
    });

    setDiagnosisResult(topMatch);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedSymptoms([]);
    setDiagnosisResult(null);
    setScanProgress(0);
  };

  const isUS = isUSPostcode(postcode);

  return (
    <div className="bg-white rounded-3xl border border-earth-200 shadow-sm overflow-hidden flex flex-col" id="diagnostics-module-card">
      
      {/* Header Banner */}
      <div className="bg-earth-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-earth-300 animate-pulse" />
          <div>
            <h3 className="font-serif font-black text-sm tracking-tight text-white leading-none">
              Earthbox Diagnostic Clinic
            </h3>
            <span className="text-[9px] font-mono text-earth-200 uppercase tracking-widest mt-1 block">
              Soil & Plague Bio-Sensor v1.2
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9.5px] font-mono font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20">
            {isUS ? "Fahrenheit System (US)" : "Centigrade System (UK)"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-earth-200/50 bg-earth-50/50 text-[11px] font-display font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('scan')}
          className={`flex-1 py-3 text-center transition-colors cursor-pointer border-r border-earth-200/30 ${
            activeTab === 'scan' ? 'bg-white text-earth-800 font-extrabold border-b-2 border-earth-600' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          🔍 Phytosanitary Scanner
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
            activeTab === 'library' ? 'bg-white text-earth-800 font-extrabold border-b-2 border-earth-600' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          📖 Pest & Pathogen Encyclopedia ({EXHAUSTIVE_PEST_DISEASE_CATALOG.length})
        </button>
      </div>

      {activeTab === 'scan' ? (
        <div className="p-4 flex flex-col gap-4">
          
          {/* crop filter selector */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-500 block mb-1">
              Select Affected Plant Category
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => {
                setSelectedCropId(e.target.value);
                setDiagnosisResult(null); // Clear to re-evaluate
              }}
              className="w-full px-3 py-2 bg-earth-50/50 border border-earth-200 rounded-xl text-xs font-sans text-earth-800 focus:outline-none focus:border-earth-500 cursor-pointer"
            >
              <option value="all">All Earthbox Garden Crops</option>
              {EXHAUSTIVE_PLANT_CATALOG.map(p => (
                <option key={p.id} value={p.id}>
                  {getLocalPlantName(p.id, postcode, p.name)} ({p.scientificName})
                </option>
              ))}
            </select>
          </div>

          {/* Interactive symptom check tags checklist selector */}
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-500 block mb-1.5 flex justify-between">
              <span>Select Observed Symptoms ({selectedSymptoms.length})</span>
              {selectedSymptoms.length > 0 && (
                <button 
                  onClick={() => setSelectedSymptoms([])}
                  className="text-[9px] text-[#88AB8E] hover:underline font-bold font-sans cursor-pointer focus:outline-none"
                >
                  Clear Selection
                </button>
              )}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto p-1 bg-earth-50/40 rounded-xl border border-earth-200/50">
              {allSymptoms.map((symptom, i) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={`sym-${i}`}
                    type="button"
                    onClick={() => handleToggleSymptom(symptom)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-sans font-medium transition-all text-left flex items-center gap-1.5 border cursor-pointer ${
                      isSelected 
                      ? 'bg-earth-600 text-white border-earth-500 shadow-xs' 
                      : 'bg-white border-earth-200 text-zinc-600 hover:bg-earth-100/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-earth-405 bg-emerald-300'}`} />
                    <span>{localizeMessage(symptom, postcode)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Picture Upload Stage / Simulator */}
          <div className="p-3.5 bg-earth-50 rounded-2xl border border-earth-200/80 flex flex-col gap-3">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-earth-500 block">
              Phytosanitary Image Scan Ingestion
            </span>

            {/* Hidden native input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Main file drop button */}
              <div 
                onClick={triggerFileSelection}
                className="border-2 border-dashed border-earth-200 h-32 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer bg-white transition hover:border-[#88AB8E]"
              >
                {uploadedImage ? (
                  <div className="relative w-full h-full p-1.5 flex items-center justify-center">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded pathogen preview" 
                      className="max-h-full max-w-full rounded-lg object-contain border border-earth-100" 
                    />
                    <div className="absolute inset-0 bg-black/10 rounded-lg hover:bg-black/35 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-[10px] font-bold bg-earth-600 px-2 py-1 rounded-md flex items-center gap-1">
                        <UploadCloud className="w-3.5 h-3.5" />
                        Replace File
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-4">
                    <UploadCloud className="w-7 h-7 text-earth-500 mb-1 animate-bounce" />
                    <span className="text-xs font-bold text-earth-800">Choose leaf photograph</span>
                    <span className="text-[9px] text-zinc-400 mt-1">Upload actual or click tester shortcuts below</span>
                  </div>
                )}
              </div>

              {/* Sample Quick Scanners shortcuts */}
              <div className="flex flex-col gap-1.5 justify-center">
                <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                  Simulate Leaf Scans (Ready-To-Test)
                </span>
                <button
                  type="button"
                  onClick={() => runSimulatedScan('ber', 'tomato_ber_mock')}
                  className="px-2.5 py-1.5 bg-white border border-earth-200 hover:bg-earth-50 rounded-lg text-[10px] font-display text-earth-800 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1">🍅 Tomato Bottom Blackening</span>
                  <span className="text-[9px] font-mono font-extrabold text-amber-600 bg-amber-50 px-1 rounded border border-amber-200">Environmental</span>
                </button>
                <button
                  type="button"
                  onClick={() => runSimulatedScan('mildew', 'cucumber_mildew_mock')}
                  className="px-2.5 py-1.5 bg-white border border-earth-200 hover:bg-earth-50 rounded-lg text-[10px] font-display text-earth-800 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1">🥒 Cucumber White Powder spots</span>
                  <span className="text-[9px] font-mono font-extrabold text-teal-600 bg-teal-50 px-1 rounded border border-teal-200">Disease</span>
                </button>
                <button
                  type="button"
                  onClick={() => runSimulatedScan('flea', 'egg_flea_mock')}
                  className="px-2.5 py-1.5 bg-white border border-earth-200 hover:bg-earth-50 rounded-lg text-[10px] font-display text-earth-800 flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1">🍆 Lacy holes on Aubergines</span>
                  <span className="text-[9px] font-mono font-extrabold text-red-600 bg-rose-50 px-1 rounded border border-rose-200">Insect Pest</span>
                </button>
              </div>
            </div>

            {/* Run Analysis Trigger bar */}
            <div className="flex gap-2.5 mt-1 border-t border-earth-200/30 pt-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={!uploadedImage && selectedSymptoms.length === 0}
                className="px-3 bg-earth-100 hover:bg-earth-200 disabled:opacity-40 text-earth-800 py-2 rounded-xl text-xs font-display font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => triggerScan()}
                disabled={isScanning || (!uploadedImage && selectedSymptoms.length === 0)}
                className="flex-1 bg-earth-600 hover:bg-earth-700 disabled:opacity-50 text-white py-2 rounded-xl text-xs font-display font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Bio-Hologram scanning ({scanProgress}%)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Phytosanitary Analysis Matrix</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Diagnostic Result Screen */}
          <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-earth-50 rounded-2xl border-2 border-[#88AB8E] p-5 flex flex-col items-center justify-center text-center py-8"
              >
                <Loader2 className="w-10 h-10 text-earth-600 animate-spin mb-3" />
                <h4 className="font-serif font-bold text-sm text-earth-800">Analyzing leaf bio-molecules...</h4>
                <p className="text-[10px] text-zinc-500 max-w-[280px] mt-1">
                  Comparing checking pixel arrays and symptom matrix with standard sub-irrigation pathology databases.
                </p>
                <div className="w-full max-w-[200px] h-2.5 bg-earth-200 rounded-full overflow-hidden mt-3.5 border border-earth-200/50">
                  <div className="h-full bg-earth-600 transition-all duration-150" style={{ width: `${scanProgress}%` }} />
                </div>
              </motion.div>
            )}

            {!isScanning && diagnosisResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-earth-50 rounded-3xl border border-[#88AB8E]/60 p-4.5 shadow-md"
              >
                <div className="flex justify-between items-start mb-3.5 border-b border-earth-200/50 pb-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-red-100 text-red-805 text-red-800 px-2.5 py-0.5 rounded-full font-extrabold border border-red-200 tracking-wider">
                      ★ Diagnosis: {diagnosisResult.category.toUpperCase()}
                    </span>
                    <h4 className="font-serif font-black text-slate-800 text-lg mt-1.5 leading-tight">
                      {localizeMessage(diagnosisResult.name, postcode)}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono font-bold block text-zinc-400">SEVERITY LEVEL</span>
                    <span className={`text-xs font-display font-black uppercase inline-block mt-0.5 px-2.5 py-0.5 rounded-lg border ${
                      diagnosisResult.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-300' :
                      diagnosisResult.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-300' :
                      diagnosisResult.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                      'bg-emerald-50 text-emerald-850 border-emerald-300'
                    }`}>
                      {diagnosisResult.severity}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-650 leading-relaxed italic mb-4 bg-white p-3 rounded-2xl border border-earth-250 border-earth-200">
                  "{localizeMessage(diagnosisResult.description, postcode)}"
                </p>

                {/* Slices of Organic prescription */}
                <div className="flex flex-col gap-4">
                  {/* Left col: Treatment */}
                  <div className="p-3 bg-white rounded-2xl border border-earth-150 flex flex-col gap-2">
                    <h5 className="font-serif font-bold text-xs text-earth-800 flex items-center gap-1.5 border-b border-earth-100 pb-1">
                      <HeartPulse className="w-4 h-4 text-earth-600" />
                      Recommended Organic Treatment Strategy (Earthbox-Safe)
                    </h5>
                    <ul className="list-none text-xs text-zinc-650 flex flex-col gap-2 pl-0.5">
                      {diagnosisResult.organicTreatment.map((step, index) => (
                        <li key={`treat-${index}`} className="flex items-start gap-2.5 leading-normal">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#88AB8E]/10 text-earth-700 text-[10px] font-mono font-black flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{localizeMessage(step, postcode)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right col: Prevention */}
                  <div className="p-3 bg-[#5A6C57] text-white rounded-2xl flex flex-col gap-2 border border-earth-700 shadow-inner">
                    <h5 className="font-serif font-bold text-xs text-[#A9D39E] flex items-center gap-1.5 border-b border-earth-500/50 pb-1">
                      <Check className="w-4 h-4" />
                      Continuous Sub-Irrigation Prevention Specs
                    </h5>
                    <ul className="list-none text-xs text-earth-100 flex flex-col gap-2 pl-0.5">
                      {diagnosisResult.prevention.map((step, index) => (
                        <li key={`prev-${index}`} className="flex items-start gap-2.5 leading-normal">
                          <CheckCircle2 className="w-4 h-4 text-[#A9D39E] flex-shrink-0 mt-0.5" />
                          <span>{localizeMessage(step, postcode)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Associated targets list tag indicator */}
                <div className="mt-4 pt-3 border-t border-earth-200/50 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono font-black tracking-wide text-earth-500 mr-1.5 uppercase">Highly Vuln. Crops:</span>
                  {diagnosisResult.targetCrops.map(cropId => {
                    const originalPlantObj = EXHAUSTIVE_PLANT_CATALOG.find(p => p.id === cropId);
                    return (
                      <span key={cropId} className="px-2.5 py-0.5 bg-earth-100 text-earth-800 text-[9.5px] font-sans font-bold rounded-lg border border-earth-200">
                        {getLocalPlantName(cropId, postcode, originalPlantObj?.name)}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      ) : (
        <div className="p-4 flex flex-col gap-4">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Browse the complete phytosanitary index of symptoms, diagnostics, biological pests, and pathogen remediation treatments custom tailored for 2.0 cu. ft sub-irrigated soil reserves.
          </p>

          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
            {EXHAUSTIVE_PEST_DISEASE_CATALOG.map((item) => (
              <div key={item.id} className="p-3 bg-earth-50/50 hover:bg-earth-50 rounded-2xl border border-earth-200 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-serif font-extrabold text-xs text-earth-800">
                      {localizeMessage(item.name, postcode)}
                    </h4>
                    <span className={`text-[8px] font-mono font-bold uppercase inline-block px-1.5 py-0.5 rounded mt-1 border ${
                      item.category === 'pest' ? 'bg-red-50 text-red-700 border-red-200' :
                      item.category === 'disease' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.category.toUpperCase()} • {item.severity}
                    </span>
                  </div>
                  
                  <span className="text-[8.5px] font-mono bg-white text-zinc-400 border border-zinc-200 rounded px-1.5 py-0.5">
                    {item.id.toUpperCase()}
                  </span>
                </div>

                <p className="text-[10.5px] text-zinc-600 leading-normal leading-relaxed mb-3">
                  {localizeMessage(item.description, postcode)}
                </p>

                {/* mini bullet points expander */}
                <div className="grid grid-cols-1 gap-2.5 text-[10px] bg-white p-2.5 rounded-xl border border-earth-150">
                  <div>
                    <span className="font-mono font-black text-earth-600 uppercase tracking-wide block mb-1">Common symptoms:</span>
                    <ul className="list-disc pl-3.5 text-zinc-500 flex flex-col gap-1">
                      {item.symptoms.map((s, idx) => (
                        <li key={idx}>{localizeMessage(s, postcode)}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono font-black text-[#88AB8E] uppercase tracking-wide block mb-1">Organic treatment:</span>
                    <p className="text-zinc-650 leading-relaxed italic pl-1 border-l-2 border-[#88AB8E]">
                      {localizeMessage(item.organicTreatment[0], postcode)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer warning bar */}
      <div className="px-4 py-2.5 bg-earth-50 border-t border-earth-250/60 border-earth-200 text-[9px] text-zinc-400 font-mono flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-earth-450" />
        <span>Use of non-organic treatments in sub-irrigated bins risks persistent chemical locking in water wells.</span>
      </div>

    </div>
  );
}
