import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserDarkMode, updateUserLocale } from '../user/reducer';

// Hook to get dark mode state
export function useIsDarkMode() {
    const { userDarkMode, matchesDarkMode } = useAppSelector(
        (state) => ({
            userDarkMode: state.user.userDarkMode,
            matchesDarkMode: state.user.matchesDarkMode,
        }),
        shallowEqual
    );

    return userDarkMode === null ? matchesDarkMode : userDarkMode;
}

// Hook to operate dark mode
export function useDarkModeManager() {
    const dispatch = useAppDispatch();
    const darkMode = useIsDarkMode();

    const toggleDarkMode = useCallback(() => {
        dispatch(updateUserDarkMode({ userDarkMode: !darkMode }));
    }, [darkMode, dispatch]);

    return [darkMode, toggleDarkMode];
}

// Hook to get user's locale setting
export function useUserLocale() {
    return useAppSelector((state) => state.user.userLocale);
}

// Hook to get user's locale setting
export function useUserLocaleManager() {
    const dispatch = useAppDispatch();
    const locale = useUserLocale();

    const setLocale = useCallback(
        (newLocale) => {
            dispatch(updateUserLocale({ userLocale: newLocale }));
        },
        [dispatch]
    );

    return [locale, setLocale];
}
