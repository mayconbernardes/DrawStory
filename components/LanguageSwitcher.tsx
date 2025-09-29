import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { LANGUAGES } from '../types';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslations();

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="bg-slate-700 text-white py-1 px-2 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Select language"
      >
        {LANGUAGES.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};