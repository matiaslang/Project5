import * as Localization from 'expo-localization'
export const DEFAULT_LANGUAGE = 'fi'

const translations = {
  en: {
    PLACES: 'Places',
    SHOW_MORE: 'Step One',
    HISTORY: 'History',
    RETURN_HOME: 'Return to home page',
    MAP: 'Map',
    HOME: 'Home'
  },
  fi: {
    PLACES: 'Paikat',
    SHOW_MORE: 'Näytä lisää',
    HISTORY: 'Historia',
    RETURN_HOME: 'Palaa takaisin alkuun',
    MAP: 'Kartta',
    HOME: 'Koti'
  }
}

i18n.locale = Localization.locale

export default new LocalizedStrings(translations)
