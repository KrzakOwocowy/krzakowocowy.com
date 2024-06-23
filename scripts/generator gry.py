import os
import re

# Sample input text
text = """
strona 1
Budzisz się w nieznanym ci pomieszczeniu, rozjaśnionym przez popołudniowe słońce. Pokój jest wypełniony losowymi śmieciami a także sprzętem muzycznym. Obudził cię przenikający ból głowy. Próbując wstać przewracasz leżącą na ziemi butelce po wodzie alfred. Dźwięk tłuczonego szkła w pełni cię wybudza. “Ale z ciebie paralityk - …“ próbując odezwać się do samego siebie uświadamiasz sobie, że zapomniałeś jak się nazywasz. W kieszeni czujesz telefon, spoglądasz w swoje odbicie. To KRZAK OWOCOWY. Jesteś krzakiem. W takim razie prawdopodobnie obudziłeś się w pokoju krzaka. Jednak ciało wydaje się ci nie-twoje. Czy zawsze byłeś krzakiem?

-rozejrzyj się po pokoju (strona 2)
-połóż się z powrotem spać (strona 1.5)
-wyjdź z pokoju (strona 3)
-porozmawiaj z jakąś BIO [bardzo interesującą osobą] (strona 4)
-zabij się (strona 0)

strona 2
Wstajesz i rozglądasz się po pokoju. W rogu widzisz keyboarda a na ścianie widzisz gitarę i bas. Zauważasz też biurko z komputerem. Na łóżku obok siebie leżą słuchawki.

-podejdź do keyboarda (strona 5)
-podejdź do gitar (strona 6)
-usiądź przy kompie (strona 7)
-posłuchaj muzyki (strona 8)
-jednak wyjdź z pokoju (strona 3)
-idź spać (strona 1.5)

strona 5
podchodząc do keyboarda stajesz na rozbitym szkle. UMIERASZ (strona 0)

strona 6
na ścianie wisi czarny squier telecaster deluxe i czerwona yamaha trbx 304)

-weź telecastera (strona 9)
-weź bas (strona 10)

strona 9
Podnosisz gitarę. 2 humbuckery i struny 10 aż proszą się żeby zagrać coś ciężkiego. Jednak nagle ktoś w twojej głowie mówi “czy to na pewno dobry pomysł”?

-tak! (strona 11)
-odłóż gitare i weź bas (strona 10)
-odłóż gitarę i kontynuuj rozmowę z tajemniczym głosem (strona 4)

strona 11
Kątem oka widzisz piec i pedalboard leżący w rogu pokoju. Idąc się podłączyć potykasz się o śmieci i uderzasz głową o biurko. UMIERASZ (strona 0)

strona 10
Podnosisz bas. Pięknie wykonana konstrukcja niesie ze sobą wiele wspomnień krzaka. Krzak zaczyna opowiadać ci je w twojej głowie.

-odłóż bas i kontynuuj rozmowę z krzakiem (strona 100)
-podłącz się do pieca (strona 12)

strona 12
Idąc w stronę pieca słyszysz krzaka ostrzegającego cię przed szkłem na podłodze. Lawirujesz między odłamkami i w końcu siadasz przed piecem. Krzak mówi ci jak go włączyć. Pamięć mięśniowa natychmiast się uruchamia i zaczynasz grać Hysterię. Czujesz jak palce się rozgrzewają. Co zagrać?

-cała dyskografia Muse (strona 13)
-improwizacja (strona 14)
-weezer lick (strona 15)


strona 13
Przegrywasz z pamięci całą dyskografię Muse, od Showbiz po Will of The People. Patrzysz za okno, a tu już noc.

-połóż się spać (strona 1.5)
-graj dalej (strona 16)
-idź na miasto (strona 17)

strona 16
Mimo coraz bardziej bolących palców grasz dalej, nawet nie zauważasz kiedy w końcu UMIERASZ ze zmęczenia (strona 0)

strona 14
Grasz losowe rzeczy. Po godzinie nadal nie wychodzi ci nic ciekawego. W końcu poddajesz się

-zmuś się do dalszej improwizacji (strona 18)
-pora na muse (strona 13)

strona 18
po 3 godzinach bezowocnej improwizacji zabijasz się i UMIERASZ (strona 0)

strona 15
grasz weezer lick. UMIERASZ przez cringe (strona 0)
"""

# Function to create HTML content for a given page
def create_html(page_number, page_content, choices):
    html_content = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../static/styles/main_style.css">
    <title>Krzak Owocowy</title>
</head>
<body>
    <div id="Header">
        <a href="index.html"><h1>Krzak Owocowy</h1></a>
        <h2>Człowiek który stał się krzakiem</h2>
    </div>
    <div id="Content">
        <h3>GRA</h3>
        <p>strona {page_number}</p>
        <p>{page_content}</p>
        {choices}
    </div>
    <div id="Footer">
        <p>©krzakowocowy 2024</p>
    </div>
</body>
</html>"""
    return html_content

# Function to extract choices and create HTML links
def extract_choices(page_text):
    choices = ""
    for line in page_text.split("\n"):
        match = re.match(r"-(.+) \((strona [\d\.]+)\)", line.strip())
        if match:
            choice_text = match.group(1).strip()
            choice_link = match.group(2).replace(" ", "_") + ".html"
            choices += f'<a href="{choice_link}" class="bluelink">-{choice_text}</a><br>\n'
    return choices

# Split the text into pages
pages = re.split(r"\nstrona (\d+[\.\d]*)\n", text)
pages = pages[1:]  # Remove the first empty element

# Create a dictionary to hold page content
page_dict = {}
for i in range(0, len(pages), 2):
    page_number = pages[i].strip()
    page_content = pages[i+1].strip()
    page_dict[page_number] = page_content

# Create a folder for HTML files if it doesn't exist
if not os.path.exists("html_files"):
    os.makedirs("html_files")

# Generate HTML files for each page
for page_number, page_content in page_dict.items():
    content_lines = page_content.split("\n")
    main_content = "\n".join(content_lines[:-1])
    choices = extract_choices(page_content)
    html_content = create_html(page_number, main_content, choices)
    
    file_name = f"html_files/strona_{page_number.replace('.', '-')}.html"
    with open(file_name, "w", encoding="utf-8") as file:
        file.write(html_content)

print("HTML files generated successfully.")
