import React, { useState, useEffect } from 'react';
import { UserProfile, PlanterBox, WeatherData, GeocodeResult, NotificationAlert, PlantType } from './types';
import { EXHAUSTIVE_PLANT_CATALOG } from './data/plants';
import AuthScreen from './components/AuthScreen';
import NotificationPanel from './components/NotificationPanel';
import WeatherWidget from './components/WeatherWidget';
import PlanterCard from './components/PlanterCard';
import AddPlanterModal from './components/AddPlanterModal';
import PestDiagnosticModule from './components/PestDiagnosticModule';
import { getLocalPlantName } from './utils/localization';
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Bell, 
  PlusCircle, 
  User, 
  Settings, 
  HelpCircle, 
  Activity, 
  Trees, 
  LogOut, 
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [planters, setPlanters] = useState<PlanterBox[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [geocode, setGeocode] = useState<GeocodeResult | null>(null);
  const [alerts, setAlerts] = useState<NotificationAlert[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isCapacitor, setIsCapacitor] = useState(false);

  // Detect physical app builds (Capacitor context), mobile user agents, or smaller responsive screens
  useEffect(() => {
    const checkEnvironment = () => {
      try {
        const isMobileScreen = window.innerWidth <= 991; // Handles mobile & table viewports smoothly
        const hasMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
        const isCap = !!(window as any).Capacitor || 
                      window.location.protocol === 'capacitor:' ||
                      window.location.protocol === 'file:' ||
                      navigator.userAgent.toLowerCase().includes('capacitor') ||
                      hasMobileUA ||
                      isMobileScreen;
        setIsCapacitor(isCap);
      } catch (e) {
        console.warn("Could not determine dynamic environment context.", e);
      }
    };

    checkEnvironment();
    window.addEventListener('resize', checkEnvironment);
    return () => window.removeEventListener('resize', checkEnvironment);
  }, []);

  // Load user profile & planter boxes from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('earthbox_active_profile');
      if (savedProfile) {
        setActiveUser(JSON.parse(savedProfile));
      }
    } catch (e) {
      console.warn("Could not retrieve active profile from storage.", e);
    }
  }, []);

  // Load and save planter datasets matching username
  useEffect(() => {
    if (!activeUser) return;
    try {
      const savedBoxes = localStorage.getItem(`earthbox_boxes_${activeUser.username.toLowerCase()}`);
      if (savedBoxes) {
        setPlanters(JSON.parse(savedBoxes));
      } else {
        // Pre-populate with beautiful, informative default planters
        const defaultPlanters: PlanterBox[] = [
          {
            id: 'demo-tomato',
            name: 'Paved Patio Tomatoes',
            createdAt: Date.now() - 35 * 24 * 60 * 60 * 1000,
            plantId: 'cherry_tomato',
            plantCount: 2,
            plantingDate: Date.now() - 35 * 24 * 60 * 60 * 1000, // 35 days ago (Flowering/Fruiting stage)
            waterReservoirLevel: 80,
            soilMoisture: 72,
            notes: [
              'Vines have scaled the trellis effectively. Strong trunk branches.',
              'Blossoms pollinated successfully. Tiny green tomato clusters starting to expand!',
              'Placed organic fertilizer strip down the side.'
            ]
          },
          {
            id: 'demo-basil',
            name: 'Kitchen Deck Basil Box',
            createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
            plantId: 'sweet_basil',
            plantCount: 6,
            plantingDate: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago (Early vegetating stage)
            waterReservoirLevel: 95,
            soilMoisture: 88,
            notes: [
              'Pinched main leader tips to encourage lateral branching bushy foliage.',
              'Commissioned planter with double-row seating configuration.'
            ]
          }
        ];
        setPlanters(defaultPlanters);
        localStorage.setItem(`earthbox_boxes_${activeUser.username.toLowerCase()}`, JSON.stringify(defaultPlanters));
      }

      // Restore active alert logs
      const savedAlerts = localStorage.getItem(`earthbox_alerts_${activeUser.username.toLowerCase()}`);
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      } else {
        // Starter Welcome push alert
        const welcomeAlert: NotificationAlert = {
          id: 'welcome-alert',
          type: 'sys',
          title: 'Android Push Server Synced',
          message: `Linked to satellite coordinates for localized last-frost zone analysis. Tap status bar to check settings.`,
          timestamp: Date.now(),
          read: false
        };
        setAlerts([welcomeAlert]);
      }
    } catch (e) {
      console.warn("Planter state restore failed", e);
    }
  }, [activeUser]);

  // Persist planters state changes
  const savePlanters = (updated: PlanterBox[]) => {
    setPlanters(updated);
    if (activeUser) {
      localStorage.setItem(`earthbox_boxes_${activeUser.username.toLowerCase()}`, JSON.stringify(updated));
    }
  };

  const handleLogin = (profile: UserProfile) => {
    setActiveUser(profile);
    localStorage.setItem('earthbox_active_profile', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setActiveUser(null);
    setPlanters([]);
    setAlerts([]);
    localStorage.removeItem('earthbox_active_profile');
  };

  const handleAddPlanter = (newBox: PlanterBox) => {
    const updated = [newBox, ...planters];
    savePlanters(updated);
    setShowAddModal(false);

    // Push alert acknowledging creation
    const crop = EXHAUSTIVE_PLANT_CATALOG.find(p => p.id === newBox.plantId);
    injectAlert({
      id: `add-box-${newBox.id}`,
      type: 'sys',
      title: 'Planter Synchronized',
      message: `Created '${newBox.name}' for managing ${newBox.plantCount} ${crop?.name}s. Root moisture calculations online.`,
      timestamp: Date.now(),
      read: false
    });
  };

  const handleUpdatePlanter = (updatedBox: PlanterBox) => {
    const updated = planters.map(p => p.id === updatedBox.id ? updatedBox : p);
    savePlanters(updated);
  };

  const handleDeletePlanter = (id: string) => {
    const updated = planters.filter(p => p.id !== id);
    savePlanters(updated);
  };

  const injectAlert = (alert: NotificationAlert) => {
    setAlerts((prev) => {
      // Avoid duplicate alert titles
      if (prev.some(a => a.id === alert.id)) return prev;
      const updated = [alert, ...prev];
      if (activeUser) {
        localStorage.setItem(`earthbox_alerts_${activeUser.username.toLowerCase()}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Severe weather push notifications injector
  const handleTriggerSevereSim = (type: 'freeze' | 'wind' | 'heat' | 'reset') => {
    if (type === 'reset') {
      setAlerts(alerts.filter(a => !['sim-val-freeze', 'sim-val-wind', 'sim-val-heat'].includes(a.id)));
      return;
    }

    const stamp = Date.now();
    let newAlert: NotificationAlert;

    if (type === 'freeze') {
      newAlert = {
        id: 'sim-val-freeze',
        type: 'freeze',
        title: '⚠️ CRITICAL FREEZE WARNING',
        message: `Frost alert: Air temperatures registered at 29°F inside ZIP ${activeUser?.postcode}. Relocate tender eggplants and peppers indoors now!`,
        timestamp: stamp,
        read: false
      };
    } else if (type === 'wind') {
      newAlert = {
        id: 'sim-val-wind',
        type: 'storm',
        title: '⚠️ STORM DAMAGE RISK: HIGH WIND',
        message: `High velocity meteorological watch: Local winds exceeding 42 mph. Tie vines secure or shield from direct aerodynamic stress.`,
        timestamp: stamp,
        read: false
      };
    } else {
      newAlert = {
        id: 'sim-val-heat',
        type: 'heat',
        title: '⚠️ PEAK TRANSPIRATION ALERT',
        message: `Solar index warning: Extreme 96°F heat indices will dry out cucumber and tomato reserve chambers within 12 hours. Top up water!`,
        timestamp: stamp,
        read: false
      };
    }

    injectAlert(newAlert);
  };

  const handleDismissAlert = (id: string) => {
    const updated = alerts.filter(a => a.id !== id);
    setAlerts(updated);
    if (activeUser) {
      localStorage.setItem(`earthbox_alerts_${activeUser.username.toLowerCase()}`, JSON.stringify(updated));
    }
  };

  const handleClearAllAlerts = () => {
    setAlerts([]);
    if (activeUser) {
      localStorage.setItem(`earthbox_alerts_${activeUser.username.toLowerCase()}`, JSON.stringify([]));
    }
  };

  // Sync geocoded meteorological telemetry with active weather states
  const handleWeatherDataLoaded = (weatherResult: WeatherData, geocodeResult: GeocodeResult) => {
    setWeather(weatherResult);
    setGeocode(geocodeResult);

    // Merge API-detected live alerts into our primary notification panel drawer
    weatherResult.alerts.forEach((alert) => {
      injectAlert(alert);
    });
  };

  // Render unified responsive layout (edge-to-edge on physical mobile/tablets, and centered inside an elegant desktop mock wrapper on large displays)
  return (
    <div className="w-full min-h-screen bg-earth-100 flex items-center justify-center font-sans" id="applet-container">
      {/* Dynamic responsive Mobile Viewport - full-bleed edge-to-edge on mobile screens and elegant app container on desktop widths */}
      <div className="w-full max-w-xl bg-earth-50 flex flex-col relative h-screen md:h-[880px] md:max-h-[94vh] md:rounded-[40px] md:shadow-2xl md:border-8 md:border-zinc-950 overflow-hidden" id="applet-inner-viewport">
        {activeUser ? (
          <div className="flex-1 flex flex-col bg-earth-50 overflow-hidden leading-normal">
            
            {/* 1. Personalized Smart Header */}
            <header className="bg-earth-600 text-white px-5 py-4 flex justify-between items-center border-b border-earth-700" id="applet-header">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-earth-400 rounded-lg flex items-center justify-center text-white font-display font-black shadow-sm border border-white/10 uppercase">
                  {activeUser.username.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h1 className="font-display font-black text-sm text-white tracking-tight flex items-center gap-0.5">
                    Hi, {activeUser.username}!
                  </h1>
                  <span className="text-[10.5px] font-mono text-earth-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-earth-300 flex-shrink-0" />
                    ZIP CODE: {activeUser.postcode}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Elegant inline Notifications Bell Popover */}
                <NotificationPanel 
                  alerts={alerts}
                  onDismiss={handleDismissAlert}
                  onClearAll={handleClearAllAlerts}
                  postcode={activeUser.postcode}
                />

                {/* Logout trigger */}
                <button
                  onClick={handleLogout}
                  title="Logout Profile"
                  className="p-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-white cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* 3. Global Dashboard Main Scroll Area */}
            <main className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto pb-24">
              
              {/* Dynamic Meteorological Forecasting Panel */}
              <section id="meteorological-grid">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-display font-extrabold text-xs uppercase tracking-widest text-[#88AB8E] flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-earth-500" />
                    Climate Status & Forecast
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-earth-400 tracking-wider">OPEN-METEO SYNCED</span>
                </div>
                
                <WeatherWidget 
                  postcode={activeUser.postcode}
                  onWeatherDataLoaded={handleWeatherDataLoaded}
                  onTriggerSevereSim={handleTriggerSevereSim}
                />
              </section>

              {/* Simulated Plant Growth Timelines Section */}
              <section id="planters-index">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-extrabold text-xs uppercase tracking-widest text-earth-400 flex items-center gap-1.5">
                    <Trees className="w-4 h-4 text-earth-500" />
                    Managed Earthboxes ({planters.length})
                  </h3>
                  
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1 bg-earth-600 hover:bg-earth-700 text-white font-display font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer border border-earth-500/20"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Deploy planter</span>
                  </button>
                </div>

                {/* Planter Boxes Cards list */}
                {planters.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 border border-earth-200 border-dashed text-center flex flex-col items-center">
                    <Sprout className="w-10 h-10 text-earth-400 mb-2 animate-bounce" />
                    <h4 className="font-display font-bold text-sm text-earth-800">No Active Soil Planter Boxes</h4>
                    <p className="text-xs text-zinc-500 mt-1 max-w-[240px]">
                      Create your first double or single row sub-irrigated planting scheme by clicking the button above!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {planters.map((box) => {
                      const crop = EXHAUSTIVE_PLANT_CATALOG.find(p => p.id === box.plantId) || EXHAUSTIVE_PLANT_CATALOG[0];
                      return (
                        <PlanterCard 
                          key={box.id}
                          planter={box}
                          plant={crop}
                          weather={weather}
                          geocode={geocode}
                          onUpdatePlanter={handleUpdatePlanter}
                          onDeletePlanter={handleDeletePlanter}
                          postcode={activeUser.postcode}
                        />
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Pest and Disease Diagnostic Clinic */}
              <PestDiagnosticModule postcode={activeUser.postcode} />

              {/* Crop Catalog Specs Drawer */}
              <section className="bg-white rounded-3xl border border-earth-200 p-4 shadow-sm">
                <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-[#88AB8E] flex items-center gap-1.5 mb-3.5">
                  <Sprout className="w-4 h-4 text-earth-500" />
                  Compatible Earthbox Crop Catalog
                </h4>
                <div className="flex flex-col gap-2.5">
                  {EXHAUSTIVE_PLANT_CATALOG.map((crop) => (
                    <div key={crop.id} className="p-3 bg-earth-50 rounded-2xl border border-earth-100 flex justify-between items-center hover:bg-earth-100/50 transition-colors">
                      <div>
                        <h5 className="font-serif font-bold text-xs text-earth-800">{getLocalPlantName(crop.id, activeUser.postcode, crop.name)}</h5>
                        <p className="font-mono text-[9px] text-[#88AB8E] italic mt-0.5">{crop.scientificName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[10px] bg-earth-100 text-earth-700 px-2 py-0.5 rounded font-semibold border border-earth-200/50">
                          {crop.earthboxLayout.totalPlants} per box
                        </span>
                        <span className="font-mono text-[9.5px] text-zinc-400">
                          {crop.daysToHarvest} days
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </main>

            {/* Safe Area spacing footer bottom margin spacer instead of simulated telemetry footer */}
            <div className="pb-safe" />

            {/* Plant Adding Dialogue Drawer */}
            <AnimatePresence>
              {showAddModal && (
                <AddPlanterModal 
                  onClose={() => setShowAddModal(false)}
                  onAddPlanter={handleAddPlanter}
                  postcode={activeUser.postcode}
                />
              )}
            </AnimatePresence>

          </div>
        ) : (
          <div className="flex-1 bg-earth-50 flex flex-col justify-center overflow-y-auto leading-normal">
            <AuthScreen onLoginSuccess={handleLogin} />
          </div>
        )}
      </div>
    </div>
  );
}
