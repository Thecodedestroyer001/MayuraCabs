from PIL import Image, ImageChops
import glob

def crop_image(image_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    # Create a white background image of the same size
    bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    
    # Try finding bounding box by ignoring pure white AND fully transparent
    # We can create a mask where pixels that are close to white OR transparent are removed.
    data = img.getdata()
    newData = []
    
    # We want to find the min X, max X, min Y, max Y of actual "logo" pixels
    min_x = img.width
    min_y = img.height
    max_x = 0
    max_y = 0
    
    found = False
    
    for y in range(img.height):
        for x in range(img.width):
            pixel = data[y * img.width + x]
            r, g, b, a = pixel
            
            # Condition for "empty space":
            # Either very transparent, or very white
            is_empty = False
            if a < 10:
                is_empty = True
            elif a > 245 and r > 240 and g > 240 and b > 240:
                is_empty = True
            
            # If it's a black background logo, checking for black might be needed for logo-black.png?
            # But logo-black.png usually means the text is black.
            # If the user complains about empty space, we just crop everything that is white or transparent.
            
            if not is_empty:
                found = True
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    if found:
        # Add a tiny padding (e.g. 1 pixel) just in case
        padding = 1
        bbox = (
            max(0, min_x - padding),
            max(0, min_y - padding),
            min(img.width, max_x + padding + 1),
            min(img.height, max_y + padding + 1)
        )
        cropped = img.crop(bbox)
        cropped.save(image_path)
        print(f"Cropped {image_path} to {bbox}")
    else:
        print(f"Could not find logo pixels in {image_path}")

if __name__ == "__main__":
    for p in glob.glob("public/logo*.png"):
        crop_image(p)
