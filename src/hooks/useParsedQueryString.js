import { parse } from 'qs';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Parses the query string from the URL or hash and returns the parsed object.
 * @param {string} [search] - Optional search string to parse.
 * @returns {Object} - The parsed query string as an object.
 */
export function parsedQueryString(search) {
    if (!search) {
        // Handle search string in the hash if not provided
        const hash = window.location.hash;
        search = hash.includes('?') ? hash.split('?')[1] : '';
    }
    return search ? parse(search, { parseArrays: false, ignoreQueryPrefix: true }) : {};
}

/**
 * Custom hook to get and parse the query string from the URL.
 * @returns {Object} - The parsed query string as an object.
 */
export default function useParsedQueryString() {
    const { search } = useLocation();
    return useMemo(() => parsedQueryString(search), [search]);
}
