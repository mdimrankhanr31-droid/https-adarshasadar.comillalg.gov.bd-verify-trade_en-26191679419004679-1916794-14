export interface TradeLicenseData {
  // Local Government Authority details
  unionName: string;
  subDistrictDistrict: string;
  authorityMobile: string;
  authorityEmail: string;
  website: string;

  // Verification & Certificate Header
  headerTitle: string; // "Trade Licesnse verify"
  issueDate: string;   // "12-07-2023"
  expireDate: string;  // "30-06-2024"
  certificateNo: string; // "26191679419004679"

  // Business Details
  businessName: string; // "SHAKIB STORE"
  businessType: string; // "VARAITI STORE"
  contactMobile: string; // "01805731777"
  contactEmail: string;  // "didarkhanemon77@gmail.com"

  // Proprietor Details
  serialNo: string; // "1"
  proprietorName: string; // "DIDAR KHAN EMON"
  fatherHusbandName: string; // "A K M HABIBUR RAHMAN"
  nidBirthId: string; // "2405873858"
  proprietorMobile: string; // "01805731777"
  address: string; // "NIMAIKANDI, , NIMAIKANDI , , Muradnagar, 6 , Muradnagar , Cumilla"

  // Validity text configuration
  financialYear: string; // "2023-2024"
  validTillDate: string; // "30-06-2024"
  customDisclaimerText?: string;

  // Visual options
  photoType: 'placeholder' | 'qr' | 'photo';
  customPhotoUrl?: string;
  showGovSeal?: boolean;
  showQrStamp?: boolean;
}
