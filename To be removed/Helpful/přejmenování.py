import os

def prejmenuj_soubory(cesta_ke_slozce):
    for root, dirs, files in os.walk(cesta_ke_slozce):
        for file_name in files:
            stara_cesta = os.path.join(root, file_name)
            novy_nazev = file_name.replace(" ", "_")
            nova_cesta = os.path.join(root, novy_nazev)
            if stara_cesta != nova_cesta:
                os.rename(stara_cesta, nova_cesta)
                print(f"Přejmenováno: {stara_cesta} -> {nova_cesta}")

# Příklad použití:
cesta = "C:/Users/kloka/OneDrive/Desktop/test/Photo_gallery"  # <- změň na svou reálnou cestu
prejmenuj_soubory(cesta)
