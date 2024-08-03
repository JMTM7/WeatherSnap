import React, { useCallback, useEffect } from "react";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { dynamicActivate, Provider } from "../lib/i18n";
import { useUserLocaleManager } from "../state/user/hooks";

export function LanguageProvider({ children }) {
    const locale = useActiveLocale();
    const [, setUserLocale] = useUserLocaleManager();

    const handleActivate = useCallback(
        async (locale) => {
            try {
                document.documentElement.setAttribute("lang", locale);
                await dynamicActivate(locale);
                setUserLocale(locale); // Persist the selected locale across sessions
            } catch (error) {
                console.error("Failed to activate locale:", locale, error);
            }
        },
        [setUserLocale]
    );

    useEffect(() => {
        handleActivate(locale);
    }, [locale, handleActivate]);

    return (
        <Provider
            locale={locale}
            forceRenderAfterLocaleChange={false}
            onActivate={handleActivate}
        >
            {children}
        </Provider>
    );
}
