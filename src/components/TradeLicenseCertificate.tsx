import React from 'react';
import { TradeLicenseData } from '../types/tradeLicense';
import { QRCodeView } from './QRCodeView';
import { generateFullQrCodePayload } from '../utils/defaultData';
import { ImageOff, QrCode as QrIcon } from 'lucide-react';

interface TradeLicenseCertificateProps {
  data: TradeLicenseData;
  onEditField?: (field: keyof TradeLicenseData, value: string) => void;
  isEditableInline?: boolean;
  qrPayloadMode?: 'full' | 'url' | 'json';
}

export const TradeLicenseCertificate: React.FC<TradeLicenseCertificateProps> = ({
  data,
  onEditField,
  isEditableInline = false,
  qrPayloadMode = 'full',
}) => {
  // Split certificate number into characters for digit boxes
  const certDigits = (data.certificateNo || '').split('');

  // Determine QR code payload
  const qrContent =
    qrPayloadMode === 'url'
      ? `https://${data.website}/verify/trade_en/${data.certificateNo}/1916794/14`
      : generateFullQrCodePayload(data);

  return (
    <div className="w-full bg-white text-black font-sans leading-normal selection:bg-blue-100 print:p-0">
      {/* Outer Certificate Container matching exact government portal layout */}
      <div className="max-w-[1100px] mx-auto px-6 py-6 md:px-12 md:py-8 bg-white">
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-blue-700 tracking-tight mb-0.5">
            {data.unionName}
          </h1>
          <p className="text-sm md:text-base text-gray-800 font-normal">
            {data.subDistrictDistrict}
          </p>
          <p className="text-sm md:text-base text-gray-800 font-normal">
            Mobile: {data.authorityMobile}, Email: {data.authorityEmail}
          </p>
          <p className="text-sm md:text-base text-gray-800 font-normal">
            Website: {data.website}
          </p>
        </div>

        {/* Certificate Title */}
        <div className="text-center my-4">
          <h2 className="text-lg md:text-xl font-bold text-black underline underline-offset-4 decoration-1">
            {data.headerTitle || 'Trade Licesnse verify'}
          </h2>
        </div>

        {/* Issue Date & Expire Date Row */}
        <div className="flex justify-between items-center text-sm md:text-base text-black mt-4 mb-2">
          <div className="font-normal">
            <span>Issue Date: </span>
            <span className="font-semibold">{data.issueDate}</span>
          </div>
          <div className="font-normal text-right">
            <span>Expire Date: </span>
            <span className="font-semibold">{data.expireDate}</span>
          </div>
        </div>

        {/* Certificate No with digit boxes */}
        <div className="flex flex-wrap items-center gap-1 my-3 text-sm md:text-base">
          <div className="border border-gray-400 px-2 py-0.5 font-medium bg-white">
            Certificate No :
          </div>
          <div className="flex flex-wrap items-center">
            {certDigits.map((digit, idx) => (
              <div
                key={idx}
                className="w-6 h-7 md:w-7 md:h-8 border border-gray-400 -ml-[1px] first:ml-0 flex items-center justify-center font-bold text-sm md:text-base bg-white"
              >
                {digit}
              </div>
            ))}
          </div>
        </div>

        {/* Center Photo / QR Code Box matching portal screenshot */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="w-28 h-32 md:w-32 md:h-36 border border-gray-400 p-1 flex items-center justify-center bg-white shadow-xs relative group">
            {data.photoType === 'placeholder' && (
              <div className="flex flex-col items-center justify-center text-gray-400 w-full h-full bg-gray-50/50">
                <ImageOff className="w-8 h-8 text-gray-400 mb-1 stroke-1" />
                <span className="text-[10px] text-gray-400">No Photo</span>
              </div>
            )}

            {data.photoType === 'qr' && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <QRCodeView text={qrContent} size={118} className="w-full h-full object-contain" />
              </div>
            )}

            {data.photoType === 'photo' && (
              <div className="w-full h-full overflow-hidden flex items-center justify-center">
                {data.customPhotoUrl ? (
                  <img
                    src={data.customPhotoUrl}
                    alt={data.proprietorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-500">
                    <span className="text-xs font-semibold">PHOTO</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <span className="text-[11px] text-gray-500 mt-1 print:hidden">
            {data.photoType === 'placeholder' ? '(Standard Portal Photo Frame)' : data.photoType === 'qr' ? '(Scannable Verification QR)' : '(Proprietor Photo)'}
          </span>
        </div>

        {/* Business Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 text-sm md:text-base my-5">
          <div className="flex">
            <span className="w-36 shrink-0 text-black">Business Name</span>
            <span className="mr-2">:</span>
            <span className="font-semibold text-black uppercase tracking-wide">{data.businessName}</span>
          </div>

          <div className="flex">
            <span className="w-36 shrink-0 text-black">Business Type</span>
            <span className="mr-2">:</span>
            <span className="font-semibold text-black uppercase tracking-wide">{data.businessType}</span>
          </div>

          <div className="flex">
            <span className="w-36 shrink-0 text-black">Mobile</span>
            <span className="mr-2">:</span>
            <span className="font-normal text-black">{data.contactMobile}</span>
          </div>

          <div className="flex">
            <span className="w-36 shrink-0 text-black">Email</span>
            <span className="mr-2">:</span>
            <span className="font-normal text-black">{data.contactEmail}</span>
          </div>
        </div>

        {/* Proprietor Table matching portal screenshot */}
        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm md:text-base border-collapse border border-dashed border-gray-400">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="border-r border-gray-300 px-3 py-1.5 text-center font-bold w-12 text-black">
                  নং
                </th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-center font-bold text-black">
                  Propitor Name
                </th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-center font-bold text-black">
                  Father/Husband
                </th>
                <th className="border-r border-gray-300 px-3 py-1.5 text-center font-bold text-black">
                  NID/ Birth ID
                </th>
                <th className="px-3 py-1.5 text-center font-bold text-black">
                  Mobile
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="border-r border-gray-300 px-3 py-1.5 text-center text-black font-normal">
                  {data.serialNo || '1'}
                </td>
                <td className="border-r border-gray-300 px-3 py-1.5 text-center text-black font-semibold uppercase">
                  {data.proprietorName}
                </td>
                <td className="border-r border-gray-300 px-3 py-1.5 text-center text-black font-normal uppercase">
                  {data.fatherHusbandName}
                </td>
                <td className="border-r border-gray-300 px-3 py-1.5 text-center text-black font-mono">
                  {data.nidBirthId}
                </td>
                <td className="px-3 py-1.5 text-center text-black font-mono">
                  {data.proprietorMobile}
                </td>
              </tr>
              {/* Address sub-row spanning full width */}
              <tr>
                <td colSpan={5} className="px-3 py-2 text-center text-black font-normal text-xs md:text-sm">
                  <span className="font-semibold">Address : </span>
                  <span>{data.address}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Permission & Renewal Notice */}
        <div className="mt-8 mb-6 text-sm md:text-base text-black font-normal leading-relaxed text-justify">
          <p>
            {data.customDisclaimerText ||
              `You are permitted to continue your business for ${data.financialYear} after receiving the license fee on behalf of the mentioned company. This license will be valid till ${data.validTillDate || data.expireDate} and will have to renew every year.`}
          </p>
        </div>

        {/* Optional Authentic Scannable QR Stamp (User requested complete data QR Code) */}
        {data.showQrStamp && (
          <div className="mt-8 pt-4 border-t border-dotted border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/70 p-4 rounded print:bg-transparent print:border-none">
            <div className="flex items-center gap-4">
              <div className="border-2 border-black p-1.5 bg-white shadow-xs shrink-0">
                <QRCodeView text={qrContent} size={96} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900">
                  <QrIcon className="w-4 h-4 text-emerald-600" />
                  <span>OFFICIAL DIGITAL VERIFICATION QR CODE</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Scan with any camera or scanner app to view complete authenticated trade license record.
                </p>
                <div className="text-[11px] text-gray-500 font-mono mt-1">
                  SHA-256 Data Integrity Verified · Local Government Division
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-gray-500 shrink-0 border-l border-gray-200 pl-4 hidden md:block">
              <div>Certificate No: <strong className="font-mono text-gray-800">{data.certificateNo}</strong></div>
              <div>Validity: <strong className="text-emerald-700">{data.validTillDate}</strong></div>
              <div className="text-blue-600 text-[11px]">adarshasadar.comillalg.gov.bd</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
