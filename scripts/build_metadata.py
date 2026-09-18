import os
import json
import re

PARTY_MAP = {
    "elephant": ["UNP (United National Party)", "එක්සත් ජාතික පක්ෂය", "ஐக்கிய தேசியக் கட்சி"],
    "telephone": ["SJB (Samagi Jana Balawegaya)", "සමගි ජන බලවේගය", "ஐக்கிய மக்கள் சக்தி"],
    "flower-bud": ["SLPP (Sri Lanka Podujana Peramuna)", "ශ්‍රී ලංකා පොදුජන පෙරමුණ", "ஸ்ரீ லங்கா பொதுஜன பெரமுன"],
    "compass": ["NPP / JVP (National People's Power)", "ජාතික ජන බලවේගය / ජවිපෙ", "தேசிய மக்கள் சக்தி"],
    "hand": ["SLFP (Sri Lanka Freedom Party)", "ශ්‍රී ලංකා නිදහස් පක්ෂය", "ஸ்ரீ லங்கா சுதந்திரக் கட்சி"],
    "house": ["ITAK / TNA (Ilankai Tamil Arasu Kadchi)", "ඉලංගෙයි තමිළ් අරසු කච්චි", "இலங்கைத் தமிழரசுக் கட்சி"],
    "betel-leaf": ["UPFA (United People's Freedom Alliance)", "එක්සත් ජනතා නිදහස් සන්ධානය", "ஐக்கிய மக்கள் சுதந்திரக் கூட்டமைப்பு"],
    "bell": ["JVP (Janatha Vimukthi Peramuna - Historic)", "ජනතා විමුක්ති පෙරමුණ", "மக்கள் விடுதலை முன்னணி"],
    "sun": ["TULF (Tamil United Liberation Front)", "දෙමළ එක්සත් විමුක්ති පෙරමුණ", "தமிழர் ஐக்கிய விடுதலை முன்னணி"],
    "tree": ["SLMC (Sri Lanka Muslim Congress)", "ශ්‍රී ලංකා මුස්ලිම් කොංග්‍රසය", "ஸ்ரீலங்கா முஸ்லிம் காங்கிரஸ்"],
    "peacock": ["ACMC (All Ceylon Makkal Congress)", "සමස්ත ලංකා මහජන කොංග්‍රසය", "அகில இலங்கை மக்கள் காங்கிரஸ்"],
    "veena": ["EPDP (Eelam People's Democratic Party)", "ඊළාම් ජනතා ප්‍රජාතන්ත්‍රවාදී පක්ෂය", "ஈழ மக்கள் ஜனநாயகக் கட்சி"],
    "pair-of-scales": ["NDF (New Democratic Front - Swan/Scales)", "නව ප්‍රජාතන්ත්‍රවාදී පෙරමුණ", "புதிய ஜனநாயக முன்னணி"],
    "swan": ["NDF (New Democratic Front - Swan Alliance)", "නව ප්‍රජාතන්ත්‍රවාදී පෙරමුණ", "புதிய ஜனநாயக முன்னணி"],
    "tractor": ["JSP (Jana Setha Peramuna)", "ජන සෙත පෙරමුණ", "ஜன செத்த பெரமுன"],
    "eye": ["SLMP (Sri Lanka Mahajana Pakshaya)", "ශ්‍රී ලංකා මහජන පක්ෂය", "ஸ்ரீலங்கா மக்கள் கட்சி"],
    "cockerel": ["CWC (Ceylon Workers' Congress)", "ලංකා කම්කරු කොංග්‍රසය", "இலங்கை தொழிலாளர் காங்கிரஸ்"],
    "book": ["Democratic United National Front (DUNF)", "ප්‍රජාතන්ත්‍රවාදී එක්සත් ජාතික පෙරමුණ"],
    "chair": ["PA (People's Alliance)", "පොදුජන එක්සත් පෙරමුණ", "மக்கள் கூட்டமைப்பு"],
    "comb-of-plantains": ["Democratic National Movement", "ප්‍රජාතන්ත්‍රවාදී ජාතික ව්‍යාපාරය"],
    "double-flags": ["Democratic Left Front", "ප්‍රජාතන්ත්‍රවාදී වාමාංශික පෙරමුණ"],
    "bow-and-arrow": ["All Ceylon Tamil Mahasabha", "අඛිල ඉලංගෙයි දෙමළ මහාසභාව"],
    "ear-of-paddy": ["Communist Party of Sri Lanka (CPSL)", "ශ්‍රී ලංකාවේ කොමියුනිස්ට් පක්ෂය"],
    "anchor": ["United Socialist Party (USP)", "එක්සත් සමාජවාදී පක්ෂය"],
    "aeroplane": ["Socialist Alliance", "සමාජවාදී සන්ධානය"],
    "cart-wheel": ["National Freedom Front (NFF)", "ජාතික නිදහස් පෙරමුණ"],
    "clay-lamp": ["Our Power of People Party (OPPP)", "අපේ ජනබල පක්ෂය"],
    "umbrella": ["Sinhalaye Mahasammatha Bhoomiputhra Pakshaya", "සිංහලයේ මහාසම්මත භූමිපුත්‍ර පක්ෂය"],
    "trophy": ["Democratic Party", "ප්‍රජාතන්ත්‍රවාදී පක්ෂය"],
    "flaming-torch": ["Eelam People's Revolutionary Liberation Front (EPRLF)", "ඊ.පී.ආර්.එල්.එෆ්"],
    "clock": ["Lanka Sama Samaja Party (LSSP)", "ලංකා සමසමාජ පක්ෂය"],
    "pen": ["Devana Parapura", "දෙවන පරපුර"],
    "butterfly": ["Eksath Podujana Pakshaya", "එක්සත් පොදුජන පක්ෂය"],
    "horse": ["United National Alliance", "එක්සත් ජාතික සන්ධානය"],
    "electric-bulb": ["Citizen's Front", "පුරවැසි පෙරමුණ"],
    "coconut": ["United Peace Alliance", "එක්සත් සාම සන්ධානය"],
    "fish": ["Tamil National People's Front (TNPF)", "දෙමළ ජාතික ජනතා පෙරමුණ", "தமிழ் தேசிய மக்கள் முன்னணி"],
    "boat": ["National Unity Alliance", "ජාතික සමගි පෙරමුණ"],
    "star": ["Sri Lanka Vanguard Party", "ශ්‍රී ලංකා පෙරටුගාමී පක්ෂය"],
    "sword": ["Jathika Sangwardhena Peramuna", "ජාතික සංවර්ධන පෙරමුණ"],
    "canoe": ["United Left Front", "එක්සත් වාමාංශික පෙරමුණ"],
    "balloon": ["Socialist People's Forum", "සමාජවාදී ජනතා සංසදය"],
    "sickle": ["Frontline Socialist Party / Left", "පෙරටුගාමී සමාජවාදී පක්ෂය"],
    "conch-shell": ["National Congress", "ජාතික කොංග්‍රසය"],
    "pigeon": ["Socialist Equality Party", "සමාජවාදී සමානතා පක්ෂය"],
    "two-leaves": ["Arunalu Peoples Alliance", "අරුණළු ජනතා පෙරමුණ"],
    "mobile-phone": ["Liberal Party", "ලිබරල් පක්ෂය"],
    "cup": ["Muslim National Alliance", "මුස්ලිම් ජාතික සන්ධානය"],
    "cobra": ["National Democratic Front", "ජාතික ප්‍රජාතන්ත්‍රවාදී පෙරමුණ"],
    "tri-shaw": ["Sri Lanka Labour Party", "ශ්‍රී ලංකා කම්කරු පක්ෂය"],
    "till": ["United Republican Front", "එක්සත් ජනරජ පෙරමුණ"],
    "mammoty": ["Akila Ilankai Dravida Mahasabha", "අඛිල ඉලංගෙයි ද්‍රවිඩ මහාසභාව"],
    "brass-lamp": ["Motherland People's Party", "මව්බිම ජනතා පක්ෂය"],
    "panchaudaya": ["Nawa Sihala Urumaya", "නව සිහල උරුමය"]
}

# Multilingual dictionary for common symbols
SINHALA_NAMES = {
    "elephant": "අලියා",
    "telephone": "දුරකථනය",
    "flower-bud": "නෙළුම් පොහොට්ටුව",
    "compass": "මාලිමාව",
    "hand": "අත",
    "house": "නිවස",
    "betel-leaf": "බුලත් කොළය",
    "bell": "ඝණ්ඨාරය",
    "sun": "හිරු / ඉර",
    "tree": "ගස",
    "peacock": "මොනරා",
    "veena": "වීණාව",
    "pair-of-scales": "තරාදිය",
    "swan": "හංසයා",
    "tractor": "ට්‍රැක්ටරය",
    "eye": "ඇස",
    "cockerel": "කුකුළා",
    "book": "පොත",
    "chair": "පුටුව",
    "bicycle": "බයිසිකලය",
    "ship": "නැව",
    "plough": "නගුල",
    "conch-shell": "හක්ගෙඩිය",
    "pigeon": "පරවියා",
    "two-leaves": "කොළ දෙක",
    "mobile-phone": "ජංගම දුරකථනය",
    "cup": "කෝප්පය",
    "cobra": "නයා",
    "tri-shaw": "ත්‍රිරෝද රථය",
    "till": "කැටය",
    "mammoty": "උදැල්ල",
    "brass-lamp": "පිත්තල පහන",
    "horse": "අශ්වයා",
    "electric-bulb": "විදුලි බුබුල",
    "panchaudaya": "පංචායුධය",
    "coconut": "පොල් ගෙඩිය",
    "fish": "මළුවා",
    "umbrella": "කුඩය",
    "boat": "බෝට්ටුව",
    "flag": "කොඩිය",
    "ear-of-paddy": "වී කරල",
    "light-house": "ප්‍රදීපාගාරය",
    "table": "මේසය",
    "bow-and-arrow": "දුන්න සහ ඊතලය",
    "omnibus": "බස් රථය",
    "sledge-hammer": "කුළුගෙඩිය",
    "eagle": "රාජාලියා",
    "ladder": "ඉණිමඟ",
    "anchor": "නැංගුරම",
    "trophy": "කුසලානය",
    "flaming-torch": "පන්දම",
    "clock": "ඔරලෝසුව",
    "aeroplane": "ගුවන් යානය",
    "cart-wheel": "කරත්ත රෝදය",
    "butterfly": "සමනලයා",
    "motor-car": "මෝටර් රථය",
    "key": "යතුර",
    "kangaroo": "කැන්ගරුවා",
    "envelope": "ලියුම් කවරය",
    "flower-vase": "මල් බඳුන",
    "star": "තරුව",
    "clay-lamp": "මැටි පහන",
    "pair-of-scissors": "කතුර",
    "sword": "කඩුව",
    "canoe": "ඔරුව",
    "balloon": "බැලුනය",
    "comb-of-plantains": "කෙසෙල් ඇවරිය",
    "sickle": "දැකැත්ත",
    "double-flags": "ද්විත්ව කොඩි",
    "water-tap": "ජල කරාමය",
    "guitar": "ගිටාරය",
    "kettle": "කේතලය",
    "flower": "මල",
    "shield": "පලිහ",
    "diamond": "දියමන්තිය",
    "torch-light": "විදුලි පන්දම",
    "horse-shoe": "ලාඩම",
    "deer": "මුවා",
    "rose-apple": "ජම්බු",
    "mango": "අඹ",
    "bed": "ඇඳ",
    "camel": "ඔටුවා",
    "iron": "ඉස්ත්‍රික්කය",
    "well": "ළිඳ",
    "motor-bicycle": "යතුරුපැදිය",
    "foot-ball": "පාපන්දුව",
    "drum": "බෙරය",
    "hand-tractor": "අත් ට්‍රැක්ටරය",
    "goblet": "කූජාව",
    "tortoise": "ඉබ්බා",
    "hat": "තොප්පිය",
    "squirrel": "ලේනා",
    "pillar-box": "තැපැල් පෙට්ටිය",
    "crocodile": "කිඹුලා",
    "kite": "සරුංගලය",
    "trowel": "මේසන් හැන්ද",
    "rhinoceros": "කණ්ඩDisplayStyle",
    "comb": "පනාව",
    "pineapple": "අන්නාසි",
    "apple": "ඇපල්",
    "rick-shaw": "රික්ෂෝව",
    "padlock": "ඉබ්බා (අගුල)",
    "bottle": "බෝතලය",
    "locomotive-engine": "දුම්රිය එන්ජිම",
    "hand-bag": "අත්බෑගය",
    "bucket": "බාල්දිය",
    "jak-fruit": "කොස් ගෙඩිය",
    "table-fan": "මේස පංකාව",
    "spoon": "හැන්ද",
    "sewing-machine": "මහන මැෂිම",
    "almirah": "අල්මාරිය",
    "typewriter": "යතුරු ලියනය",
    "coconut-scraper": "හිරමනය",
    "winnowing-fan": "කුල්ල",
    "rabbit": "හාාවා",
    "helicopter": "හෙලිකොප්ටරය",
    "cart": "කරත්තය",
    "hand-axe": "පොරව",
    "mortar": "වංගෙඩිය",
    "jug": "ජෝගුව",
    "radio-set": "ගුවන් විදුලි යන්ත්‍රය",
    "tumbler": "වීදුරුව",
    "jeep": "ජීප් රථය",
    "saw": "කියත",
    "brush": "බුරුසුව",
    "horn": "නලාව",
    "owl": "බකමූණා",
    "giraffe": "සිරාෆ්",
    "cashew-apple": "කජු පුහුලම",
    "wheel-barrow": "අත් කරත්තය",
    "pumpkin": "වට්ටක්කා",
    "tyre": "ටයරය",
    "swing": "ඔන්චිල්ලාව",
    "fork": "ගෑරුප්පුව",
    "see-saw": "ඔන්චිල්ලා ලෑල්ල",
    "mouse": "මීයා",
    "black-board": "කළු ලෑල්ල",
    "cricket-bat": "ක්‍රිකට් පිත්ත",
    "slingshot": "කැටපෝලය",
    "crane": "ක්‍රේන් රථය",
    "shoe": "සපත්තුව",
    "nut-cracker": "ගිරය",
    "bat": "වවුලා",
    "gas-cylinder": "ගෑස් සිලින්ඩරය",
    "immersion-heater": "හීටරය",
    "mega-phone": "ශබ්ද විකාශන යන්ත්‍රය",
    "plug-top": "ප්ලග් ටොප් එක",
    "pair-of-spectacles": "ඇස් කණ්ණාඩි",
    "pen": "පෑන",
    "pencil": "පැන්සල",
    "fly": "මැස්සා",
    "television": "රූපවාහිනිය",
    "pair-of-slippers": "සෙරෙප්පු යුගල",
    "ear": "කන",
    "ceiling-fan": "සිවිලිම් පංකාව",
    "carrot": "කැරට්",
    "ice-cream": "අයිස්ක්‍රීම්",
    "crown": "ඔටුන්න",
    "shirt": "කමිසය",
    "corn": "ඉරිඟු",
    "tabla": "තබ්ලාව",
    "violin": "වයලීනය",
    "ant": "කූඹියා",
    "fruit-basket": "පළතුරු කූඩය",
    "battery": "බැටරිය",
    "light-pole": "විදුලි කණුව",
    "farmer": "ගොවියා",
    "hand-lens": "විශාලක වීදුරුව",
    "belt": "පටිය",
    "teapoy": "ටීපෝව",
    "microphone": "මයික්‍රෆෝනය",
    "bunch-of-grapes": "මිදි පොකුර",
    "candle": "ඉටිපන්දම",
    "spider": "මකුළුවා",
    "camera": "කැමරාව",
    "snail": "ගොළුබෙල්ලා",
    "tray": "තැටිය",
    "rocket": "රොකට්ටුව",
    "spiral": "දුන්න / ස්පයිරල්",
    "orange": "දොඩම්",
    "dog": "බල්ලා",
    "safety-pin": "අල්පෙනෙත්ත / ආරක්ෂක කටුව"
}

TAMIL_NAMES = {
    "elephant": "யானை",
    "telephone": "தொலைபேசி",
    "flower-bud": "தாமரை மொட்டு",
    "compass": "திசைகாட்டி",
    "hand": "கை",
    "house": "வீடு",
    "betel-leaf": "வெற்றிலை",
    "bell": "மணி",
    "sun": "சூரியன்",
    "tree": "மரம்",
    "peacock": "மயில்",
    "veena": "வீணை",
    "pair-of-scales": "தராசு",
    "swan": "அன்னப்பறவை",
    "tractor": "உழவு இயந்திரம்",
    "eye": "கண்",
    "cockerel": "சேவல்",
    "book": "புத்தகம்",
    "chair": "நாற்காலி",
    "bicycle": "மிதிவண்டி",
    "ship": "கப்பல்",
    "plough": "கலப்பை",
    "conch-shell": "சங்கு",
    "pigeon": "புறா",
    "two-leaves": "இரட்டை இலை",
    "mobile-phone": "கைபேசி",
    "cup": "கோப்பை",
    "cobra": "நாகப்பாம்பு",
    "tri-shaw": "முச்சக்கரவண்டி",
    "till": "உண்டியல்",
    "mammoty": "மண்வெட்டி",
    "brass-lamp": "பித்தளை விளக்கு",
    "horse": "குதிரை",
    "electric-bulb": "மின்சார குமிழ்",
    "panchaudaya": "பஞ்சாயுதம்",
    "coconut": "தேங்காய்",
    "fish": "மீன்",
    "umbrella": "குடை",
    "boat": "படகு",
    "flag": "கொடி",
    "ear-of-paddy": "நெற்கதிர்",
    "light-house": "கலங்கரை விளக்கம்",
    "table": "மேசை",
    "bow-and-arrow": "வில்லும் அம்பும்",
    "omnibus": "பேருந்து",
    "sledge-hammer": "சுத்தியல்",
    "eagle": "கழுகு",
    "ladder": "ஏணி",
    "anchor": "நங்கூரம்",
    "trophy": "கோப்பை / கேடயம்",
    "flaming-torch": "தீப்பந்தம்",
    "clock": "கடிகாரம்",
    "aeroplane": "விமானம்",
    "cart-wheel": "வண்டிச் சக்கரம்",
    "butterfly": "வண்ணத்துப்பூச்சி",
    "motor-car": "மகிழுந்து",
    "key": "சாவி",
    "kangaroo": "கங்காரு",
    "envelope": "கடித உறை",
    "flower-vase": "பூச்சாடி",
    "star": "நட்சத்திரம்",
    "clay-lamp": "அகல் விளக்கு",
    "pair-of-scissors": "கத்தரிக்கோல்",
    "sword": "வாள்",
    "canoe": "தோணி",
    "balloon": "பலூன்",
    "comb-of-plantains": "வாழைச்சீப்பு",
    "sickle": "அரிவாள்",
    "double-flags": "இரட்டைக் கொடிகள்",
    "water-tap": "குழாய்",
    "guitar": "கித்தார்",
    "kettle": "தேநீர் கெண்டி",
    "flower": "பூ",
    "shield": "கேடயம்",
    "diamond": "வைரம்",
    "torch-light": "கைவிளக்கு",
    "horse-shoe": "குதிரை லாடம்",
    "deer": "மான்",
    "rose-apple": "ஜாம்பழம்",
    "mango": "மாம்பழம்",
    "bed": "கட்டில்",
    "camel": "ஒட்டகம்",
    "iron": "இஸ்திரிப் பெட்டி",
    "well": "கிணறு",
    "motor-bicycle": "மோட்டார் சைக்கிள்",
    "foot-ball": "கால்பந்து",
    "drum": "மேளம்",
    "hand-tractor": "கை உழவு இயந்திரம்",
    "goblet": "கூஜா",
    "tortoise": "ஆமை",
    "hat": "தொப்பி",
    "squirrel": "அணில்",
    "pillar-box": "தபால் பெட்டி",
    "crocodile": "முதலை",
    "kite": "பட்டம்",
    "trowel": "கரண்டி",
    "rhinoceros": "காண்டாமிருகம்",
    "comb": "சீப்பு",
    "pineapple": "அன்னாசி",
    "apple": "ஆப்பிள்",
    "rick-shaw": "ரிக்சா",
    "padlock": "பூட்டு",
    "bottle": "போத்தல்",
    "locomotive-engine": "புகையிரத என்ஜின்",
    "hand-bag": "கைப்பை",
    "bucket": "வாளி",
    "jak-fruit": "பலாப்பழம்",
    "table-fan": "மேசை மின்விசிறி",
    "spoon": "கரண்டி",
    "sewing-machine": "தையல் இயந்திரம்",
    "almirah": "பீரோ",
    "typewriter": "தட்டச்சுப்பொறி",
    "coconut-scraper": "துருவல் பலகை",
    "winnowing-fan": "சுளகு",
    "rabbit": "முயல்",
    "helicopter": "ஹெலிகாப்டர்",
    "cart": "மாட்டு வண்டி",
    "hand-axe": "கோடரி",
    "mortar": "உரல்",
    "jug": "ஜக்",
    "radio-set": "வானொலிப்பெட்டி",
    "tumbler": "டம்ப்ளர்",
    "jeep": "ஜீப்",
    "saw": "வாள் / ரம்பம்",
    "brush": "தூரிகை",
    "horn": "ஊதுகுழல்",
    "owl": "ஆந்தை",
    "giraffe": "ஒட்டகச்சிவிங்கி",
    "cashew-apple": "முந்திரிப்பழம்",
    "wheel-barrow": "கைவண்டி",
    "pumpkin": "பூசணிக்காய்",
    "tyre": "டயர்",
    "swing": "ஊஞ்சல்",
    "fork": "முட்கரண்டி",
    "see-saw": "சீசா",
    "mouse": "எலி",
    "black-board": "கரும்பலகை",
    "cricket-bat": "மட்டை",
    "slingshot": "கவண்",
    "crane": "கிரேன்",
    "shoe": "காலணி",
    "nut-cracker": "பாக்குவெட்டி",
    "bat": "வௌவால்",
    "gas-cylinder": "எரிவாயு உருளை",
    "immersion-heater": "ஹீட்டர்",
    "mega-phone": "ஒலிபெருக்கி",
    "plug-top": "செருகி",
    "pair-of-spectacles": "மூக்குக்கண்ணாடி",
    "pen": "பேனா",
    "pencil": "பென்சில்",
    "fly": "ஈ",
    "television": "தொலைக்காட்சி",
    "pair-of-slippers": "செருப்பு",
    "ear": "காது",
    "ceiling-fan": "கூரை மின்விசிறி",
    "carrot": "கேரட்",
    "ice-cream": "ஐஸ்கிரீம்",
    "crown": "கிரீடம்",
    "shirt": "சட்டை",
    "corn": "மக்காச்சோளம்",
    "tabla": "தபேலா",
    "violin": "வயலின்",
    "ant": "எறும்பு",
    "fruit-basket": "பழக்கூடை",
    "battery": "மின்கலம்",
    "light-pole": "மின் கம்பம்",
    "farmer": "விவசாயி",
    "hand-lens": "பூதக்கண்ணாடி",
    "belt": "வார் / பெல்ட்",
    "teapoy": "டீப்பாய்",
    "microphone": "ஒலிவாங்கி",
    "bunch-of-grapes": "திராட்சை கொத்து",
    "candle": "மெழுகுவர்த்தி",
    "spider": "சிலந்தி",
    "camera": "புகைப்படக்கருவி",
    "snail": "நத்தை",
    "tray": "தட்டு",
    "rocket": "ராக்கெட்",
    "spiral": "சுருள்",
    "orange": "ஆரஞ்சு",
    "dog": "நாய்",
    "safety-pin": "ஊக்கு"
}

def build_metadata():
    svg_dir = "src/icons"
    svg_files = sorted([f for f in os.listdir(svg_dir) if f.endswith(".svg")])
    print(f"Building metadata for {len(svg_files)} SVGs...")
    
    catalog = []
    
    # Load extracted metadata if exists
    extracted_map = {}
    if os.path.exists("gazettes/extracted_metadata.json"):
        with open("gazettes/extracted_metadata.json") as f:
            for item in json.load(f):
                extracted_map[item["id"]] = item
                
    # Load elections context map
    elections_data = {}
    if os.path.exists("src/elections.json"):
        with open("src/elections.json", encoding="utf-8") as ef:
            elections_data = json.load(ef)

    for fn in svg_files:
        id_str = fn[:-4]
        
        # Determine title
        words = id_str.split("-")
        name = " ".join([w.capitalize() for w in words])
        
        # Override special names
        if id_str == "two-leaves":
            name = "Two Leaves"
        elif id_str == "pair-of-scales":
            name = "Pair of Scales"
        elif id_str == "pair-of-scissors":
            name = "Pair of Scissors"
        elif id_str == "pair-of-spectacles":
            name = "Pair of Spectacles"
        elif id_str == "pair-of-slippers":
            name = "Pair of Slippers"
        elif id_str == "bunch-of-grapes":
            name = "Bunch of Grapes"
        elif id_str == "comb-of-plantains":
            name = "Comb of Plantains"
        elif id_str == "ear-of-paddy":
            name = "Ear of Paddy"
        elif id_str == "bow-and-arrow":
            name = "Bow and Arrow"
        elif id_str == "winnowing-fan":
            name = "Winnowing Fan"
        elif id_str == "radio-set":
            name = "Radio Set"
        elif id_str == "fruit-basket":
            name = "Fruit Basket"
        elif id_str == "light-pole":
            name = "Light Pole"
        elif id_str == "hand-lens":
            name = "Hand Lens"
        elif id_str == "gas-cylinder":
            name = "Gas Cylinder"
        elif id_str == "immersion-heater":
            name = "Immersion Heater"
        elif id_str == "locomotive-engine":
            name = "Locomotive Engine"
            
        schedule = "B"
        if id_str in extracted_map:
            schedule = extracted_map[id_str].get("schedule", "B")
        elif id_str in PARTY_MAP:
            schedule = "A"
            
        parties = PARTY_MAP.get(id_str, [])
        name_si = SINHALA_NAMES.get(id_str, "")
        name_ta = TAMIL_NAMES.get(id_str, "")
        
        # React component name PascalCase + Icon
        pascal = "".join([w.capitalize() for w in words])
        component_name = f"{pascal}Icon"
        
        tags = [id_str, name.lower()] + [w.lower() for w in words]
        if name_si:
            tags.append(name_si)
        if name_ta:
            tags.append(name_ta)
        for p in parties:
            tags.extend(re.findall(r'[A-Za-z0-9]+', p.lower()))

        # Election Context Mapping
        symbol_aliases = []
        aliases_map = elections_data.get("aliases", {})
        for alias_key, sym_id in aliases_map.items():
            if sym_id == id_str:
                symbol_aliases.append(f"lk-election-symbols-{alias_key}")
                tags.extend(alias_key.split("-"))

        # Determine canonical primaryElectionTag
        if id_str == "compass":
            primary_tag = "<lk-election-symbols-2025-pres-national-NPP>"
        elif id_str == "telephone":
            primary_tag = "<lk-election-symbols-2024-pres-national-SJB>"
        elif id_str == "flower-bud":
            primary_tag = "<lk-election-symbols-2024-pres-national-SLPP>"
        elif id_str == "elephant":
            primary_tag = "<lk-election-symbols-2024-parl-national-UNP>"
        elif id_str == "gas-cylinder":
            primary_tag = "<lk-election-symbols-2024-pres-national-IND16>"
        elif id_str == "house":
            primary_tag = "<lk-election-symbols-2024-parl-national-ITAK>"
        elif symbol_aliases:
            primary_tag = f"<{symbol_aliases[0]}>"
        elif parties:
            m_code = re.search(r'\b([A-Z]{2,6})\b', parties[0])
            code = m_code.group(1) if m_code else id_str.upper()
            primary_tag = f"<lk-election-symbols-2024-parl-national-{code}>"
            symbol_aliases.append(f"lk-election-symbols-2024-parl-national-{code.lower()}")
        else:
            primary_tag = f"<lk-election-symbols-2024-parl-national-{id_str}>"
            symbol_aliases.append(f"lk-election-symbols-2024-parl-national-{id_str}")

        tags.append(primary_tag.replace("<", "").replace(">", "").lower())
            
        catalog.append({
            "id": id_str,
            "name": name,
            "nameSi": name_si,
            "nameTa": name_ta,
            "componentName": component_name,
            "schedule": schedule,
            "category": "Recognized Political Parties" if schedule == "A" else "Independent Groups & Alliances",
            "parties": parties,
            "primaryElectionTag": primary_tag,
            "electionAliases": symbol_aliases,
            "tags": list(set(tags)),
            "isPopular": bool(parties)
        })
        
    os.makedirs("src", exist_ok=True)
    with open("src/metadata.json", "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
        
    print(f"Saved {len(catalog)} symbols to src/metadata.json")
    
    # Save TS format
    ts_content = f'''/**
 * Sri Lanka Election Symbols Metadata Registry
 * Sourced from official Gazettes of the Election Commission of Sri Lanka
 */

export interface ElectionSymbolMetadata {{
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
}}

export const electionSymbols: ElectionSymbolMetadata[] = {json.dumps(catalog, indent=2, ensure_ascii=False)};

export const getSymbolById = (id: string): ElectionSymbolMetadata | undefined => {{
  return electionSymbols.find(s => s.id === id);
}};

export const searchSymbols = (query: string): ElectionSymbolMetadata[] => {{
  const q = query.trim().toLowerCase();
  if (!q) return electionSymbols;
  return electionSymbols.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.nameSi.includes(q) ||
    s.nameTa.includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q)) ||
    s.parties.some(p => p.toLowerCase().includes(q))
  );
}};
'''
    with open("src/metadata.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)
    print("Saved src/metadata.ts")

if __name__ == "__main__":
    build_metadata()
