import React, { useState, useEffect } from 'react';
import { TradeLicenseData } from './types/tradeLicense';
import { INITIAL_TRADE_LICENSE_DATA } from './utils/defaultData';
import { TradeLicenseCertificate } from './components/TradeLicenseCertificate';
import { Toolbar } from './components/Toolbar';
import { DynamicEditDrawer } from './components/DynamicEditDrawer';
import { QRCodeModal } from './components/QRCodeModal';
import { Edit3, QrCode, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'trade_license_verify_data_v1';

export default function App() {
  const [data, setData] = useState<TradeLicenseData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_TRADE_LICENSE_DATA;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrPayloadMode, setQrPayloadMode] = useState<'full' | 'url' | 'json'>('full');
  const [showBrowserBar, setShowBrowserBar] = useState(true);
  const [isAuthenticMode, setIsAuthenticMode] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const handleResetToRequested = () => {
    setData(INITIAL_TRADE_LICENSE_DATA);
  };

  const handleLoadScreenshotVersion = () => {
    setData({
      ...INITIAL_TRADE_LICENSE_DATA,
      issueDate: '02-07-2026',
      expireDate: '30-06-2027',
      financialYear: '2026-2027',
      validTillDate: '30-06-2027',
      customDisclaimerText:
        'You are permitted to continue your business for 2026-2027 after receiving the license fee on behalf of the mentioned company. This license will be valid till 30-06-2027 and will have to renew every year.',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Application Toolbar */}
      {!isAuthenticMode && (
        <Toolbar
          data={data}
          onOpenEditor={() => setIsEditorOpen(true)}
          onOpenQRModal={() => setIsQRModalOpen(true)}
          onReset={handleResetToRequested}
          showBrowserBar={showBrowserBar}
          setShowBrowserBar={setShowBrowserBar}
          isAuthenticMode={isAuthenticMode}
          setIsAuthenticMode={setIsAuthenticMode}
        />
      )}

      {/* Main Certificate Display Canvas */}
      <main className="flex-1 flex justify-center items-start p-0 md:p-6 lg:p-8">
        <div className="w-full max-w-[1100px] bg-white shadow-sm md:border md:border-gray-200">
          <TradeLicenseCertificate
            data={data}
            qrPayloadMode={qrPayloadMode}
          />
        </div>
      </main>

      {/* Floating Action Buttons for quick editing when scrolled or in authentic mode */}
      <div className="fixed bottom-5 right-5 print:hidden flex flex-col items-end gap-2.5 z-40">
        {isAuthenticMode && (
          <button
            onClick={() => setIsAuthenticMode(false)}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-medium shadow-lg backdrop-blur-xs flex items-center gap-1.5 transition-all"
          >
            Show Controls
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
            title="Scan & View Complete Data QR Code"
          >
            <QrCode className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsEditorOpen(true)}
            className="h-11 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs font-semibold"
            title="Open Dynamic Data Editor"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Data</span>
          </button>
        </div>
      </div>

      {/* Dynamic Data Editor Drawer */}
      <DynamicEditDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={data}
        onChange={setData}
        onReset={handleResetToRequested}
        onLoadOriginalScreenshot={handleLoadScreenshotVersion}
        qrPayloadMode={qrPayloadMode}
        setQrPayloadMode={setQrPayloadMode}
      />

      {/* QR Code Inspection & Verification Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        data={data}
        payloadMode={qrPayloadMode}
        onPayloadModeChange={setQrPayloadMode}
      />
    </div>
  );
}
