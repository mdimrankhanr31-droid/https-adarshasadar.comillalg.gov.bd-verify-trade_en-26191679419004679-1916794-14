import { TradeLicenseData } from '../types/tradeLicense';

export const INITIAL_TRADE_LICENSE_DATA: TradeLicenseData = {
  unionName: 'Durgapur North Union',
  subDistrictDistrict: ', Cumilla Adarsha Sadar, Cumilla -',
  authorityMobile: '01318377797',
  authorityEmail: 'chairmandurgapurnorth@gmail.com',
  website: 'adarshasadar.comillalg.gov.bd',

  headerTitle: 'Trade Licesnse verify',
  issueDate: '12-07-2023',
  expireDate: '30-06-2024',
  certificateNo: '26191679419004679',

  businessName: 'SHAKIB STORE',
  businessType: 'VARAITI STORE',
  contactMobile: '01805731777',
  contactEmail: 'didarkhanemon77@gmail.com',

  serialNo: '1',
  proprietorName: 'DIDAR KHAN EMON',
  fatherHusbandName: 'A K M HABIBUR RAHMAN',
  nidBirthId: '2405873858',
  proprietorMobile: '01805731777',
  address: 'NIMAIKANDI, , NIMAIKANDI , , Muradnagar, 6 , Muradnagar , Cumilla',

  financialYear: '2023-2024',
  validTillDate: '30-06-2024',
  photoType: 'placeholder',
  showGovSeal: false,
  showQrStamp: true,
};

/**
 * Generates the full formatted string containing all trade license details
 * for the QR code so that any QR scanner will display complete information.
 */
export function generateFullQrCodePayload(data: TradeLicenseData): string {
  return [
    `=== TRADE LICENSE VERIFICATION ===`,
    `Issuing Authority: ${data.unionName}`,
    `Location: ${data.subDistrictDistrict.replace(/^,\s*/, '').replace(/\s*-\s*$/, '')}`,
    `Certificate No: ${data.certificateNo}`,
    `----------------------------------`,
    `Business Name: ${data.businessName}`,
    `Business Type: ${data.businessType}`,
    `Contact Mobile: ${data.contactMobile}`,
    `Email: ${data.contactEmail}`,
    `----------------------------------`,
    `Proprietor: ${data.proprietorName}`,
    `Father/Husband: ${data.fatherHusbandName}`,
    `NID / Birth ID: ${data.nidBirthId}`,
    `Address: ${data.address}`,
    `----------------------------------`,
    `Issue Date: ${data.issueDate}`,
    `Expiry Date: ${data.expireDate}`,
    `Financial Year: ${data.financialYear}`,
    `Status: VERIFIED & ACTIVE`,
    `Website: https://${data.website}`,
    `Portal URL: https://${data.website}/verify/trade_en/${data.certificateNo}/1916794/14`,
    `==================================`
  ].join('\n');
}

/**
 * Returns JSON formatted data if user prefers JSON payload
 */
export function generateJsonQrCodePayload(data: TradeLicenseData): string {
  return JSON.stringify({
    service: 'Government of Bangladesh Local Government Division',
    portal: data.website,
    verificationUrl: `https://${data.website}/verify/trade_en/${data.certificateNo}/1916794/14`,
    union: data.unionName,
    certificateNo: data.certificateNo,
    issueDate: data.issueDate,
    expireDate: data.expireDate,
    financialYear: data.financialYear,
    businessName: data.businessName,
    businessType: data.businessType,
    proprietor: data.proprietorName,
    fatherOrHusband: data.fatherHusbandName,
    nidOrBirthId: data.nidBirthId,
    mobile: data.proprietorMobile,
    email: data.contactEmail,
    address: data.address,
    status: 'VERIFIED'
  }, null, 2);
}
