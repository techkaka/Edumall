// Centralized NEET Kaka JEE Product Database
// Single source of truth for all product information

import { isDevelopment } from './environment';

// Your authentic NEET Kaka JEE product images from ImageKit CDN
export const IMAGEKIT_URLS = {
  DWAR_JKR_COMBO: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Combo%20DWAR%20&%20JKR.jpg?updatedAt=1754302526099",
  FIGHTER_TOOL_AFSAR: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Fighter%20Tool%20Afsar,%20Timer%20&%20DWAR.jpg?updatedAt=1754302526191",
  NCERT_NICHOD_POLITY: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20polity.jpg?updatedAt=1754302526180",
  NCERT_FEEL_PHYSICS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-FEEL%20Physics.jpg?updatedAt=1754302526245",
  NCERT_NICHOD_ECONOMICS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-Nichod%20Economics.jpg?updatedAt=1754302526254",
  HINDI_PHYSICS_BIOLOGY_CHARTS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Hindi%20Version%20Physics%20&%20Biology%20Charts%20Combo.jpg?updatedAt=1754302526229",
  NCERT_FEEL_BIOLOGY_CHEMISTRY_HINDI: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-FEEL%20Biology%20&%20Chemistry%20in%20hindi.jpg?updatedAt=1754302526275",
  DWAR: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/DWAR%20.jpg?updatedAt=1754302526294",
  NCERT_NICHOD_BIOLOGY_HINDI: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20%E0%A4%A8%E0%A4%BF%E0%A4%9A%E0%A5%8B%E0%A4%A1%E0%A4%BC%20Biology%202.0.jpg?updatedAt=1754302526348",
  CLASS_10_MATHS_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/10th%20Class%20Complete%20Maths%20in%20one%20Chart.jpg?updatedAt=1754302526317",
  COMPLETE_BIOLOGY_PACKAGE: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Complete%20Biology%20Package.jpg?updatedAt=1754302529778",
  HINDI_PHYSICS_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Hindi%20Version%20Physics%20Chart.jpg?updatedAt=1754302529901",
  HINDI_BIOLOGY_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/_Hindi%20Biology%20Chart.jpg?updatedAt=1754302530686",
  NCERT_NICHOD_CHEMISTRY: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20%E0%A4%A8%E0%A4%BF%E0%A4%9A%E0%A5%8B%E0%A4%A1%E0%A4%BC%20Chemistry.jpg?updatedAt=1754302531318",
  TIMER: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/_Timer%20Amazon.jpg?updatedAt=1754302531367",
  ZERO_ERROR_PYQS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Zero%20Error%20PYQs%20for%20NEET%20Aspirants%20.jpg?updatedAt=1754302531341",
  ORGANIC_CHEMISTRY_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Organic%20Chemistry%20Chart.jpg?updatedAt=1754302531574",
  NCERT_NICHOD_MATHS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20%E0%A4%A8%E0%A4%BF%E0%A4%9A%E0%A5%8B%E0%A4%A1%E0%A4%BC%20Maths.jpg?updatedAt=1754302531583",
  INORGANIC_CHEMISTRY_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/In%20-%20Organic%20chemistry%20Chart%20.jpg?updatedAt=1754302531591",
  NCERT_WORD_TO_WORD_PHYSICS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20Physics%20Q-Bank.jpg?updatedAt=1754302533693",
  NCERT_WORD_TO_WORD_ORGANIC: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/_NCERT%20Word%20to%20Word%20Organic%20Chemistry%20Q-Bank.jpg?updatedAt=1754302533964",
  NCERT_NICHOD_HISTORY: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20History%20.png?updatedAt=1754302535148",
  NCERT_NICHOD_GEOGRAPHY: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20Geography.jpg?updatedAt=1754302535170",
  NCERT_WORD_TO_WORD_COMBO: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20Combo%20.jpg?updatedAt=1754302535205",
  AFSAR_HINDI: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Afsar%20in%20Hindi.jpg?updatedAt=1754302535222",
  NCERT_NICHOD_COMBO: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20Combo%20.jpg?updatedAt=1754302535498",
  SCHOOL_TOPPER: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/School%20topper.jpg?updatedAt=1754302535844",
  ALL_PCB_CHARTS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/All%20PCB%20Charts.jpg?updatedAt=1754302535931",
  UPSC_NCERT_NICHOD_COMBO: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/UPSC%20NCERT%20NICHOD%20%20Combo.jpg?updatedAt=1754302537452",
  JEET_KI_RANEETI_ENGLISH: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/JEET%20ki%20RnNEETi%20(English).jpg?updatedAt=1754302537528",
  NCERT_WORD_TO_WORD_PHYSICAL: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Copy%20of%20NCERT%20Word%20to%20Word%20Physical%20Chemistry%20Q-Bank.jpg?updatedAt=1754302538648",
  NCERT_FEEL_CHEMISTRY: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20FEEL%20_%20CHEMISTRY.jpg?updatedAt=1754302539753",
  COMBO_AFSAR_DWAR: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Combo%20AFAR%20&%20DWAR.jpg?updatedAt=1754302539903",
  FIGHTER_TOOLS_DWAR_TIMER_JEET: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Fighter%20Tools%20DWAR,%20Timer%20&%20JEET%20ki%20Raneeti.jpg?updatedAt=1754302540092",
  NCERT_FEEL_BIOLOGY: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-FEEL%20Biology.jpg?updatedAt=1754302540177",
  CLASS_10_SST_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/10th%20Class%20Complete%20SST%20in%20one%20Chart.jpg?updatedAt=1754302540246",
  VISHWAS_BATCH_COMBO: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/VISHWAS%20BATCH%20COMBO.jpg?updatedAt=1754302540467",
  VISHWAS_OFFLINE_BATCH: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Vishwas%20offline%20batch.jpg?updatedAt=1754302540558",
  JEET_KI_RANEETI_HINDI: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/JEET%20ki%20RnNEETi%20(Hindi).jpg?updatedAt=1754302541244",
  PHYSICAL_CHEMISTRY_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Physical%20Chemistry%20Chart.jpg?updatedAt=1754302541317",
  PHYSICS_FORMULAS_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Physics%20Formulas%20Chart.jpg?updatedAt=1754302542744",
  NCERT_NICHOD_PHYSICS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20Physics.jpg?updatedAt=1754302544049",
  CLASS_10_SCIENCE_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/10th%20Class%20Complete%20Science%20in%20one%20Chart.jpg?updatedAt=1754302544073",
  NCERT_WORD_TO_WORD_INORGANIC: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20In-organic%20Chemistry%20Q-Bank.jpg?updatedAt=1754302544269",
  AFSAR_ENGLISH: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Afsar%20book%20(English).jpg?updatedAt=1754302544266",
  BIOLOGY_EXAMPLES_CHART: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Biology%20Examples%20Chart.jpg?updatedAt=1754302544322",
  NEET_IN_20_MINS: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NEET%20in%2020%20Mins.jpg?updatedAt=1754302544769",
  NCERT_WORD_TO_WORD_BIOLOGY: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20Biology%202.0%20Q-Bank.jpg?updatedAt=1754302544883",
  NCERT_NICHOD_CHEMISTRY_HINDI: "https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-%E0%A4%A8%E0%A4%BF%E0%A4%9A%E0%A5%8B%E0%A4%A1%E0%A4%BC%20Chemistry%20hindi.jpg?updatedAt=1754302545214"
};

// Fallback image placeholder (data URL for a simple book icon)
const fallbackProductImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDI0MCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMzIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyODAiIGZpbGw9IiNFMkU4RjAiIHN0cm9rZT0iIzk0QTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0yMCAyMEwyMjAgMjBWMjQwSDE2MEwyMCA5MFYyMFoiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTIwIDIwTDE2MCA5MEwyMjAgMjRWODBMMTYwIDE0MEwyMCA4MEwyMCAyMFoiIGZpbGw9IiNFMkU4RjAiLz4KPHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4MCIgeT0iMTIwIj4KPHBhdGggZD0iTTIwIDIwSDYwVjYwSDIwVjIwWiIgZmlsbD0iI0Y1OTY0MyIvPgo8cGF0aCBkPSJNMzAgMzBINTBWNTBIMzBWMzBaIiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPHRleHQgeD0iMTIwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NzQ4QiI+Tm8gSW1hZ2U8L3RleHQ+Cjx0ZXh0IHg9IjEyMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5NEEzQjgiPkF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+";

// Use authentic combo image as default for featured products
export const AUTHENTIC_COMBO_IMAGE = IMAGEKIT_URLS.DWAR_JKR_COMBO;

// Helper function to get product image - now uses your authentic ImageKit URLs
const getProductImage = (preferredImage?: string) => {
  // Use the provided ImageKit URL or fallback
  return preferredImage || fallbackProductImage;
};

// Complete NEET Kaka JEE Product Database
export const NEET_KAKA_PRODUCTS = [
  // Featured Combos - Using your authentic images
  {
    id: 1,
    title: "NEET AIR Gold Mine Combo - Physics, Chemistry, Biology",
    author: "NEET Kaka JEE",
    price: 1249,
    originalPrice: 1797,
    rating: 4.9,
    reviews: 2856,
    category: "Featured Combos",
    subject: "Complete Package",
    image: getProductImage(IMAGEKIT_URLS.DWAR_JKR_COMBO),
    bestseller: true,
    discount: 31,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 2400,
    language: "English",
    type: "Combo Pack"
  },
  {
    id: 2,
    title: "Dr. Eklavya Perfect Combo (NEET 2025)",
    author: "Dr. Eklavya",
    price: 2999,
    originalPrice: 4899,
    rating: 4.9,
    reviews: 3421,
    category: "Featured Combos",
    subject: "Complete Package",
    image: getProductImage(IMAGEKIT_URLS.COMPLETE_BIOLOGY_PACKAGE),
    bestseller: true,
    discount: 39,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 3500,
    language: "English",
    type: "Combo Pack"
  },
  {
    id: 3,
    title: "Vishwas Offline Study Material",
    author: "NEET Kaka JEE",
    price: 6999,
    originalPrice: 14000,
    rating: 4.9,
    reviews: 567,
    category: "Featured Combos",
    subject: "Complete Package",
    image: getProductImage(IMAGEKIT_URLS.VISHWAS_OFFLINE_BATCH),
    bestseller: true,
    discount: 51,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 8000,
    language: "English",
    type: "Ultimate Package"
  },
  {
    id: 4,
    title: "Solve 16000+ NCERT Based Questions – 5 Books Combo",
    author: "NEET Kaka JEE",
    price: 2499,
    originalPrice: 3495,
    rating: 4.8,
    reviews: 1845,
    category: "Featured Combos",
    subject: "NCERT Questions",
    image: getProductImage(IMAGEKIT_URLS.NCERT_WORD_TO_WORD_COMBO),
    bestseller: false,
    discount: 29,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 2500,
    language: "English",
    type: "Question Bank"
  },
  {
    id: 5,
    title: "Combo of NCERT Feel – Physics, Chemistry, Biology",
    author: "NEET Kaka JEE",
    price: 1299,
    originalPrice: 1499,
    rating: 4.7,
    reviews: 1456,
    category: "Featured Combos",
    subject: "NCERT Feel Series",
    image: getProductImage(IMAGEKIT_URLS.NCERT_FEEL_BIOLOGY_CHEMISTRY_HINDI),
    bestseller: false,
    discount: 14,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 1500,
    language: "English",
    type: "NCERT Series"
  },

  // Individual Books - Using your authentic images
  {
    id: 6,
    title: "NEET AIR Gold Mine Biology",
    author: "NEET Kaka JEE",
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 1834,
    category: "Individual Books",
    subject: "Biology",
    image: getProductImage(IMAGEKIT_URLS.NCERT_FEEL_BIOLOGY),
    bestseller: true,
    discount: 26,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 800,
    language: "English",
    type: "Subject Book"
  },
  {
    id: 7,
    title: "NEET AIR Gold Mine Chemistry",
    author: "NEET Kaka JEE",
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 1756,
    category: "Individual Books",
    subject: "Chemistry",
    image: getProductImage(IMAGEKIT_URLS.NCERT_FEEL_CHEMISTRY),
    bestseller: true,
    discount: 26,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 800,
    language: "English",
    type: "Subject Book"
  },
  {
    id: 8,
    title: "NEET AIR Gold Mine Physics",
    author: "NEET Kaka JEE",
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    reviews: 1923,
    category: "Individual Books",
    subject: "Physics",
    image: getProductImage(IMAGEKIT_URLS.NCERT_FEEL_PHYSICS),
    bestseller: true,
    discount: 26,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 800,
    language: "English",
    type: "Subject Book"
  },
  {
    id: 9,
    title: "NEET in 20 Minutes (NEET 2025)",
    author: "NEET Kaka JEE",
    price: 999,
    originalPrice: 2249,
    rating: 4.8,
    reviews: 2234,
    category: "Individual Books",
    subject: "Quick Revision",
    image: getProductImage(IMAGEKIT_URLS.NEET_IN_20_MINS),
    bestseller: true,
    discount: 56,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 600,
    language: "English",
    type: "Quick Guide"
  },
  {
    id: 10,
    title: "NCERT Feel Physics",
    author: "NEET Kaka JEE",
    price: 499,
    originalPrice: 799,
    rating: 4.7,
    reviews: 1456,
    category: "Individual Books",
    subject: "Physics",
    image: getProductImage(IMAGEKIT_URLS.NCERT_FEEL_PHYSICS),
    bestseller: false,
    discount: 38,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 500,
    language: "English",
    type: "NCERT Guide"
  },

  // UPSC Series - Using your authentic images
  {
    id: 11,
    title: "NCERT Nichod Geography (UPSC)",
    author: "NEET Kaka JEE",
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviews: 1234,
    category: "UPSC",
    subject: "Geography",
    image: getProductImage(IMAGEKIT_URLS.NCERT_NICHOD_GEOGRAPHY),
    bestseller: false,
    discount: 31,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 500,
    language: "English",
    type: "UPSC Guide"
  },
  {
    id: 12,
    title: "NCERT Nichod Economics (UPSC)",
    author: "NEET Kaka JEE",
    price: 399,
    originalPrice: 599,
    rating: 4.7,
    reviews: 987,
    category: "UPSC",
    subject: "Economics",
    image: getProductImage(IMAGEKIT_URLS.NCERT_NICHOD_ECONOMICS),
    bestseller: false,
    discount: 34,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 400,
    language: "English",
    type: "UPSC Guide"
  },
  {
    id: 13,
    title: "NCERT Nichod Polity (UPSC)",
    author: "NEET Kaka JEE",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 1456,
    category: "UPSC",
    subject: "Polity",
    image: getProductImage(IMAGEKIT_URLS.NCERT_NICHOD_POLITY),
    bestseller: true,
    discount: 29,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 450,
    language: "English",
    type: "UPSC Guide"
  },

  // Charts & Visual Aids - Using your authentic images
  {
    id: 14,
    title: "Physics Formula Chart",
    author: "NEET Kaka JEE",
    price: 199,
    originalPrice: 250,
    rating: 4.6,
    reviews: 892,
    category: "Charts",
    subject: "Physics",
    image: getProductImage(IMAGEKIT_URLS.PHYSICS_FORMULAS_CHART),
    bestseller: false,
    discount: 21,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 1,
    language: "English",
    type: "Charts"
  },
  {
    id: 15,
    title: "Biology Chart",
    author: "NEET Kaka JEE",
    price: 199,
    originalPrice: 250,
    rating: 4.6,
    reviews: 756,
    category: "Charts",
    subject: "Biology",
    image: getProductImage(IMAGEKIT_URLS.BIOLOGY_EXAMPLES_CHART),
    bestseller: false,
    discount: 21,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 1,
    language: "English",
    type: "Charts"
  },

  // Tools & Registers - Using your authentic images
  {
    id: 16,
    title: "75 Hell Days Register",
    author: "NEET Kaka JEE",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 1567,
    category: "Tools & Registers",
    subject: "Study Tools",
    image: getProductImage(IMAGEKIT_URLS.DWAR),
    bestseller: false,
    discount: 26,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 75,
    language: "English",
    type: "Register"
  },
  {
    id: 17,
    title: "Mechanical Timer For Self Appointment",
    author: "NEET Kaka JEE",
    price: 449,
    originalPrice: 599,
    rating: 4.5,
    reviews: 456,
    category: "Tools & Registers",
    subject: "Study Tools",
    image: getProductImage(IMAGEKIT_URLS.TIMER),
    bestseller: false,
    discount: 26,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 0,
    language: "English",
    type: "Timer"
  },

  // Motivational & Strategy Books - Using your authentic images
  {
    id: 18,
    title: "JEET Ki Raneeti – English",
    author: "NEET Kaka JEE",
    price: 199,
    originalPrice: 250,
    rating: 4.8,
    reviews: 2145,
    category: "Motivational",
    subject: "Strategy Guide",
    image: getProductImage(IMAGEKIT_URLS.JEET_KI_RANEETI_ENGLISH),
    bestseller: true,
    discount: 21,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 200,
    language: "English",
    type: "Strategy Book"
  },
  {
    id: 19,
    title: "JEET Ki Raneeti – Hindi",
    author: "NEET Kaka JEE",
    price: 199,
    originalPrice: 250,
    rating: 4.8,
    reviews: 1876,
    category: "Motivational",
    subject: "Strategy Guide",
    image: getProductImage(IMAGEKIT_URLS.JEET_KI_RANEETI_HINDI),
    bestseller: true,
    discount: 21,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 200,
    language: "Hindi",
    type: "Strategy Book"
  },
  {
    id: 20,
    title: "AFSAR Complete Guide",
    author: "NEET Kaka JEE",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 1234,
    category: "Motivational",
    subject: "Complete Guide",
    image: getProductImage(IMAGEKIT_URLS.AFSAR_ENGLISH),
    bestseller: false,
    discount: 26,
    publisher: "NEET Kaka JEE",
    year: 2025,
    pages: 300,
    language: "English",
    type: "Guide Book"
  }
];

// Backend configuration checker - Safe and conservative approach
export const isBackendConfigured = (projectId: string, publicAnonKey: string): boolean => {
  try {
    // For development mode, we'll always use centralized data unless backend is explicitly set up
    // This prevents unnecessary network requests during development
    if (isDevelopment()) {
      // Only try backend if both values are present and don't look like defaults
      const hasValidProjectId = projectId && projectId !== 'your-project-id' && projectId.length > 10;
      const hasValidKey = publicAnonKey && publicAnonKey !== 'your-anon-key' && publicAnonKey.startsWith('eyJ');
      
      // For now, always use centralized data in development to avoid fetch errors
      // This can be changed later when backend is fully set up
      return false;
    }
    
    // In production, check for valid credentials
    return projectId !== 'your-project-id' && publicAnonKey !== 'your-anon-key';
  } catch {
    // Safe fallback - use centralized data
    return false;
  }
};

// Product categories
export const PRODUCT_CATEGORIES = [
  'All',
  'Featured Combos',
  'Individual Books',
  'UPSC',
  'Charts',
  'Tools & Registers',
  'Motivational',
  'NCERT Word-to-Word'
];

// Product subjects
export const PRODUCT_SUBJECTS = [
  'All',
  'Complete Package',
  'Biology',
  'Chemistry', 
  'Physics',
  'Mathematics',
  'Geography',
  'Economics',
  'Polity',
  'History',
  'Study Tools',
  'Strategy Guide'
];

// Publishers
export const PRODUCT_PUBLISHERS = [
  'All',
  'NEET Kaka JEE',
  'Dr. Eklavya'
];

// Price ranges
export const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 50000 },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
  { label: 'Above ₹5000', min: 5000, max: 50000 }
];

// Search products function
export const searchProducts = (query: string, products = NEET_KAKA_PRODUCTS) => {
  if (!query.trim()) return products;
  
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.title.toLowerCase().includes(lowerQuery) ||
    product.author.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.subject.toLowerCase().includes(lowerQuery) ||
    product.publisher.toLowerCase().includes(lowerQuery)
  );
};

// Filter products function
export const filterProducts = (products = NEET_KAKA_PRODUCTS, filters = {}) => {
  let filtered = [...products];
  
  // Apply category filter
  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  // Apply subject filter
  if (filters.subject && filters.subject !== 'All') {
    filtered = filtered.filter(product => product.subject === filters.subject);
  }
  
  // Apply publisher filter
  if (filters.publisher && filters.publisher !== 'All') {
    filtered = filtered.filter(product => product.publisher === filters.publisher);
  }
  
  // Apply price range filter
  if (filters.priceRange) {
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );
  }
  
  // Apply type filter
  if (filters.type) {
    filtered = filtered.filter(product => product.type === filters.type);
  }
  
  return filtered;
};

// Sort products function
export const sortProducts = (products = NEET_KAKA_PRODUCTS, sortBy = 'popularity') => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'popularity':
    default:
      return sorted.sort((a, b) => b.reviews - a.reviews);
  }
};

// Get product by ID
export const getProductById = (id: number) => {
  return NEET_KAKA_PRODUCTS.find(product => product.id === id);
};

// Get featured products
export const getFeaturedProducts = (limit = 6) => {
  return NEET_KAKA_PRODUCTS
    .filter(product => product.bestseller || product.category === 'Featured Combos')
    .slice(0, limit);
};

// Get products by category
export const getProductsByCategory = (category: string, limit?: number) => {
  const filtered = NEET_KAKA_PRODUCTS.filter(product => product.category === category);
  return limit ? filtered.slice(0, limit) : filtered;
};

// Get bestsellers
export const getBestsellers = (limit = 8) => {
  return NEET_KAKA_PRODUCTS
    .filter(product => product.bestseller)
    .slice(0, limit);
};

export default NEET_KAKA_PRODUCTS;