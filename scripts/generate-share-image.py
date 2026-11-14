# /// script
# dependencies = ["pillow", "fonttools", "brotli"]
# ///
"""Run with uv run scripts/generate-share-image.py after changing the share artwork."""
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont, ImageOps
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
cream, green, red = '#f8f3e9', '#155442', '#b02e3c'
canvas = Image.new('RGB', (1200, 630), cream)
draw = ImageDraw.Draw(canvas)
font = TTFont(root / 'node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2')
font.flavor = None
buffer = BytesIO()
font.save(buffer)
buffer.seek(0)
serif = ImageFont.truetype(buffer, 78)
hand = ImageFont.truetype(str(root / 'public/fonts/patrick-hand-regular.ttf'), 31)
small = ImageFont.truetype(str(root / 'public/fonts/patrick-hand-regular.ttf'), 26)
logo = ImageOps.fit(Image.open(root / 'public/images/bop-logo.jpg').convert('RGB'), (72, 72))
mask = Image.new('L', (72, 72))
ImageDraw.Draw(mask).ellipse((0, 0, 71, 71), fill=255)
canvas.paste(logo, (52, 43), mask)
draw.text((144, 47), 'Bengalis of Philadelphia', font=hand, fill=green)
draw.multiline_text((52, 160), 'A little Bangladesh.\nA lot of\nPhiladelphia.', font=serif, fill=green, spacing=-3)
draw.text((56, 516), 'Rooted in Bangladesh. Together in Philly.', font=small, fill=red)
for x in range(52, 1148, 14):
    draw.line((x, 591, min(x+7, 1148), 591), fill=green)

def print_photo(filename, size, angle, position):
    width, height = size
    paper = Image.new('RGBA', (width+24, height+62), '#fffdf6')
    photo = ImageOps.fit(Image.open(root / f'public/images/community/{filename}').convert('RGB'), size)
    paper.paste(photo, (12, 12))
    paper = paper.rotate(angle, Image.Resampling.BICUBIC, expand=True)
    canvas.paste(paper, position, paper)

print_photo('BOP_Hike.png', (305, 350), -6, (820, 116))
print_photo('BOP_Game_Night.png', (300, 220), 9, (650, 270))
canvas.save(root / 'public/images/bop-share.jpg', quality=90, optimize=True)
