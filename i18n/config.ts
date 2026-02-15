/**
 * Language Configuration
 *
 * This is the SINGLE SOURCE OF TRUTH for all supported languages.
 * To add a new language:
 * 1. Create a translation file in /messages/{locale}.json (copy from en.json)
 * 2. Add an entry to the `languages` array below
 *
 * That's it! Routing and static locale generation will pick up the new language automatically.
 */

export interface Language {
  /** Locale code (e.g., 'en', 'de', 'pt-PT') - must match the messages/*.json filename */
  code: string;
  /** English name of the language */
  name: string;
  /** Native name of the language (shown in language selector) */
  nativeName: string;
}

/**
 * All supported languages.
 * Add new languages here - they will be automatically available in routing and static exports.
 */
export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

/** Array of locale codes - derived from languages config */
export const locales = languages.map((lang) => lang.code) as [string, ...string[]];

/** Type for valid locale codes */
export type Locale = (typeof locales)[number];

/** The default locale when none is specified */
export const defaultLocale: Locale = 'en';

/** Generates a regex pattern for matching locale paths in URLs. */
export function getLocaleMatcherPattern(): string {
  return `(${locales.join('|')})`;
}
