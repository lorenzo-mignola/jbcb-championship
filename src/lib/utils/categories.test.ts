import { describe, expect, it } from 'vitest';
import { sortCategories } from './categories';

const categories = [
  {
    id: 'OsKzkxdF6ttEbfUqYbg0',
    name: 'M U13 -50Kg',
    currentMatch: 'kvFkWCvQq0dGNUnRhH0MS'
  },
  {
    id: 'yKe0Or7PJiR6tP13zbX4',
    name: 'M U13 -28Kg',
    currentMatch: 'F8FQCo-rfkJEfzoC6FSPb'
  },
  {
    id: 'fkrp7gXoFvfRHE3vSwwi',
    name: 'M U15 -55Kg',
    currentMatch: 'HWCB2H93dmlz8IivcCU-r'
  },
  {
    id: 'AYvqEts4AGbSltd4s5mh',
    name: 'M U18 -55Kg',
    currentMatch: 'kP5UwwdYyWabSs6c9ph7a'
  },
  {
    id: 'WLTqt8W3GFXWHKV4nv0M',
    name: 'M U15 -45kg',
    currentMatch: 'ey_DIE8VfFVFkbzAZRF-n'
  },
  {
    id: 'hbTEaTrzBC1xh6ps4pm9',
    name: 'M U15 -60Kg',
    currentMatch: '3L8aKRkWvKrfyVFIy5q2d'
  },
  {
    id: 'Nm4rb9ZDt3ZGDfLDACEI',
    name: 'M U13 +50Kg',
    currentMatch: 'GK3fcKq9lLbtD86-iOP_x'
  },
  {
    id: 'y58fEMi3b8hcKiB46qrb',
    name: 'M U18 -50Kg',
    currentMatch: 'VAviQzzJ_biPudyroM10t'
  },
  {
    id: 'kV7nQNVQpJPjUHhYhRn3',
    name: 'M U13 -30Kg',
    currentMatch: 'Tjlo6fp4XGGO1Sok-knYI'
  },
  {
    id: 'dmYOhasUBhYUdK3W3efg',
    name: 'JUN.-ELITE M -66Kg',
    currentMatch: 't8L89H0X2RTWZEAXNOdLd'
  },
  {
    id: 'OG5RLvqRKr0aZ6inZL6W',
    name: 'F U15 -44Kg',
    currentMatch: 'jHrhoueJAmxhTLTX63cDw'
  },
  {
    id: 'sLUEVc7zFZ5iht8sNNCq',
    name: 'JUN.-ELITE F',
    currentMatch: 'KKaA7C7mz7XuohEy36hbR'
  },
  {
    id: 'YtwJWCpsw9QDY4HQcwbU',
    name: 'M U18 -66Kg',
    currentMatch: 'EqEnJjsH-UtBve-RwDW1l'
  },
  {
    id: 'adi6mOvIFEhDIzxZZ6qO',
    name: 'M U13 -33Kg',
    currentMatch: 'Ow2FO1oN1l8MxEQ_BikC5'
  },
  {
    id: 'wwXtxNqArOHDYKG6ZO9M',
    name: 'JUN.-ELITE M +81Kg',
    currentMatch: 'J9cdmnoPFsZ06vDO64PlM'
  },
  {
    id: 'FKIb0CCdvklAl9AGtyKE',
    name: 'F U18 -60Kg',
    currentMatch: 'jQOVBosTfLsCrkayVn5Nm'
  },
  {
    id: 'GBGLZJ8ajOghnJnZxwsk',
    name: 'M U15 -40Kg',
    currentMatch: 'PP6ztRZ1Th0FYc7AdZOBr'
  },
  {
    id: 'x3KMtLcrGYHmklo8Or8m',
    name: 'M U13 -26Kg',
    currentMatch: 'XywgwoHQ4ycGU1TTkuFC6'
  },
  {
    id: 'n9LetcgUNMsrZAzus73Z',
    name: 'M U15 +60Kg',
    currentMatch: 'fnEN64SieRUm_1XrNbniL'
  },
  {
    id: 'OqtqrOXspjQvX0wUYlX8',
    name: 'M U13 -40Kg',
    currentMatch: 'lV0TXvg5ku59g2BZqx-MA'
  },
  {
    id: 'E5d0FXrPuLE5hNj6TKeg',
    name: 'JUN.-ELITE M -81Kg',
    currentMatch: 'KEquH4LiRsN4dKsDx_f1D'
  },
  {
    id: '4bSFXUmLN1VYT7jKm8A9',
    name: 'M U13 -45Kg',
    currentMatch: 'ECNRIQ5jarmD6EG40thBs'
  },
  {
    id: 'p1L1z2Fa6L9WEpDelRjV',
    name: 'M U18 -60Kg',
    currentMatch: 'xUT_0Hd9ui5X2PCkGxKOg'
  },
  {
    id: '3wlUhFxFitqxLem1mo7i',
    name: 'F U13',
    currentMatch: 'xBzTQHW1W4-s0Iv73D2F1'
  },
  {
    id: 'dmh27XTQuHJ54WcvOKHR',
    name: 'M U15 -50Kg',
    currentMatch: '9Yv9Uij79KSRMlXwmsDho'
  },
  {
    id: 'xSyR6dCIlJv1NFpXVXVy',
    name: 'M U18 -73Kg',
    currentMatch: 'aUG32qx-Ux83Zyxv2tlWz'
  },
  {
    id: 'XFtgtXDnj3PhFHAkPpk2',
    name: 'F U18 -50Kg',
    currentMatch: 'veTvWvNffw8Zp242J5uqL'
  },
  {
    id: 'NOs7877ux2F0AVxVPdUN',
    name: 'JUN.-ELITE M -73Kg',
    currentMatch: 'TOZ9NPtLaczkLekuTCe-_'
  },
  {
    id: 'NO44JTV2n3F9WqVw43iS',
    name: 'M U18 +73',
    currentMatch: 'YdCto6KWuFV0YTNGIOrAh'
  },
  {
    id: '0BI3vhrtn4dM08eUPWYz',
    name: 'M U13 -36Kg',
    currentMatch: 'tx6taYVJ5VRjuURWT3vJq'
  }
];

describe('sortCategories', () => {
  it.each([
    [0, 'F U13'],
    [1, 'M U13 -26Kg']
  ])('at index %i should have "%s"', (index, value) => {
    const sorted = sortCategories(categories);

    expect(sorted[index].name).toBe(value);
  });

  it.skip('should match snapshot', async () => {
    const sorted = sortCategories(categories);

    await expect(sorted).toMatchFileSnapshot(
      '../../../tests/__snapshots__/categories_sort.ts.snap'
    );
  });
});
