import re
from bs4 import BeautifulSoup

with open('design-system.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Google Fonts link
html = re.sub(
    r'<link href=.https://fonts.googleapis.com/css2\?family=Inter.*?rel=.stylesheet.>',
    '<link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700&display=swap" rel="stylesheet">',
    html
)

soup = BeautifulSoup(html, 'html.parser')

if soup.body:
    body_classes = soup.body.get('class', [])
    new_body_classes = []
    for c in body_classes:
        if 'Inter' in c:
            new_body_classes.append('font-[\'Madani_Arabic\',sans-serif]')
        else:
            new_body_classes.append(c)
    soup.body['class'] = new_body_classes

for h1 in soup.find_all('h1'):
    classes = h1.get('class', [])
    classes.append('font-[\'League_Spartan\',sans-serif]')
    h1['class'] = classes

for h in soup.find_all(['h2', 'h3']):
    classes = h.get('class', [])
    classes.append('font-[\'Glacial_Indifference\',sans-serif]')
    h['class'] = classes

for tag in soup.find_all(True):
    classes = tag.get('class', [])
    new_classes = []
    changed = False
    for c in classes:
        if 'JetBrains_Mono' in c:
            new_classes.append('font-[\'Glacial_Indifference\',sans-serif]')
            changed = True
        else:
            new_classes.append(c)
    if changed:
        tag['class'] = new_classes

with open('design-system.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print('Typography updated.')
