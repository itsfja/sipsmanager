import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, User, MapPin, Eye, EyeOff, Lock, Landmark, Trees, Fingerprint } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthScreenProps {
  onLoginSuccess: (profile: UserProfile) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [postcode, setPostcode] = useState('33101'); // Default Miami Zip
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [useBiometrics, setUseBiometrics] = useState(false);

  const getStoredUsers = () => {
    try {
      const u = localStorage.getItem('earthbox_users');
      return u ? JSON.parse(u) : {};
    } catch {
      return {};
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Please supply username and passcode.');
      return;
    }

    const users = getStoredUsers();

    if (isSignUp) {
      if (!postcode) {
        setErrorMsg('Please supply a valid postcode/ZIP to synchronize frost predictions.');
        return;
      }
      if (users[username.toLowerCase()]) {
        setErrorMsg('User ID already exists on this simulated device.');
        return;
      }

      // Create profile
      const newProfile: UserProfile = {
        username,
        postcode,
        hasBiometrics: useBiometrics,
        avatarSeed: Math.random().toString(36).substr(2, 5)
      };

      // Save credentials in db
      users[username.toLowerCase()] = {
        password,
        profile: newProfile
      };

      localStorage.setItem('earthbox_users', JSON.stringify(users));
      onLoginSuccess(newProfile);
    } else {
      const existing = users[username.toLowerCase()];
      if (!existing || existing.password !== password) {
        setErrorMsg('Invalid userid or password. Try registering below!');
        return;
      }
      onLoginSuccess(existing.profile);
    }
  };

  const handleMockBiometrics = () => {
    // Fill automatically
    setUsername('gardener');
    setPassword('secret12');
    setPostcode('80210'); // Denver Colorado (shows gorgeous frost analytics!)
    setUseBiometrics(true);
    
    const newProfile: UserProfile = {
      username: 'gardener',
      postcode: '80210',
      city: 'Denver',
      state: 'Colorado',
      hasBiometrics: true,
      avatarSeed: 'g123'
    };

    const users = getStoredUsers();
    users['gardener'] = {
      password: 'secret12',
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
        className="flex flex-col items-center mb-8 text-center"
      >
        <div className="w-16 h-16 rounded-3xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/10 mb-3 border border-emerald-500/20">
          <Trees className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h1 className="font-display font-black text-2xl tracking-normal text-zinc-900">
          Earthbox Planner
        </h1>
        <p className="text-zinc-500 text-xs mt-1 max-w-[280px]">
          Simulated Android Application For Sub-Irrigation Box Management
        </p>
      </motion.div>

      {/* Main security locked box card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm mat-card p-6 border-zinc-200/80 bg-white"
      >
        <div className="flex border-b border-zinc-100 mb-5">
          <button 
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(''); }}
            className={`flex-1 pb-3 text-sm font-display font-bold border-b-2 transition-colors ${
              !isSignUp ? 'border-emerald-600 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
            className={`flex-1 pb-3 text-sm font-display font-bold border-b-2 transition-colors ${
              isSignUp ? 'border-emerald-600 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            Register
          </button>
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
              User ID / Username
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. GardenerSteve"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-sans text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 block mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-sans text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Zipcode input for Spring weather and freeze analytics */}
          {isSignUp && (
            <div>
              <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 block mb-1">
                Postcode & Country (for global Frost calculations)
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
                  placeholder="e.g. '75001 France', 'SW1A UK', '10115 DE'"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-sans text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                />
              </div>
              <p className="text-[9.5px] text-zinc-400 leading-normal mt-1.5 px-0.5">
                We analyze your coordinates using the global Open-Meteo search engine. For high accuracy in the EU, UK, or globally, you can include your country name (e.g. "Paris, FR" or "75001 France").
              </p>
            </div>
          )}

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
            <ShieldCheck className="w-4 h-4" />
            <span>{isSignUp ? 'Generate Secure Account' : 'Authenticate User ID'}</span>
          </button>
        </form>

        {/* Biometrics Immediate Bypass button for rapid review */}
        <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-col gap-2">
          <div className="text-center">
            <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-wide">QUICK SIGN-IN COMPANION</span>
          </div>
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
      <div className="text-[10px] text-zinc-400 font-mono mt-6 text-center tracking-wide" id="auth-version-indicator">
        App Version: <span className="font-bold text-zinc-500">v2.5.0</span> (Capacitor Native Build)
      </div>
    </div>
  );
}
