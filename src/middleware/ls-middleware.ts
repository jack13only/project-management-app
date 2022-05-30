import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { saveLangToLS } from '../features/ls-load-save';
import { setLang } from '../reducers/langReducer';

export const localStorageMiddleware =
  () => (next: Dispatch<AnyAction>) => (action: Action<unknown>) => {
    if (setLang.match(action)) {
      try {
        saveLangToLS(action.payload);
      } catch {}
    }
    return next(action);
  };
