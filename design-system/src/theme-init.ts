import { THEME_STORAGE_KEY } from './theme.ts';

/**
 * Inline this in <head> before any stylesheet so a stored theme applies before
 * first paint (no flash of the wrong theme).
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;
