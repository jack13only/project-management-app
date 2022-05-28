import { createSlice } from '@reduxjs/toolkit';
import { loadLangFromLS } from '../features/ls-load-save';

type LangState = {
  lang: LangRuEn;
};

export type LangRuEn = 'RU' | 'EN';

const langFromLS = loadLangFromLS();

const initialUserState: LangState = {
  lang: langFromLS,
};

const langSlice = createSlice({
  name: 'langReducer',
  initialState: initialUserState,
  reducers: {
    setLang(state, action: { payload: LangRuEn }) {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
