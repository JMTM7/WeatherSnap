import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserLocale } from '../user/reducer';

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
