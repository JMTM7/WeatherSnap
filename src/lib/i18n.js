import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { DEFAULT_LOCALE } from "../constants/locales";
import { en, es } from "make-plural/plurals";
import { useEffect } from "react";

const plurals = {
    "en-US": en,
    "es-ES": es,
    pseudo: en,
};

export async function dynamicActivate(locale) {
    i18n.loadLocaleData(locale, { plurals: () => plurals[locale] });
    try {
        const catalog = await import(
            `${process.env.REACT_APP_LOCALES}/${locale}.js`
        );
        i18n.load(locale, catalog.messages || catalog.default.messages);
    } catch (error) {
        console.error("Failed to load locale", locale, error);
    }
    i18n.activate(locale);
}

export function Provider({
    locale,
    forceRenderAfterLocaleChange = true,
    onActivate,
    children,
}) {
    useEffect(() => {
        dynamicActivate(locale)
            .then(() => onActivate?.(locale))
            .catch((error) => {
                console.error("Failed to activate locale", locale, error);
            });
    }, [locale, onActivate]);

    if (i18n.locale === undefined && locale === DEFAULT_LOCALE) {
        i18n.loadLocaleData(DEFAULT_LOCALE, {
            plurals: () => plurals[DEFAULT_LOCALE],
        });
        i18n.load(DEFAULT_LOCALE, {});
        i18n.activate(DEFAULT_LOCALE);
    }

    return (
        <I18nProvider
            forceRenderOnLocaleChange={forceRenderAfterLocaleChange}
            i18n={i18n}
        >
            {children}
        </I18nProvider>
    );
}
