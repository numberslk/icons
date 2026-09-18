import fitz
import os
import re
import json
from PIL import Image, ImageOps
import io

os.makedirs("src/png", exist_ok=True)
os.makedirs("gazettes/extracted_temp", exist_ok=True)

PAGES_CONFIG = {
    1: {
        "schedule": "A",
        "rows": [
            ["Bicycle", "Ship", "Peacock", "Telephone", "House", "Plough", "Veena"],
            ["Conch Shell", "Betel Leaf", "Elephant", "Pigeon", "Two Leaves", "Mobile Phone", "Cup"]
        ]
    },
    2: {
        "schedule": "A",
        "rows": [
            ["Cobra", "Tri-shaw", "Till", "Mammoty", "Bell", "Brass Lamp", "Tractor"],
            ["Horse", "Electric Bulb", "Panchaudaya", "Coconut", "Fish", "Umbrella", "Boat"],
            ["Flag", "Ear of Paddy", "Light House", "Sun", "Swan", "Table", "Bow and Arrow"],
            ["Omnibus", "Sledge Hammer", "Chair", "Eagle", "Ladder", "Anchor"],
            ["Trophy", "Flaming Torch", "Clock", "Aeroplane", "Cart Wheel", "Pair of Scales", "Butterfly"],
            ["Motor Car", "Cockerel", "Key", "Book", "Kangaroo", "Flower Bud", "Hand"],
            ["Envelope", "Flower Vase", "Eye", "Tree", "Star", "Clay Lamp", "Pair of Scissors"],
            ["Sword", "Canoe", "Balloon", "Comb of Plantains", "Sickle", "Double Flags", "Compass"]
        ]
    },
    3: {
        "schedule_mix": True,
        "rows": [
            {"schedule": "A", "items": ["Water Tap", "Guitar", "Kettle", "Flower", "Shield", "Diamond", "Torch Light"]},
            {"schedule": "A", "items": ["Horse Shoe", "Deer"]},
            {"schedule": "B", "items": ["Rose Apple", "Mango", "Bed", "Camel", "Iron", "Well", "Motor Bicycle"]},
            {"schedule": "B", "items": ["Foot Ball", "Drum", "Hand Tractor", "Goblet", "Tortoise", "Hat", "Squirrel"]},
            {"schedule": "B", "items": ["Pillar Box", "Crocodile", "Kite", "Trowel", "Rhinoceros", "Comb", "Pineapple"]},
            {"schedule": "B", "items": ["Apple", "Rick-shaw", "Padlock", "Bottle", "Locomotive Engine", "Hand Bag", "Bucket"]},
            {"schedule": "B", "items": ["Jak Fruit", "Table Fan", "Spoon", "Sewing Machine", "Almirah", "Typewriter", "Coconut Scraper"]},
            {"schedule": "B", "items": ["Winnowing Fan", "Rabbit", "Helicopter", "Cart", "Hand Axe", "Mortar", "Jug"]}
        ]
    },
    4: {
        "schedule": "B",
        "rows": [
            ["Radio Set", "Tumbler", "Jeep", "Saw", "Brush", "Horn", "Owl"],
            ["Giraffe", "Cashew Apple", "Wheel-barrow", "Pumpkin", "Tyre", "Swing", "Fork"],
            ["See-saw", "Mouse", "Black Board", "Cricket Bat", "Slingshot", "Crane", "Shoe"],
            ["Nut Cracker", "Bat", "Gas Cylinder", "Immersion Heater", "Mega Phone", "Plug Top", "Pair of Spectacles"],
            ["Pen", "Pencil", "Fly", "Television", "Pair of Slippers", "Ear", "Ceiling Fan"],
            ["Carrot", "Ice Cream", "Crown", "Shirt", "Corn", "Tabla", "Violin"],
            ["Ant", "Fruit Basket", "Battery", "Light Pole", "Farmer", "Hand Lens", "Belt"],
            ["Teapoy", "Microphone", "Bunch of Grapes"]
        ]
    }
}

def clean_and_center_bitmap(img, padding_ratio=0.1):
    gray = img.convert("L")
    w, h = gray.size
    
    corners = [gray.getpixel((0, 0)), gray.getpixel((w-1, 0)), gray.getpixel((0, h-1)), gray.getpixel((w-1, h-1))]
    avg_corner = sum(corners) / len(corners)
    
    if avg_corner < 128:
        gray = ImageOps.invert(gray)
        
    bw = gray.point(lambda p: 255 if p > 140 else 0, mode='1')
    inv_bw = ImageOps.invert(bw.convert('L'))
    bbox = inv_bw.getbbox()
    if bbox:
        cropped = bw.crop(bbox)
    else:
        cropped = bw
        
    cw, ch = cropped.size
    max_dim = max(cw, ch)
    pad = int(max_dim * padding_ratio)
    canvas_size = max_dim + 2 * pad
    
    canvas = Image.new('1', (canvas_size, canvas_size), 1)
    offset_x = (canvas_size - cw) // 2
    offset_y = (canvas_size - ch) // 2
    canvas.paste(cropped, (offset_x, offset_y))
    return canvas

def extract_from_2263():
    doc = fitz.open("gazettes/Pol_Party_2263-24_E.pdf")
    extracted = []
    
    for pno in range(len(doc)):
        page_num = pno + 1
        page = doc[pno]
        config = PAGES_CONFIG[page_num]
        
        img_list = page.get_images(full=True)
        page_imgs = []
        for img_info in img_list:
            xref = img_info[0]
            rects = page.get_image_rects(xref)
            if not rects:
                continue
            rect = rects[0]
            if rect.y0 < 160 and page_num == 1:
                continue
            if rect.width < 10 or rect.height < 10:
                continue
            page_imgs.append((xref, rect))
            
        page_imgs.sort(key=lambda item: item[1].y0)
        rows = []
        current_row = []
        current_y = None
        for item in page_imgs:
            y = item[1].y0
            if current_y is None or abs(y - current_y) < 25:
                current_row.append(item)
                if current_y is None:
                    current_y = y
            else:
                current_row.sort(key=lambda item: item[1].x0)
                rows.append(current_row)
                current_row = [item]
                current_y = y
        if current_row:
            current_row.sort(key=lambda item: item[1].x0)
            rows.append(current_row)
            
        print(f"Page {page_num}: Found {len(rows)} detected image rows")
        
        cfg_rows = config["rows"]
        for r_idx, row_items in enumerate(rows):
            if r_idx >= len(cfg_rows):
                print(f"  Warning: Extra row {r_idx+1} on page {page_num}")
                break
                
            cfg_row = cfg_rows[r_idx]
            if isinstance(cfg_row, dict):
                row_names = cfg_row["items"]
                row_schedule = cfg_row["schedule"]
            else:
                row_names = cfg_row
                row_schedule = config["schedule"]
                
            for c_idx, (xref, rect) in enumerate(row_items):
                if c_idx >= len(row_names):
                    print(f"  Warning: Extra item {c_idx+1} in row {r_idx+1}")
                    break
                name = row_names[c_idx]
                kebab_id = re.sub(r'[\(\)\.\,\/\-\–\']', ' ', name)
                kebab_id = re.sub(r'\s+', '-', kebab_id.strip().lower())
                
                base_img = doc.extract_image(xref)
                raw_bytes = base_img["image"]
                pil_img = Image.open(io.BytesIO(raw_bytes))
                
                clean_img = clean_and_center_bitmap(pil_img)
                png_path = f"src/png/{kebab_id}.png"
                clean_img.save(png_path)
                
                extracted.append({
                    "id": kebab_id,
                    "name": name,
                    "schedule": row_schedule,
                    "page": page_num,
                    "source": "Gazette No. 2263/24",
                    "png": png_path
                })
                
    print(f"Extracted {len(extracted)} symbols from Gazette 2263/24")
    return extracted

if __name__ == "__main__":
    extracted = extract_from_2263()
    with open("gazettes/extracted_metadata.json", "w") as f:
        json.dump(extracted, f, indent=2)
    print("Done extraction step 1.")
