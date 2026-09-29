from PIL import Image
import os

def crop_tiles(path, prefix, tile_h=2200, overlap=150):
    img = Image.open(path)
    W, H = img.size
    print(f"{path}: {W}x{H}")
    tiles = []
    y = 0
    idx = 0
    while y < H:
        top = y
        bottom = min(y + tile_h, H)
        box = (0, top, W, bottom)
        crop = img.crop(box)
        out = f"/home/z/my-project/review-crops/{prefix}_t{idx}.png"
        crop.save(out, optimize=True)
        tiles.append((idx, top, bottom))
        idx += 1
        if bottom >= H:
            break
        y = bottom - overlap
    for t in tiles:
        print(f"  {prefix}_t{t[0]}: y {t[1]}-{t[2]}")
    return idx

n1 = crop_tiles("/home/z/my-project/screenshot-home-v2.png", "desk")
n2 = crop_tiles("/home/z/my-project/screenshot-mobile.png", "mob")
print(f"\nTotal tiles: desk={n1} mob={n2}")
