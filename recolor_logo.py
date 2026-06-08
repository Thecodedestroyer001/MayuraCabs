from PIL import Image
import numpy as np

try:
    img = Image.open('public/logo-yellow.png').convert('RGBA')
    data = np.array(img)

    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

    # Yellow detection: high Red and Green, low Blue
    is_yellow = (r > 100) & (g > 100) & (b < 150)

    # Everything that isn't yellow and has alpha gets turned to white
    mask = ~is_yellow & (a > 0)
    data[mask, 0] = 255
    data[mask, 1] = 255
    data[mask, 2] = 255

    Image.fromarray(data).save('public/logo-custom.png')
    print("Successfully created logo-custom.png")
except Exception as e:
    print(f"Error: {e}")
