import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Coffee, BookOpen, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PomodoroTimerProps {
  onSessionComplete?: (sessionsCompleted: number) => void;
  compact?: boolean;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  onSessionComplete,
  compact = false
}) => {
  const [mode, setMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const getDuration = (m: 'study' | 'shortBreak' | 'longBreak') => {
    switch (m) {
      case 'study': return 25 * 60;
      case 'shortBreak': return 5 * 60;
      case 'longBreak': return 15 * 60;
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Completed interval!
      playNotificationSound();
      if (mode === 'study') {
        const nextSessions = sessionsCompleted + 1;
        setSessionsCompleted(nextSessions);
        onSessionComplete?.(nextSessions);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
        // After 4 study sessions, take long break
        if (nextSessions % 4 === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        switchMode('study');
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, sessionsCompleted]);

  const switchMode = (newMode: 'study' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
    setIsRunning(false);
  };

  const playNotificationSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio context might be restricted
    }
  };

  const togglePlay = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const totalDuration = getDuration(mode);
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  if (compact) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#E6F7F7] flex items-center justify-center text-[#168C8C]">
            {mode === 'study' ? <BookOpen className="w-5 h-5" /> : <Coffee className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-[#142D4E] font-mono tracking-wider">{formattedTime}</span>
              <span className="text-[11px] font-semibold text-[#168C8C] uppercase tracking-wider">
                {mode === 'study' ? 'Focus Session' : 'Break'}
              </span>
            </div>
            <p className="text-xs text-[#718096]">{sessionsCompleted} sessions completed today</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-lg bg-[#168C8C] hover:bg-[#127272] text-white flex items-center justify-center shadow-sm"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={resetTimer}
            className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm relative overflow-hidden">
      {/* Header & Modes */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => switchMode('study')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'study'
                ? 'bg-white text-[#142D4E] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Study (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'shortBreak'
                ? 'bg-white text-[#168C8C] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mode === 'longBreak'
                ? 'bg-white text-[#168C8C] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Timer Display with Circular Progress Meter */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* SVG Circular Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="76"
              className="text-slate-100"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="88"
              cy="88"
              r="76"
              className="text-[#168C8C] transition-all duration-500 ease-linear"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 76}
              strokeDashoffset={2 * Math.PI * 76 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-extrabold text-[#142D4E] font-mono tracking-wider">
              {formattedTime}
            </span>
            <span className="text-xs font-semibold text-[#168C8C] mt-1 flex items-center space-x-1">
              {mode === 'study' ? (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Deep Focus</span>
                </>
              ) : (
                <>
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Rest & Hydrate</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4 mt-6">
          <button
            onClick={resetTimer}
            className="p-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#168C8C] hover:bg-[#127272] text-white flex items-center justify-center shadow-md shadow-[#168C8C]/30 transition-transform active:scale-95"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          <button
            onClick={() => switchMode(mode === 'study' ? 'shortBreak' : 'study')}
            className="p-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            title="Skip to next"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Sessions Counter */}
        <div className="mt-6 flex items-center space-x-2 text-xs text-[#718096]">
          <span>Today's Sessions:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`w-2.5 h-2.5 rounded-full ${
                  sessionsCompleted >= dot ? 'bg-[#168C8C]' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-[#142D4E]">({sessionsCompleted}/4 focus blocks)</span>
        </div>
      </div>
    </div>
  );
};
