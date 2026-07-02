from PIL import Image
import glob

def crop_transparent(image_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    # Get bounding box of non-zero alpha pixels
    bbox = img.getbbox()
    if bbox:
        # Crop the image to the bounding box
        cropped = img.crop(bbox)
        cropped.save(image_path)
        print(f"Cropped and saved {image_path}")
    else:
        print(f"No non-transparent pixels found in {image_path}")

if __name__ == "__main__":
    for p in glob.glob("public/logo*.png"):
        crop_transparent(p)
