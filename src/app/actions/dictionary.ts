import { Locale } from "i18n.config";
import "server-only";

const dictionaries = {
  en: () =>
    import("../[lang]/dictionaries/en.json").then((module) => module.default),
  ar: () =>
    import("../[lang]/dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
