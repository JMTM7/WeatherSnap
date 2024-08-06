import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

/**
 * Custom hook to access the theme context from styled-components.
 * This hook provides access to the current theme values defined in the ThemeProvider.
 * 
 * @returns {Object} The current theme context value.
 */
export default function useTheme() {
    // Use the useContext hook to access the theme context
    return useContext(ThemeContext);
}
