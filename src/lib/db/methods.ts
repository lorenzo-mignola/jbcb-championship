import { db } from './db';

export const getSettings = () => {
  if (!db) {
    return {};
  }
  return db.data.settings || {};
};

export const addClub = (newClub: string) => {
  if (!db) {
    return;
  }
  const { settings = {} } = db.data;
  const { clubs = [] } = settings;
  const clubsUpdated = [...clubs, newClub];
  const settingsUpdated = {
    ...settings,
    clubs: clubsUpdated
  };

  db.data.settings = settingsUpdated;
  db.write();
};

export const removeClub = (clubToRemove: string) => {
  if (!db) {
    return;
  }
  const { settings = {} } = db.data;
  const { clubs = [] } = settings;
  const clubsUpdated = clubs.filter((club) => club !== clubToRemove);
  const settingsUpdated = {
    ...settings,
    clubs: clubsUpdated
  };

  db.data.settings = settingsUpdated;
  db.write();
};
