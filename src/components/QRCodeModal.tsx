import React, { useState } from 'react';
import { TradeLicenseData } from '../types/tradeLicense';
import { QRCodeView } from './QRCodeView';
import { generateFullQrCodePayload, generateJsonQrCodePayload } from '../utils/defaultData';
import { X, Download, Copy, Check, QrCode, Smartphone, FileText, Globe } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TradeLicenseData;
  payloadMode: 'full' | 'url' | 'json';
  onPayloadModeChange: (mode: 'full' | 'url' | 'json') => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  data,
  payloadMode,
  onPayloadModeChange,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullPayload = generateFullQrCodePayload(data);
  const jsonPayload = generateJsonQrCodePayload(data);
  const urlPayload = `https://${data.website}/verify/trade_en/${data.certificateNo}/1916794/14`;

  const activePayload =
    payloadMode === 'full'
      ? fullPayload
      : payloadMode === 'url'
      ? urlPayload
      : jsonPayload;

  const handleCopy = () => {
    navigator.clipboard.writeText(activePayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(activePayload, {
        width: 1000,
        margin: 2,
        errorCorrectionLevel: 'H',
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Trade_License_QR_${data.certificateNo || 'verification'}.png`;
      a.click();
    } catch (err) {
      console.error('Download QR failed', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Trade License Digital QR Verification</h3>
              <p className="text-xs text-slate-300">
                Encodes complete license details for instant scanning with any phone camera
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payload Format Selector */}
        <div className="p-3 bg-slate-100 border-b border-gray-200 flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium mr-1">Payload Format:</span>
          <button
            onClick={() => onPayloadModeChange('full')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              payloadMode === 'full'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Complete Data (All Info)</span>
          </button>
          <button
            onClick={() => onPayloadModeChange('url')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              payloadMode === 'url'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Government Portal URL</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* High-res QR Display */}
            <div className="flex flex-col items-center justify-center p-5 bg-white border-2 border-dashed border-gray-300 rounded-xl">
              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <QRCodeView text={activePayload} size={210} errorCorrectionLevel="M" />
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Point any smartphone camera at this code to verify all trade license data.
              </p>
              <button
                onClick={handleDownloadQR}
                className="mt-3 px-3.5 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-black text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res QR (PNG)</span>
              </button>
            </div>

            {/* Mobile Scan Preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col h-full">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs pb-2 border-b border-slate-200">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Simulated Scanner Result</span>
              </div>
              <div className="mt-2.5 flex-1 overflow-y-auto max-h-56 bg-slate-900 text-emerald-400 font-mono text-[11px] p-3 rounded-lg leading-relaxed whitespace-pre-wrap select-all">
                {activePayload}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs pt-1">
                <span className="text-gray-500">Character count: {activePayload.length}</span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-medium flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Payload'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50/60 p-3 rounded-lg border border-blue-100 text-xs">
            <div>
              <div className="text-gray-500 text-[10px] uppercase font-semibold">Certificate No</div>
              <div className="font-mono font-bold text-gray-900 mt-0.5 truncate">{data.certificateNo}</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px] uppercase font-semibold">Business Name</div>
              <div className="font-semibold text-gray-900 mt-0.5 truncate">{data.businessName}</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px] uppercase font-semibold">Issue Date</div>
              <div className="font-semibold text-emerald-700 mt-0.5">{data.issueDate}</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px] uppercase font-semibold">Expire Date</div>
              <div className="font-semibold text-emerald-700 mt-0.5">{data.expireDate}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
