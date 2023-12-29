import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
  name: 'jbcb',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-family-base': `system-ui`,
    '--theme-font-family-heading': `system-ui`,
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '8px',
    '--theme-rounded-container': '8px',
    '--theme-border-base': '2px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '255 255 255',
    '--on-secondary': '255 255 255',
    '--on-tertiary': '255 255 255',
    '--on-success': '0 0 0',
    '--on-warning': '0 0 0',
    '--on-error': '255 255 255',
    '--on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #75343B
    '--color-primary-50': '234 225 226', // #eae1e2
    '--color-primary-100': '227 214 216', // #e3d6d8
    '--color-primary-200': '221 204 206', // #ddccce
    '--color-primary-300': '200 174 177', // #c8aeb1
    '--color-primary-400': '158 113 118', // #9e7176
    '--color-primary-500': '117 52 59', // #75343B
    '--color-primary-600': '105 47 53', // #692f35
    '--color-primary-700': '88 39 44', // #58272c
    '--color-primary-800': '70 31 35', // #461f23
    '--color-primary-900': '57 25 29', // #39191d
    // secondary | #315a6d
    '--color-secondary-50': '224 230 233', // #e0e6e9
    '--color-secondary-100': '214 222 226', // #d6dee2
    '--color-secondary-200': '204 214 219', // #ccd6db
    '--color-secondary-300': '173 189 197', // #adbdc5
    '--color-secondary-400': '111 140 153', // #6f8c99
    '--color-secondary-500': '49 90 109', // #315a6d
    '--color-secondary-600': '44 81 98', // #2c5162
    '--color-secondary-700': '37 68 82', // #254452
    '--color-secondary-800': '29 54 65', // #1d3641
    '--color-secondary-900': '24 44 53', // #182c35
    // tertiary | #5b592a
    '--color-tertiary-50': '230 230 223', // #e6e6df
    '--color-tertiary-100': '222 222 212', // #deded4
    '--color-tertiary-200': '214 214 202', // #d6d6ca
    '--color-tertiary-300': '189 189 170', // #bdbdaa
    '--color-tertiary-400': '140 139 106', // #8c8b6a
    '--color-tertiary-500': '91 89 42', // #5b592a
    '--color-tertiary-600': '82 80 38', // #525026
    '--color-tertiary-700': '68 67 32', // #444320
    '--color-tertiary-800': '55 53 25', // #373519
    '--color-tertiary-900': '45 44 21', // #2d2c15
    // success | #63cc3e
    '--color-success-50': '232 247 226', // #e8f7e2
    '--color-success-100': '224 245 216', // #e0f5d8
    '--color-success-200': '216 242 207', // #d8f2cf
    '--color-success-300': '193 235 178', // #c1ebb2
    '--color-success-400': '146 219 120', // #92db78
    '--color-success-500': '99 204 62', // #63cc3e
    '--color-success-600': '89 184 56', // #59b838
    '--color-success-700': '74 153 47', // #4a992f
    '--color-success-800': '59 122 37', // #3b7a25
    '--color-success-900': '49 100 30', // #31641e
    // warning | #EAB308
    '--color-warning-50': '252 244 218', // #fcf4da
    '--color-warning-100': '251 240 206', // #fbf0ce
    '--color-warning-200': '250 236 193', // #faecc1
    '--color-warning-300': '247 225 156', // #f7e19c
    '--color-warning-400': '240 202 82', // #f0ca52
    '--color-warning-500': '234 179 8', // #EAB308
    '--color-warning-600': '211 161 7', // #d3a107
    '--color-warning-700': '176 134 6', // #b08606
    '--color-warning-800': '140 107 5', // #8c6b05
    '--color-warning-900': '115 88 4', // #735804
    // error | #ab0718
    '--color-error-50': '242 218 220', // #f2dadc
    '--color-error-100': '238 205 209', // #eecdd1
    '--color-error-200': '234 193 197', // #eac1c5
    '--color-error-300': '221 156 163', // #dd9ca3
    '--color-error-400': '196 81 93', // #c4515d
    '--color-error-500': '171 7 24', // #ab0718
    '--color-error-600': '154 6 22', // #9a0616
    '--color-error-700': '128 5 18', // #800512
    '--color-error-800': '103 4 14', // #67040e
    '--color-error-900': '84 3 12', // #54030c
    // surface | #454545
    '--color-surface-50': '227 227 227', // #e3e3e3
    '--color-surface-100': '218 218 218', // #dadada
    '--color-surface-200': '209 209 209', // #d1d1d1
    '--color-surface-300': '181 181 181', // #b5b5b5
    '--color-surface-400': '125 125 125', // #7d7d7d
    '--color-surface-500': '69 69 69', // #454545
    '--color-surface-600': '62 62 62', // #3e3e3e
    '--color-surface-700': '52 52 52', // #343434
    '--color-surface-800': '41 41 41', // #292929
    '--color-surface-900': '34 34 34' // #222222
  }
};
