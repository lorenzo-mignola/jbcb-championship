import { test as setup } from '@playwright/test';

const authFile = 'tests/storage/category.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/new?category-name=Test+categoria');
  await page.getByPlaceholder('Nome judoka').click();
  await page.getByPlaceholder('Nome judoka').fill('Primo');
  await page.getByPlaceholder('Nome judoka').press('Enter');
  await page.getByPlaceholder('Nome judoka').fill('Secondo');
  await page.getByPlaceholder('Nome judoka').press('Enter');
  await page.getByPlaceholder('Nome judoka').fill('Terzo');
  await page.getByPlaceholder('Nome judoka').press('Enter');
  await page.getByPlaceholder('Nome judoka').fill('Quarto');
  await page.getByPlaceholder('Nome judoka').press('Enter');
  await page.getByRole('button', { name: 'Pool singola' }).click();
  await page.getByRole('button', { name: 'Crea categoria' }).click();

  // Save sto storage
  await page.context().storageState({ path: authFile });
});
