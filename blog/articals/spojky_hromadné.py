import os
from bs4 import BeautifulSoup

# spojky, které nechceme na konci řádku
spojky = ["a", "i", "ale", "ani", "nebo", "protože", "když", "kde", "že"]

def uprav_spojky(text):
    # jednoduchá úprava: nahradí " spojka " na " spojka&nbsp;"
    for s in spojky:
        # použijeme mezeru před a za spojku, aby se nechytily části slov
        text = text.replace(f" {s} ", f" {s}&nbsp;")
    return text

def zpracuj_soubor(soubor):
    print(f"Zpracovávám {soubor}...")
    with open(soubor, "r", encoding="utf-8") as f:
        html = f.read()
    soup = BeautifulSoup(html, "html.parser")
    div_text = soup.find("p", class_="text")
    if div_text:
        upraveny_text = uprav_spojky(div_text.decode_contents())
        div_text.clear()
        div_text.append(BeautifulSoup(upraveny_text, "html.parser"))
        with open(soubor, "w", encoding="utf-8") as f:
            f.write(str(soup))
        print(f"{soubor} byl upraven.")
    else:
        print(f"Ve {soubor} nebyl nalezen p s class 'text'.")

# najde všechny soubory article_*.html ve složce
for soubor in os.listdir("."):
    if soubor.startswith("article_") and soubor.endswith(".html"):
        zpracuj_soubor(soubor)


# C:\Users\kloka\OneDrive\Desktop\test\blog\articals> python .\spojky.py
