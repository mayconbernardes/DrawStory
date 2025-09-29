import React from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from '../hooks/useTranslations';

export const Header: React.FC = () => {
  const { t } = useTranslations();
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm p-4 flex justify-between items-center border-b border-slate-700 shadow-lg sticky top-0 z-10">
      <div className="flex-grow text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          DrawStory
        </h1>
        <p className="text-slate-400 text-sm">{t('tagline')}</p>
      </div>
      <div className="absolute right-4">
         <LanguageSwitcher />
      </div>
    </header>
  );
};