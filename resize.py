import os

from PIL import Image
from tqdm import tqdm

location = 'src/results/images'

'''for filename in tqdm(os.listdir(location)):
	if 'small' in filename:
		os.remove(f'{location}/{filename}')'''

for filename in tqdm(os.listdir(location)):
	if 'small' in filename:
		continue
	
	im = Image.open(f'{location}/{filename}')

	width, height = im.size

	max_width = 960
	max_height = 540

	while width > max_width or height > max_height:
		width *= 0.9
		height *= 0.9

	width = int(width)
	height = int(height)

	im1 = im.resize((width, height), Image.BICUBIC)

	f = filename.replace('.png', '')
	im1.save(f'{location}/{f}_small.png')
