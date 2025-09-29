export enum Tool {
  PENCIL = 'PENCIL',
  ERASER = 'ERASER',
}

export type Language = 'en' | 'pt' | 'es' | 'fr';

export const LANGUAGES: { code: Language, name: string }[] = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
];