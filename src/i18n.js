import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Global Video Dating": "Global Video Dating",
          "Chat with": "Chat with",
          "Girls": "Girls",
          "Why do you want to chat with girls?": "Why do you want to chat with girls?",
          "Friendship": "Friendship",
          "Relationship": "Relationship",
          "Time Pass": "Time Pass",
          "Marriage": "Marriage",
          "Networking": "Networking",
          "Just Curious": "Just Curious",
          "I’m not a robot": "I’m not a robot",
          "Start Chat": "Start Chat"
        }
      },
      hi: {
        translation: {
          "Global Video Dating": "ग्लोबल वीडियो डेटिंग",
          "Chat with": "के साथ चैट करें",
          "Girls": "लड़कियों",
          "Why do you want to chat with girls?": "आप लड़कियों से चैट क्यों करना चाहते हैं?",
          "Friendship": "दोस्ती",
          "Relationship": "रिश्ता",
          "Time Pass": "समय पास",
          "Marriage": "शादी",
          "Networking": "नेटवर्किंग",
          "Just Curious": "बस जिज्ञासु",
          "I’m not a robot": "मैं रोबोट नहीं हूँ",
          "Start Chat": "चैट शुरू करें"
        }
      },
      es: {
        translation: {
          "Global Video Dating": "Citas de Video Globales",
          "Chat with": "Chatear con",
          "Girls": "Chicas",
          "Why do you want to chat with girls?": "¿Por qué quieres chatear con chicas?",
          "Friendship": "Amistad",
          "Relationship": "Relación",
          "Time Pass": "Pasar el rato",
          "Marriage": "Matrimonio",
          "Networking": "Redes",
          "Just Curious": "Solo curioso",
          "I’m not a robot": "No soy un robot",
          "Start Chat": "Iniciar Chat"
        }
      }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
