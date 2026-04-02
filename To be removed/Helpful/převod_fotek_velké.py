import os
from PIL import Image
from pathlib import Path

# 🔧 Nastavení
source_folder = r"C:\Users\kloka\OneDrive\Desktop\test\Photo_gallery\Gallery_24\MČR_U17"   # ← Zadej zdrojovou složku
output_folder = r"C:\Users\kloka\OneDrive\Desktop\test\Photo_gallery\Gallery_24\MČR_U17_velké"  # ← Zadej cílovou složku
new_width = 1600
new_height = 1200
formats = ['.jpg', '.jpeg', '.png']

def create_output_path(img_path: Path, suffix: str) -> Path:
    # Cesta v cílové složce zachovávající podsložky
    relative = img_path.relative_to(source_folder)
    new_path = output_folder / relative
    return new_path.with_suffix(suffix)

def process_image(img_path: Path):
    try:
        img = Image.open(img_path)
        img = img.convert("RGB")
        # 🧠 Zachovej poměr stran a nezvětšuj
        img.thumbnail((new_width, new_height), Image.LANCZOS)

        # Ulož jako JPG
        jpg_path = create_output_path(img_path, '.jpg')
        jpg_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(jpg_path, 'JPEG', quality=90)

        print(f"✅ Uloženo jako JPG: {img_path.name}")
    except Exception as e:
        print(f"❌ Chyba u {img_path.name}: {e}")

# 🔁 Projdi všechny soubory ve složce a podsložkách
for root, dirs, files in os.walk(source_folder):
    for file in files:
        ext = Path(file).suffix.lower()
        if ext in formats:
            full_path = Path(root) / file
            process_image(full_path)
