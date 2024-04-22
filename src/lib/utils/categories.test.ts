import { describe, expect, it } from 'vitest';

import type { Category } from '../types/category.type';
import { sortCategories } from './categories';

const categories = [
  {
    name: 'M U13 -33Kg',
    id: '097af42pxO8CQkFjGKwK'
  },
  {
    name: 'M U13 -30Kg',
    id: '0ngUgCQFFOoYbUFQxHCf'
  },
  {
    name: 'JUN.-ELITE M +90Kg',
    id: '2hAbXeJrKyUsRSV2Ty31'
  },
  {
    name: 'JUN.-ELITE M -90Kg',
    id: '2y3o3SmDC4mlAawoSWlJ'
  },
  {
    name: 'M U15 -55Kg',
    id: '3P7lImVcVYh9or3GBmrD'
  },
  {
    name: 'F U18 -57Kg',
    id: '3Tdb8eMU55V572pLwDzT'
  },
  {
    name: 'M U15 -40Kg',
    id: '3ccEo5AumbKadvz5wH11'
  },
  {
    name: 'M U13 -40Kg',
    id: '3n2jbtcbcBtmbiEnsyju'
  },
  {
    name: 'F U15 +52Kg',
    id: '3t5iMVHz6OidEBWZ3TiY'
  },
  {
    name: 'M U13 -26Kg',
    id: '4bVgKB0FUxyOgSR95Lmu'
  },
  {
    name: 'F U13 -33Kg',
    id: '6zPFrbhkdNGaKlTTTqqN'
  },
  {
    name: 'M U18 +73',
    id: '852wqmC4GIh7XRoKE1ql'
  },
  {
    name: 'M U18 -73Kg',
    id: '9WBLleK38W3XsV2lz4Eq'
  },
  {
    name: 'M U18 -66Kg',
    id: '9qtukTyj6sCHadvVeCLB'
  },
  {
    name: 'JUN.-ELITE M -81Kg',
    id: '9uKkGlEkzwnxHvbJIPDG'
  },
  {
    name: 'M U13 -36Kg',
    id: 'AealVsQoFfYfHNISbpsk'
  },
  {
    name: 'M U13 -28Kg',
    id: 'BbesDWrrR6VInq4hbj5Z'
  },
  {
    name: 'M U18 -73Kg (errore)',
    id: 'CM2h5wTJmedyn2Q5eYnd'
  },
  {
    name: 'JUN.-ELITE F -60Kg',
    id: 'ElOFfnWsiW1JSALewM59'
  },
  {
    name: 'JUN.-ELITE M -73Kg',
    id: 'Htq0wLx9DyyvGI1uzEKC'
  },
  {
    name: 'F U13 -45Kg',
    id: 'ISX488yDK2Lwd6ORX7aZ'
  },
  {
    name: 'F U18 +63Kg',
    id: 'MXbQVS9fAEwQ4eNM5Mgq'
  },
  {
    name: 'F U18 -48Kg',
    id: 'RhhIKb6GPK9VOjh6yTsc'
  },
  {
    name: 'M U13 -45Kg',
    id: 'SkxWQ1mlwVoxA0MmXzYx'
  },
  {
    name: 'M U13 +50Kg',
    id: 'WhOd57utQukoNvG1yDvo'
  },
  {
    name: 'F U13 -30Kg',
    id: 'XT7WfxiZDctFAfi1uZJp'
  },
  {
    name: 'F U13 +45Kg',
    id: 'YwVldgOjFQYIGZZwDufc'
  },
  {
    name: 'JUN.-ELITE M -66Kg',
    id: 'eqCEO8ioX5Kb1O3AUoIi'
  },
  {
    name: 'F U15 -52Kg',
    id: 'hmn14PIXQL8FVmZSIs0o'
  },
  {
    name: 'M U13 -50Kg',
    id: 'k4zmsURCoeiB4HsPNHVY'
  },
  {
    name: 'M U15 -50Kg',
    id: 'kgYW6uhDPhTcGMut9VqL'
  },
  {
    name: 'F U15 -40Kg',
    id: 'nBFxKIJNVByjdDFzzprR'
  },
  {
    name: 'M U15 +60Kg',
    id: 'pbIxpq0aIvd4Piv2BNUF'
  },
  {
    name: 'JUN.-ELITE F +60Kg',
    id: 'qBrtJyovPhjLTS5qQQly'
  },
  {
    name: 'M U15 -60Kg',
    id: 'syiKHaGJbcNbanNahqUN'
  },
  {
    name: 'F U18 -63Kg',
    id: 'uw9lyZfVD9R8TcwAOQin'
  },
  {
    name: 'M U18 -50Kg',
    id: 'veMreq4e4erQuOi3tyUO'
  },
  {
    name: 'F U13 -37Kg',
    id: 'wFjxeSgvCWcpzenE4JVW'
  },
  {
    name: 'M U18 -60Kg',
    id: 'wpUCac7ZJbVwkJ6rqc4q'
  },
  {
    name: 'M U15 -45kg',
    id: 'zA2oaA18vjhqlq8Y5Yxm'
  }
];

describe('sortCategories', () => {
  it.each([
    [0, 'F U13 -30Kg'],
    [1, 'F U13 -33Kg'],
    [2, 'F U13 -37Kg'],
    [5, 'M U13 -26Kg'],
    [categories.length - 1, 'JUN.-ELITE M +90Kg']
  ])('at index %i should have "%s"', (index, value) => {
    const sorted = sortCategories(categories as Category[]);

    expect(sorted[index].name).toBe(value);
  });

  it('should match snapshot', async () => {
    const sorted = sortCategories(categories as Category[]);

    await expect(sorted).toMatchFileSnapshot(
      '../../../tests/__snapshots__/categories_sort.ts.snap'
    );
  });
});
