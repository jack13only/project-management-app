import { LangRuEn } from '../reducers/langReducer';

const team53Auth = 'team53-auth';
const team53Lang = 'team53-lang';
export const ruLang = 'RU';
export const enLang = 'EN';

export const loadTokenFromLS = (): string => {
  if (!localStorage.getItem(team53Auth)) localStorage.setItem(team53Auth, '');
  return localStorage.getItem(team53Auth) as string;
};

export const saveTokenToLS = (token: string) => {
  localStorage.setItem(team53Auth, token);
};

export const loadLangFromLS = (): LangRuEn => {
  if (!localStorage.getItem(team53Lang)) localStorage.setItem(team53Lang, enLang);
  const lang = localStorage.getItem(team53Lang);
  return lang ? (lang as LangRuEn) : enLang;
};

export const saveLangToLS = (lang: LangRuEn) => {
  localStorage.setItem(team53Lang, lang);
};
