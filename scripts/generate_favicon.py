#!/usr/bin/env python3
"""
generate_favicon.py
Designs and generates high-fidelity SVG, PNG, and ICO favicon assets for SanskritLab.
Uses TrueType vector paths of the sacred Om (ॐ) glyph with radiant saffron-gold styling.
"""

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image, ImageDraw, ImageFont
import os

def create_svg():
    tt = TTFont('C:/Windows/Fonts/Nirmala.ttc', fontNumber=1)
    glyph_set = tt.getGlyphSet()
    pen = SVGPathPen(glyph_set)
    glyph_set['uni0950'].draw(pen)
    d_path = pen.getCommands()

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Background Gradient: Sacred Saffron Vermillion -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7A00"/>
      <stop offset="50%" stop-color="#E64A19"/>
      <stop offset="100%" stop-color="#9C1006"/>
    </linearGradient>

    <!-- Divine Golden Ring Gradient -->
    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="50%" stop-color="#FFB300"/>
      <stop offset="100%" stop-color="#FF8F00"/>
    </linearGradient>

    <!-- Om Glyph Gold Radiant Gradient -->
    <linearGradient id="omGold" x1="20%" y1="10%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFFDE7"/>
      <stop offset="30%" stop-color="#FFE082"/>
      <stop offset="70%" stop-color="#FFCA28"/>
      <stop offset="100%" stop-color="#FFA000"/>
    </linearGradient>

    <!-- Soft Drop Shadow for Om -->
    <filter id="glowShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#4A0000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <!-- Squircle Base Emblem -->
  <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#bgGrad)" />

  <!-- Outer Delicate Golden Accent Ring -->
  <rect x="28" y="28" width="456" height="456" rx="102" fill="none" stroke="url(#goldRing)" stroke-width="4" opacity="0.6" stroke-dasharray="12 6" />

  <!-- Inner Subtle Solar Glow -->
  <circle cx="256" cy="256" r="170" fill="none" stroke="url(#goldRing)" stroke-width="2" opacity="0.35" />

  <!-- Sacred Om Vector Path -->
  <g transform="translate(256, 256) scale(0.158, -0.158) translate(-1202, -1007.5)" filter="url(#glowShadow)">
    <path d="{d_path}" fill="url(#omGold)"/>
  </g>
</svg>'''

    os.makedirs('client/public', exist_ok=True)
    with open('client/public/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print("Saved client/public/favicon.svg")

def create_png_icons():
    # Render crisp 512x512 raster icon using PIL
    size = 512
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Gradient background
    for y in range(size):
        r = int(255 - (y / size) * 99)   # 255 -> 156
        g = int(122 - (y / size) * 106)  # 122 -> 16
        b = int(0 + (y / size) * 6)      # 0 -> 6
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Mask to rounded rectangle
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([16, 16, 496, 496], radius=112, fill=255)
    img.putalpha(mask)

    draw = ImageDraw.Draw(img)
    # Draw gold border
    draw.rounded_rectangle([26, 26, 486, 486], radius=102, outline=(255, 193, 7, 180), width=3)

    # Render Om in center
    font = ImageFont.truetype('C:/Windows/Fonts/Nirmala.ttc', 315, index=1)
    bbox = font.getbbox('\u0950')
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (size - w) // 2 - bbox[0]
    y = (size - h) // 2 - bbox[1] - 8

    # Shadow
    draw.text((x, y + 6), '\u0950', font=font, fill=(60, 10, 0, 180))
    # Om body
    draw.text((x, y), '\u0950', font=font, fill=(255, 224, 130, 255))

    # Save 512x512
    img.save('client/public/favicon-512.png')
    # 192x192
    img.resize((192, 192), Image.Resampling.LANCZOS).save('client/public/favicon-192.png')
    # 32x32
    img.resize((32, 32), Image.Resampling.LANCZOS).save('client/public/favicon-32.png')
    # Apple touch icon 180x180
    img.resize((180, 180), Image.Resampling.LANCZOS).save('client/public/apple-touch-icon.png')
    # Multi-resolution ICO
    img.save('client/public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("Saved favicon PNG & ICO assets to client/public/")

if __name__ == '__main__':
    create_svg()
    create_png_icons()
