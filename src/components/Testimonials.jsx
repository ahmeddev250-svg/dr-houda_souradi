import React from 'react';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { GOOGLE_MAPS_URL } from '../utils/clinicStatus.js';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-gradient-to-b from-brand-roseSoft/30 to-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-brand-plum text-sm font-bold shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{t.reviews.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum">
              {t.reviews.title}
            </h2>
            <p className="text-base font-semibold text-brand-teal">{t.reviews.summary}</p>

            {/* Keyword Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {t.reviews.chips.map((chip, i) => (
                <span
                  key={i}
                  className="glass-card px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold text-brand-plum"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-plum hover:bg-brand-plumDark text-white text-sm font-bold shadow-md transition-all self-start"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t.reviews.googleCta}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.reviews.items.map((rev, idx) => (
            <article
              key={idx}
              dir={rev.dir || 'ltr'}
              className="glass-card p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-sm font-extrabold text-amber-600">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{rev.rating}</span>
                  </span>
                  <Quote className="w-5 h-5 text-brand-rose/70" />
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  “{rev.text}”
                </p>
              </div>

              <div className="pt-3 border-t border-brand-plum/10">
                <div className="font-extrabold text-brand-plum text-sm">{rev.author}</div>
                <div className="text-xs text-slate-500">{rev.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
