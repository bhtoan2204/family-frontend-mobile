// languageSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { I18n } from 'i18n-js';
import enTranslations from '../../components/i18next/locales/en.json';
import viTranslations from '../../components/i18next/locales/vi.json';
import * as Localization from 'expo-localization';
import { RootState } from '../store';

const i18n = new I18n({
  en: enTranslations,
  vi: viTranslations,
});

const initialState = {
  locale: Localization.locale || 'en',
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      i18n.locale = action.payload;
    },
  },
});

export const { setLocale } = localizationSlice.actions;

export const selectLocale = (state : RootState) => state.localization.locale;

export const getLocale = (state: RootState) => state.localization.locale;

export const getTranslate = createSelector(
  [getLocale],
  (locale) => (key) => i18n.t(key, { locale })
);

export default localizationSlice.reducer;
