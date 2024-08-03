import { DEFAULT_LOCALE } from "../constants/locales";
import { en, es } from "make-plural/plurals";
import { useEffect } from "react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

// Define plurals for each locale
const plurals = {
    "en-GB": en,
    "es-ES": es,
    pseudo: en,
};

// Function to dynamically load and activate the locale
export async function dynamicActivate(locale) {
    i18n.loadLocaleData(locale, { plurals: () => plurals[locale] });

    try {
        const catalog = await import(`${process.env.REACT_APP_LOCALES}/${locale}.js`);
        // Load messages, fallback to default export if necessary
        i18n.load(locale, catalog.messages || catalog.default.messages);
    } catch (error) {
        console.error(`Failed to load locale catalog for ${locale}:`, error);
    }

    i18n.activate(locale);
}

// Provider component to manage locale
export function Provider({
    locale,
    forceRenderAfterLocaleChange = true,
    onActivate,
    children,
}) {
    useEffect(() => {
        const loadLocale = async () => {
            try {
                await dynamicActivate(locale);
                if (onActivate) {
                    onActivate(locale);
                }
            } catch (error) {
                console.error("Failed to activate locale:", locale, error);
            }
        };

        loadLocale();
    }, [locale, onActivate]);

    useEffect(() => {
        if (i18n.locale === undefined && locale === DEFAULT_LOCALE) {
            i18n.loadLocaleData(DEFAULT_LOCALE, {
                plurals: () => plurals[DEFAULT_LOCALE],
            });
            i18n.load(DEFAULT_LOCALE, {});
            i18n.activate(DEFAULT_LOCALE);
        }
    }, [locale]);

    return (
        <I18nProvider
            forceRenderOnLocaleChange={forceRenderAfterLocaleChange}
            i18n={i18n}
        >
            {children}
        </I18nProvider>
    );
}
