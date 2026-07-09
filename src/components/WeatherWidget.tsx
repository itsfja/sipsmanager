import React, { useState, useEffect } from 'react';
import { WeatherData, GeocodeResult } from '../types';
import { geocodePostcode, fetchLocalWeather, estimateLastFrostDate, calculateLocalWaterMultiplier } from '../utils/weather';
import { getDisplayTemp, localizeMessage } from '../utils/localization';
import { CloudRain, Sun, Cloud, Snowflake, Wind, AlertTriangle, RefreshCw, MapPin, Gauge } from 'lucide-react';
import { motion } from 'motion/react';

interface WeatherWidgetProps {
  postcode: string;
  onWeatherDataLoaded: (weather: WeatherData, geocode: GeocodeResult) => void;
  onTriggerSevereSim: (type: 'freeze' | 'wind' | 'heat' | 'reset') => void;
}

export default function WeatherWidget({ postcode, onWeatherDataLoaded, onTriggerSevereSim }: WeatherWidgetProps) {
  const [geo, setGeo] = useState<GeocodeResult | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [simMode, setSimMode] = useState<'normal' | 'freeze' | 'wind' | 'heat'>('normal');

  const loadMeteorology = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // 1. Geocode the user's postal code
      const geoResult = await geocodePostcode(postcode);
      setGeo(geoResult);

      // 2. Load open-meteo real weather
      const weatherResult = await fetchLocalWeather(geoResult.latitude, geoResult.longitude);
      setWeather(weatherResult);

      // 3. Callback to core state
      onWeatherDataLoaded(weatherResult, geoResult);
    } catch (e) {
      setErrorMsg('Meteorological synchronization failed. Using fallback climate zones.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeteorology();
  }, [postcode]);

  const handleSimToggle = (mode: 'freeze' | 'wind' | 'heat' | 'reset') => {
    if (!weather || !geo) return;
    
    if (mode === 'reset') {
      setSimMode('normal');
      loadMeteorology();
      onTriggerSevereSim('reset');
      return;
    }

    setSimMode(mode);
    onTriggerSevereSim(mode);

    // Patch local weather display to match simulation
    if (mode === 'freeze') {
      setWeather({
        ...weather,
        temp: 29,
        state: 'Freezing',
        alerts: [
          {
            id: 'sim-freeze',
            type: 'freeze',
            title: 'Critical Freeze Warning',
            message: 'A sub-freezing arctic front has arrived. Core air temperature is 29°F. Move Earthboxes inside or install protective fabric hoods immediately.',
            timestamp: Date.now(),
            read: false
          }
        ]
      });
    } else if (mode === 'wind') {
      setWeather({
        ...weather,
        temp: 61,
        state: 'Windy',
        windSpeed: 45,
        alerts: [
          {
            id: 'sim-wind',
            type: 'storm',
            title: 'Severe Gale Warning (Simulated)',
            message: 'High wind advisory: gusts up to 45 mph. Fasten tomato frames and anchor cucumber vines to avoid breakage.',
            timestamp: Date.now(),
            read: false
          }
        ]
      });
    } else if (mode === 'heat') {
      setWeather({
        ...weather,
        temp: 96,
        state: 'Sunny',
        alerts: [
          {
            id: 'sim-heat',
            type: 'heat',
            title: 'Extreme Heat & Drought Warning',
            message: 'Record temperature of 96°F detected. Evapotranspiration peak in effect. Reservoir deplete speed increased by 140%. Tap water replenish requested.',
            timestamp: Date.now(),
            read: false
          }
        ]
      });
    }
  };

  // Weather icon picker
  const renderWeatherIcon = (state: string) => {
    const cls = "w-10 h-10 transition-transform hover:scale-110 duration-300";
    switch (state) {
      case 'Sunny': return <Sun className={`${cls} text-amber-500`} />;
      case 'Rainy': return <CloudRain className={`${cls} text-cyan-500`} />;
      case 'Freezing': return <Snowflake className={`${cls} text-blue-400`} />;
      case 'Windy': return <Wind className={`${cls} text-zinc-400`} />;
      case 'Stormy': return <AlertTriangle className={`${cls} text-rose-500`} />;
      default: return <Cloud className={`${cls} text-slate-400`} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-3xl border border-zinc-100 flex flex-col items-center justify-center py-10" id="weather-loading-ui">
        <RefreshCw className="w-6 h-6 text-earth-600 animate-spin" />
        <span className="text-[11px] font-mono text-zinc-500 mt-2">Connecting to Meteorological Satellites...</span>
      </div>
    );
  }

  const frostInfo = geo ? estimateLastFrostDate(geo.latitude) : 'Calculating...';
  const localMultiplier = (geo && weather) ? calculateLocalWaterMultiplier(geo.latitude, weather.temp) : 1.0;

  return (
    <div className="bg-white p-4 rounded-3xl border border-earth-200 shadow-sm" id="weather-hub-element">
      {/* Geocode & Network source status */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-earth-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-earth-400" />
          {geo ? `${geo.name || 'Postal Area'}, ${geo.admin1 || ''}` : 'Locating Grid'} ({postcode})
        </span>
        <span className="text-[9.5px] bg-earth-100 text-earth-700 font-mono font-bold uppercase rounded-full px-2.5 py-0.5 border border-earth-200">
          ● Synced LIVE
        </span>
      </div>

      {weather && (
        <div className="flex flex-col gap-3">
          {/* Main Hero stats layout */}
          <div className="flex justify-between items-center bg-earth-50/80 p-3.5 rounded-2xl border border-earth-100">
            <div className="flex items-center gap-3">
              {renderWeatherIcon(weather.state)}
              <div>
                <span className="text-2xl font-display font-black text-earth-800 pb-0.5 block">{getDisplayTemp(weather.temp, postcode).formatted}</span>
                <span className="text-[11px] font-sans font-semibold text-zinc-500 block leading-none">{weather.state} conditions</span>
              </div>
            </div>
            
            <div className="text-right border-l border-earth-200 pl-4">
              <span className="text-[9px] font-mono font-bold tracking-wider text-earth-600 uppercase block">Weekly Water Coeff.</span>
              <span className="text-md font-display font-bold text-earth-800 flex items-center gap-1 justify-end mt-0.5">
                <Gauge className="w-3.5 h-3.5 text-earth-450" />
                x{localMultiplier}
              </span>
              <span className="text-[9.5px] text-zinc-400 block leading-none mt-0.5">Based on local heat index</span>
            </div>
          </div>

          {/* Last frost date prediction panel */}
          <div className="p-4 bg-earth-600 text-white rounded-2xl flex flex-col gap-1.5 border border-earth-700 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-extrabold tracking-widest text-earth-300">
                {frostInfo === "Last frost risk passed" ? "FROST RISK ASSESSMENT" : "PREDICTED SPRING LAST FROST DATE"}
              </span>
              <span className="text-[8.5px] bg-white/15 px-2 py-0.5 text-earth-100 font-mono uppercase rounded border border-white/10">Zone Grid</span>
            </div>
            <p className="text-lg font-serif font-black italic text-white">{frostInfo}</p>
            {frostInfo !== "Last frost risk passed" && (
              <p className="text-[10px] text-earth-100 leading-normal leading-relaxed">
                {localizeMessage("Soil sub-surface models verify that seedlings shouldn't be planted out of cold frames until soil matches 60°F consistently.", postcode)}
              </p>
            )}
          </div>

          {/* 4 Day Forecast List */}
          <div className="grid grid-cols-4 gap-2 border-t border-b border-earth-200/60 py-3 my-1">
            {weather.forecast.map((day, idx) => (
              <div key={`fc-${idx}`} className="flex flex-col items-center bg-earth-50 p-2 rounded-xl border border-earth-100 text-center">
                <span className="text-[10px] font-mono text-earth-400 font-bold uppercase">{day.day}</span>
                <span className="my-1.5">{renderWeatherIcon(day.state)}</span>
                <span className="text-xs font-display font-bold text-earth-800">{getDisplayTemp(day.temp, postcode).formatted}</span>
              </div>
            ))}
          </div>

          {/* Live Severe Weather Scenario Push alert injector trigger panel */}
          <div className="mt-1">
            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">Simulate Severe Android Push Alert Triggers</span>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => handleSimToggle('freeze')}
                className={`py-2 text-[10px] font-display font-bold rounded-xl transition-all cursor-pointer ${
                  simMode === 'freeze' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                ❄️ Arctic Frost
              </button>
              <button
                onClick={() => handleSimToggle('wind')}
                className={`py-2 text-[10px] font-display font-bold rounded-xl transition-all cursor-pointer ${
                  simMode === 'wind' ? 'bg-zinc-600 text-white' : 'bg-zinc-100 text-zinc-700 border border-zinc-200 hover:bg-zinc-200'
                }`}
              >
                💨 Heavy Gale
              </button>
              <button
                onClick={() => handleSimToggle('heat')}
                className={`py-2 text-[10px] font-display font-bold rounded-xl transition-all cursor-pointer ${
                  simMode === 'heat' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                🔥 Severe Heat
              </button>
              <button
                onClick={() => handleSimToggle('reset')}
                className="py-2 text-[10px] font-display font-bold rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer transition-all"
              >
                🔄 Standard Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
