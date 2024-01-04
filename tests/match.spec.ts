// eslint-disable-next-line import/no-named-as-default -- playwrite
import test, { expect } from '@playwright/test';
import { getCategoryMock } from './util/storage';

test('should render the category name', async ({ page }) => {
  const category = getCategoryMock();
  if (!category) {
    throw new Error();
  }
  await page.goto(`/categories/${category._id}/match/${category.currentMatch}`);
  await expect(page.getByText('Test categoria')).toBeVisible();
});

test('should render the judoka name', async ({ page }) => {
  const category = getCategoryMock();
  if (!category) {
    throw new Error();
  }
  await page.goto(`/categories/${category._id}/match/${category.currentMatch}`);
  if (!category.matches[0]?.white || !category.matches[0].blue) {
    throw new Error();
  }
  await expect(page.getByText(category.matches[0].white.name)).toBeVisible();
  await expect(page.getByText(category.matches[0].blue.name)).toBeVisible();
});
