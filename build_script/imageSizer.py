from PIL import Image
import os
import sys
 
def resize_image(size, path, file, outpath):
    img = Image.open(path+"/"+file)
    print(img.size)
    (image_x,image_y) = img.size
    if not (image_x == size and image_y == size):
        if (image_x/image_y) > 1:
            new_image_x = size
            new_image_y = size * image_y // image_x
        else:
            new_image_y = size
            new_image_x = size * image_x // image_y
    else:
        new_image_x = image_x
        new_image_y = image_y
        
    new_image_size = (new_image_x,new_image_y)
    print(new_image_size)
        
    new_img = img.resize(new_image_size,Image.NEAREST)
    new_img.save(outpath+file, quality=100)
    
 
 
if __name__ == "__main__":
    path = sys.argv[1]
    files  = os.listdir(path)

    size = 16
    if len(sys.argv) >= 3:
        size = int(sys.argv[2])
    
    outpath = './' + str(size) + 'x/'
    isExists=os.path.exists(outpath)
    if not isExists:
        os.makedirs(outpath)

    for file in files:
        filename,filetype = os.path.splitext(file)
        if filetype == '.jpeg' or filetype == '.jpg' or filetype == '.png':
            print(file)
            resize_image(size, path, file, outpath)