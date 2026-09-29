from PIL import Image
def crop(path, prefix, top, bottom):
    img = Image.open(path)
    W,H = img.size
    box=(0,top,W,bottom)
    c=img.crop(box)
    out=f"{prefix}.png"
    c.save(out, optimize=True)
    print(out, c.size)
crop("/home/z/my-project/screenshot-home-v2.png","focus_desk_hero",150,1400)
crop("/home/z/my-project/screenshot-mobile.png","focus_mob_reporttable",6150,7050)
crop("/home/z/my-project/screenshot-mobile.png","focus_mob_cta",16400,17300)
