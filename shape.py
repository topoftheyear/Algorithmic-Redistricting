import json
import random

import shapefile as shp
import matplotlib.pyplot as plt

sf = shp.Reader('shapemap/tl_2010_us_zcta510.shp')

with open('results.json', 'r') as f:
    data = json.load(f)

for state, info in data.items():
    for name in info['districts'].keys():
        data[state]['districts'][name]['color'] = (
            random.randint(50, 205) / 255,
            random.randint(50, 205) / 255,
            random.randint(50, 205) / 255,
        )

scale = 2.5
fig = plt.figure(figsize=(120 * scale, 60 * scale), dpi=100)
for shape in sf.shapeRecords():
    # Get zip code color
    color = None
    for state, info in data.items():
        for name, dinfo in info['districts'].items():
            if int(shape.record[0]) in dinfo['zip codes']:
                color = data[state]['districts'][name]['color']
                print(f'match found for {shape.record[0]}')
                break
        if color is not None:
            break
    if color is None:
        print(f'no match found for {shape.record[0]}')
        color = (0, 0, 0)

    for i in range(len(shape.shape.parts)):
        i_start = shape.shape.parts[i]
        if i == len(shape.shape.parts)-1:
            i_end = len(shape.shape.points)
        else:
            i_end = shape.shape.parts[i+1]
        x = [i[0] for i in shape.shape.points[i_start:i_end]]
        y = [i[1] for i in shape.shape.points[i_start:i_end]]
        plt.fill(x, y, color=color)

for ax in fig.get_axes():
    ax.set_aspect('equal')

plt.savefig(f'images/zipmap.png')
plt.close(fig)

#print(sf.records())
