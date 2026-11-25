import React from 'react';
import {
  Calendar,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  Clock,
  DoorOpen,
  DoorClosed,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import {
  getClinicStatus,
  WHATSAPP_NUMBER,
  LANDLINE_DISPLAY,
} from '../utils/clinicStatus.js';
import logoImg from '../assets/images/logo.png';
import doctorHeroImg from '../assets/images/doctor-whitecoat.jpg';

export default function Hero({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const clinicStatus = getClinicStatus(lang);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-x-clip bg-gradient-to-br from-brand-cream via-white to-brand-roseSoft/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live status + Google rating */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold border shadow-sm ${
                  clinicStatus.isOpen
                    ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50/90 text-rose-900 border-rose-200'
                }`}
              >
                {clinicStatus.isOpen ? (
                  <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <DoorClosed className="w-4 h-4 text-rose-700 shrink-0" />
                )}
                <span>{clinicStatus.statusLabel}</span>
                <span className="text-xs font-medium opacity-80">• {clinicStatus.detailLabel}</span>
              </div>

              <div className="glass-card inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold text-brand-plum">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                <span>{t.hero.ratingBadge}</span>
              </div>
            </div>

            {/* Specialty pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-tealSoft text-brand-teal text-sm font-bold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{t.hero.specialtyBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-brand-plum leading-[1.16] tracking-tight whitespace-pre-line">
              {t.hero.welcomeTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand-plum hover:bg-brand-plumDark text-white text-base font-bold shadow-lg shadow-brand-plum/20 transition-all"
              >
                <Calendar className="w-5 h-5 shrink-0" />
                <span>{t.hero.ctaBook}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-brand-teal hover:bg-brand-teal/90 text-white text-base font-bold shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>{t.hero.ctaWhatsapp}</span>
              </a>

              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="glass-card inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-brand-plum hover:bg-white text-base font-bold transition-all"
              >
                <Phone className="w-5 h-5 text-brand-teal shrink-0" />
                <span>{t.hero.ctaCall}</span>
              </a>
            </div>

            {/* Glass Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-brand-plum font-bold text-sm mb-1">
                  <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{t.hero.infoAddressTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {t.hero.infoAddressVal}
                </p>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-brand-plum font-bold text-sm mb-1">
                  <Clock className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{t.hero.infoHoursTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {t.hero.infoHoursVal}
                </p>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-brand-plum font-bold text-sm mb-1">
                  <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{t.hero.infoPhoneTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug" dir="ltr">
                  {t.hero.infoPhoneVal} • {LANDLINE_DISPLAY}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Photo + Floating Logo Badge */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card p-3 sm:p-4 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/4.3] bg-brand-roseSoft/40">
                <img
                  src={doctorHeroImg}
                  alt={t.hero.photoCaption}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-plumDark/80 via-brand-plumDark/35 to-transparent p-4 text-white">
                  <p className="text-sm sm:text-base font-bold">{t.hero.photoCaption}</p>
                </div>
              </div>

              {/* Floating Logo Badge */}
              <div className="glass-card absolute top-2 start-2 sm:-top-4 sm:-start-4 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-1.5 shadow-xl border-2 border-white bg-white">
                <img
                  src={logoImg}
                  alt={t.brandName}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
