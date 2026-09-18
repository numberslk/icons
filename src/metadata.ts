/**
 * Sri Lanka Election Symbols Metadata Registry
 * Sourced from official Gazettes of the Election Commission of Sri Lanka
 */

export interface ElectionSymbolMetadata {
  id: string;
  name: string;
  nameSi: string;
  nameTa: string;
  componentName: string;
  schedule: 'A' | 'B';
  category: string;
  parties: string[];
  primaryElectionTag?: string;
  electionAliases?: string[];
  tags: string[];
  isPopular: boolean;
}

export const electionSymbols: ElectionSymbolMetadata[] = [
  {
    "id": "aeroplane",
    "name": "Aeroplane",
    "nameSi": "ගුවන් යානය",
    "nameTa": "விமானம்",
    "componentName": "AeroplaneIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Socialist Alliance",
      "සමාජවාදී සන්ධානය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-AEROPLANE>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-aeroplane"
    ],
    "tags": [
      "ගුවන් යානය",
      "aeroplane",
      "alliance",
      "விமானம்",
      "socialist",
      "lk-election-symbols-2024-parl-national-aeroplane"
    ],
    "isPopular": true
  },
  {
    "id": "almirah",
    "name": "Almirah",
    "nameSi": "අල්මාරිය",
    "nameTa": "பீரோ",
    "componentName": "AlmirahIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-almirah>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-almirah"
    ],
    "tags": [
      "almirah",
      "பீரோ",
      "lk-election-symbols-2024-parl-national-almirah",
      "අල්මාරිය"
    ],
    "isPopular": false
  },
  {
    "id": "anchor",
    "name": "Anchor",
    "nameSi": "නැංගුරම",
    "nameTa": "நங்கூரம்",
    "componentName": "AnchorIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "United Socialist Party (USP)",
      "එක්සත් සමාජවාදී පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2019-pres-national-usp>",
    "electionAliases": [
      "lk-election-symbols-2019-pres-national-usp"
    ],
    "tags": [
      "lk-election-symbols-2019-pres-national-usp",
      "නැංගුරම",
      "நங்கூரம்",
      "2019",
      "united",
      "national",
      "usp",
      "anchor",
      "party",
      "pres",
      "socialist"
    ],
    "isPopular": true
  },
  {
    "id": "ant",
    "name": "Ant",
    "nameSi": "කූඹියා",
    "nameTa": "எறும்பு",
    "componentName": "AntIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ant>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-ant"
    ],
    "tags": [
      "කූඹියා",
      "எறும்பு",
      "lk-election-symbols-2024-parl-national-ant",
      "ant"
    ],
    "isPopular": false
  },
  {
    "id": "apple",
    "name": "Apple",
    "nameSi": "ඇපල්",
    "nameTa": "ஆப்பிள்",
    "componentName": "AppleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-apple>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-apple"
    ],
    "tags": [
      "apple",
      "ඇපල්",
      "lk-election-symbols-2024-parl-national-apple",
      "ஆப்பிள்"
    ],
    "isPopular": false
  },
  {
    "id": "balloon",
    "name": "Balloon",
    "nameSi": "බැලුනය",
    "nameTa": "பலூன்",
    "componentName": "BalloonIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Socialist People's Forum",
      "සමාජවාදී ජනතා සංසදය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-BALLOON>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-balloon"
    ],
    "tags": [
      "people",
      "பலூன்",
      "s",
      "lk-election-symbols-2024-parl-national-balloon",
      "balloon",
      "forum",
      "socialist",
      "බැලුනය"
    ],
    "isPopular": true
  },
  {
    "id": "bat",
    "name": "Bat",
    "nameSi": "වවුලා",
    "nameTa": "வௌவால்",
    "componentName": "BatIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-bat>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-bat"
    ],
    "tags": [
      "வௌவால்",
      "bat",
      "වවුලා",
      "lk-election-symbols-2024-parl-national-bat"
    ],
    "isPopular": false
  },
  {
    "id": "battery",
    "name": "Battery",
    "nameSi": "බැටරිය",
    "nameTa": "மின்கலம்",
    "componentName": "BatteryIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-battery>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-battery"
    ],
    "tags": [
      "battery",
      "lk-election-symbols-2024-parl-national-battery",
      "බැටරිය",
      "மின்கலம்"
    ],
    "isPopular": false
  },
  {
    "id": "bed",
    "name": "Bed",
    "nameSi": "ඇඳ",
    "nameTa": "கட்டில்",
    "componentName": "BedIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-bed>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-bed"
    ],
    "tags": [
      "ඇඳ",
      "lk-election-symbols-2024-parl-national-bed",
      "bed",
      "கட்டில்"
    ],
    "isPopular": false
  },
  {
    "id": "bell",
    "name": "Bell",
    "nameSi": "ඝණ්ඨාරය",
    "nameTa": "மணி",
    "componentName": "BellIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "JVP (Janatha Vimukthi Peramuna - Historic)",
      "ජනතා විමුක්ති පෙරමුණ",
      "மக்கள் விடுதலை முன்னணி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2015-parl-national-jvp>",
    "electionAliases": [
      "lk-election-symbols-2015-parl-national-jvp",
      "lk-election-symbols-2010-parl-national-dna",
      "lk-election-symbols-2001-parl-national-jvp",
      "lk-election-symbols-2000-parl-national-jvp"
    ],
    "tags": [
      "historic",
      "2001",
      "vimukthi",
      "peramuna",
      "jvp",
      "bell",
      "2010",
      "2000",
      "lk-election-symbols-2015-parl-national-jvp",
      "ඝණ්ඨාරය",
      "national",
      "dna",
      "2015",
      "janatha",
      "parl",
      "மணி"
    ],
    "isPopular": true
  },
  {
    "id": "belt",
    "name": "Belt",
    "nameSi": "පටිය",
    "nameTa": "வார் / பெல்ட்",
    "componentName": "BeltIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-belt>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-belt"
    ],
    "tags": [
      "පටිය",
      "வார் / பெல்ட்",
      "lk-election-symbols-2024-parl-national-belt",
      "belt"
    ],
    "isPopular": false
  },
  {
    "id": "betel-leaf",
    "name": "Betel Leaf",
    "nameSi": "බුලත් කොළය",
    "nameTa": "வெற்றிலை",
    "componentName": "BetelLeafIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "UPFA (United People's Freedom Alliance)",
      "එක්සත් ජනතා නිදහස් සන්ධානය",
      "ஐக்கிய மக்கள் சுதந்திரக் கூட்டமைப்பு"
    ],
    "primaryElectionTag": "<lk-election-symbols-2015-pres-national-upfa>",
    "electionAliases": [
      "lk-election-symbols-2015-pres-national-upfa",
      "lk-election-symbols-2015-parl-national-upfa",
      "lk-election-symbols-2010-pres-national-upfa",
      "lk-election-symbols-2010-parl-national-upfa",
      "lk-election-symbols-2005-pres-national-upfa",
      "lk-election-symbols-2004-parl-national-upfa"
    ],
    "tags": [
      "leaf",
      "freedom",
      "betel",
      "2004",
      "parl",
      "s",
      "2010",
      "betel-leaf",
      "people",
      "national",
      "upfa",
      "pres",
      "வெற்றிலை",
      "2005",
      "united",
      "බුලත් කොළය",
      "2015",
      "alliance",
      "lk-election-symbols-2015-pres-national-upfa",
      "betel leaf"
    ],
    "isPopular": true
  },
  {
    "id": "bicycle",
    "name": "Bicycle",
    "nameSi": "බයිසිකලය",
    "nameTa": "மிதிவண்டி",
    "componentName": "BicycleIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-bicycle>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-bicycle"
    ],
    "tags": [
      "බයිසිකලය",
      "மிதிவண்டி",
      "bicycle",
      "lk-election-symbols-2024-parl-national-bicycle"
    ],
    "isPopular": false
  },
  {
    "id": "black-board",
    "name": "Black Board",
    "nameSi": "කළු ලෑල්ල",
    "nameTa": "கரும்பலகை",
    "componentName": "BlackBoardIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-black-board>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-black-board"
    ],
    "tags": [
      "கரும்பலகை",
      "board",
      "black",
      "lk-election-symbols-2024-parl-national-black-board",
      "black board",
      "black-board",
      "කළු ලෑල්ල"
    ],
    "isPopular": false
  },
  {
    "id": "boat",
    "name": "Boat",
    "nameSi": "බෝට්ටුව",
    "nameTa": "படகு",
    "componentName": "BoatIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "National Unity Alliance",
      "ජාතික සමගි පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-BOAT>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-boat"
    ],
    "tags": [
      "boat",
      "unity",
      "national",
      "lk-election-symbols-2024-parl-national-boat",
      "படகு",
      "alliance",
      "බෝට්ටුව"
    ],
    "isPopular": true
  },
  {
    "id": "book",
    "name": "Book",
    "nameSi": "පොත",
    "nameTa": "புத்தகம்",
    "componentName": "BookIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Democratic United National Front (DUNF)",
      "ප්‍රජාතන්ත්‍රවාදී එක්සත් ජාතික පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2019-pres-national-dunf>",
    "electionAliases": [
      "lk-election-symbols-2019-pres-national-dunf"
    ],
    "tags": [
      "front",
      "book",
      "lk-election-symbols-2019-pres-national-dunf",
      "dunf",
      "united",
      "national",
      "pres",
      "2019",
      "புத்தகம்",
      "democratic",
      "පොත"
    ],
    "isPopular": true
  },
  {
    "id": "bottle",
    "name": "Bottle",
    "nameSi": "බෝතලය",
    "nameTa": "போத்தல்",
    "componentName": "BottleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-bottle>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-bottle"
    ],
    "tags": [
      "bottle",
      "போத்தல்",
      "බෝතලය",
      "lk-election-symbols-2024-parl-national-bottle"
    ],
    "isPopular": false
  },
  {
    "id": "bow-and-arrow",
    "name": "Bow and Arrow",
    "nameSi": "දුන්න සහ ඊතලය",
    "nameTa": "வில்லும் அம்பும்",
    "componentName": "BowAndArrowIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "All Ceylon Tamil Mahasabha",
      "අඛිල ඉලංගෙයි දෙමළ මහාසභාව"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-BOW-AND-ARROW>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-bow-and-arrow"
    ],
    "tags": [
      "bow",
      "arrow",
      "tamil",
      "and",
      "lk-election-symbols-2024-parl-national-bow-and-arrow",
      "mahasabha",
      "all",
      "bow-and-arrow",
      "வில்லும் அம்பும்",
      "ceylon",
      "bow and arrow",
      "දුන්න සහ ඊතලය"
    ],
    "isPopular": true
  },
  {
    "id": "brass-lamp",
    "name": "Brass Lamp",
    "nameSi": "පිත්තල පහන",
    "nameTa": "பித்தளை விளக்கு",
    "componentName": "BrassLampIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Motherland People's Party",
      "මව්බිම ජනතා පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-pres-national-mjp>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-mjp",
      "lk-election-symbols-2024-parl-national-mjp"
    ],
    "tags": [
      "people",
      "2024",
      "lamp",
      "brass-lamp",
      "motherland",
      "mjp",
      "s",
      "பித்தளை விளக்கு",
      "brass lamp",
      "lk-election-symbols-2024-pres-national-mjp",
      "national",
      "පිත්තල පහන",
      "party",
      "pres",
      "brass",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "brush",
    "name": "Brush",
    "nameSi": "බුරුසුව",
    "nameTa": "தூரிகை",
    "componentName": "BrushIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-brush>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-brush"
    ],
    "tags": [
      "தூரிகை",
      "බුරුසුව",
      "brush",
      "lk-election-symbols-2024-parl-national-brush"
    ],
    "isPopular": false
  },
  {
    "id": "bucket",
    "name": "Bucket",
    "nameSi": "බාල්දිය",
    "nameTa": "வாளி",
    "componentName": "BucketIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-bucket>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-bucket"
    ],
    "tags": [
      "வாளி",
      "බාල්දිය",
      "bucket",
      "lk-election-symbols-2024-parl-national-bucket"
    ],
    "isPopular": false
  },
  {
    "id": "bunch-of-grapes",
    "name": "Bunch of Grapes",
    "nameSi": "මිදි පොකුර",
    "nameTa": "திராட்சை கொத்து",
    "componentName": "BunchOfGrapesIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-bunch-of-grapes>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-bunch-of-grapes"
    ],
    "tags": [
      "bunch of grapes",
      "මිදි පොකුර",
      "lk-election-symbols-2024-parl-national-bunch-of-grapes",
      "grapes",
      "bunch",
      "of",
      "bunch-of-grapes",
      "திராட்சை கொத்து"
    ],
    "isPopular": false
  },
  {
    "id": "butterfly",
    "name": "Butterfly",
    "nameSi": "සමනලයා",
    "nameTa": "வண்ணத்துப்பூச்சி",
    "componentName": "ButterflyIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Eksath Podujana Pakshaya",
      "එක්සත් පොදුජන පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-BUTTERFLY>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-butterfly"
    ],
    "tags": [
      "வண்ணத்துப்பூச்சி",
      "pakshaya",
      "සමනලයා",
      "lk-election-symbols-2024-parl-national-butterfly",
      "butterfly",
      "eksath",
      "podujana"
    ],
    "isPopular": true
  },
  {
    "id": "camel",
    "name": "Camel",
    "nameSi": "ඔටුවා",
    "nameTa": "ஒட்டகம்",
    "componentName": "CamelIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-camel>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-camel"
    ],
    "tags": [
      "camel",
      "lk-election-symbols-2024-parl-national-camel",
      "ஒட்டகம்",
      "ඔටුවා"
    ],
    "isPopular": false
  },
  {
    "id": "camera",
    "name": "Camera",
    "nameSi": "කැමරාව",
    "nameTa": "புகைப்படக்கருவி",
    "componentName": "CameraIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-camera>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-camera"
    ],
    "tags": [
      "புகைப்படக்கருவி",
      "camera",
      "කැමරාව",
      "lk-election-symbols-2024-parl-national-camera"
    ],
    "isPopular": false
  },
  {
    "id": "candle",
    "name": "Candle",
    "nameSi": "ඉටිපන්දම",
    "nameTa": "மெழுகுவர்த்தி",
    "componentName": "CandleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-candle>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-candle"
    ],
    "tags": [
      "மெழுகுவர்த்தி",
      "candle",
      "ඉටිපන්දම",
      "lk-election-symbols-2024-parl-national-candle"
    ],
    "isPopular": false
  },
  {
    "id": "canoe",
    "name": "Canoe",
    "nameSi": "ඔරුව",
    "nameTa": "தோணி",
    "componentName": "CanoeIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "United Left Front",
      "එක්සත් වාමාංශික පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-CANOE>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-canoe"
    ],
    "tags": [
      "ඔරුව",
      "தோணி",
      "front",
      "lk-election-symbols-2024-parl-national-canoe",
      "united",
      "left",
      "canoe"
    ],
    "isPopular": true
  },
  {
    "id": "carrot",
    "name": "Carrot",
    "nameSi": "කැරට්",
    "nameTa": "கேரட்",
    "componentName": "CarrotIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-carrot>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-carrot"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-carrot",
      "கேரட்",
      "carrot",
      "කැරට්"
    ],
    "isPopular": false
  },
  {
    "id": "cart-wheel",
    "name": "Cart Wheel",
    "nameSi": "කරත්ත රෝදය",
    "nameTa": "வண்டிச் சக்கரம்",
    "componentName": "CartWheelIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "National Freedom Front (NFF)",
      "ජාතික නිදහස් පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-NFF>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-nff"
    ],
    "tags": [
      "front",
      "freedom",
      "lk-election-symbols-2024-parl-national-nff",
      "வண்டிச் சக்கரம்",
      "cart",
      "national",
      "nff",
      "wheel",
      "cart-wheel",
      "කරත්ත රෝදය",
      "cart wheel"
    ],
    "isPopular": true
  },
  {
    "id": "cart",
    "name": "Cart",
    "nameSi": "කරත්තය",
    "nameTa": "மாட்டு வண்டி",
    "componentName": "CartIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-cart>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-cart"
    ],
    "tags": [
      "cart",
      "කරත්තය",
      "மாட்டு வண்டி",
      "lk-election-symbols-2024-parl-national-cart"
    ],
    "isPopular": false
  },
  {
    "id": "cashew-apple",
    "name": "Cashew Apple",
    "nameSi": "කජු පුහුලම",
    "nameTa": "முந்திரிப்பழம்",
    "componentName": "CashewAppleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-cashew-apple>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-cashew-apple"
    ],
    "tags": [
      "කජු පුහුලම",
      "cashew",
      "முந்திரிப்பழம்",
      "apple",
      "cashew-apple",
      "lk-election-symbols-2024-parl-national-cashew-apple",
      "cashew apple"
    ],
    "isPopular": false
  },
  {
    "id": "ceiling-fan",
    "name": "Ceiling Fan",
    "nameSi": "සිවිලිම් පංකාව",
    "nameTa": "கூரை மின்விசிறி",
    "componentName": "CeilingFanIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ceiling-fan>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-ceiling-fan"
    ],
    "tags": [
      "ceiling",
      "fan",
      "ceiling-fan",
      "ceiling fan",
      "lk-election-symbols-2024-parl-national-ceiling-fan",
      "கூரை மின்விசிறி",
      "සිවිලිම් පංකාව"
    ],
    "isPopular": false
  },
  {
    "id": "chair",
    "name": "Chair",
    "nameSi": "පුටුව",
    "nameTa": "நாற்காலி",
    "componentName": "ChairIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "PA (People's Alliance)",
      "පොදුජන එක්සත් පෙරමුණ",
      "மக்கள் கூட்டமைப்பு"
    ],
    "primaryElectionTag": "<lk-election-symbols-2001-parl-national-pa>",
    "electionAliases": [
      "lk-election-symbols-2001-parl-national-pa",
      "lk-election-symbols-2000-parl-national-pa",
      "lk-election-symbols-1999-pres-national-pa",
      "lk-election-symbols-1994-pres-national-pa",
      "lk-election-symbols-1994-parl-national-pa"
    ],
    "tags": [
      "people",
      "2001",
      "1999",
      "s",
      "2000",
      "lk-election-symbols-2001-parl-national-pa",
      "pa",
      "1994",
      "national",
      "நாற்காலி",
      "පුටුව",
      "chair",
      "alliance",
      "pres",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "clay-lamp",
    "name": "Clay Lamp",
    "nameSi": "මැටි පහන",
    "nameTa": "அகல் விளக்கு",
    "componentName": "ClayLampIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Our Power of People Party (OPPP)",
      "අපේ ජනබල පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-pres-national-oppp>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-oppp",
      "lk-election-symbols-2020-parl-national-oppp"
    ],
    "tags": [
      "people",
      "2024",
      "lamp",
      "clay lamp",
      "මැටි පහන",
      "அகல் விளக்கு",
      "power",
      "lk-election-symbols-2024-pres-national-oppp",
      "oppp",
      "national",
      "clay",
      "party",
      "our",
      "of",
      "pres",
      "clay-lamp",
      "2020",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "clock",
    "name": "Clock",
    "nameSi": "ඔරලෝසුව",
    "nameTa": "கடிகாரம்",
    "componentName": "ClockIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Lanka Sama Samaja Party (LSSP)",
      "ලංකා සමසමාජ පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-LSSP>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-lssp"
    ],
    "tags": [
      "ඔරලෝසුව",
      "lanka",
      "lk-election-symbols-2024-parl-national-lssp",
      "sama",
      "கடிகாரம்",
      "clock",
      "samaja",
      "party",
      "lssp"
    ],
    "isPopular": true
  },
  {
    "id": "cobra",
    "name": "Cobra",
    "nameSi": "නයා",
    "nameTa": "நாகப்பாம்பு",
    "componentName": "CobraIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "National Democratic Front",
      "ජාතික ප්‍රජාතන්ත්‍රවාදී පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-COBRA>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-cobra"
    ],
    "tags": [
      "නයා",
      "lk-election-symbols-2024-parl-national-cobra",
      "front",
      "நாகப்பாம்பு",
      "national",
      "cobra",
      "democratic"
    ],
    "isPopular": true
  },
  {
    "id": "cockerel",
    "name": "Cockerel",
    "nameSi": "කුකුළා",
    "nameTa": "சேவல்",
    "componentName": "CockerelIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "CWC (Ceylon Workers' Congress)",
      "ලංකා කම්කරු කොංග්‍රසය",
      "இலங்கை தொழிலாளர் காங்கிரஸ்"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-cwc>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-cwc"
    ],
    "tags": [
      "2024",
      "workers",
      "cwc",
      "කුකුළා",
      "parl",
      "lk-election-symbols-2024-parl-national-cwc",
      "national",
      "congress",
      "ceylon",
      "cockerel",
      "சேவல்"
    ],
    "isPopular": true
  },
  {
    "id": "coconut-scraper",
    "name": "Coconut Scraper",
    "nameSi": "හිරමනය",
    "nameTa": "துருவல் பலகை",
    "componentName": "CoconutScraperIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-coconut-scraper>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-coconut-scraper"
    ],
    "tags": [
      "coconut",
      "coconut scraper",
      "scraper",
      "හිරමනය",
      "துருவல் பலகை",
      "coconut-scraper",
      "lk-election-symbols-2024-parl-national-coconut-scraper"
    ],
    "isPopular": false
  },
  {
    "id": "coconut",
    "name": "Coconut",
    "nameSi": "පොල් ගෙඩිය",
    "nameTa": "தேங்காய்",
    "componentName": "CoconutIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "United Peace Alliance",
      "එක්සත් සාම සන්ධානය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-COCONUT>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-coconut"
    ],
    "tags": [
      "coconut",
      "தேங்காய்",
      "පොල් ගෙඩිය",
      "united",
      "peace",
      "alliance",
      "lk-election-symbols-2024-parl-national-coconut"
    ],
    "isPopular": true
  },
  {
    "id": "comb-of-plantains",
    "name": "Comb of Plantains",
    "nameSi": "කෙසෙල් ඇවරිය",
    "nameTa": "வாழைச்சீப்பு",
    "componentName": "CombOfPlantainsIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Democratic National Movement",
      "ප්‍රජාතන්ත්‍රවාදී ජාතික ව්‍යාපාරය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-COMB-OF-PLANTAINS>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-comb-of-plantains"
    ],
    "tags": [
      "plantains",
      "comb",
      "comb-of-plantains",
      "movement",
      "comb of plantains",
      "national",
      "lk-election-symbols-2024-parl-national-comb-of-plantains",
      "of",
      "democratic",
      "කෙසෙල් ඇවරිය",
      "வாழைச்சீப்பு"
    ],
    "isPopular": true
  },
  {
    "id": "comb",
    "name": "Comb",
    "nameSi": "පනාව",
    "nameTa": "சீப்பு",
    "componentName": "CombIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-comb>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-comb"
    ],
    "tags": [
      "පනාව",
      "சீப்பு",
      "lk-election-symbols-2024-parl-national-comb",
      "comb"
    ],
    "isPopular": false
  },
  {
    "id": "compass",
    "name": "Compass",
    "nameSi": "මාලිමාව",
    "nameTa": "திசைகாட்டி",
    "componentName": "CompassIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "NPP / JVP (National People's Power)",
      "ජාතික ජන බලවේගය / ජවිපෙ",
      "தேசிய மக்கள் சக்தி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2025-pres-national-NPP>",
    "electionAliases": [
      "lk-election-symbols-2025-pres-national-npp",
      "lk-election-symbols-2024-pres-national-npp",
      "lk-election-symbols-2024-parl-national-npp",
      "lk-election-symbols-2024-parl-colombo-npp",
      "lk-election-symbols-2024-parl-gampaha-npp",
      "lk-election-symbols-2024-parl-kandy-npp",
      "lk-election-symbols-2024-parl-jaffna-npp",
      "lk-election-symbols-2024-parl-digamadulla-npp",
      "lk-election-symbols-2020-parl-national-npp",
      "lk-election-symbols-2020-parl-national-jjb",
      "lk-election-symbols-2019-pres-national-nmpp",
      "lk-election-symbols-2019-pres-national-npp"
    ],
    "tags": [
      "2024",
      "திசைகாட்டி",
      "2019",
      "parl",
      "nmpp",
      "compass",
      "jjb",
      "lk-election-symbols-2025-pres-national-npp",
      "s",
      "power",
      "npp",
      "digamadulla",
      "colombo",
      "jaffna",
      "2020",
      "people",
      "gampaha",
      "මාලිමාව",
      "national",
      "pres",
      "jvp",
      "2025",
      "kandy"
    ],
    "isPopular": true
  },
  {
    "id": "conch-shell",
    "name": "Conch Shell",
    "nameSi": "හක්ගෙඩිය",
    "nameTa": "சங்கு",
    "componentName": "ConchShellIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "National Congress",
      "ජාතික කොංග්‍රසය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2004-parl-national-jhu>",
    "electionAliases": [
      "lk-election-symbols-2004-parl-national-jhu"
    ],
    "tags": [
      "හක්ගෙඩිය",
      "shell",
      "conch shell",
      "jhu",
      "conch-shell",
      "சங்கு",
      "national",
      "lk-election-symbols-2004-parl-national-jhu",
      "congress",
      "2004",
      "conch",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "corn",
    "name": "Corn",
    "nameSi": "ඉරිඟු",
    "nameTa": "மக்காச்சோளம்",
    "componentName": "CornIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-corn>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-corn"
    ],
    "tags": [
      "ඉරිඟු",
      "மக்காச்சோளம்",
      "lk-election-symbols-2024-parl-national-corn",
      "corn"
    ],
    "isPopular": false
  },
  {
    "id": "crane",
    "name": "Crane",
    "nameSi": "ක්‍රේන් රථය",
    "nameTa": "கிரேன்",
    "componentName": "CraneIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-crane>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-crane"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-crane",
      "கிரேன்",
      "ක්‍රේන් රථය",
      "crane"
    ],
    "isPopular": false
  },
  {
    "id": "cricket-bat",
    "name": "Cricket Bat",
    "nameSi": "ක්‍රිකට් පිත්ත",
    "nameTa": "மட்டை",
    "componentName": "CricketBatIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-cricket-bat>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-cricket-bat"
    ],
    "tags": [
      "cricket-bat",
      "bat",
      "ක්‍රිකට් පිත්ත",
      "lk-election-symbols-2024-parl-national-cricket-bat",
      "cricket bat",
      "cricket",
      "மட்டை"
    ],
    "isPopular": false
  },
  {
    "id": "crocodile",
    "name": "Crocodile",
    "nameSi": "කිඹුලා",
    "nameTa": "முதலை",
    "componentName": "CrocodileIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-crocodile>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-crocodile"
    ],
    "tags": [
      "முதலை",
      "crocodile",
      "lk-election-symbols-2024-parl-national-crocodile",
      "කිඹුලා"
    ],
    "isPopular": false
  },
  {
    "id": "crown",
    "name": "Crown",
    "nameSi": "ඔටුන්න",
    "nameTa": "கிரீடம்",
    "componentName": "CrownIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-crown>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-crown"
    ],
    "tags": [
      "கிரீடம்",
      "lk-election-symbols-2024-parl-national-crown",
      "ඔටුන්න",
      "crown"
    ],
    "isPopular": false
  },
  {
    "id": "cup",
    "name": "Cup",
    "nameSi": "කෝප්පය",
    "nameTa": "கோப்பை",
    "componentName": "CupIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Muslim National Alliance",
      "මුස්ලිම් ජාතික සන්ධානය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-CUP>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-cup"
    ],
    "tags": [
      "muslim",
      "கோப்பை",
      "cup",
      "national",
      "කෝප්පය",
      "lk-election-symbols-2024-parl-national-cup",
      "alliance"
    ],
    "isPopular": true
  },
  {
    "id": "deer",
    "name": "Deer",
    "nameSi": "මුවා",
    "nameTa": "மான்",
    "componentName": "DeerIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-deer>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-deer"
    ],
    "tags": [
      "මුවා",
      "மான்",
      "deer",
      "lk-election-symbols-2024-parl-national-deer"
    ],
    "isPopular": false
  },
  {
    "id": "diamond",
    "name": "Diamond",
    "nameSi": "දියමන්තිය",
    "nameTa": "வைரம்",
    "componentName": "DiamondIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-diamond>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-diamond"
    ],
    "tags": [
      "diamond",
      "lk-election-symbols-2024-parl-national-diamond",
      "வைரம்",
      "දියමන්තිය"
    ],
    "isPopular": false
  },
  {
    "id": "dog",
    "name": "Dog",
    "nameSi": "බල්ලා",
    "nameTa": "நாய்",
    "componentName": "DogIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-dog>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-dog"
    ],
    "tags": [
      "நாய்",
      "බල්ලා",
      "dog",
      "lk-election-symbols-2024-parl-national-dog"
    ],
    "isPopular": false
  },
  {
    "id": "double-flags",
    "name": "Double Flags",
    "nameSi": "ද්විත්ව කොඩි",
    "nameTa": "இரட்டைக் கொடிகள்",
    "componentName": "DoubleFlagsIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Democratic Left Front",
      "ප්‍රජාතන්ත්‍රවාදී වාමාංශික පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-DOUBLE-FLAGS>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-double-flags"
    ],
    "tags": [
      "ද්විත්ව කොඩි",
      "double-flags",
      "front",
      "flags",
      "double flags",
      "இரட்டைக் கொடிகள்",
      "double",
      "democratic",
      "left",
      "lk-election-symbols-2024-parl-national-double-flags"
    ],
    "isPopular": true
  },
  {
    "id": "drum",
    "name": "Drum",
    "nameSi": "බෙරය",
    "nameTa": "மேளம்",
    "componentName": "DrumIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-drum>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-drum"
    ],
    "tags": [
      "மேளம்",
      "drum",
      "lk-election-symbols-2024-parl-national-drum",
      "බෙරය"
    ],
    "isPopular": false
  },
  {
    "id": "eagle",
    "name": "Eagle",
    "nameSi": "රාජාලියා",
    "nameTa": "கழுகு",
    "componentName": "EagleIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-eagle>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-eagle"
    ],
    "tags": [
      "රාජාලියා",
      "eagle",
      "lk-election-symbols-2024-parl-national-eagle",
      "கழுகு"
    ],
    "isPopular": false
  },
  {
    "id": "ear-of-paddy",
    "name": "Ear of Paddy",
    "nameSi": "වී කරල",
    "nameTa": "நெற்கதிர்",
    "componentName": "EarOfPaddyIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Communist Party of Sri Lanka (CPSL)",
      "ශ්‍රී ලංකාවේ කොමියුනිස්ට් පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-CPSL>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-cpsl"
    ],
    "tags": [
      "நெற்கதிர்",
      "cpsl",
      "වී කරල",
      "ear of paddy",
      "ear-of-paddy",
      "sri",
      "lanka",
      "lk-election-symbols-2024-parl-national-cpsl",
      "ear",
      "communist",
      "party",
      "of",
      "paddy"
    ],
    "isPopular": true
  },
  {
    "id": "ear",
    "name": "Ear",
    "nameSi": "කන",
    "nameTa": "காது",
    "componentName": "EarIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ear>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-ear"
    ],
    "tags": [
      "කන",
      "ear",
      "காது",
      "lk-election-symbols-2024-parl-national-ear"
    ],
    "isPopular": false
  },
  {
    "id": "electric-bulb",
    "name": "Electric Bulb",
    "nameSi": "විදුලි බුබුල",
    "nameTa": "மின்சார குமிழ்",
    "componentName": "ElectricBulbIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Citizen's Front",
      "පුරවැසි පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ELECTRIC-BULB>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-electric-bulb"
    ],
    "tags": [
      "electric",
      "bulb",
      "front",
      "s",
      "electric bulb",
      "electric-bulb",
      "විදුලි බුබුල",
      "lk-election-symbols-2024-parl-national-electric-bulb",
      "மின்சார குமிழ்",
      "citizen"
    ],
    "isPopular": true
  },
  {
    "id": "elephant",
    "name": "Elephant",
    "nameSi": "අලියා",
    "nameTa": "யானை",
    "componentName": "ElephantIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "UNP (United National Party)",
      "එක්සත් ජාතික පක්ෂය",
      "ஐக்கிய தேசியக் கட்சி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-UNP>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-unp",
      "lk-election-symbols-2024-parl-national-unp",
      "lk-election-symbols-2024-parl-colombo-unp",
      "lk-election-symbols-2020-parl-national-unp",
      "lk-election-symbols-2015-parl-national-unp",
      "lk-election-symbols-2010-parl-national-unp",
      "lk-election-symbols-2005-pres-national-unp",
      "lk-election-symbols-2004-parl-national-unp",
      "lk-election-symbols-2001-parl-national-unp",
      "lk-election-symbols-2000-parl-national-unp",
      "lk-election-symbols-1999-pres-national-unp",
      "lk-election-symbols-1994-pres-national-unp",
      "lk-election-symbols-1994-parl-national-unp"
    ],
    "tags": [
      "2024",
      "யானை",
      "අලියා",
      "2000",
      "2004",
      "parl",
      "2001",
      "1999",
      "2010",
      "lk-election-symbols-2024-parl-national-unp",
      "colombo",
      "2020",
      "unp",
      "1994",
      "national",
      "party",
      "pres",
      "2005",
      "united",
      "2015",
      "elephant"
    ],
    "isPopular": true
  },
  {
    "id": "envelope",
    "name": "Envelope",
    "nameSi": "ලියුම් කවරය",
    "nameTa": "கடித உறை",
    "componentName": "EnvelopeIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-envelope>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-envelope"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-envelope",
      "ලියුම් කවරය",
      "envelope",
      "கடித உறை"
    ],
    "isPopular": false
  },
  {
    "id": "eye",
    "name": "Eye",
    "nameSi": "ඇස",
    "nameTa": "கண்",
    "componentName": "EyeIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "SLMP (Sri Lanka Mahajana Pakshaya)",
      "ශ්‍රී ලංකා මහජන පක්ෂය",
      "ஸ்ரீலங்கா மக்கள் கட்சி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-SLMP>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-slmp"
    ],
    "tags": [
      "lanka",
      "sri",
      "slmp",
      "pakshaya",
      "lk-election-symbols-2024-parl-national-slmp",
      "கண்",
      "eye",
      "mahajana",
      "ඇස"
    ],
    "isPopular": true
  },
  {
    "id": "farmer",
    "name": "Farmer",
    "nameSi": "ගොවියා",
    "nameTa": "விவசாயி",
    "componentName": "FarmerIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-farmer>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-farmer"
    ],
    "tags": [
      "farmer",
      "ගොවියා",
      "lk-election-symbols-2024-parl-national-farmer",
      "விவசாயி"
    ],
    "isPopular": false
  },
  {
    "id": "fish",
    "name": "Fish",
    "nameSi": "මළුවා",
    "nameTa": "மீன்",
    "componentName": "FishIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Tamil National People's Front (TNPF)",
      "දෙමළ ජාතික ජනතා පෙරමුණ",
      "தமிழ் தேசிய மக்கள் முன்னணி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-tnpf>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tnpf",
      "lk-election-symbols-2024-parl-jaffna-tnpf",
      "lk-election-symbols-2020-parl-national-tnpf"
    ],
    "tags": [
      "people",
      "2024",
      "front",
      "மீன்",
      "s",
      "tamil",
      "lk-election-symbols-2024-parl-national-tnpf",
      "national",
      "fish",
      "tnpf",
      "මළුවා",
      "jaffna",
      "2020",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "flag",
    "name": "Flag",
    "nameSi": "කොඩිය",
    "nameTa": "கொடி",
    "componentName": "FlagIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-flag>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-flag"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-flag",
      "කොඩිය",
      "கொடி",
      "flag"
    ],
    "isPopular": false
  },
  {
    "id": "flaming-torch",
    "name": "Flaming Torch",
    "nameSi": "පන්දම",
    "nameTa": "தீப்பந்தம்",
    "componentName": "FlamingTorchIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Eelam People's Revolutionary Liberation Front (EPRLF)",
      "ඊ.පී.ආර්.එල්.එෆ්"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-EPRLF>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-eprlf"
    ],
    "tags": [
      "people",
      "eprlf",
      "தீப்பந்தம்",
      "front",
      "පන්දම",
      "s",
      "flaming torch",
      "torch",
      "revolutionary",
      "lk-election-symbols-2024-parl-national-eprlf",
      "flaming-torch",
      "flaming",
      "eelam",
      "liberation"
    ],
    "isPopular": true
  },
  {
    "id": "flower-bud",
    "name": "Flower Bud",
    "nameSi": "නෙළුම් පොහොට්ටුව",
    "nameTa": "தாமரை மொட்டு",
    "componentName": "FlowerBudIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "SLPP (Sri Lanka Podujana Peramuna)",
      "ශ්‍රී ලංකා පොදුජන පෙරමුණ",
      "ஸ்ரீ லங்கா பொதுஜன பெரமுன"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-pres-national-SLPP>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-slpp",
      "lk-election-symbols-2024-parl-national-slpp",
      "lk-election-symbols-2024-parl-colombo-slpp",
      "lk-election-symbols-2020-parl-national-slpp",
      "lk-election-symbols-2019-pres-national-slpp"
    ],
    "tags": [
      "2024",
      "தாமரை மொட்டு",
      "2019",
      "podujana",
      "parl",
      "peramuna",
      "bud",
      "colombo",
      "lk-election-symbols-2024-pres-national-slpp",
      "2020",
      "flower-bud",
      "slpp",
      "lanka",
      "flower",
      "flower bud",
      "නෙළුම් පොහොට්ටුව",
      "national",
      "pres",
      "sri"
    ],
    "isPopular": true
  },
  {
    "id": "flower-vase",
    "name": "Flower Vase",
    "nameSi": "මල් බඳුන",
    "nameTa": "பூச்சாடி",
    "componentName": "FlowerVaseIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-flower-vase>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-flower-vase"
    ],
    "tags": [
      "vase",
      "flower vase",
      "flower",
      "lk-election-symbols-2024-parl-national-flower-vase",
      "பூச்சாடி",
      "flower-vase",
      "මල් බඳුන"
    ],
    "isPopular": false
  },
  {
    "id": "flower",
    "name": "Flower",
    "nameSi": "මල",
    "nameTa": "பூ",
    "componentName": "FlowerIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-flower>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-flower"
    ],
    "tags": [
      "මල",
      "பூ",
      "lk-election-symbols-2024-parl-national-flower",
      "flower"
    ],
    "isPopular": false
  },
  {
    "id": "fly",
    "name": "Fly",
    "nameSi": "මැස්සා",
    "nameTa": "ஈ",
    "componentName": "FlyIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-fly>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-fly"
    ],
    "tags": [
      "ஈ",
      "fly",
      "මැස්සා",
      "lk-election-symbols-2024-parl-national-fly"
    ],
    "isPopular": false
  },
  {
    "id": "foot-ball",
    "name": "Foot Ball",
    "nameSi": "පාපන්දුව",
    "nameTa": "கால்பந்து",
    "componentName": "FootBallIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-foot-ball>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-foot-ball"
    ],
    "tags": [
      "ball",
      "கால்பந்து",
      "lk-election-symbols-2024-parl-national-foot-ball",
      "foot-ball",
      "foot ball",
      "පාපන්දුව",
      "foot"
    ],
    "isPopular": false
  },
  {
    "id": "fork",
    "name": "Fork",
    "nameSi": "ගෑරුප්පුව",
    "nameTa": "முட்கரண்டி",
    "componentName": "ForkIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-fork>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-fork"
    ],
    "tags": [
      "fork",
      "முட்கரண்டி",
      "ගෑරුප්පුව",
      "lk-election-symbols-2024-parl-national-fork"
    ],
    "isPopular": false
  },
  {
    "id": "fruit-basket",
    "name": "Fruit Basket",
    "nameSi": "පළතුරු කූඩය",
    "nameTa": "பழக்கூடை",
    "componentName": "FruitBasketIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-fruit-basket>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-fruit-basket"
    ],
    "tags": [
      "fruit",
      "basket",
      "lk-election-symbols-2024-parl-national-fruit-basket",
      "பழக்கூடை",
      "පළතුරු කූඩය",
      "fruit basket",
      "fruit-basket"
    ],
    "isPopular": false
  },
  {
    "id": "gas-cylinder",
    "name": "Gas Cylinder",
    "nameSi": "ගෑස් සිලින්ඩරය",
    "nameTa": "எரிவாயு உருளை",
    "componentName": "GasCylinderIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-pres-national-IND16>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-ind16",
      "lk-election-symbols-2024-pres-national-ind-16",
      "lk-election-symbols-2024-pres-national-gas-cylinder",
      "lk-election-symbols-2024-pres-national-ranil"
    ],
    "tags": [
      "2024",
      "ranil",
      "ind",
      "ind16",
      "lk-election-symbols-2024-pres-national-ind16",
      "national",
      "எரிவாயு உருளை",
      "gas-cylinder",
      "gas",
      "pres",
      "gas cylinder",
      "cylinder",
      "ගෑස් සිලින්ඩරය",
      "16"
    ],
    "isPopular": false
  },
  {
    "id": "giraffe",
    "name": "Giraffe",
    "nameSi": "සිරාෆ්",
    "nameTa": "ஒட்டகச்சிவிங்கி",
    "componentName": "GiraffeIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-giraffe>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-giraffe"
    ],
    "tags": [
      "ஒட்டகச்சிவிங்கி",
      "lk-election-symbols-2024-parl-national-giraffe",
      "giraffe",
      "සිරාෆ්"
    ],
    "isPopular": false
  },
  {
    "id": "goblet",
    "name": "Goblet",
    "nameSi": "කූජාව",
    "nameTa": "கூஜா",
    "componentName": "GobletIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-goblet>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-goblet"
    ],
    "tags": [
      "goblet",
      "கூஜா",
      "කූජාව",
      "lk-election-symbols-2024-parl-national-goblet"
    ],
    "isPopular": false
  },
  {
    "id": "guitar",
    "name": "Guitar",
    "nameSi": "ගිටාරය",
    "nameTa": "கித்தார்",
    "componentName": "GuitarIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-guitar>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-guitar"
    ],
    "tags": [
      "கித்தார்",
      "guitar",
      "lk-election-symbols-2024-parl-national-guitar",
      "ගිටාරය"
    ],
    "isPopular": false
  },
  {
    "id": "hand-axe",
    "name": "Hand Axe",
    "nameSi": "පොරව",
    "nameTa": "கோடரி",
    "componentName": "HandAxeIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-hand-axe>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-hand-axe"
    ],
    "tags": [
      "கோடரி",
      "lk-election-symbols-2024-parl-national-hand-axe",
      "hand-axe",
      "axe",
      "hand",
      "පොරව",
      "hand axe"
    ],
    "isPopular": false
  },
  {
    "id": "hand-bag",
    "name": "Hand Bag",
    "nameSi": "අත්බෑගය",
    "nameTa": "கைப்பை",
    "componentName": "HandBagIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-hand-bag>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-hand-bag"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-hand-bag",
      "අත්බෑගය",
      "கைப்பை",
      "bag",
      "hand-bag",
      "hand",
      "hand bag"
    ],
    "isPopular": false
  },
  {
    "id": "hand-lens",
    "name": "Hand Lens",
    "nameSi": "විශාලක වීදුරුව",
    "nameTa": "பூதக்கண்ணாடி",
    "componentName": "HandLensIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-hand-lens>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-hand-lens"
    ],
    "tags": [
      "hand-lens",
      "lens",
      "பூதக்கண்ணாடி",
      "hand lens",
      "hand",
      "විශාලක වීදුරුව",
      "lk-election-symbols-2024-parl-national-hand-lens"
    ],
    "isPopular": false
  },
  {
    "id": "hand-tractor",
    "name": "Hand Tractor",
    "nameSi": "අත් ට්‍රැක්ටරය",
    "nameTa": "கை உழவு இயந்திரம்",
    "componentName": "HandTractorIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-hand-tractor>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-hand-tractor"
    ],
    "tags": [
      "hand tractor",
      "අත් ට්‍රැක්ටරය",
      "கை உழவு இயந்திரம்",
      "lk-election-symbols-2024-parl-national-hand-tractor",
      "hand",
      "hand-tractor",
      "tractor"
    ],
    "isPopular": false
  },
  {
    "id": "hand",
    "name": "Hand",
    "nameSi": "අත",
    "nameTa": "கை",
    "componentName": "HandIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "SLFP (Sri Lanka Freedom Party)",
      "ශ්‍රී ලංකා නිදහස් පක්ෂය",
      "ஸ்ரீ லங்கா சுதந்திரக் கட்சி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-slfp>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-slfp",
      "lk-election-symbols-2020-parl-national-slfp"
    ],
    "tags": [
      "2024",
      "lanka",
      "sri",
      "slfp",
      "freedom",
      "lk-election-symbols-2024-parl-national-slfp",
      "අත",
      "national",
      "party",
      "hand",
      "parl",
      "2020",
      "கை"
    ],
    "isPopular": true
  },
  {
    "id": "hat",
    "name": "Hat",
    "nameSi": "තොප්පිය",
    "nameTa": "தொப்பி",
    "componentName": "HatIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-hat>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-hat"
    ],
    "tags": [
      "තොප්පිය",
      "lk-election-symbols-2024-parl-national-hat",
      "hat",
      "தொப்பி"
    ],
    "isPopular": false
  },
  {
    "id": "helicopter",
    "name": "Helicopter",
    "nameSi": "හෙලිකොප්ටරය",
    "nameTa": "ஹெலிகாப்டர்",
    "componentName": "HelicopterIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-helicopter>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-helicopter"
    ],
    "tags": [
      "helicopter",
      "හෙලිකොප්ටරය",
      "lk-election-symbols-2024-parl-national-helicopter",
      "ஹெலிகாப்டர்"
    ],
    "isPopular": false
  },
  {
    "id": "horn",
    "name": "Horn",
    "nameSi": "නලාව",
    "nameTa": "ஊதுகுழல்",
    "componentName": "HornIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-horn>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-horn"
    ],
    "tags": [
      "නලාව",
      "lk-election-symbols-2024-parl-national-horn",
      "horn",
      "ஊதுகுழல்"
    ],
    "isPopular": false
  },
  {
    "id": "horse-shoe",
    "name": "Horse Shoe",
    "nameSi": "ලාඩම",
    "nameTa": "குதிரை லாடம்",
    "componentName": "HorseShoeIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-horse-shoe>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-horse-shoe"
    ],
    "tags": [
      "ලාඩම",
      "shoe",
      "horse",
      "horse-shoe",
      "குதிரை லாடம்",
      "lk-election-symbols-2024-parl-national-horse-shoe",
      "horse shoe"
    ],
    "isPopular": false
  },
  {
    "id": "horse",
    "name": "Horse",
    "nameSi": "අශ්වයා",
    "nameTa": "குதிரை",
    "componentName": "HorseIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "United National Alliance",
      "එක්සත් ජාතික සන්ධානය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-HORSE>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-horse"
    ],
    "tags": [
      "horse",
      "united",
      "national",
      "alliance",
      "lk-election-symbols-2024-parl-national-horse",
      "අශ්වයා",
      "குதிரை"
    ],
    "isPopular": true
  },
  {
    "id": "house",
    "name": "House",
    "nameSi": "නිවස",
    "nameTa": "வீடு",
    "componentName": "HouseIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "ITAK / TNA (Ilankai Tamil Arasu Kadchi)",
      "ඉලංගෙයි තමිළ් අරසු කච්චි",
      "இலங்கைத் தமிழரசுக் கட்சி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ITAK>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-itak",
      "lk-election-symbols-2024-parl-national-itak",
      "lk-election-symbols-2024-parl-jaffna-itak",
      "lk-election-symbols-2024-parl-batticaloa-itak",
      "lk-election-symbols-2020-parl-national-itak",
      "lk-election-symbols-2015-parl-national-itak",
      "lk-election-symbols-2004-parl-national-itak"
    ],
    "tags": [
      "2024",
      "kadchi",
      "2004",
      "itak",
      "parl",
      "නිවස",
      "house",
      "tamil",
      "jaffna",
      "2020",
      "ilankai",
      "வீடு",
      "arasu",
      "national",
      "pres",
      "tna",
      "lk-election-symbols-2024-parl-national-itak",
      "2015",
      "batticaloa"
    ],
    "isPopular": true
  },
  {
    "id": "ice-cream",
    "name": "Ice Cream",
    "nameSi": "අයිස්ක්‍රීම්",
    "nameTa": "ஐஸ்கிரீம்",
    "componentName": "IceCreamIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ice-cream>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-ice-cream"
    ],
    "tags": [
      "අයිස්ක්‍රීම්",
      "ice cream",
      "ice",
      "lk-election-symbols-2024-parl-national-ice-cream",
      "ice-cream",
      "cream",
      "ஐஸ்கிரீம்"
    ],
    "isPopular": false
  },
  {
    "id": "immersion-heater",
    "name": "Immersion Heater",
    "nameSi": "හීටරය",
    "nameTa": "ஹீட்டர்",
    "componentName": "ImmersionHeaterIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-immersion-heater>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-immersion-heater"
    ],
    "tags": [
      "immersion-heater",
      "immersion",
      "immersion heater",
      "ஹீட்டர்",
      "හීටරය",
      "heater",
      "lk-election-symbols-2024-parl-national-immersion-heater"
    ],
    "isPopular": false
  },
  {
    "id": "iron",
    "name": "Iron",
    "nameSi": "ඉස්ත්‍රික්කය",
    "nameTa": "இஸ்திரிப் பெட்டி",
    "componentName": "IronIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-iron>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-iron"
    ],
    "tags": [
      "ඉස්ත්‍රික්කය",
      "iron",
      "இஸ்திரிப் பெட்டி",
      "lk-election-symbols-2024-parl-national-iron"
    ],
    "isPopular": false
  },
  {
    "id": "jak-fruit",
    "name": "Jak Fruit",
    "nameSi": "කොස් ගෙඩිය",
    "nameTa": "பலாப்பழம்",
    "componentName": "JakFruitIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-jak-fruit>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-jak-fruit"
    ],
    "tags": [
      "fruit",
      "lk-election-symbols-2024-parl-national-jak-fruit",
      "jak fruit",
      "jak-fruit",
      "பலாப்பழம்",
      "jak",
      "කොස් ගෙඩිය"
    ],
    "isPopular": false
  },
  {
    "id": "jeep",
    "name": "Jeep",
    "nameSi": "ජීප් රථය",
    "nameTa": "ஜீப்",
    "componentName": "JeepIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-jeep>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-jeep"
    ],
    "tags": [
      "jeep",
      "lk-election-symbols-2024-parl-national-jeep",
      "ජීප් රථය",
      "ஜீப்"
    ],
    "isPopular": false
  },
  {
    "id": "jug",
    "name": "Jug",
    "nameSi": "ජෝගුව",
    "nameTa": "ஜக்",
    "componentName": "JugIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-jug>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-jug"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-jug",
      "ஜக்",
      "jug",
      "ජෝගුව"
    ],
    "isPopular": false
  },
  {
    "id": "kangaroo",
    "name": "Kangaroo",
    "nameSi": "කැන්ගරුවා",
    "nameTa": "கங்காரு",
    "componentName": "KangarooIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-kangaroo>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-kangaroo"
    ],
    "tags": [
      "කැන්ගරුවා",
      "கங்காரு",
      "lk-election-symbols-2024-parl-national-kangaroo",
      "kangaroo"
    ],
    "isPopular": false
  },
  {
    "id": "kettle",
    "name": "Kettle",
    "nameSi": "කේතලය",
    "nameTa": "தேநீர் கெண்டி",
    "componentName": "KettleIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-kettle>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-kettle"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-kettle",
      "kettle",
      "தேநீர் கெண்டி",
      "කේතලය"
    ],
    "isPopular": false
  },
  {
    "id": "key",
    "name": "Key",
    "nameSi": "යතුර",
    "nameTa": "சாவி",
    "componentName": "KeyIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-key>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-key"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-key",
      "key",
      "යතුර",
      "சாவி"
    ],
    "isPopular": false
  },
  {
    "id": "kite",
    "name": "Kite",
    "nameSi": "සරුංගලය",
    "nameTa": "பட்டம்",
    "componentName": "KiteIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-kite>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-kite"
    ],
    "tags": [
      "සරුංගලය",
      "பட்டம்",
      "kite",
      "lk-election-symbols-2024-parl-national-kite"
    ],
    "isPopular": false
  },
  {
    "id": "ladder",
    "name": "Ladder",
    "nameSi": "ඉණිමඟ",
    "nameTa": "ஏணி",
    "componentName": "LadderIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ladder>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-ladder"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-ladder",
      "ஏணி",
      "ඉණිමඟ",
      "ladder"
    ],
    "isPopular": false
  },
  {
    "id": "light-house",
    "name": "Light House",
    "nameSi": "ප්‍රදීපාගාරය",
    "nameTa": "கலங்கரை விளக்கம்",
    "componentName": "LightHouseIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-light-house>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-light-house"
    ],
    "tags": [
      "light-house",
      "house",
      "lk-election-symbols-2024-parl-national-light-house",
      "light",
      "ප්‍රදීපාගාරය",
      "கலங்கரை விளக்கம்",
      "light house"
    ],
    "isPopular": false
  },
  {
    "id": "light-pole",
    "name": "Light Pole",
    "nameSi": "විදුලි කණුව",
    "nameTa": "மின் கம்பம்",
    "componentName": "LightPoleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-light-pole>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-light-pole"
    ],
    "tags": [
      "විදුලි කණුව",
      "lk-election-symbols-2024-parl-national-light-pole",
      "light pole",
      "light",
      "மின் கம்பம்",
      "pole",
      "light-pole"
    ],
    "isPopular": false
  },
  {
    "id": "locomotive-engine",
    "name": "Locomotive Engine",
    "nameSi": "දුම්රිය එන්ජිම",
    "nameTa": "புகையிரத என்ஜின்",
    "componentName": "LocomotiveEngineIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-locomotive-engine>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-locomotive-engine"
    ],
    "tags": [
      "புகையிரத என்ஜின்",
      "locomotive-engine",
      "locomotive engine",
      "engine",
      "locomotive",
      "දුම්රිය එන්ජිම",
      "lk-election-symbols-2024-parl-national-locomotive-engine"
    ],
    "isPopular": false
  },
  {
    "id": "mammoty",
    "name": "Mammoty",
    "nameSi": "උදැල්ල",
    "nameTa": "மண்வெட்டி",
    "componentName": "MammotyIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Akila Ilankai Dravida Mahasabha",
      "අඛිල ඉලංගෙයි ද්‍රවිඩ මහාසභාව"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-MAMMOTY>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-mammoty"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-mammoty",
      "dravida",
      "උදැල්ල",
      "மண்வெட்டி",
      "mahasabha",
      "mammoty",
      "akila",
      "ilankai"
    ],
    "isPopular": true
  },
  {
    "id": "mango",
    "name": "Mango",
    "nameSi": "අඹ",
    "nameTa": "மாம்பழம்",
    "componentName": "MangoIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-mango>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-mango"
    ],
    "tags": [
      "අඹ",
      "lk-election-symbols-2024-parl-national-mango",
      "மாம்பழம்",
      "mango"
    ],
    "isPopular": false
  },
  {
    "id": "mega-phone",
    "name": "Mega Phone",
    "nameSi": "ශබ්ද විකාශන යන්ත්‍රය",
    "nameTa": "ஒலிபெருக்கி",
    "componentName": "MegaPhoneIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-mega-phone>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-mega-phone"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-mega-phone",
      "mega",
      "phone",
      "mega-phone",
      "ශබ්ද විකාශන යන්ත්‍රය",
      "mega phone",
      "ஒலிபெருக்கி"
    ],
    "isPopular": false
  },
  {
    "id": "microphone",
    "name": "Microphone",
    "nameSi": "මයික්‍රෆෝනය",
    "nameTa": "ஒலிவாங்கி",
    "componentName": "MicrophoneIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-microphone>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-microphone"
    ],
    "tags": [
      "microphone",
      "මයික්‍රෆෝනය",
      "ஒலிவாங்கி",
      "lk-election-symbols-2024-parl-national-microphone"
    ],
    "isPopular": false
  },
  {
    "id": "mobile-phone",
    "name": "Mobile Phone",
    "nameSi": "ජංගම දුරකථනය",
    "nameTa": "கைபேசி",
    "componentName": "MobilePhoneIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Liberal Party",
      "ලිබරල් පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-MOBILE-PHONE>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-mobile-phone"
    ],
    "tags": [
      "mobile-phone",
      "lk-election-symbols-2024-parl-national-mobile-phone",
      "mobile phone",
      "ජංගම දුරකථනය",
      "mobile",
      "phone",
      "party",
      "liberal",
      "கைபேசி"
    ],
    "isPopular": true
  },
  {
    "id": "mortar",
    "name": "Mortar",
    "nameSi": "වංගෙඩිය",
    "nameTa": "உரல்",
    "componentName": "MortarIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-mortar>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-mortar"
    ],
    "tags": [
      "உரல்",
      "lk-election-symbols-2024-parl-national-mortar",
      "වංගෙඩිය",
      "mortar"
    ],
    "isPopular": false
  },
  {
    "id": "motor-bicycle",
    "name": "Motor Bicycle",
    "nameSi": "යතුරුපැදිය",
    "nameTa": "மோட்டார் சைக்கிள்",
    "componentName": "MotorBicycleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-motor-bicycle>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-motor-bicycle"
    ],
    "tags": [
      "motor",
      "යතුරුපැදිය",
      "lk-election-symbols-2024-parl-national-motor-bicycle",
      "மோட்டார் சைக்கிள்",
      "bicycle",
      "motor bicycle",
      "motor-bicycle"
    ],
    "isPopular": false
  },
  {
    "id": "motor-car",
    "name": "Motor Car",
    "nameSi": "මෝටර් රථය",
    "nameTa": "மகிழுந்து",
    "componentName": "MotorCarIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-motor-car>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-motor-car"
    ],
    "tags": [
      "motor-car",
      "motor car",
      "car",
      "මෝටර් රථය",
      "மகிழுந்து",
      "lk-election-symbols-2024-parl-national-motor-car",
      "motor"
    ],
    "isPopular": false
  },
  {
    "id": "mouse",
    "name": "Mouse",
    "nameSi": "මීයා",
    "nameTa": "எலி",
    "componentName": "MouseIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-mouse>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-mouse"
    ],
    "tags": [
      "எலி",
      "lk-election-symbols-2024-parl-national-mouse",
      "mouse",
      "මීයා"
    ],
    "isPopular": false
  },
  {
    "id": "nut-cracker",
    "name": "Nut Cracker",
    "nameSi": "ගිරය",
    "nameTa": "பாக்குவெட்டி",
    "componentName": "NutCrackerIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-nut-cracker>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-nut-cracker"
    ],
    "tags": [
      "nut",
      "nut cracker",
      "பாக்குவெட்டி",
      "lk-election-symbols-2024-parl-national-nut-cracker",
      "ගිරය",
      "cracker",
      "nut-cracker"
    ],
    "isPopular": false
  },
  {
    "id": "omnibus",
    "name": "Omnibus",
    "nameSi": "බස් රථය",
    "nameTa": "பேருந்து",
    "componentName": "OmnibusIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-omnibus>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-omnibus"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-omnibus",
      "බස් රථය",
      "omnibus",
      "பேருந்து"
    ],
    "isPopular": false
  },
  {
    "id": "orange",
    "name": "Orange",
    "nameSi": "දොඩම්",
    "nameTa": "ஆரஞ்சு",
    "componentName": "OrangeIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-orange>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-orange"
    ],
    "tags": [
      "orange",
      "දොඩම්",
      "ஆரஞ்சு",
      "lk-election-symbols-2024-parl-national-orange"
    ],
    "isPopular": false
  },
  {
    "id": "owl",
    "name": "Owl",
    "nameSi": "බකමූණා",
    "nameTa": "ஆந்தை",
    "componentName": "OwlIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-owl>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-owl"
    ],
    "tags": [
      "ஆந்தை",
      "බකමූණා",
      "owl",
      "lk-election-symbols-2024-parl-national-owl"
    ],
    "isPopular": false
  },
  {
    "id": "padlock",
    "name": "Padlock",
    "nameSi": "ඉබ්බා (අගුල)",
    "nameTa": "பூட்டு",
    "componentName": "PadlockIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-padlock>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-padlock"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-padlock",
      "padlock",
      "பூட்டு",
      "ඉබ්බා (අගුල)"
    ],
    "isPopular": false
  },
  {
    "id": "pair-of-scales",
    "name": "Pair of Scales",
    "nameSi": "තරාදිය",
    "nameTa": "தராசு",
    "componentName": "PairOfScalesIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "NDF (New Democratic Front - Swan/Scales)",
      "නව ප්‍රජාතන්ත්‍රවාදී පෙරමුණ",
      "புதிய ஜனநாயக முன்னணி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-pres-national-ndf>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-ndf",
      "lk-election-symbols-2024-parl-national-ndf",
      "lk-election-symbols-2024-parl-colombo-ndf",
      "lk-election-symbols-2024-parl-gampaha-ndf"
    ],
    "tags": [
      "2024",
      "swan",
      "front",
      "parl",
      "තරාදිය",
      "pair-of-scales",
      "colombo",
      "தராசு",
      "new",
      "gampaha",
      "national",
      "lk-election-symbols-2024-pres-national-ndf",
      "pres",
      "of",
      "pair of scales",
      "ndf",
      "pair",
      "democratic",
      "scales"
    ],
    "isPopular": true
  },
  {
    "id": "pair-of-scissors",
    "name": "Pair of Scissors",
    "nameSi": "කතුර",
    "nameTa": "கத்தரிக்கோல்",
    "componentName": "PairOfScissorsIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-pair-of-scissors>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pair-of-scissors"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-pair-of-scissors",
      "pair-of-scissors",
      "pair",
      "කතුර",
      "pair of scissors",
      "scissors",
      "of",
      "கத்தரிக்கோல்"
    ],
    "isPopular": false
  },
  {
    "id": "pair-of-slippers",
    "name": "Pair of Slippers",
    "nameSi": "සෙරෙප්පු යුගල",
    "nameTa": "செருப்பு",
    "componentName": "PairOfSlippersIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-pair-of-slippers>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pair-of-slippers"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-pair-of-slippers",
      "pair-of-slippers",
      "pair",
      "slippers",
      "செருப்பு",
      "සෙරෙප්පු යුගල",
      "of",
      "pair of slippers"
    ],
    "isPopular": false
  },
  {
    "id": "pair-of-spectacles",
    "name": "Pair of Spectacles",
    "nameSi": "ඇස් කණ්ණාඩි",
    "nameTa": "மூக்குக்கண்ணாடி",
    "componentName": "PairOfSpectaclesIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-pair-of-spectacles>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pair-of-spectacles"
    ],
    "tags": [
      "ඇස් කණ්ණාඩි",
      "pair-of-spectacles",
      "pair of spectacles",
      "pair",
      "lk-election-symbols-2024-parl-national-pair-of-spectacles",
      "spectacles",
      "of",
      "மூக்குக்கண்ணாடி"
    ],
    "isPopular": false
  },
  {
    "id": "panchaudaya",
    "name": "Panchaudaya",
    "nameSi": "පංචායුධය",
    "nameTa": "பஞ்சாயுதம்",
    "componentName": "PanchaudayaIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Nawa Sihala Urumaya",
      "නව සිහල උරුමය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-PANCHAUDAYA>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-panchaudaya"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-panchaudaya",
      "urumaya",
      "பஞ்சாயுதம்",
      "පංචායුධය",
      "nawa",
      "sihala",
      "panchaudaya"
    ],
    "isPopular": true
  },
  {
    "id": "peacock",
    "name": "Peacock",
    "nameSi": "මොනරා",
    "nameTa": "மயில்",
    "componentName": "PeacockIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "ACMC (All Ceylon Makkal Congress)",
      "සමස්ත ලංකා මහජන කොංග්‍රසය",
      "அகில இலங்கை மக்கள் காங்கிரஸ்"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-acmc>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-acmc",
      "lk-election-symbols-2020-parl-national-acmc"
    ],
    "tags": [
      "மயில்",
      "2024",
      "congress",
      "peacock",
      "acmc",
      "lk-election-symbols-2024-parl-national-acmc",
      "all",
      "national",
      "makkal",
      "ceylon",
      "2020",
      "parl",
      "මොනරා"
    ],
    "isPopular": true
  },
  {
    "id": "pen",
    "name": "Pen",
    "nameSi": "පෑන",
    "nameTa": "பேனா",
    "componentName": "PenIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [
      "Devana Parapura",
      "දෙවන පරපුර"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-PEN>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pen"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-pen",
      "devana",
      "පෑන",
      "parapura",
      "pen",
      "பேனா"
    ],
    "isPopular": true
  },
  {
    "id": "pencil",
    "name": "Pencil",
    "nameSi": "පැන්සල",
    "nameTa": "பென்சில்",
    "componentName": "PencilIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-pencil>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pencil"
    ],
    "tags": [
      "පැන්සල",
      "lk-election-symbols-2024-parl-national-pencil",
      "pencil",
      "பென்சில்"
    ],
    "isPopular": false
  },
  {
    "id": "pigeon",
    "name": "Pigeon",
    "nameSi": "පරවියා",
    "nameTa": "புறா",
    "componentName": "PigeonIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Socialist Equality Party",
      "සමාජවාදී සමානතා පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-PIGEON>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pigeon"
    ],
    "tags": [
      "පරවියා",
      "புறா",
      "pigeon",
      "equality",
      "party",
      "lk-election-symbols-2024-parl-national-pigeon",
      "socialist"
    ],
    "isPopular": true
  },
  {
    "id": "pillar-box",
    "name": "Pillar Box",
    "nameSi": "තැපැල් පෙට්ටිය",
    "nameTa": "தபால் பெட்டி",
    "componentName": "PillarBoxIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-pillar-box>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pillar-box"
    ],
    "tags": [
      "තැපැල් පෙට්ටිය",
      "தபால் பெட்டி",
      "box",
      "pillar box",
      "pillar",
      "pillar-box",
      "lk-election-symbols-2024-parl-national-pillar-box"
    ],
    "isPopular": false
  },
  {
    "id": "pineapple",
    "name": "Pineapple",
    "nameSi": "අන්නාසි",
    "nameTa": "அன்னாசி",
    "componentName": "PineappleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-pineapple>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pineapple"
    ],
    "tags": [
      "අන්නාසි",
      "pineapple",
      "அன்னாசி",
      "lk-election-symbols-2024-parl-national-pineapple"
    ],
    "isPopular": false
  },
  {
    "id": "plough",
    "name": "Plough",
    "nameSi": "නගුල",
    "nameTa": "கலப்பை",
    "componentName": "PloughIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-plough>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-plough"
    ],
    "tags": [
      "plough",
      "නගුල",
      "கலப்பை",
      "lk-election-symbols-2024-parl-national-plough"
    ],
    "isPopular": false
  },
  {
    "id": "plug-top",
    "name": "Plug Top",
    "nameSi": "ප්ලග් ටොප් එක",
    "nameTa": "செருகி",
    "componentName": "PlugTopIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-plug-top>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-plug-top"
    ],
    "tags": [
      "plug top",
      "plug-top",
      "ප්ලග් ටොප් එක",
      "top",
      "plug",
      "செருகி",
      "lk-election-symbols-2024-parl-national-plug-top"
    ],
    "isPopular": false
  },
  {
    "id": "pumpkin",
    "name": "Pumpkin",
    "nameSi": "වට්ටක්කා",
    "nameTa": "பூசணிக்காய்",
    "componentName": "PumpkinIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-pumpkin>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-pumpkin"
    ],
    "tags": [
      "pumpkin",
      "பூசணிக்காய்",
      "lk-election-symbols-2024-parl-national-pumpkin",
      "වට්ටක්කා"
    ],
    "isPopular": false
  },
  {
    "id": "rabbit",
    "name": "Rabbit",
    "nameSi": "හාාවා",
    "nameTa": "முயல்",
    "componentName": "RabbitIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-rabbit>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-rabbit"
    ],
    "tags": [
      "முயல்",
      "lk-election-symbols-2024-parl-national-rabbit",
      "rabbit",
      "හාාවා"
    ],
    "isPopular": false
  },
  {
    "id": "radio-set",
    "name": "Radio Set",
    "nameSi": "ගුවන් විදුලි යන්ත්‍රය",
    "nameTa": "வானொலிப்பெட்டி",
    "componentName": "RadioSetIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-radio-set>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-radio-set"
    ],
    "tags": [
      "set",
      "radio",
      "வானொலிப்பெட்டி",
      "ගුවන් විදුලි යන්ත්‍රය",
      "radio set",
      "lk-election-symbols-2024-parl-national-radio-set",
      "radio-set"
    ],
    "isPopular": false
  },
  {
    "id": "rhinoceros",
    "name": "Rhinoceros",
    "nameSi": "කණ්ඩDisplayStyle",
    "nameTa": "காண்டாமிருகம்",
    "componentName": "RhinocerosIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-rhinoceros>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-rhinoceros"
    ],
    "tags": [
      "rhinoceros",
      "කණ්ඩDisplayStyle",
      "lk-election-symbols-2024-parl-national-rhinoceros",
      "காண்டாமிருகம்"
    ],
    "isPopular": false
  },
  {
    "id": "rick-shaw",
    "name": "Rick Shaw",
    "nameSi": "රික්ෂෝව",
    "nameTa": "ரிக்சா",
    "componentName": "RickShawIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-rick-shaw>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-rick-shaw"
    ],
    "tags": [
      "rick shaw",
      "rick-shaw",
      "rick",
      "lk-election-symbols-2024-parl-national-rick-shaw",
      "shaw",
      "රික්ෂෝව",
      "ரிக்சா"
    ],
    "isPopular": false
  },
  {
    "id": "rocket",
    "name": "Rocket",
    "nameSi": "රොකට්ටුව",
    "nameTa": "ராக்கெட்",
    "componentName": "RocketIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-rocket>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-rocket"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-rocket",
      "rocket",
      "ராக்கெட்",
      "රොකට්ටුව"
    ],
    "isPopular": false
  },
  {
    "id": "rose-apple",
    "name": "Rose Apple",
    "nameSi": "ජම්බු",
    "nameTa": "ஜாம்பழம்",
    "componentName": "RoseAppleIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-rose-apple>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-rose-apple"
    ],
    "tags": [
      "rose-apple",
      "ஜாம்பழம்",
      "apple",
      "rose",
      "rose apple",
      "lk-election-symbols-2024-parl-national-rose-apple",
      "ජම්බු"
    ],
    "isPopular": false
  },
  {
    "id": "safety-pin",
    "name": "Safety Pin",
    "nameSi": "අල්පෙනෙත්ත / ආරක්ෂක කටුව",
    "nameTa": "ஊக்கு",
    "componentName": "SafetyPinIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-safety-pin>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-safety-pin"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-safety-pin",
      "safety pin",
      "ஊக்கு",
      "pin",
      "අල්පෙනෙත්ත / ආරක්ෂක කටුව",
      "safety",
      "safety-pin"
    ],
    "isPopular": false
  },
  {
    "id": "saw",
    "name": "Saw",
    "nameSi": "කියත",
    "nameTa": "வாள் / ரம்பம்",
    "componentName": "SawIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-saw>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-saw"
    ],
    "tags": [
      "வாள் / ரம்பம்",
      "lk-election-symbols-2024-parl-national-saw",
      "saw",
      "කියත"
    ],
    "isPopular": false
  },
  {
    "id": "see-saw",
    "name": "See Saw",
    "nameSi": "ඔන්චිල්ලා ලෑල්ල",
    "nameTa": "சீசா",
    "componentName": "SeeSawIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-see-saw>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-see-saw"
    ],
    "tags": [
      "see saw",
      "சீசா",
      "lk-election-symbols-2024-parl-national-see-saw",
      "see",
      "ඔන්චිල්ලා ලෑල්ල",
      "see-saw",
      "saw"
    ],
    "isPopular": false
  },
  {
    "id": "sewing-machine",
    "name": "Sewing Machine",
    "nameSi": "මහන මැෂිම",
    "nameTa": "தையல் இயந்திரம்",
    "componentName": "SewingMachineIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-sewing-machine>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-sewing-machine"
    ],
    "tags": [
      "machine",
      "මහන මැෂිම",
      "sewing-machine",
      "தையல் இயந்திரம்",
      "lk-election-symbols-2024-parl-national-sewing-machine",
      "sewing",
      "sewing machine"
    ],
    "isPopular": false
  },
  {
    "id": "shield",
    "name": "Shield",
    "nameSi": "පලිහ",
    "nameTa": "கேடயம்",
    "componentName": "ShieldIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-shield>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-shield"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-shield",
      "கேடயம்",
      "shield",
      "පලිහ"
    ],
    "isPopular": false
  },
  {
    "id": "ship",
    "name": "Ship",
    "nameSi": "නැව",
    "nameTa": "கப்பல்",
    "componentName": "ShipIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-ship>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-ship"
    ],
    "tags": [
      "கப்பல்",
      "ship",
      "lk-election-symbols-2024-parl-national-ship",
      "නැව"
    ],
    "isPopular": false
  },
  {
    "id": "shirt",
    "name": "Shirt",
    "nameSi": "කමිසය",
    "nameTa": "சட்டை",
    "componentName": "ShirtIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-shirt>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-shirt"
    ],
    "tags": [
      "කමිසය",
      "shirt",
      "lk-election-symbols-2024-parl-national-shirt",
      "சட்டை"
    ],
    "isPopular": false
  },
  {
    "id": "shoe",
    "name": "Shoe",
    "nameSi": "සපත්තුව",
    "nameTa": "காலணி",
    "componentName": "ShoeIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-shoe>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-shoe"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-shoe",
      "shoe",
      "සපත්තුව",
      "காலணி"
    ],
    "isPopular": false
  },
  {
    "id": "sickle",
    "name": "Sickle",
    "nameSi": "දැකැත්ත",
    "nameTa": "அரிவாள்",
    "componentName": "SickleIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Frontline Socialist Party / Left",
      "පෙරටුගාමී සමාජවාදී පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-SICKLE>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-sickle"
    ],
    "tags": [
      "frontline",
      "sickle",
      "left",
      "lk-election-symbols-2024-parl-national-sickle",
      "party",
      "දැකැත්ත",
      "socialist",
      "அரிவாள்"
    ],
    "isPopular": true
  },
  {
    "id": "sledge-hammer",
    "name": "Sledge Hammer",
    "nameSi": "කුළුගෙඩිය",
    "nameTa": "சுத்தியல்",
    "componentName": "SledgeHammerIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-sledge-hammer>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-sledge-hammer"
    ],
    "tags": [
      "sledge hammer",
      "sledge-hammer",
      "hammer",
      "කුළුගෙඩිය",
      "சுத்தியல்",
      "sledge",
      "lk-election-symbols-2024-parl-national-sledge-hammer"
    ],
    "isPopular": false
  },
  {
    "id": "slingshot",
    "name": "Slingshot",
    "nameSi": "කැටපෝලය",
    "nameTa": "கவண்",
    "componentName": "SlingshotIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-slingshot>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-slingshot"
    ],
    "tags": [
      "කැටපෝලය",
      "கவண்",
      "slingshot",
      "lk-election-symbols-2024-parl-national-slingshot"
    ],
    "isPopular": false
  },
  {
    "id": "snail",
    "name": "Snail",
    "nameSi": "ගොළුබෙල්ලා",
    "nameTa": "நத்தை",
    "componentName": "SnailIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-snail>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-snail"
    ],
    "tags": [
      "snail",
      "ගොළුබෙල්ලා",
      "நத்தை",
      "lk-election-symbols-2024-parl-national-snail"
    ],
    "isPopular": false
  },
  {
    "id": "spider",
    "name": "Spider",
    "nameSi": "මකුළුවා",
    "nameTa": "சிலந்தி",
    "componentName": "SpiderIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-spider>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-spider"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-spider",
      "spider",
      "சிலந்தி",
      "මකුළුවා"
    ],
    "isPopular": false
  },
  {
    "id": "spiral",
    "name": "Spiral",
    "nameSi": "දුන්න / ස්පයිරල්",
    "nameTa": "சுருள்",
    "componentName": "SpiralIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-spiral>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-spiral"
    ],
    "tags": [
      "spiral",
      "lk-election-symbols-2024-parl-national-spiral",
      "දුන්න / ස්පයිරල්",
      "சுருள்"
    ],
    "isPopular": false
  },
  {
    "id": "spoon",
    "name": "Spoon",
    "nameSi": "හැන්ද",
    "nameTa": "கரண்டி",
    "componentName": "SpoonIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-spoon>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-spoon"
    ],
    "tags": [
      "spoon",
      "lk-election-symbols-2024-parl-national-spoon",
      "கரண்டி",
      "හැන්ද"
    ],
    "isPopular": false
  },
  {
    "id": "squirrel",
    "name": "Squirrel",
    "nameSi": "ලේනා",
    "nameTa": "அணில்",
    "componentName": "SquirrelIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-squirrel>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-squirrel"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-squirrel",
      "அணில்",
      "ලේනා",
      "squirrel"
    ],
    "isPopular": false
  },
  {
    "id": "star",
    "name": "Star",
    "nameSi": "තරුව",
    "nameTa": "நட்சத்திரம்",
    "componentName": "StarIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Sri Lanka Vanguard Party",
      "ශ්‍රී ලංකා පෙරටුගාමී පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-STAR>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-star"
    ],
    "tags": [
      "vanguard",
      "lk-election-symbols-2024-parl-national-star",
      "lanka",
      "sri",
      "තරුව",
      "party",
      "நட்சத்திரம்",
      "star"
    ],
    "isPopular": true
  },
  {
    "id": "sun",
    "name": "Sun",
    "nameSi": "හිරු / ඉර",
    "nameTa": "சூரியன்",
    "componentName": "SunIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "TULF (Tamil United Liberation Front)",
      "දෙමළ එක්සත් විමුක්ති පෙරමුණ",
      "தமிழர் ஐக்கிய விடுதலை முன்னணி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-TULF>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tulf"
    ],
    "tags": [
      "sun",
      "lk-election-symbols-2024-parl-national-tulf",
      "front",
      "tamil",
      "united",
      "சூரியன்",
      "tulf",
      "හිරු / ඉර",
      "liberation"
    ],
    "isPopular": true
  },
  {
    "id": "swan",
    "name": "Swan",
    "nameSi": "හංසයා",
    "nameTa": "அன்னப்பறவை",
    "componentName": "SwanIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "NDF (New Democratic Front - Swan Alliance)",
      "නව ප්‍රජාතන්ත්‍රවාදී පෙරමුණ",
      "புதிய ஜனநாயக முன்னணி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2019-pres-national-ndf>",
    "electionAliases": [
      "lk-election-symbols-2019-pres-national-ndf",
      "lk-election-symbols-2015-pres-national-ndf",
      "lk-election-symbols-2010-pres-national-ndf"
    ],
    "tags": [
      "ndf",
      "new",
      "அன்னப்பறவை",
      "හංසයා",
      "swan",
      "front",
      "2015",
      "2010",
      "national",
      "pres",
      "2019",
      "alliance",
      "democratic",
      "lk-election-symbols-2019-pres-national-ndf"
    ],
    "isPopular": true
  },
  {
    "id": "swing",
    "name": "Swing",
    "nameSi": "ඔන්චිල්ලාව",
    "nameTa": "ஊஞ்சல்",
    "componentName": "SwingIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-swing>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-swing"
    ],
    "tags": [
      "swing",
      "lk-election-symbols-2024-parl-national-swing",
      "ஊஞ்சல்",
      "ඔන්චිල්ලාව"
    ],
    "isPopular": false
  },
  {
    "id": "sword",
    "name": "Sword",
    "nameSi": "කඩුව",
    "nameTa": "வாள்",
    "componentName": "SwordIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Jathika Sangwardhena Peramuna",
      "ජාතික සංවර්ධන පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-SWORD>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-sword"
    ],
    "tags": [
      "வாள்",
      "jathika",
      "peramuna",
      "sword",
      "කඩුව",
      "sangwardhena",
      "lk-election-symbols-2024-parl-national-sword"
    ],
    "isPopular": true
  },
  {
    "id": "tabla",
    "name": "Tabla",
    "nameSi": "තබ්ලාව",
    "nameTa": "தபேலா",
    "componentName": "TablaIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-tabla>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tabla"
    ],
    "tags": [
      "தபேலா",
      "lk-election-symbols-2024-parl-national-tabla",
      "තබ්ලාව",
      "tabla"
    ],
    "isPopular": false
  },
  {
    "id": "table-fan",
    "name": "Table Fan",
    "nameSi": "මේස පංකාව",
    "nameTa": "மேசை மின்விசிறி",
    "componentName": "TableFanIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-table-fan>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-table-fan"
    ],
    "tags": [
      "table fan",
      "lk-election-symbols-2024-parl-national-table-fan",
      "fan",
      "මේස පංකාව",
      "table-fan",
      "table",
      "மேசை மின்விசிறி"
    ],
    "isPopular": false
  },
  {
    "id": "table",
    "name": "Table",
    "nameSi": "මේසය",
    "nameTa": "மேசை",
    "componentName": "TableIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-table>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-table"
    ],
    "tags": [
      "மேசை",
      "lk-election-symbols-2024-parl-national-table",
      "table",
      "මේසය"
    ],
    "isPopular": false
  },
  {
    "id": "teapoy",
    "name": "Teapoy",
    "nameSi": "ටීපෝව",
    "nameTa": "டீப்பாய்",
    "componentName": "TeapoyIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-teapoy>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-teapoy"
    ],
    "tags": [
      "டீப்பாய்",
      "lk-election-symbols-2024-parl-national-teapoy",
      "ටීපෝව",
      "teapoy"
    ],
    "isPopular": false
  },
  {
    "id": "telephone",
    "name": "Telephone",
    "nameSi": "දුරකථනය",
    "nameTa": "தொலைபேசி",
    "componentName": "TelephoneIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "SJB (Samagi Jana Balawegaya)",
      "සමගි ජන බලවේගය",
      "ஐக்கிய மக்கள் சக்தி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-pres-national-SJB>",
    "electionAliases": [
      "lk-election-symbols-2024-pres-national-sjb",
      "lk-election-symbols-2024-parl-national-sjb",
      "lk-election-symbols-2024-parl-colombo-sjb",
      "lk-election-symbols-2024-parl-gampaha-sjb",
      "lk-election-symbols-2024-parl-kandy-sjb",
      "lk-election-symbols-2020-parl-national-sjb"
    ],
    "tags": [
      "2024",
      "gampaha",
      "தொலைபேசி",
      "telephone",
      "sjb",
      "colombo",
      "samagi",
      "jana",
      "kandy",
      "දුරකථනය",
      "national",
      "pres",
      "balawegaya",
      "lk-election-symbols-2024-pres-national-sjb",
      "2020",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "television",
    "name": "Television",
    "nameSi": "රූපවාහිනිය",
    "nameTa": "தொலைக்காட்சி",
    "componentName": "TelevisionIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-television>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-television"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-television",
      "தொலைக்காட்சி",
      "television",
      "රූපවාහිනිය"
    ],
    "isPopular": false
  },
  {
    "id": "till",
    "name": "Till",
    "nameSi": "කැටය",
    "nameTa": "உண்டியல்",
    "componentName": "TillIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "United Republican Front",
      "එක්සත් ජනරජ පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-urf>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-urf"
    ],
    "tags": [
      "2024",
      "කැටය",
      "front",
      "republican",
      "till",
      "united",
      "national",
      "உண்டியல்",
      "urf",
      "lk-election-symbols-2024-parl-national-urf",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "torch-light",
    "name": "Torch Light",
    "nameSi": "විදුලි පන්දම",
    "nameTa": "கைவிளக்கு",
    "componentName": "TorchLightIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-torch-light>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-torch-light"
    ],
    "tags": [
      "torch light",
      "கைவிளக்கு",
      "විදුලි පන්දම",
      "torch-light",
      "torch",
      "light",
      "lk-election-symbols-2024-parl-national-torch-light"
    ],
    "isPopular": false
  },
  {
    "id": "tortoise",
    "name": "Tortoise",
    "nameSi": "ඉබ්බා",
    "nameTa": "ஆமை",
    "componentName": "TortoiseIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-tortoise>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tortoise"
    ],
    "tags": [
      "ඉබ්බා",
      "ஆமை",
      "lk-election-symbols-2024-parl-national-tortoise",
      "tortoise"
    ],
    "isPopular": false
  },
  {
    "id": "tractor",
    "name": "Tractor",
    "nameSi": "ට්‍රැක්ටරය",
    "nameTa": "உழவு இயந்திரம்",
    "componentName": "TractorIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "JSP (Jana Setha Peramuna)",
      "ජන සෙත පෙරමුණ",
      "ஜன செத்த பெரமுன"
    ],
    "primaryElectionTag": "<lk-election-symbols-2019-pres-national-jsp>",
    "electionAliases": [
      "lk-election-symbols-2019-pres-national-jsp"
    ],
    "tags": [
      "lk-election-symbols-2019-pres-national-jsp",
      "ට්‍රැක්ටරය",
      "peramuna",
      "jana",
      "national",
      "setha",
      "2019",
      "உழவு இயந்திரம்",
      "pres",
      "jsp",
      "tractor"
    ],
    "isPopular": true
  },
  {
    "id": "tray",
    "name": "Tray",
    "nameSi": "තැටිය",
    "nameTa": "தட்டு",
    "componentName": "TrayIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-tray>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tray"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-tray",
      "தட்டு",
      "tray",
      "තැටිය"
    ],
    "isPopular": false
  },
  {
    "id": "tree",
    "name": "Tree",
    "nameSi": "ගස",
    "nameTa": "மரம்",
    "componentName": "TreeIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "SLMC (Sri Lanka Muslim Congress)",
      "ශ්‍රී ලංකා මුස්ලිම් කොංග්‍රසය",
      "ஸ்ரீலங்கா முஸ்லிம் காங்கிரஸ்"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-slmc>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-slmc",
      "lk-election-symbols-2024-parl-batticaloa-slmc",
      "lk-election-symbols-2020-parl-national-slmc"
    ],
    "tags": [
      "2024",
      "lk-election-symbols-2024-parl-national-slmc",
      "lanka",
      "sri",
      "மரம்",
      "2020",
      "tree",
      "muslim",
      "batticaloa",
      "national",
      "congress",
      "parl",
      "ගස",
      "slmc"
    ],
    "isPopular": true
  },
  {
    "id": "tri-shaw",
    "name": "Tri Shaw",
    "nameSi": "ත්‍රිරෝද රථය",
    "nameTa": "முச்சக்கரவண்டி",
    "componentName": "TriShawIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Sri Lanka Labour Party",
      "ශ්‍රී ලංකා කම්කරු පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-TRI-SHAW>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tri-shaw"
    ],
    "tags": [
      "ත්‍රිරෝද රථය",
      "lanka",
      "sri",
      "shaw",
      "முச்சக்கரவண்டி",
      "labour",
      "tri shaw",
      "tri",
      "party",
      "lk-election-symbols-2024-parl-national-tri-shaw",
      "tri-shaw"
    ],
    "isPopular": true
  },
  {
    "id": "trophy",
    "name": "Trophy",
    "nameSi": "කුසලානය",
    "nameTa": "கோப்பை / கேடயம்",
    "componentName": "TrophyIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Democratic Party",
      "ප්‍රජාතන්ත්‍රවාදී පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-TROPHY>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-trophy"
    ],
    "tags": [
      "trophy",
      "party",
      "democratic",
      "கோப்பை / கேடயம்",
      "lk-election-symbols-2024-parl-national-trophy",
      "කුසලානය"
    ],
    "isPopular": true
  },
  {
    "id": "trowel",
    "name": "Trowel",
    "nameSi": "මේසන් හැන්ද",
    "nameTa": "கரண்டி",
    "componentName": "TrowelIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-trowel>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-trowel"
    ],
    "tags": [
      "trowel",
      "lk-election-symbols-2024-parl-national-trowel",
      "கரண்டி",
      "මේසන් හැන්ද"
    ],
    "isPopular": false
  },
  {
    "id": "tumbler",
    "name": "Tumbler",
    "nameSi": "වීදුරුව",
    "nameTa": "டம்ப்ளர்",
    "componentName": "TumblerIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-tumbler>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tumbler"
    ],
    "tags": [
      "වීදුරුව",
      "tumbler",
      "lk-election-symbols-2024-parl-national-tumbler",
      "டம்ப்ளர்"
    ],
    "isPopular": false
  },
  {
    "id": "two-leaves",
    "name": "Two Leaves",
    "nameSi": "කොළ දෙක",
    "nameTa": "இரட்டை இலை",
    "componentName": "TwoLeavesIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Arunalu Peoples Alliance",
      "අරුණළු ජනතා පෙරමුණ"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-TWO-LEAVES>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-two-leaves"
    ],
    "tags": [
      "arunalu",
      "peoples",
      "இரட்டை இலை",
      "leaves",
      "lk-election-symbols-2024-parl-national-two-leaves",
      "two",
      "කොළ දෙක",
      "two-leaves",
      "two leaves",
      "alliance"
    ],
    "isPopular": true
  },
  {
    "id": "typewriter",
    "name": "Typewriter",
    "nameSi": "යතුරු ලියනය",
    "nameTa": "தட்டச்சுப்பொறி",
    "componentName": "TypewriterIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-typewriter>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-typewriter"
    ],
    "tags": [
      "typewriter",
      "යතුරු ලියනය",
      "lk-election-symbols-2024-parl-national-typewriter",
      "தட்டச்சுப்பொறி"
    ],
    "isPopular": false
  },
  {
    "id": "tyre",
    "name": "Tyre",
    "nameSi": "ටයරය",
    "nameTa": "டயர்",
    "componentName": "TyreIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-tyre>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-tyre"
    ],
    "tags": [
      "டயர்",
      "tyre",
      "lk-election-symbols-2024-parl-national-tyre",
      "ටයරය"
    ],
    "isPopular": false
  },
  {
    "id": "umbrella",
    "name": "Umbrella",
    "nameSi": "කුඩය",
    "nameTa": "குடை",
    "componentName": "UmbrellaIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "Sinhalaye Mahasammatha Bhoomiputhra Pakshaya",
      "සිංහලයේ මහාසම්මත භූමිපුත්‍ර පක්ෂය"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-UMBRELLA>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-umbrella"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-umbrella",
      "bhoomiputhra",
      "pakshaya",
      "කුඩය",
      "umbrella",
      "sinhalaye",
      "mahasammatha",
      "குடை"
    ],
    "isPopular": true
  },
  {
    "id": "veena",
    "name": "Veena",
    "nameSi": "වීණාව",
    "nameTa": "வீணை",
    "componentName": "VeenaIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [
      "EPDP (Eelam People's Democratic Party)",
      "ඊළාම් ජනතා ප්‍රජාතන්ත්‍රවාදී පක්ෂය",
      "ஈழ மக்கள் ஜனநாயகக் கட்சி"
    ],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-epdp>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-epdp",
      "lk-election-symbols-2024-parl-jaffna-epdp",
      "lk-election-symbols-2020-parl-national-epdp"
    ],
    "tags": [
      "people",
      "2024",
      "වීණාව",
      "2020",
      "s",
      "epdp",
      "lk-election-symbols-2024-parl-national-epdp",
      "national",
      "veena",
      "வீணை",
      "party",
      "democratic",
      "eelam",
      "jaffna",
      "parl"
    ],
    "isPopular": true
  },
  {
    "id": "violin",
    "name": "Violin",
    "nameSi": "වයලීනය",
    "nameTa": "வயலின்",
    "componentName": "ViolinIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-violin>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-violin"
    ],
    "tags": [
      "violin",
      "වයලීනය",
      "வயலின்",
      "lk-election-symbols-2024-parl-national-violin"
    ],
    "isPopular": false
  },
  {
    "id": "water-tap",
    "name": "Water Tap",
    "nameSi": "ජල කරාමය",
    "nameTa": "குழாய்",
    "componentName": "WaterTapIcon",
    "schedule": "A",
    "category": "Recognized Political Parties",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-water-tap>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-water-tap"
    ],
    "tags": [
      "lk-election-symbols-2024-parl-national-water-tap",
      "water",
      "ජල කරාමය",
      "tap",
      "water tap",
      "குழாய்",
      "water-tap"
    ],
    "isPopular": false
  },
  {
    "id": "well",
    "name": "Well",
    "nameSi": "ළිඳ",
    "nameTa": "கிணறு",
    "componentName": "WellIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-well>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-well"
    ],
    "tags": [
      "கிணறு",
      "lk-election-symbols-2024-parl-national-well",
      "well",
      "ළිඳ"
    ],
    "isPopular": false
  },
  {
    "id": "wheel-barrow",
    "name": "Wheel Barrow",
    "nameSi": "අත් කරත්තය",
    "nameTa": "கைவண்டி",
    "componentName": "WheelBarrowIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-wheel-barrow>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-wheel-barrow"
    ],
    "tags": [
      "wheel barrow",
      "අත් කරත්තය",
      "barrow",
      "கைவண்டி",
      "wheel",
      "wheel-barrow",
      "lk-election-symbols-2024-parl-national-wheel-barrow"
    ],
    "isPopular": false
  },
  {
    "id": "winnowing-fan",
    "name": "Winnowing Fan",
    "nameSi": "කුල්ල",
    "nameTa": "சுளகு",
    "componentName": "WinnowingFanIcon",
    "schedule": "B",
    "category": "Independent Groups & Alliances",
    "parties": [],
    "primaryElectionTag": "<lk-election-symbols-2024-parl-national-winnowing-fan>",
    "electionAliases": [
      "lk-election-symbols-2024-parl-national-winnowing-fan"
    ],
    "tags": [
      "winnowing-fan",
      "சுளகு",
      "fan",
      "winnowing fan",
      "lk-election-symbols-2024-parl-national-winnowing-fan",
      "winnowing",
      "කුල්ල"
    ],
    "isPopular": false
  }
];

export const getSymbolById = (id: string): ElectionSymbolMetadata | undefined => {
  return electionSymbols.find(s => s.id === id);
};

export const searchSymbols = (query: string): ElectionSymbolMetadata[] => {
  const q = query.trim().toLowerCase();
  if (!q) return electionSymbols;
  return electionSymbols.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.nameSi.includes(q) ||
    s.nameTa.includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q)) ||
    s.parties.some(p => p.toLowerCase().includes(q))
  );
};
