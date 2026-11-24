import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import {
  WHATSAPP_NUMBER,
  generate30MinSlotsForDate,
  getTodayCasablancaIso,
} from '../utils/clinicStatus.js';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const { lang, t } = useLanguage();
  const minDate = useMemo(() => getTodayCasablancaIso(), [isOpen]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedBanner, setSubmittedBanner] = useState(false);

  // Sync initial service & default date when opened
  useEffect(() => {
    if (isOpen) {
      setSubmittedBanner(false);
      setErrors({});
      if (initialService) {
        setService(initialService);
      } else if (!service && t.services.items.length > 0) {
        setService(t.services.items[0].title);
      }
      if (!date) {
        setDate(minDate);
      }
    }
  }, [isOpen, initialService]);

  // Lock background scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const availableSlots = useMemo(() => {
    return generate30MinSlotsForDate(date);
  }, [date]);

  // Clear selected slot if it becomes invalid on date change
  useEffect(() => {
    if (slot) {
      const found = availableSlots.find((s) => s.id === slot && !s.disabled);
      if (!found) {
        setSlot('');
      }
    }
  }, [availableSlots, slot]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = t.modal.errors.name;
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      nextErrors.phone = t.modal.errors.phone;
    }
    if (!service.trim()) nextErrors.service = t.modal.errors.service;
    if (!date || date < minDate) nextErrors.date = t.modal.errors.date;
    if (!slot) nextErrors.slot = t.modal.errors.slot;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanNotes = notes.trim() || (lang === 'ar' ? 'لا توجد' : 'Aucune');

    const message =
      lang === 'ar'
        ? `مرحباً،\n\nأرغب في حجز موعد.\n\nالاسم : ${name.trim()}\nرقم الهاتف : ${phone.trim()}\nالخدمة المطلوبة : ${service}\nالتاريخ : ${date}\nالوقت : ${slot}\nمدة الموعد : 30 دقيقة\nملاحظات : ${cleanNotes}\n\nشكراً، يرجى تأكيد الموعد.`
        : `Bonjour,\n\nJe souhaite prendre un rendez-vous.\n\nNom : ${name.trim()}\nTéléphone : ${phone.trim()}\nPrestation : ${service}\nDate : ${date}\nHeure : ${slot}\nDurée : 30 minutes\nNotes : ${cleanNotes}\n\nMerci de me confirmer la disponibilité.`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setSubmittedBanner(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/55 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div
        className="glass-card bg-white/95 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-brand-plum/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 py-4 bg-white/95 backdrop-blur-md border-b border-brand-plum/10">
          <div>
            <h3
              id="appointment-modal-title"
              className="text-lg sm:text-xl font-extrabold text-brand-plum"
            >
              {t.modal.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{t.modal.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.modal.closeAria}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-roseSoft/70 hover:bg-brand-roseSoft text-brand-plum text-xs sm:text-sm font-bold transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
            <span>{t.modal.closeAria}</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {submittedBanner && (
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t.modal.sentBanner}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                <User className="w-4 h-4 text-brand-teal" />
                <span>{t.modal.fields.name} *</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.modal.fields.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-plum/20 focus:border-brand-plum focus:outline-none text-sm text-slate-900"
              />
              {errors.name && <p className="text-xs font-semibold text-rose-600">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                <Phone className="w-4 h-4 text-brand-teal" />
                <span>{t.modal.fields.phone} *</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.modal.fields.phonePlaceholder}
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-plum/20 focus:border-brand-plum focus:outline-none text-sm text-slate-900"
              />
              {errors.phone && <p className="text-xs font-semibold text-rose-600">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-800 block">
                {t.modal.fields.service} *
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-plum/20 focus:border-brand-plum focus:outline-none text-sm text-slate-900"
              >
                {t.services.items.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-xs font-semibold text-rose-600">{errors.service}</p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                <Calendar className="w-4 h-4 text-brand-teal" />
                <span>{t.modal.fields.date} *</span>
              </label>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-plum/20 focus:border-brand-plum focus:outline-none text-sm text-slate-900"
              />
              {errors.date && <p className="text-xs font-semibold text-rose-600">{errors.date}</p>}
            </div>
          </div>

          {/* 30-Minute Slots */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                <Clock className="w-4 h-4 text-brand-teal" />
                <span>{t.modal.fields.slot} *</span>
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-tealSoft text-brand-teal">
                {t.modal.durationLabel}
              </span>
            </div>

            {!date ? (
              <p className="text-xs sm:text-sm text-slate-600 bg-brand-cream p-3 rounded-xl">
                {t.modal.selectDateFirst}
              </p>
            ) : availableSlots.length === 0 ? (
              <p className="text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl">
                {t.modal.noSlotsForDate}
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableSlots.map((s) => {
                  const isSelected = slot === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      disabled={s.disabled}
                      onClick={() => setSlot(s.id)}
                      dir="ltr"
                      className={`px-2.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        s.disabled
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                          : isSelected
                            ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                            : 'bg-white text-slate-800 border-brand-plum/20 hover:border-brand-plum hover:bg-brand-roseSoft/30'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            )}
            {errors.slot && <p className="text-xs font-semibold text-rose-600">{errors.slot}</p>}
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <FileText className="w-4 h-4 text-brand-teal" />
              <span>{t.modal.fields.notes}</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.modal.fields.notesPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-brand-plum/20 focus:border-brand-plum focus:outline-none text-sm text-slate-900"
            />
          </div>

          {/* Pending Confirmation Notice */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span>{t.modal.pendingNotice}</span>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-brand-plum/10">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition-colors"
            >
              {t.modal.cancelBtn}
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal/90 text-white text-sm font-bold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{t.modal.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
