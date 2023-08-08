/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import SPANISH_TRANSLATIONS from "../strings/es.json";

// copy from: https://github.com/ellucian-developer/experience-ethos-examples/blob/main/today-classes-lambda/extension/src/i18n/intlUtility.js
// Our university will probably not have territory translations

export const getMessages = (userLocale) => {
  const baseMessages = SPANISH_TRANSLATIONS;

  try {
    const actionLanguage = userLocale.split(/[-_]/)[0];
    const localeMessages = require(`../strings/${actionLanguage}.json`);
    return { ...baseMessages, ...localeMessages };
  } catch (e) {
    // This userLocale is not supported.
    return baseMessages;
  }
};
