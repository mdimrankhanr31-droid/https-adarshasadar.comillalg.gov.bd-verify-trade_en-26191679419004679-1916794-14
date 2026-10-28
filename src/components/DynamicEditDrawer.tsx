import React, { useState } from 'react';
import { TradeLicenseData } from '../types/tradeLicense';
import {
  X,
  RotateCcw,
  Sparkles,
  Building2,
  Calendar,
  Store,
  User,
  QrCode,
  Printer,
  Upload,
  Copy,
  Check
} from 'lucide-react';

interface DynamicEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: TradeLicenseData;
  onChange: (data: TradeLicenseData) => void;
  onReset: () => void;
  onLoadOriginalScreenshot: () => void;
  qrPayloadMode: 'full' | 'url' | 'json';
  setQrPayloadMode: (mode: 'full' | 'url' | 'json') => void;
}

export const DynamicEditDrawer: React.FC<DynamicEditDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onChange,
  onReset,
  onLoadOriginalScreenshot,
  qrPayloadMode,
  setQrPayloadMode,
}) => {
  const [activeTab, setActiveTab] = useState<'dates' | 'business' | 'proprietor' | 'authority' | 'qr'>('dates');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const updateField = <K extends keyof TradeLicenseData>(key: K, value: TradeLicenseData[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          ...data,
          photoType: 'photo',
          customPhotoUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col font-sans animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-base">Dynamic Data Editor</h3>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Update license details, dates, and QR code in real-time
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close Editor"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action Presets */}
      <div className="p-3 bg-slate-50 border-b border-gray-200 flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={onReset}
          className="px-2.5 py-1.5 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shrink-0 flex items-center gap-1 shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Apply 2023-2024 (Requested)</span>
        </button>
        <button
          onClick={onLoadOriginalScreenshot}
          className="px-2.5 py-1.5 rounded bg-white text-gray-700 border border-gray-300 font-medium hover:bg-gray-100 transition-colors shrink-0"
        >
          Screenshot 2026-2027
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50/50 text-xs font-medium text-gray-600">
        <button
          onClick={() => setActiveTab('dates')}
          className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-colors flex flex-col items-center gap-1 ${
            activeTab === 'dates'
              ? 'border-blue-600 text-blue-700 bg-white font-semibold'
              : 'border-transparent hover:text-gray-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Dates & ID</span>
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-colors flex flex-col items-center gap-1 ${
            activeTab === 'business'
              ? 'border-blue-600 text-blue-700 bg-white font-semibold'
              : 'border-transparent hover:text-gray-900'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Business</span>
        </button>
        <button
          onClick={() => setActiveTab('proprietor')}
          className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-colors flex flex-col items-center gap-1 ${
            activeTab === 'proprietor'
              ? 'border-blue-600 text-blue-700 bg-white font-semibold'
              : 'border-transparent hover:text-gray-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Owner</span>
        </button>
        <button
          onClick={() => setActiveTab('authority')}
          className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-colors flex flex-col items-center gap-1 ${
            activeTab === 'authority'
              ? 'border-blue-600 text-blue-700 bg-white font-semibold'
              : 'border-transparent hover:text-gray-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Authority</span>
        </button>
        <button
          onClick={() => setActiveTab('qr')}
          className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-colors flex flex-col items-center gap-1 ${
            activeTab === 'qr'
              ? 'border-blue-600 text-blue-700 bg-white font-semibold'
              : 'border-transparent hover:text-gray-900'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR / Photo</span>
        </button>
      </div>

      {/* Tab Form Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Tab 1: Dates & Certificate ID */}
        {activeTab === 'dates' && (
          <div className="space-y-3.5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Certificate Number (17 Digits)
              </label>
              <input
                type="text"
                value={data.certificateNo}
                onChange={(e) => updateField('certificateNo', e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="26191679419004679"
                maxLength={24}
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Each character will automatically render inside individual digit boxes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Issue Date
                </label>
                <input
                  type="text"
                  value={data.issueDate}
                  onChange={(e) => updateField('issueDate', e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12-07-2023"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Expire Date
                </label>
                <input
                  type="text"
                  value={data.expireDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      ...data,
                      expireDate: val,
                      validTillDate: val,
                    });
                  }}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="30-06-2024"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Financial Year
                </label>
                <input
                  type="text"
                  value={data.financialYear}
                  onChange={(e) => updateField('financialYear', e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2023-2024"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Valid Till Date
                </label>
                <input
                  type="text"
                  value={data.validTillDate}
                  onChange={(e) => updateField('validTillDate', e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="30-06-2024"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Certificate Title Heading
              </label>
              <input
                type="text"
                value={data.headerTitle}
                onChange={(e) => updateField('headerTitle', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Trade Licesnse verify"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Bottom Permission Text
              </label>
              <textarea
                rows={3}
                value={
                  data.customDisclaimerText !== undefined
                    ? data.customDisclaimerText
                    : `You are permitted to continue your business for ${data.financialYear} after receiving the license fee on behalf of the mentioned company. This license will be valid till ${data.validTillDate} and will have to renew every year.`
                }
                onChange={(e) => updateField('customDisclaimerText', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Business Info */}
        {activeTab === 'business' && (
          <div className="space-y-3.5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={data.businessName}
                onChange={(e) => updateField('businessName', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SHAKIB STORE"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Business Type
              </label>
              <input
                type="text"
                value={data.businessType}
                onChange={(e) => updateField('businessType', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="VARAITI STORE"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Business Mobile Number
              </label>
              <input
                type="text"
                value={data.contactMobile}
                onChange={(e) => updateField('contactMobile', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="01805731777"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Business Email
              </label>
              <input
                type="email"
                value={data.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="didarkhanemon77@gmail.com"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Proprietor & Address */}
        {activeTab === 'proprietor' && (
          <div className="space-y-3.5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Proprietor Name (Propitor Name)
              </label>
              <input
                type="text"
                value={data.proprietorName}
                onChange={(e) => updateField('proprietorName', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="DIDAR KHAN EMON"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Father / Husband Name
              </label>
              <input
                type="text"
                value={data.fatherHusbandName}
                onChange={(e) => updateField('fatherHusbandName', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="A K M HABIBUR RAHMAN"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  NID / Birth ID
                </label>
                <input
                  type="text"
                  value={data.nidBirthId}
                  onChange={(e) => updateField('nidBirthId', e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="2405873858"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={data.proprietorMobile}
                  onChange={(e) => updateField('proprietorMobile', e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="01805731777"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Row Serial (নং)
              </label>
              <input
                type="text"
                value={data.serialNo}
                onChange={(e) => updateField('serialNo', e.target.value)}
                className="w-20 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Address
              </label>
              <textarea
                rows={3}
                value={data.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                placeholder="NIMAIKANDI, , NIMAIKANDI , , Muradnagar, 6 , Muradnagar , Cumilla"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Local Authority */}
        {activeTab === 'authority' && (
          <div className="space-y-3.5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Union Parishad / Council Name
              </label>
              <input
                type="text"
                value={data.unionName}
                onChange={(e) => updateField('unionName', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-blue-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Durgapur North Union"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Upazila & District Line
              </label>
              <input
                type="text"
                value={data.subDistrictDistrict}
                onChange={(e) => updateField('subDistrictDistrict', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=", Cumilla Adarsha Sadar, Cumilla -"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Authority Mobile
              </label>
              <input
                type="text"
                value={data.authorityMobile}
                onChange={(e) => updateField('authorityMobile', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01318377797"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Authority Email
              </label>
              <input
                type="text"
                value={data.authorityEmail}
                onChange={(e) => updateField('authorityEmail', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="chairmandurgapurnorth@gmail.com"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Official Portal Website
              </label>
              <input
                type="text"
                value={data.website}
                onChange={(e) => updateField('website', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="adarshasadar.comillalg.gov.bd"
              />
            </div>
          </div>
        )}

        {/* Tab 5: QR Code & Photo */}
        {activeTab === 'qr' && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Center Box Display (Photo or QR)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('photoType', 'placeholder')}
                  className={`p-2.5 rounded border text-center transition-colors ${
                    data.photoType === 'placeholder'
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs">Original</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Portal Style</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('photoType', 'qr')}
                  className={`p-2.5 rounded border text-center transition-colors ${
                    data.photoType === 'qr'
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-semibold">QR Code</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">In Center Box</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('photoType', 'photo')}
                  className={`p-2.5 rounded border text-center transition-colors ${
                    data.photoType === 'photo'
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs">Applicant</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Photo</div>
                </button>
              </div>
            </div>

            {data.photoType === 'photo' && (
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <label className="block font-semibold text-gray-700 mb-2">
                  Upload Custom Passport Photo
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 text-xs font-medium shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {data.customPhotoUrl && (
                    <button
                      type="button"
                      onClick={() => updateField('customPhotoUrl', undefined)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                QR Code Data Payload Format
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent has-checked:border-blue-300 has-checked:bg-blue-50/50">
                  <input
                    type="radio"
                    name="qrFormat"
                    value="full"
                    checked={qrPayloadMode === 'full'}
                    onChange={() => setQrPayloadMode('full')}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Complete Verification Record (Recommended)
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Includes License No, Business, Owner Name, NID, Issue & Expiry Date. Readable by any phone offline.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent has-checked:border-blue-300 has-checked:bg-blue-50/50">
                  <input
                    type="radio"
                    name="qrFormat"
                    value="url"
                    checked={qrPayloadMode === 'url'}
                    onChange={() => setQrPayloadMode('url')}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Government Portal Web URL
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Direct verification URL on adarshasadar.comillalg.gov.bd.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.showQrStamp ?? true}
                  onChange={(e) => updateField('showQrStamp', e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="font-medium text-gray-800">
                  Show Official Digital QR Stamp at bottom of certificate
                </span>
              </label>
              <p className="text-[11px] text-gray-500 ml-5 mt-0.5">
                Renders a dedicated scannable verification stamp badge on the document.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-2">
        <button
          onClick={handleCopyJson}
          className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied JSON' : 'Export JSON'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-900 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
