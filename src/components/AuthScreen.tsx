import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, User, MapPin, Trees, Fingerprint, Users, ChevronRight, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthScreenProps {
  onLoginSuccess: (profile: UserProfile) => void;
  onShowCredits: () => void;
}

export default function AuthScreen({ onLoginSuccess, onShowCredits }: AuthScreenProps) {
  const [username, setUsername] = useState('');
  const [postcode, setPostcode] = useState('WA11 0SD'); // Default UK Postcode
  const [errorMsg, setErrorMsg] = useState('');
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [recentUsers, setRecentUsers] = useState<UserProfile[]>([]);

  const getStoredUsers = () => {
    try {
      const u = localStorage.getItem('earthbox_users');
      return u ? JSON.parse(u) : {};
    } catch {
      return {};
    }
  };

  useEffect(() => {
    const users = getStoredUsers();
    const profiles = Object.values(users).map((u: any) => u.profile) as UserProfile[];
    setRecentUsers(profiles);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Please supply a grower profile name.');
      return;
    }

    if (!postcode.trim()) {
      setErrorMsg('Please supply a valid postcode/ZIP to synchronize frost predictions.');
      return;
    }

    const users = getStoredUsers();
    const normalizedKey = username.trim().toLowerCase();

    let targetProfile: UserProfile;

    if (users[normalizedKey]) {
      // Select existing profile and update postcode/biometrics if changed
      targetProfile = {
        ...users[normalizedKey].profile,
        username: username.trim(),
        postcode: postcode.trim(),
        hasBiometrics: useBiometrics,
      };
    } else {
      // Create fresh new profile
      targetProfile = {
        username: username.trim(),
        postcode: postcode.trim(),
        hasBiometrics: useBiometrics,
        avatarSeed: Math.random().toString(36).substring(2, 7)
      };
    }

    users[normalizedKey] = {
      password: '', // Completely passwordless profile storage
      profile: targetProfile
    };

    localStorage.setItem('earthbox_users', JSON.stringify(users));
    onLoginSuccess(targetProfile);
  };

  const selectExistingProfile = (profile: UserProfile) => {
    setUsername(profile.username);
    setPostcode(profile.postcode);
    setUseBiometrics(profile.hasBiometrics || false);
    
    // Automatically login on selection for supreme instant access!
    onLoginSuccess(profile);
  };

  const handleMockBiometrics = () => {
    const newProfile: UserProfile = {
      username: 'gardener',
      postcode: 'WA11 0SD',
      city: 'Saint Helens',
      state: 'United Kingdom',
      hasBiometrics: true,
      avatarSeed: 'g123'
    };

    const users = getStoredUsers();
    users['gardener'] = {
      password: '',
      profile: newProfile
    };
    localStorage.setItem('earthbox_users', JSON.stringify(users));
    onLoginSuccess(newProfile);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full min-h-[500px] w-full" id="auth-panel-stage">
      
      {/* Decorative top app identity */}
      <motion.div 
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center mb-6 text-center"
      >
        <div className="w-16 h-16 rounded-3xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/10 mb-3 border border-emerald-500/20">
          <Trees className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h1 className="font-display font-black text-2xl tracking-normal text-zinc-900">
          SIPS Manager
        </h1>
        <p className="text-zinc-500 text-xs mt-1 max-w-[280px]">
          Sub-Irrigation Planter & Grow Bag Companion
        </p>
      </motion.div>

      {/* Main security locked box card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm mat-card p-6 border-zinc-200/80 bg-white"
      >
        <div className="mb-5 text-center">
          <h2 className="font-display font-bold text-sm text-zinc-800">
            Grower Profile Setup
          </h2>
          <p className="text-[10.5px] text-zinc-500 mt-1">
            No password required. Connect instantly via local-first secure profiles.
          </p>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium tracking-wide">
              {errorMsg}
            </div>
          )}

          {/* UserID Input */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 block mb-1">
              Grower Profile Name
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Francis Armstrong"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-sans text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Zipcode input for Spring weather and freeze analytics */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 block mb-1">
              Postcode & Country (for frost calculations)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400">
                <MapPin className="w-4 h-4" />
              </span>
              <input
                type="text"
                maxLength={30}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. 'SW1A UK', '33101 US', '75001 FR'"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-sans text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
              />
            </div>
            <p className="text-[9.5px] text-zinc-400 leading-normal mt-1.5 px-0.5">
              We locate your coordinates dynamically. Include the country (e.g., "Paris, FR" or "SW1A UK") for maximum meteorological accuracy.
            </p>
          </div>

          {/* Simulate Biometric Enable switch */}
          <div className="flex items-center justify-between mt-1 pt-1 border-t border-dashed border-zinc-100">
            <span className="text-[11px] text-zinc-500 flex items-center gap-1">
              <Fingerprint className="w-4 h-4 text-emerald-600" />
              Enable Android Biometric Auth
            </span>
            <input
              type="checkbox"
              checked={useBiometrics}
              onChange={() => setUseBiometrics(!useBiometrics)}
              className="accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Proceed Submit button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-display font-medium text-xs py-3 rounded-2xl shadow-md hover:bg-emerald-500 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Sprout className="w-4 h-4 text-emerald-200" />
            <span>Start Growing Now</span>
          </button>
        </form>

        {/* Existing/Recent Profiles list */}
        {recentUsers.length > 0 && (
          <div className="mt-5 pt-4 border-t border-zinc-100 space-y-2">
            <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono font-bold tracking-wide">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>RECENT GROWERS ON THIS DEVICE</span>
            </div>
            <div className="max-h-[110px] overflow-y-auto space-y-1.5 pr-1">
              {recentUsers.slice(0, 3).map((u) => (
                <button
                  key={`recent-${u.username}`}
                  onClick={() => selectExistingProfile(u)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-zinc-50 hover:bg-emerald-50/70 border border-zinc-200/50 hover:border-emerald-200 text-left transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold font-mono text-[10px]">
                      {u.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-800">{u.username}</p>
                      <p className="text-[9px] text-zinc-400">Loc: {u.postcode}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Biometrics Immediate Bypass button for rapid review */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-col gap-2">
          <button
            onClick={handleMockBiometrics}
            className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-2xl py-2.5 border border-zinc-200 font-display font-semibold text-[11px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Fingerprint className="w-4 h-4 text-emerald-600" />
            <span>Bypass Auth (Simulate Denver Postcode)</span>
          </button>
        </div>
      </motion.div>

      {/* App Version Indicator */}
      <div className="text-[10px] text-zinc-400 font-mono mt-6 text-center tracking-wide flex flex-col items-center gap-1.5" id="auth-version-indicator">
        <div>
          App Version: <span className="font-bold text-zinc-500">v2.6.0</span> (Capacitor Native Build)
        </div>
        <button
          type="button"
          onClick={onShowCredits}
          className="text-emerald-600 hover:text-emerald-700 font-sans font-semibold underline underline-offset-2 transition-colors cursor-pointer text-[10.5px]"
        >
          View Project Credits & Legal Trademarks
        </button>
      </div>
    </div>
  );
}
