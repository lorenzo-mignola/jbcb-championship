import { expect, test } from '@playwright/test';

test('should create new category and have url with category name', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Crea categoria' }).click();
  await page.getByPlaceholder('Categoria').click();
  await page.getByPlaceholder('Categoria').fill('Test categoria');
  await page.getByPlaceholder('Categoria').blur();

  await expect(page).toHaveURL('/new?category-name=Test+categoria');
});

test('should insert and delete judoka', async ({ page }) => {
  await page.goto('/new?category-name=Test+categoria');
  await page.getByPlaceholder('Nome judoka').click();
  await page.getByPlaceholder('Nome judoka').fill('Primo');
  await page.getByPlaceholder('Nome judoka').press('Enter');
  await expect(page.locator('li').filter({ hasText: 'Primo' })).toBeVisible();
  await page.getByPlaceholder('Nome judoka').fill('Secondo');
  await page.getByRole('button', { name: 'Aggiungi' }).click();
  await expect(page.getByText('Secondo')).toBeVisible();
  await page.getByPlaceholder('Nome judoka').fill('Terzo');
  await page.getByPlaceholder('Nome judoka').press('Enter');
  await expect(page.getByText('Terzo')).toBeVisible();

  // delete 'Secondo'
  await page.getByRole('list').getByRole('button').nth(1).click();
  await expect(page.getByText('Secondo')).not.toBeVisible();
});

test('should enable button when 2 judoka are present and type is selected', async ({ page }) => {
  await page.goto('/new?category-name=Test+categoria');
  await expect(page.getByRole('button', { name: 'Crea categoria' })).toBeDisabled();

  await page.getByPlaceholder('Nome judoka').click();
  await page.getByPlaceholder('Nome judoka').fill('Primo');
  await page.getByPlaceholder('Nome judoka').press('Enter');
  await page.getByPlaceholder('Nome judoka').fill('Secondo');
  await page.getByRole('button', { name: 'Aggiungi' }).click();
  await page.getByRole('button', { name: 'Pool singola' }).click();

  await expect(page.getByRole('button', { name: 'Crea categoria' })).not.toBeDisabled();
});
