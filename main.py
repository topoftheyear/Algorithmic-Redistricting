from states import delegates

import json
import math
import random
import statistics

import matplotlib.pyplot as plt
import matplotlib.patheffects as PathEffects
import numpy as np
import pandas as pd
import shapefile as shp
from tqdm import tqdm

print('Reading census zip data')
zip_data = pd.read_csv('zip_census_data.csv')
print('Reading zip shape map')
sf = shp.Reader('shapemap/tl_2010_us_zcta510.shp')
print('Sorting zip shape map')
sortedf = sorted(sf.shapeRecords(), key=lambda _: _.record[0])

percentage_of_max = 1.0


def distance(p1, p2):
    return (p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2


big_data = dict()

for state in delegates.keys():
    '''if state != 'MD':
        continue'''

    print(f'State: {state}, Percent: {percentage_of_max}')

    big_data[state] = {
        'districts': dict(),
        'stats': dict(),
    }

    print('Obtaining data')
    state_population = 0
    points = list()
    populations = list()
    
    furthest_left = 1000000
    furthest_right = -1000000
    furthest_up = -1000000
    furthest_down = 1000000
    
    for index, row in zip_data.iterrows():
        if row['state'] == state:
            state_population += row['population']
            point = [row['latitude'], row['longitude']]

            points.append({
                'zip': row['zip'],
                'position': point,
                'population': row['population']
            })
            
            if row['latitude'] > furthest_up:
                furthest_up = row['latitude']
            if row['latitude'] < furthest_down:
                furthest_down = row['latitude']
            if row['longitude'] > furthest_right:
                furthest_right = row['longitude']
            if row['longitude'] < furthest_left:
                furthest_left = row['longitude']

    scale = 3
    x_dist = abs(furthest_right - furthest_left) * scale
    y_dist = abs(furthest_up - furthest_down) * scale
    
    weights = list()
    for pop in populations:
        weights.append(pop)

    print('Determining centroids')
    # Create k centroids randomly distributed
    delegate_count = delegates[state]
    centroids = dict()
    for x in range(delegate_count):
        centroids[x] = {
            'name': x + 1,
            'position': [0, 0],#[random.uniform(furthest_down, furthest_up), random.uniform(furthest_left, furthest_right)],
            'population': 0,
            'points': list(),
        }

    # Perform the process n number of times or until meaningful process has ceased
    excess_points = list()
    for n in tqdm(range(50)):
        # Clear centroid information
        for centroid in centroids.values():
            centroid['population'] = 0
            centroid['points'] = list()

        # Iterate through each centroid to assign points until complete
        points_copy = points.copy()
        approx_population = state_population / delegate_count
        while True:
            added_points = False
            for centroid in centroids.values():
                # Skip centroid if above the average population per
                if centroid['population'] >= approx_population * percentage_of_max:
                    continue

                # Iterate through each point to find the closest one
                closest_point = dict()
                closest_distance = 1000000000
                for point in points_copy:

                    dist = distance(centroid['position'], point['position'])

                    if dist < closest_distance:
                        closest_distance = dist
                        closest_point = point

                # Add to centroid
                centroid['points'].append(closest_point)
                centroid['population'] += closest_point['population']
                added_points = True

                # Remove point from list
                points_copy.remove(closest_point)

                # Flag to stop if we've run out of points
                if len(points_copy) == 0:
                    added_points = False
                    break

            if not added_points:
                excess_points = points_copy
                break

        # Recenter the centroids among their points
        meaningful = False
        for cid, centroid in centroids.items():
            old_pos = centroid['position']

            x_list = list()
            y_list = list()
            point_weights = list()
            total_points = 0
            for point in centroid['points']:
                total_points += 1
                x_list.append(point['position'][0])
                y_list.append(point['position'][1])
                point_weights.append(point['population'])

            new_x = np.average(x_list, weights=point_weights)
            new_y = np.average(y_list, weights=point_weights)
            new_pos = [new_x, new_y]
            centroids[cid]['position'] = new_pos

            # Check if meaningful
            dist = math.sqrt(distance(old_pos, new_pos))
            if dist > 0.001:
                meaningful = True

        if not meaningful:
            print(f'Meaningful change ceased after {n} iterations')
            break

    # Add remaining unassigned points
    if len(excess_points) > 0:
        print(f'Allocating {len(excess_points)} excess point(s)')
        for point in excess_points:
            # Nearest point method
            closest_centroid = None
            closest_distance = 1000000000
            for cid, centroid in centroids.items():
                for other_point in centroid['points']:
                    # Ignore points that were recently assigned the same way
                    if other_point['zip'] == point['zip']:
                        continue

                    dist = distance(point['position'], other_point['position'])

                    if dist < closest_distance:
                        closest_distance = dist
                        closest_centroid = cid

            # Nearest centroid method
            '''closest_centroid = None
            closest_distance = 1000000000
            for cid, centroid in centroids.items():
                dist = distance(point['position'], centroid['position'])

                if dist < closest_distance:
                    closest_centroid = cid
                    closest_distance = dist'''

            centroids[closest_centroid]['points'].append(point)
            centroids[closest_centroid]['population'] += point['population']

    for centroid in centroids.values():
        print(f'{centroid["name"]}: position: {centroid["position"]}, population: {centroid["population"]}, points size: {len(centroid["points"])}')

    print('Contructing plot')
    small_data = dict()

    # Plotting business
    colors_list = list()
    for x in range(delegates[state]):
        big_data[state]['districts'][x + 1] = {
            'population': 0,
            'zip codes': list(),
        }
        
        colors_list.append((
            random.randint(50, 205) / 255,
            random.randint(50, 205) / 255,
            random.randint(50, 205) / 255,
        ))
    
    fig = plt.figure(figsize=(x_dist, y_dist), dpi=100)

    for cid, centroid in centroids.items():
        big_data[state]['districts'][cid + 1]['population'] = centroid['population']
        for point in centroid['points']:
            # Find the corresponding zip shape (halfzies rule)
            low_end = 0
            high_end = len(sortedf) - 1
            iterations = 0
            while low_end != high_end and iterations < len(sortedf) / 4:
                iterations += 1
                current_index = (high_end - low_end) / 2 + low_end
                if random.randint(0, 1):
                    current_index = int(math.ceil(current_index))
                else:
                    current_index = int(math.floor(current_index))
                shape = sortedf[current_index]
                shape_zip = int(shape.record[0])

                if shape_zip == point['zip']:
                    for i in range(len(shape.shape.parts)):
                        i_start = shape.shape.parts[i]
                        if i == len(shape.shape.parts) - 1:
                            i_end = len(shape.shape.points)
                        else:
                            i_end = shape.shape.parts[i + 1]
                        x = [i[0] for i in shape.shape.points[i_start:i_end]]
                        y = [i[1] for i in shape.shape.points[i_start:i_end]]
                        plt.plot(x, y, color=(0, 0, 0), linewidth=0.5)
                        plt.fill(x, y, color=colors_list[cid])
                    break
                elif shape_zip < point['zip']:
                    low_end = current_index
                else:
                    high_end = current_index

            big_data[state]['districts'][cid + 1]['zip codes'].append(point['zip'])

        txt = plt.text(
            centroid['position'][1],
            centroid['position'][0],
            centroid['name'],
            color='w',
            fontsize='large',
        )
        txt.set_path_effects([PathEffects.withStroke(linewidth=2, foreground='black')])

    for ax in fig.get_axes():
        ax.set_aspect('equal')
    
    plt.savefig(f'src/results/images/{state}_districts_{percentage_of_max}.png')
    plt.close(fig)

    # Data saving for a file
    all_populations = list()
    largest_district_pop = 0
    largest_district = -1
    smallest_district_pop = 1000000000
    smallest_district = -1
    for district in big_data[state]['districts'].keys():
        pop = big_data[state]['districts'][district]['population']
        all_populations.append(pop)

        if pop > largest_district_pop:
            largest_district_pop = pop
            largest_district = district
        if pop < smallest_district_pop:
            smallest_district_pop = pop
            smallest_district = district

    average_population = statistics.mean(all_populations)
    median_population = statistics.median(all_populations)

    big_data[state]['stats'] = {
        'largest district': {
            'district': largest_district,
            'population': largest_district_pop,
        },
        'smallest district': {
            'district': smallest_district,
            'population': smallest_district_pop,
        },
        'average population size': average_population,
        'median population size': median_population,
    }

    
with open(f'src/results/results_{percentage_of_max}.json', 'w+') as f:
    json.dump(big_data, f)
