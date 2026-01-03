import { CATEGORIES_COLLECTION, categoryConverter, db } from './firebase';

export const categoriesCollection = db
  .collection(CATEGORIES_COLLECTION)
  .withConverter(categoryConverter);
