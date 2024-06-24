import os
import re

with open (r'D:\website 2\scripts\text.txt', "r", encoding="utf-8") as f:
    text = f.read()

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
