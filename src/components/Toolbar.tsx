import React from 'react';
import { Edit3, QrCode, Printer, RotateCcw, Lock, Globe, Eye, EyeOff } from 'lucide-react';
import { TradeLicenseData } from '../types/tradeLicense';

interface ToolbarProps {
  data: TradeLicenseData;
  onOpenEditor: () => void;
  onOpenQRModal: () => void;
  onReset: () => void;
  showBrowserBar: boolean;
  setShowBrowserBar: (show: boolean) => void;
  isAuthenticMode: boolean;
  setIsAuthenticMode: (mode: boolean) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  data,
  onOpenEditor,
  onOpenQRModal,
  onReset,
  showBrowserBar,
  setShowBrowserBar,
  isAuthenticMode,
  setIsAuthenticMode,
}) => {
  const portalUrl = `https://${data.website}/verify/trade_en/${data.certificateNo}/1916794/14`;

  return (
    <div className="print:hidden w-full bg-slate-900 text-white border-b border-slate-800 shadow-sm sticky top-0 z-40 select-none">
      {/* Top action strip */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-sm tracking-tight">
              Trade License Verification System
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-400 border-l border-slate-700 pl-3">
            Issue: <span className="text-slate-200 font-mono">{data.issueDate}</span> · Expire: <span className="text-slate-200 font-mono">{data.expireDate}</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Authentic View Mode Toggle */}
          <button
            onClick={() => setIsAuthenticMode(!isAuthenticMode)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isAuthenticMode
                ? 'bg-amber-500 hover:bg-amber-600 text-black'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title="Toggle authentic screenshot-only replica mode"
          >
            {isAuthenticMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isAuthenticMode ? 'Exit Authentic View' : 'Authentic Portal View'}</span>
          </button>

          {/* Dynamic Data Editor */}
          <button
            onClick={onOpenEditor}
            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Data</span>
          </button>

          {/* QR Code Suite */}
          <button
            onClick={onOpenQRModal}
            className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Code</span>
          </button>

          {/* Print Certificate */}
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Simulated Browser URL Bar (Toggleable or enabled by default to match screenshot URL) */}
      {showBrowserBar && (
        <div className="bg-slate-950 px-4 py-1.5 border-t border-slate-800/80 text-xs flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2 overflow-hidden flex-1 max-w-3xl bg-slate-900/90 px-3 py-1 rounded border border-slate-800">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-mono text-[11px] text-slate-200 truncate select-all">
              {portalUrl}
            </span>
          </div>

          <div className="flex items-center gap-3 pl-3 shrink-0">
            <span className="text-[11px] text-emerald-400 font-medium hidden sm:inline flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>SSL Verified</span>
            </span>
            <button
              onClick={() => setShowBrowserBar(false)}
              className="text-[11px] text-slate-500 hover:text-slate-300"
            >
              Hide URL Bar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
