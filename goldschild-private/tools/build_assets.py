#!/usr/bin/env python3
"""Build the web assets for the Goldschild Private website.

Inputs (in ../source):
  goldschild-shield-original.png   Logo supplied by the client (transparent PNG).
  interior-lobby-unsplash-0-ypHJxt1-w.jpg
                                   Photo by Declan Sun, Unsplash License.
                                   https://unsplash.com/photos/0-ypHJxt1-w
                                   Downloaded from:
                                   https://images.unsplash.com/photo-1771678040857-51d00a11be7a?fm=jpg&q=92&w=3200

Outputs (in ../site):
  assets/img/goldschild-shield.png          header/footer logo (high-DPI)
  assets/img/interior-lobby-{w}.jpg|webp   responsive hero image
  assets/icons/*.png, favicon.ico          favicons

Requires Pillow (pip install Pillow). Run: python3 tools/build_assets.py
"""
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source"
SITE = ROOT / "site"
IMG = SITE / "assets" / "img"
ICONS = SITE / "assets" / "icons"

PAPER = (255, 255, 255, 255)  # --paper in styles.css


def trimmed_logo() -> Image.Image:
    logo = Image.open(SRC / "goldschild-shield-original.png").convert("RGBA")
    # Drop near-invisible edge pixels, then crop to the visible shield.
    alpha = logo.getchannel("A").point(lambda a: 0 if a < 12 else a)
    logo.putalpha(alpha)
    return logo.crop(alpha.getbbox())


def square(logo: Image.Image, size: int, pad: float, bg=(0, 0, 0, 0)) -> Image.Image:
    """Fit the (portrait) shield into a square canvas with padding."""
    inner = round(size * (1 - 2 * pad))
    scale = inner / max(logo.size)
    w, h = max(1, round(logo.width * scale)), max(1, round(logo.height * scale))
    shield = logo.resize((w, h), Image.LANCZOS)
    if size <= 48:
        shield = shield.filter(ImageFilter.UnsharpMask(radius=0.6, percent=60, threshold=0))
    canvas = Image.new("RGBA", (size, size), bg)
    canvas.alpha_composite(shield, ((size - w) // 2, (size - h) // 2))
    return canvas


def build_logo(logo: Image.Image) -> None:
    # Displayed at up to 44 CSS px tall; 176 px covers 4x screens.
    h = 176
    w = round(logo.width * h / logo.height)
    logo.resize((w, h), Image.LANCZOS).save(IMG / "goldschild-shield.png", optimize=True)
    print("logo", w, h)


def build_icons(logo: Image.Image) -> None:
    ico_sizes = [16, 32, 48]
    frames = [square(logo, s, 0.0) for s in ico_sizes]
    frames[-1].save(SITE / "favicon.ico", sizes=[(s, s) for s in ico_sizes],
                    append_images=frames[:-1])
    square(logo, 32, 0.0).save(ICONS / "favicon-32x32.png", optimize=True)
    square(logo, 192, 0.06).save(ICONS / "icon-192.png", optimize=True)
    # iOS ignores transparency: give the touch icon the site background.
    square(logo, 180, 0.12, PAPER).convert("RGB").save(ICONS / "apple-touch-icon.png", optimize=True)


def build_hero() -> None:
    photo = Image.open(SRC / "interior-lobby-unsplash-0-ypHJxt1-w.jpg").convert("RGB")
    for w in (800, 1280, 1920, 2400):
        h = round(photo.height * w / photo.width)
        im = photo.resize((w, h), Image.LANCZOS)
        im.save(IMG / f"interior-lobby-{w}.jpg", quality=80, optimize=True, progressive=True)
        im.save(IMG / f"interior-lobby-{w}.webp", quality=78, method=6)
        print("hero", w, h)


if __name__ == "__main__":
    IMG.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)
    shield = trimmed_logo()
    build_logo(shield)
    build_icons(shield)
    build_hero()
