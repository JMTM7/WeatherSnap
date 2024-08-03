import { useMemo } from 'react';
import store from '../state';
import { useUserLocale } from '../state/user/hooks';
import useParsedQueryString from './useParsedQueryString';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../constants/locales';

/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding SupportedLocale
 * @param {string|unknown} maybeSupportedLocale - The fuzzy locale identifier
 * @returns {string|undefined} The matched locale or undefined
 */
function parseLocale(maybeSupportedLocale) {
    if (typeof maybeSupportedLocale !== 'string') return undefined;
    const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
    return SUPPORTED_LOCALES.find(
        (locale) =>
            locale.toLowerCase() === lowerMaybeSupportedLocale ||
            locale.split('-')[0] === lowerMaybeSupportedLocale
    );
}

/**
 * Returns the supported locale read from the user agent (navigator)
 * @returns {string|undefined} The supported locale or undefined
 */
export function navigatorLocale() {
    if (!navigator.language) return undefined;

    const [language, region] = navigator.language.split('-');
    if (region) {
        return parseLocale(`${language}-${region.toUpperCase()}`) || parseLocale(language);
    }

    return parseLocale(language);
}

function storeLocale() {
    return store.getState().user.userLocale;
}

/**
 * Custom hook to determine the initial locale.
 * @returns {string} The initial locale
 */
export function useInitialLocale() {
    const queryStringLocale = useParsedQueryString().lng;
    return (
        parseLocale(queryStringLocale) ||
        storeLocale() ||
        navigatorLocale() ||
        DEFAULT_LOCALE
    );
}

/**
 * Hook to get the locale from the URL query string
 * @returns {string|undefined} The locale from the query string or undefined
 */
function useUrlLocale() {
    const parsed = useParsedQueryString();
    return parseLocale(parsed.lng);
}

/**
 * Returns the currently active locale, from a combination of user agent, query string, and user settings stored in redux
 * Stores the query string locale in redux (if set) to persist across sessions
 * @returns {string} The active locale
 */
export function useActiveLocale() {
    const urlLocale = useUrlLocale();
    const userLocale = useUserLocale();
    return useMemo(() => urlLocale || userLocale || navigatorLocale() || DEFAULT_LOCALE, [urlLocale, userLocale]);
}
