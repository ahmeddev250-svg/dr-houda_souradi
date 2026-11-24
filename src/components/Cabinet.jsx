import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  DoorOpen,
  DoorClosed,
  ExternalLink,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import {
  getClinicStatus,
  LANDLINE_DISPLAY,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  EMAIL_ADDRESS,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
} from '../utils/clinicStatus.js';

import waitingRoomImg from '../assets/images/waiting-room.jpg';
import consultationRoomImg from '../assets/images/consultation-room.jpg';
import doctorScrubsImg from '../assets/images/doctor-scrubs.jpg';
import ultrasound3d4dImg from '../assets/images/ultrasound-3d4d.jpg';
import fetalMonitoringImg from '../assets/images/fetal-monitoring.jpg';
import surgeryLaparoscopyImg from '../assets/images/surgery-laparoscopy.jpg';

const GALLERY_IMAGES = {
  waitingRoom: waitingRoomImg,
  consultationRoom: consultationRoomImg,
  doctorScrubs: doctorScrubsImg,
  ultrasound3d4d: ultrasound3d4dImg,
  fetalMonitoring: fetalMonitoringImg,
  surgeryLaparoscopy: surgeryLaparoscopyImg,
};

export default function Cabinet() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const clinicStatus = getClinicStatus(lang);

  const filteredItems =
    filter === 'all'
      ? t.cabinet.gallery
      : t.cabinet.gallery.filter((item) => item.category === filter);

  const mapEmbedUrl =
    'https://maps.google.com/maps?q=44%20Avenue%20de%20France%2C%20Agdal%2C%20Rabat%2C%20Morocco&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <section id="cabinet" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-tealSoft text-brand-teal text-sm font-bold">
              <MapPin className="w-4 h-4" />
              <span>{t.cabinet.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum">
              {t.cabinet.title}
            </h2>
            <p className="text-base text-slate-700">{t.cabinet.subtitle}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-brand-cream border border-brand-plum/15 self-start">
            {['all', 'spaces', 'equipment'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filter === key
                    ? 'bg-brand-plum text-white shadow-sm'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                {t.cabinet.filters[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="glass-card overflow-hidden group">
              <div className="h-56 w-full overflow-hidden bg-brand-roseSoft/30">
                <img
                  src={GALLERY_IMAGES[item.imageKey] || waitingRoomImg}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-base font-bold text-brand-plum">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hours, Coordonnées & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Hours & Coordonnées */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hours Card */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-lg font-extrabold text-brand-plum">
                  <Clock className="w-5 h-5 text-brand-teal" />
                  <span>{t.cabinet.hoursTitle}</span>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    clinicStatus.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border-rose-200'
                  }`}
                >
                  {clinicStatus.isOpen ? (
                    <DoorOpen className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <DoorClosed className="w-4 h-4 text-rose-700" />
                  )}
                  <span>{clinicStatus.statusLabel}</span>
                </span>
              </div>

              <div className="divide-y divide-brand-plum/10">
                {t.cabinet.scheduleRows.map((row, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-sm sm:text-base">
                    <span className="font-semibold text-slate-800">{row.days}</span>
                    <span className="font-bold text-brand-plum" dir="ltr">
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-xs sm:text-sm font-medium text-slate-600 pt-1">
                {t.cabinet.closedNote} • {clinicStatus.detailLabel}
              </div>
            </div>

            {/* Coordonnées Card */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-extrabold text-brand-plum">{t.cabinet.coordsTitle}</h3>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">{t.cabinet.addressLabel}</div>
                    <div className="text-slate-700">{t.cabinet.addressValue}</div>
                    <div className="text-xs sm:text-sm text-brand-teal font-medium mt-0.5">
                      {t.cabinet.landmarkLabel} : {t.cabinet.landmarkValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">{t.cabinet.landlineLabel} : </span>
                    <a
                      href="tel:0530247373"
                      dir="ltr"
                      className="font-semibold text-brand-plum hover:underline"
                    >
                      {LANDLINE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">{t.cabinet.whatsappLabel} : </span>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="font-bold text-brand-teal hover:underline"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">{t.cabinet.emailLabel} : </span>
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      dir="ltr"
                      className="font-medium text-brand-plum hover:underline"
                    >
                      {EMAIL_ADDRESS}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links inside Coordonnées */}
              <div className="pt-3 border-t border-brand-plum/10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  {t.cabinet.socialTitle}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-roseSoft/80 hover:bg-brand-roseSoft text-brand-plum text-sm font-bold transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-roseSoft/80 hover:bg-brand-roseSoft text-brand-plum text-sm font-bold transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-tealSoft/80 hover:bg-brand-tealSoft text-brand-teal text-sm font-bold transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-plum hover:bg-brand-plumDark text-white text-sm font-bold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.cabinet.openMapsBtn}</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-7">
            <div className="glass-card p-3 h-full min-h-[380px] flex flex-col">
              <iframe
                title="Cabinet Dr Houda Souradi — 44 Avenue de France, Agdal, Rabat"
                src={mapEmbedUrl}
                className="w-full flex-1 min-h-[360px] rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
