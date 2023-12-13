import test, { expect } from '@playwright/test';
import { fail } from 'assert';
import { getCategoryMock } from './util/storage';

test('should render the category name', async ({ page }) => {
  const category = getCategoryMock();
  if (!category) {
    fail();
  }
  await page.goto(`/category/${category.id}/match/${category.currentMatch}`);
  await expect(page.getByText('Test categoria')).toBeVisible();
});

test('should render the judoka name', async ({ page }) => {
  const category = getCategoryMock();
  if (!category) {
    fail();
  }
  await page.goto(`/category/${category.id}/match/${category.currentMatch}`);
  if (!category.matches[0]) {
    fail();
  }
  await expect(page.getByText(category.matches[0].white.name)).toBeVisible();
  await expect(page.getByText(category.matches[0].blue.name)).toBeVisible();
});
