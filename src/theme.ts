import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
  name: 'jbcb',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    '--theme-font-family-heading': `system-ui`,
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '8px',
    '--theme-rounded-container': '8px',
    '--theme-border-base': '2px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '255 255 255',
    '--on-secondary': '0 0 0',
    '--on-tertiary': '0 0 0',
    '--on-success': '0 0 0',
    '--on-warning': '0 0 0',
    '--on-error': '255 255 255',
    '--on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #7f2f3b
    '--color-primary-50': '236 224 226', // #ece0e2
    '--color-primary-100': '229 213 216', // #e5d5d8
    '--color-primary-200': '223 203 206', // #dfcbce
    '--color-primary-300': '204 172 177', // #ccacb1
    '--color-primary-400': '165 109 118', // #a56d76
    '--color-primary-500': '127 47 59', // #7f2f3b
    '--color-primary-600': '114 42 53', // #722a35
    '--color-primary-700': '95 35 44', // #5f232c
    '--color-primary-800': '76 28 35', // #4c1c23
    '--color-primary-900': '62 23 29', // #3e171d
    // secondary | #eaa049
    '--color-secondary-50': '252 241 228', // #fcf1e4
    '--color-secondary-100': '251 236 219', // #fbecdb
    '--color-secondary-200': '250 231 210', // #fae7d2
    '--color-secondary-300': '247 217 182', // #f7d9b6
    '--color-secondary-400': '240 189 128', // #f0bd80
    '--color-secondary-500': '234 160 73', // #eaa049
    '--color-secondary-600': '211 144 66', // #d39042
    '--color-secondary-700': '176 120 55', // #b07837
    '--color-secondary-800': '140 96 44', // #8c602c
    '--color-secondary-900': '115 78 36', // #734e24
    // tertiary | #0EA5E9
    '--color-tertiary-50': '219 242 252', // #dbf2fc
    '--color-tertiary-100': '207 237 251', // #cfedfb
    '--color-tertiary-200': '195 233 250', // #c3e9fa
    '--color-tertiary-300': '159 219 246', // #9fdbf6
    '--color-tertiary-400': '86 192 240', // #56c0f0
    '--color-tertiary-500': '14 165 233', // #0EA5E9
    '--color-tertiary-600': '13 149 210', // #0d95d2
    '--color-tertiary-700': '11 124 175', // #0b7caf
    '--color-tertiary-800': '8 99 140', // #08638c
    '--color-tertiary-900': '7 81 114', // #075172
    // success | #23c55e
    '--color-success-50': '222 246 231', // #def6e7
    '--color-success-100': '211 243 223', // #d3f3df
    '--color-success-200': '200 241 215', // #c8f1d7
    '--color-success-300': '167 232 191', // #a7e8bf
    '--color-success-400': '100 214 142', // #64d68e
    '--color-success-500': '34 197 94', // #22c55e
    '--color-success-600': '31 177 85', // #1fb155
    '--color-success-700': '26 148 71', // #1a9447
    '--color-success-800': '20 118 56', // #147638
    '--color-success-900': '17 97 46', // #11612e
    // warning | #e76208
    '--color-warning-50': '251 231 218', // #fbe7da
    '--color-warning-100': '250 224 206', // #fae0ce
    '--color-warning-200': '249 216 193', // #f9d8c1
    '--color-warning-300': '245 192 156', // #f5c09c
    '--color-warning-400': '238 145 82', // #ee9152
    '--color-warning-500': '231 98 8', // #e76208
    '--color-warning-600': '208 88 7', // #d05807
    '--color-warning-700': '173 74 6', // #ad4a06
    '--color-warning-800': '139 59 5', // #8b3b05
    '--color-warning-900': '113 48 4', // #713004
    // error | #D41976
    '--color-error-50': '249 221 234', // #f9ddea
    '--color-error-100': '246 209 228', // #f6d1e4
    '--color-error-200': '244 198 221', // #f4c6dd
    '--color-error-300': '238 163 200', // #eea3c8
    '--color-error-400': '225 94 159', // #e15e9f
    '--color-error-500': '212 25 118', // #D41976
    '--color-error-600': '191 23 106', // #bf176a
    '--color-error-700': '159 19 89', // #9f1359
    '--color-error-800': '127 15 71', // #7f0f47
    '--color-error-900': '104 12 58', // #680c3a
    // surface | #575757
    '--color-surface-50': '230 230 230', // #e6e6e6
    '--color-surface-100': '221 221 221', // #dddddd
    '--color-surface-200': '213 213 213', // #d5d5d5
    '--color-surface-300': '188 188 188', // #bcbcbc
    '--color-surface-400': '137 137 137', // #898989
    '--color-surface-500': '87 87 87', // #575757
    '--color-surface-600': '78 78 78', // #4e4e4e
    '--color-surface-700': '65 65 65', // #414141
    '--color-surface-800': '52 52 52', // #343434
    '--color-surface-900': '43 43 43' // #2b2b2b
  }
};
