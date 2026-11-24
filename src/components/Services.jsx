import React from 'react';
import { Calendar, Stethoscope } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';

import prenatalCareImg from '../assets/images/prenatal-care.jpg';
import deliveryCareImg from '../assets/images/delivery-care.jpg';
import ultrasound3d4dImg from '../assets/images/ultrasound-3d4d.jpg';
import maternityExamImg from '../assets/images/maternity-exam.jpg';
import fetalMonitoringImg from '../assets/images/fetal-monitoring.jpg';
import doctorWhitecoatImg from '../assets/images/doctor-whitecoat.jpg';
import doctorScrubsImg from '../assets/images/doctor-scrubs.jpg';
import waitingRoomImg from '../assets/images/waiting-room.jpg';
import consultationRoomImg from '../assets/images/consultation-room.jpg';
import surgeryLaparoscopyImg from '../assets/images/surgery-laparoscopy.jpg';

const IMAGE_LOOKUP = {
  prenatalCare: prenatalCareImg,
  deliveryCare: deliveryCareImg,
  ultrasound3d4d: ultrasound3d4dImg,
  maternityExam: maternityExamImg,
  fetalMonitoring: fetalMonitoringImg,
  doctorWhitecoat: doctorWhitecoatImg,
  doctorScrubs: doctorScrubsImg,
  waitingRoom: waitingRoomImg,
  consultationRoom: consultationRoomImg,
  surgeryLaparoscopy: surgeryLaparoscopyImg,
};

export default function Services({ onSelectService }) {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-gradient-to-b from-brand-cream to-brand-roseSoft/35"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-brand-plum text-sm font-bold shadow-sm">
            <Stethoscope className="w-4 h-4 text-brand-teal" />
            <span>{t.services.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((srv) => {
            const imgSrc = IMAGE_LOOKUP[srv.imageKey] || consultationRoomImg;
            return (
              <div
                key={srv.id}
                className="glass-card overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-brand-roseSoft/40">
                    <img
                      src={imgSrc}
                      alt={srv.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="glass-card absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-extrabold text-brand-plum">
                      {srv.tag}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="text-lg font-extrabold text-brand-plum">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(srv.title)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-plum hover:bg-brand-plumDark text-white text-sm font-bold transition-colors shadow-sm"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{t.services.selectServiceCta}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
