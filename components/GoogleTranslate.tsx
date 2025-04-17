"use client"
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        const google = window.google;

        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,ta,te,bn,gu,kn,ml,mr,pa,ur,or,as",
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element" className="google-widget" style={{
    position:'fixed',
    'bottom': '2rem', 
    'right': '2rem',
    'zIndex': 9999,
    'background': '#ffffff',
    'borderRadius': '12px',
    'boxShadow': '0 4px 15px rgba(0, 0, 0, 0.15)',
    'fontFamily': "'Segoe UI', sans-serif",
    'fontSize': '14px',
    'transition': 'all 0.3s ease-in-out',
    'height': '50px',
    'overflow': 'hidden'

}}/>;
};

export default GoogleTranslate;

