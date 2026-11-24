import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import {
  LANDLINE_DISPLAY,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  EMAIL_ADDRESS,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
} from '../utils/clinicStatus.js';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  const quickLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#reviews', label: t.nav.reviews },
  ];

  return (
    <>
      <footer className="bg-brand-plum text-white pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15">
            {/* Brand & Description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={logoImg}
                  alt={t.brandName}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white p-1.5 shadow-md shrink-0"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {t.brandName}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-brand-roseSoft mt-0.5">
                    {t.brandSub}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                {t.footer.aboutText}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white/12 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white/12 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-white/12 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {t.footer.quickLinksTitle}
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm sm:text-base text-white/85 hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordonnées */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {t.footer.coordsTitle}
              </h4>

              <ul className="space-y-3 text-sm sm:text-base text-white/90">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <div>{t.footer.addressShort}</div>
                    <div className="text-xs sm:text-sm text-brand-roseSoft mt-0.5">
                      {t.footer.landmarkShort}
                    </div>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-rose shrink-0" />
                  <a href="tel:0530247373" dir="ltr" className="hover:underline font-medium">
                    {LANDLINE_DISPLAY}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-rose shrink-0" />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="hover:underline font-bold"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-rose shrink-0" />
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    dir="ltr"
                    className="hover:underline break-all"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 text-center text-sm sm:text-base text-white/80">
            {t.footer.copyright}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer.floatingWhatsapp}
        className="fixed bottom-5 end-5 z-30 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold shadow-xl shadow-brand-teal/30 transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="text-sm">{t.footer.floatingWhatsapp}</span>
      </a>
    </>
  );
}
