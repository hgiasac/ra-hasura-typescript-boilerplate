import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "./en";
import vi from "./vi";

export enum Locale {
  English = "en",
  Vietnamese = "vi",
}

export default polyglotI18nProvider((locale) => {
  switch (locale) {
    case Locale.Vietnamese:
      return vi;
    default:
      return en;
  }
}, Locale.English);
