import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [lang, dir]);

  const toggleLang = (nextLang) => {
    if (nextLang === 'fr' || nextLang === 'ar') {
      setLang(nextLang);
    } else {
      setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
    }
  };

  const t = translations[lang] || translations.fr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
