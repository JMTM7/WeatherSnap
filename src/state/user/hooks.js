import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserLocale } from '../user/reducer';

export function useUserLocale() {
    return useAppSelector((state) => state.user.userLocale);
}

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
