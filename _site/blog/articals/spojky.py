import re
from bs4 import BeautifulSoup

# Nastav soubor ke zpracování
soubor = "article_1.html"

# Spojky ke svázání s následujícím slovem
spojky = ["a", "i", "o", "u", "ale", "nebo", "že", "protože", "aby", "ani", "či"]

def oprav_spojky(text):
    for spojka in spojky:
        # Zajistí, že nahradí spojku + mezera pouze jako samostatné slovo
        text = re.sub(rf'\b{spojka}\s+', f'{spojka}&nbsp;', text, flags=re.IGNORECASE)
    return text

# Načtení HTML
with open(soubor, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
text_div = soup.find("p", class_="text")

if text_div:
    upraveny_html = oprav_spojky(text_div.decode_contents())
    text_div.clear()
    text_div.append(BeautifulSoup(upraveny_html, "html.parser"))

    # Zápis zpět do původního souboru
    with open(soubor, "w", encoding="utf-8") as f:
        f.write(str(soup))

    print(f"✅ Spojky upraveny a soubor '{soubor}' přepsán.")
else:
    print("⚠️ Nenalezen <p class='text'> ve zdrojovém souboru.")
