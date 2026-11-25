import React from 'react';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import consultationImg from '../assets/images/doctor-scrubs.jpg';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-5">
            <div className="glass-card p-3">
              <img
                src={consultationImg}
                alt={t.about.title}
                loading="lazy"
                className="w-full h-72 sm:h-96 object-cover rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {t.about.highlights.map((h, idx) => (
                <div key={idx} className="glass-card p-3.5 text-center">
                  <div className="text-xs font-semibold text-brand-teal">{h.label}</div>
                  <div className="text-sm font-extrabold text-brand-plum mt-1">{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-roseSoft text-brand-plum text-sm font-bold">
              <Award className="w-4 h-4 text-brand-teal" />
              <span>{t.about.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {t.about.description}
            </p>

            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-lg font-extrabold text-brand-plum">
                <GraduationCap className="w-6 h-6 text-brand-teal shrink-0" />
                <span>{t.about.diplomasTitle}</span>
              </div>

              <ul className="space-y-3">
                {t.about.diplomas.map((diploma, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <span>{diploma}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
