import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Compass,
  ArrowRight,
  KeyRound,
  ExternalLink,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { getMentorAnswer } from '../services/aiMentorKnowledge';
import confetti from 'canvas-confetti';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  isDemo?: boolean;
  model?: string;
}

export const AIMentor: React.FC = () => {
  const { profile } = useAuth();

  const suggestedQuestions = [
    "Explain Bubble Sort with Python code & complexity",
    "How does Virtual Memory & Paging work in OS?",
    "Difference between Process and Thread in OS?",
    "Explain Database Normalization: 1NF, 2NF, 3NF",
    "What are ACID properties in database transactions?",
    "Explain the 4 Pillars of OOP with code example",
    "Difference between TCP and UDP?",
    "How do I prepare for campus placements?",
    "How to answer 'Tell me about yourself' in HR interviews?",
    "Which projects should I build for Amazon SDE?",
    "How does Docker containerization work?"
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello ${profile.fullName}! I'm your **SkillPath AI Student Mentor**.\n\nI see you are in **Year ${profile.currentYear}** aiming for **${profile.careerInterest}** with skills in ${profile.currentSkills.slice(0, 3).join(', ')}.\n\nAsk me **ANY question**—from algorithm mechanics (Bubble Sort, Merge Sort, Dynamic Programming) to OS internals (Paging, Deadlocks), DBMS (Normalization, ACID), Networks, Web Development, or HR behavioral interview answers. How can I guide you today?`,
      time: 'Just now',
      isDemo: false
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Gemini API Key Modal State
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('skillpath_gemini_api_key') || '');
  const [savedKeyMessage, setSavedKeyMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      localStorage.setItem('skillpath_gemini_api_key', trimmed);
    } else {
      localStorage.removeItem('skillpath_gemini_api_key');
    }
    setSavedKeyMessage(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => {
      setSavedKeyMessage(false);
      setShowKeyModal(false);
    }, 1200);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ sender: m.sender, message: m.text }));
      const result = await api.sendMentorMessage(text, profile, history);

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemo: result.is_demo,
        model: result.model
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const fallbackAns = getMentorAnswer(text, profile);
      const fallbackMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallbackAns.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemo: false,
        model: fallbackAns.model
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'ai',
        text: `Chat cleared! Ask me any question on DSA, algorithms, core CS, web dev, or placement rounds.`,
        time: 'Just now'
      }
    ]);
  };

  // Render markdown with code block highlighting
  const renderFormattedText = (raw: string) => {
    const parts = raw.split(/(```[\s\S]*?```)/g);

    return parts.map((part, pIdx) => {
      // Code block
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].trim();
        const code = (lang === 'python' || lang === 'javascript' || lang === 'cpp' || lang === 'java' || lang === 'sql' || lang === 'dockerfile')
          ? lines.slice(1).join('\n')
          : lines.join('\n');

        return (
          <div key={pIdx} className="my-2.5 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-sm">
            {lang && (
              <div className="bg-slate-800/80 px-3 py-1 text-[10px] text-slate-400 font-mono flex items-center justify-between border-b border-slate-700">
                <span>{lang}</span>
                <span className="text-slate-400">code snippet</span>
              </div>
            )}
            <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Regular text block
      return (
        <div key={pIdx}>
          {part.split('\n').map((line, idx) => {
            if (line.startsWith('### ')) {
              return <h3 key={idx} className="text-sm sm:text-base font-bold text-[#142D4E] mt-3 mb-1.5">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('#### ')) {
              return <h4 key={idx} className="text-xs sm:text-sm font-bold text-[#168C8C] mt-2 mb-1">{line.replace('#### ', '')}</h4>;
            }
            if (line.startsWith('- ')) {
              return (
                <li key={idx} className="text-xs sm:text-sm text-[#202B38] ml-4 list-disc leading-relaxed my-0.5">
                  {formatBold(line.replace('- ', ''))}
                </li>
              );
            }
            if (/^\d+\.\s/.test(line)) {
              return (
                <p key={idx} className="text-xs sm:text-sm text-[#202B38] ml-2 leading-relaxed my-1 font-medium">
                  {formatBold(line)}
                </p>
              );
            }
            if (line.startsWith('|')) {
              return (
                <div key={idx} className="text-xs font-mono text-[#142D4E] py-0.5 overflow-x-auto">
                  {line}
                </div>
              );
            }
            if (!line.trim()) {
              return <div key={idx} className="h-1.5" />;
            }
            return (
              <p key={idx} className="text-xs sm:text-sm text-[#202B38] leading-relaxed my-1">
                {formatBold(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  const formatBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-[#142D4E]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-slate-100 text-[#168C8C] font-mono px-1 py-0.2 rounded text-[11px] font-semibold">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const hasCustomKey = Boolean(apiKeyInput && apiKeyInput.length > 10);

  return (
    <div className="h-[calc(100vh-135px)] flex flex-col bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      {/* Mentor Header Bar */}
      <div className="p-4 bg-gradient-to-r from-[#142D4E] to-[#1E3A5F] text-white flex items-center justify-between border-b border-[#334E68]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#168C8C] flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-sm sm:text-base">SkillPath AI Mentor</h2>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                hasCustomKey ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' : 'bg-[#168C8C]/30 text-[#2DD4BF] border-[#168C8C]/50'
              }`}>
                {hasCustomKey ? 'Live Gemini AI' : 'Deep Knowledge Engine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Personalized for: {profile.fullName} • Year {profile.currentYear} • {profile.careerInterest}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Configure Gemini API Key Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`p-2 rounded-lg text-xs flex items-center space-x-1.5 transition-colors border ${
              hasCustomKey
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/20'
            }`}
            title="Configure Google Gemini API Key"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{hasCustomKey ? 'Gemini Key Configured' : 'Connect Gemini Key'}</span>
          </button>

          <button
            onClick={clearChat}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg text-xs flex items-center space-x-1 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="bg-[#F7F9FC] border-b border-[#E2E8F0] px-4 py-2.5 overflow-x-auto flex space-x-2 scrollbar-none">
        <span className="text-[11px] font-bold text-[#718096] flex items-center flex-shrink-0">
          <Sparkles className="w-3 h-3 text-[#168C8C] mr-1" /> Try Asking:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-xs font-medium text-[#142D4E] bg-white border border-[#E2E8F0] hover:border-[#168C8C] hover:bg-[#E6F7F7] px-3 py-1 rounded-full whitespace-nowrap transition-colors shadow-2xs flex-shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
        {messages.map((m) => {
          const isAi = m.sender === 'ai';
          return (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-lg bg-[#142D4E] text-[#168C8C] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-sm relative group ${
                  isAi
                    ? 'bg-white border border-[#E2E8F0] text-[#202B38]'
                    : 'bg-[#168C8C] text-white'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between text-[10px] mb-1.5 opacity-80">
                  <span className="font-semibold">{isAi ? 'SkillPath Mentor' : 'You'}</span>
                  <div className="flex items-center space-x-2">
                    {m.model && (
                      <span className="text-[9px] text-[#168C8C] font-semibold bg-[#E6F7F7] px-1.5 py-0.2 rounded">
                        {m.model}
                      </span>
                    )}
                    <span>{m.time}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-1">
                  {isAi ? renderFormattedText(m.text) : <p className="text-xs sm:text-sm leading-relaxed">{m.text}</p>}
                </div>

                {/* Copy Button for AI responses */}
                {isAi && (
                  <button
                    onClick={() => handleCopyText(m.id, m.text)}
                    className="absolute bottom-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy response"
                  >
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-lg bg-[#168C8C] text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm font-bold text-xs">
                  {profile.fullName.charAt(0)}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#142D4E] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm text-xs text-[#718096] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#168C8C] animate-spin" />
              <span>SkillPath AI is formulating a comprehensive, step-by-step response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#E2E8F0]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask ANY question: algorithms (Bubble Sort, DP), OS (paging, deadlocks), DBMS, Web, interview answers..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 text-xs sm:text-sm border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:border-[#168C8C] focus:ring-1 focus:ring-[#168C8C]"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#168C8C] hover:bg-[#127272] disabled:opacity-50 text-white font-semibold px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shadow-sm transition-all flex-shrink-0"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
          <span>Answers any technical, CS fundamentals, code implementation, or placement interview question.</span>
          <button
            onClick={() => setShowKeyModal(true)}
            className="text-[#168C8C] hover:underline font-semibold"
          >
            {hasCustomKey ? '✓ Live Gemini AI Enabled' : '+ Connect Free Gemini API Key'}
          </button>
        </div>
      </div>

      {/* API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#142D4E]/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="bg-[#142D4E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-[#168C8C]" />
                <span className="font-bold text-sm">Configure Google Gemini API Key</span>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveApiKey} className="p-5 space-y-4 text-xs">
              {savedKeyMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>API Key saved! Live Gemini AI is now active for all questions.</span>
                </div>
              )}

              <p className="text-[#334E68] leading-relaxed">
                SkillPath AI uses <strong>Google Gemini 1.5 Flash</strong> to answer any open-ended student question. You can get a 100% free API key directly from Google AI Studio.
              </p>

              <div>
                <label className="block font-bold text-[#142D4E] mb-1">Your Gemini API Key</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#168C8C]"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px] text-[#718096]">
                <p className="font-semibold text-[#142D4E]">How to get a free API key in 30 seconds:</p>
                <ol className="list-decimal ml-4 space-y-0.5">
                  <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#168C8C] hover:underline font-bold inline-flex items-center">Google AI Studio <ExternalLink className="w-3 h-3 ml-0.5" /></a></li>
                  <li>Click <strong>"Create API Key"</strong></li>
                  <li>Paste it into the field above and click Save.</li>
                </ol>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setApiKeyInput('');
                    localStorage.removeItem('skillpath_gemini_api_key');
                    setShowKeyModal(false);
                  }}
                  className="text-slate-500 hover:text-rose-600 font-semibold"
                >
                  Clear Key (Use Dynamic Engine)
                </button>
                <button
                  type="submit"
                  className="bg-[#168C8C] hover:bg-[#127272] text-white font-semibold px-4 py-2 rounded-lg text-xs shadow"
                >
                  Save & Activate Live AI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
