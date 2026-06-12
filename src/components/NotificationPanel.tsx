import React, { useState, useRef, useEffect } from 'react';
import { NotificationAlert } from '../types';
import { Bell, AlertTriangle, Droplet, Sun, CheckCircle, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { localizeMessage } from '../utils/localization';

interface NotificationPanelProps {
  alerts: NotificationAlert[];
  onDismiss: (id: string) => void;
  onClearAll: () => void;
  postcode: string;
}

export default function NotificationPanel({
  alerts,
  onDismiss,
  onClearAll,
  postcode
}: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadAlerts = alerts.filter(a => !a.read);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Elegantly designed Header Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/25 active:scale-95 transition-all text-white cursor-pointer"
        aria-label="Toggle notifications"
        id="notification-bell-btn"
      >
        <Bell className="w-4 h-4 ml-0.5" />
        {unreadAlerts.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[9px] font-display font-black w-5 h-5 rounded-full flex items-center justify-center border border-earth-600 animate-pulse shadow-sm">
            {unreadAlerts.length}
          </span>
        )}
      </button>

      {/* Floating Modern Notification Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-earth-200 shadow-xl z-50 overflow-hidden text-earth-800"
            id="notification-dropdown"
          >
            {/* Header section with clean non-hype styling */}
            <div className="p-4 bg-earth-50 border-b border-earth-100 flex justify-between items-center">
              <div>
                <h4 className="font-display font-bold text-xs text-earth-800 uppercase tracking-wider">Planter Bulletins</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">Alerts & Sync Logs</p>
              </div>
              {alerts.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-[10px] text-zinc-500 hover:text-earth-700 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear all
                </button>
              )}
            </div>

            {/* List of Notification Items */}
            <div className="max-h-[350px] overflow-y-auto p-3 flex flex-col gap-2">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs flex flex-col items-center gap-2">
                  <CheckCircle className="w-7 h-7 text-earth-400" />
                  <span className="font-medium text-earth-800">All systems stable!</span>
                  <span className="text-[10px] text-zinc-400">No active planter alerts.</span>
                </div>
              ) : (
                alerts.map((alert) => {
                  const isFreeze = alert.type === 'freeze';
                  const isWater = alert.type === 'water';
                  const isStorm = alert.type === 'storm';
                  const isHeat = alert.type === 'heat';

                  return (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-xl border flex gap-3 items-start relative transition-all ${
                        isFreeze ? 'bg-blue-50/70 border-blue-100 text-blue-900' :
                        isWater ? 'bg-cyan-50/70 border-cyan-100 text-cyan-900' :
                        isStorm ? 'bg-rose-50/70 border-rose-100 text-rose-900' :
                        isHeat ? 'bg-amber-50/70 border-amber-100 text-amber-900' :
                        'bg-zinc-50/60 border-zinc-100 text-zinc-800'
                      }`}
                    >
                      {/* Icon */}
                      <div className="mt-0.5 flex-shrink-0">
                        {isFreeze && <AlertTriangle className="w-4 h-4 text-blue-500" />}
                        {isStorm && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                        {isWater && <Droplet className="w-4 h-4 text-cyan-500" />}
                        {isHeat && <Sun className="w-4 h-4 text-amber-500" />}
                        {alert.type === 'sys' && <CheckCircle className="w-4 h-4 text-earth-500" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pr-4">
                        <div className="flex justify-between items-baseline">
                          <h5 className="text-[11px] font-bold font-display">{alert.title}</h5>
                        </div>
                        <p className="text-[10.5px] text-zinc-600 mt-1 leading-normal">
                          {localizeMessage(alert.message, postcode)}
                        </p>
                        <span className="text-[9px] font-mono text-zinc-400 block mt-1.5 font-medium">
                          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Dismiss Action */}
                      <button
                        onClick={() => onDismiss(alert.id)}
                        className="absolute top-2.5 right-2 px-1 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                        aria-label="Dismiss alert"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
