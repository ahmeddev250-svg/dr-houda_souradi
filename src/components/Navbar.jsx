import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../utils/clinicStatus.js';
import logoImg from '../assets/images/logo.png';

export default function Navbar({ onOpenBooking }) {
  const { lang, toggleLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#reviews', label: t.nav.reviews },
  ];

  return (
    <header className="glass-navigation fixed top-0 inset-x-0 z-40">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-6">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
        >
          <img
            src={logoImg}
            alt={t.brandName}
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-xl bg-white/80 p-1 shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-extrabold text-brand-plum leading-tight whitespace-nowrap">
              {t.brandName}
            </div>
            <div className="text-xs sm:text-sm font-medium text-brand-teal truncate max-w-[190px] sm:max-w-[260px]">
              {t.brandSub}
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base font-semibold text-slate-700 hover:text-brand-plum transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-brand-plum border border-brand-plum/15 text-sm font-bold transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <Phone className="w-4 h-4 text-brand-teal shrink-0" />
            <span dir="ltr">{WHATSAPP_DISPLAY}</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-plum hover:bg-brand-plumDark text-white text-sm font-bold transition-all whitespace-nowrap shrink-0 shadow-md"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{t.nav.book}</span>
          </button>

          {/* FR / AR Switcher */}
          <div
            className="inline-flex items-center rounded-full bg-brand-roseSoft/80 p-1 border border-brand-plum/15 shrink-0"
            role="group"
            aria-label="Language switcher"
          >
            <Globe className="w-4 h-4 text-brand-plum mx-1.5 shrink-0" />
            <button
              type="button"
              onClick={() => toggleLang('fr')}
              className={`px-2.5 py-1 rounded-full text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                lang === 'fr'
                  ? 'bg-brand-plum text-white shadow-sm'
                  : 'text-brand-plum hover:bg-white/60'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => toggleLang('ar')}
              className={`px-2.5 py-1 rounded-full text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                lang === 'ar'
                  ? 'bg-brand-plum text-white shadow-sm'
                  : 'text-brand-plum hover:bg-white/60'
              }`}
            >
              AR
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <div className="inline-flex items-center rounded-full bg-brand-roseSoft/80 p-0.5 border border-brand-plum/15">
            <button
              type="button"
              onClick={() => toggleLang('fr')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                lang === 'fr' ? 'bg-brand-plum text-white' : 'text-brand-plum'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => toggleLang('ar')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                lang === 'ar' ? 'bg-brand-plum text-white' : 'text-brand-plum'
              }`}
            >
              AR
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menu"
            className="p-2 rounded-xl bg-white/90 text-brand-plum border border-brand-plum/15"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden glass-card mx-4 mb-4 p-4 space-y-3 border border-brand-plum/15">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-brand-roseSoft/60 hover:text-brand-plum transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-brand-plum/10 flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-plum text-white text-sm font-bold shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.book}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
