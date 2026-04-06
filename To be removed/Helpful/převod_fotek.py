import os
from PIL import Image
from pathlib import Path

# 🔧 Nastavení:
source_folder = r"C:\Users\kloka\OneDrive\Desktop\test\Photo_gallery\Gallery_24"  # <- sem zadej svou cestu, např. r"C:\Users\Tomas\Obrazky"
new_width = 700
new_height = 400
formats = ['.jpg', '.jpeg', '.png']

def convert_image(img_path: Path):
    try:
        img = Image.open(img_path)
        img = img.convert("RGB")  # kvůli WebP/AVIF
        # 🧠 Zachovej poměr stran a nezvětšuj
        img.thumbnail((new_width, new_height), Image.LANCZOS)
        img_resized = img  # už je změněný in-place


        # 🟢 Ulož jako WEBP
        webp_path = img_path.with_suffix('.webp')
        img_resized.save(webp_path, 'WEBP', quality=85)

        # 🟢 Ulož jako AVIF
        avif_path = img_path.with_suffix('.avif')
        try:
            img_resized.save(avif_path, 'AVIF', quality=85)
        except OSError:
            print(f"⚠️ AVIF nepodporováno pro: {img_path.name}")

        print(f"✅ Hotovo: {img_path.name}")
    except Exception as e:
        print(f"❌ Chyba u {img_path.name}: {e}")

# 🔁 Projdi všechny soubory ve složce a podsložkách
for root, dirs, files in os.walk(source_folder):
    for file in files:
        ext = Path(file).suffix.lower()
        if ext in formats:
            full_path = Path(root) / file
            convert_image(full_path)
