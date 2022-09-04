import en from './en';
import tr from './tr';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    'en-US': en,
    'tr-TR': tr
};
const queryParams = new URLSearchParams(window.location.search);
i18n.use(initReactI18next).init({
    resources,
    lng: (queryParams.get('lang') === "en" ? "en-US" : "tr-TR"),
    keySeparator: false,
    interpolation: {
        escapeValue:false
    }
});

export default i18n;