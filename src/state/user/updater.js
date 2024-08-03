import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { updateMatchesDarkMode } from '../user/reducer';

export default function Updater() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleDarkModeChange = (event) => {
            dispatch(updateMatchesDarkMode({ matchesDarkMode: event.matches }));
        };

        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        // Initial dispatch
        dispatch(updateMatchesDarkMode({ matchesDarkMode: mediaQueryList.matches }));

        // Attach event listener
        mediaQueryList.addEventListener('change', handleDarkModeChange);

        // Cleanup listener on component unmount
        return () => {
            mediaQueryList.removeEventListener('change', handleDarkModeChange);
        };
    }, [dispatch]);

    return null;
}
