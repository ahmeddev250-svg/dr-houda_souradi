// Operating schedule in Africa/Casablanca timezone:
// Monday (1) - Friday (5): 09:00 to 17:00
// Saturday (6): 09:00 to 13:00
// Sunday (0): Closed

export const CLINIC_TIMEZONE = 'Africa/Casablanca';
export const WHATSAPP_NUMBER = '212663818588';
export const WHATSAPP_DISPLAY = '+212 6 63 81 85 88';
export const LANDLINE_DISPLAY = '05 30 24 73 73';
export const EMAIL_ADDRESS = 'drhoudasouradi@gmail.com';
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=44+Avenue+de+France+Agdal+Rabat+Dr+Houda+Souradi';
export const INSTAGRAM_URL = 'https://www.instagram.com/dr_houda_souradi/?hl=en';
export const FACEBOOK_URL = 'https://www.facebook.com/p/Dr-Houda-Souradi-100093159602746/';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/houda-souradi-a98257268/';

export function getDaySchedule(dayOfWeek) {
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    return { openMinutes: 9 * 60, closeMinutes: 17 * 60 };
  }
  if (dayOfWeek === 6) {
    return { openMinutes: 9 * 60, closeMinutes: 13 * 60 };
  }
  return null;
}

export function getCasablancaNowParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: CLINIC_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const map = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = weekdayMap[map.weekday] ?? date.getDay();
  const hour = Number(map.hour);
  const minute = Number(map.minute);
  const currentMinutes = hour * 60 + minute;
  const isoDate = `${map.year}-${map.month}-${map.day}`;

  return { dayOfWeek, hour, minute, currentMinutes, isoDate };
}

function formatDurationText(totalMinutes, lang) {
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (lang === 'ar') {
    if (hrs > 0 && mins > 0) return `${hrs} س و ${mins} د`;
    if (hrs > 0) return `${hrs} س`;
    return `${mins} د`;
  }
  if (hrs > 0 && mins > 0) return `${hrs}h ${String(mins).padStart(2, '0')}min`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins} min`;
}

const DAY_NAMES = {
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
};

export function getClinicStatus(lang = 'fr', nowDate = new Date()) {
  const { dayOfWeek, currentMinutes } = getCasablancaNowParts(nowDate);
  const todaySched = getDaySchedule(dayOfWeek);

  if (todaySched && currentMinutes >= todaySched.openMinutes && currentMinutes < todaySched.closeMinutes) {
    const remaining = todaySched.closeMinutes - currentMinutes;
    return {
      isOpen: true,
      statusLabel: lang === 'ar' ? 'مفتوح الآن' : 'Ouvert maintenant',
      detailLabel:
        lang === 'ar'
          ? `يغلق الساعة 17:00 (متبقي ${formatDurationText(remaining, 'ar')})`
          : dayOfWeek === 6
            ? `Ferme à 13:00 (dans ${formatDurationText(remaining, 'fr')})`
            : `Ferme à 17:00 (dans ${formatDurationText(remaining, 'fr')})`,
    };
  }

  // Check if opening later today
  if (todaySched && currentMinutes < todaySched.openMinutes) {
    const untilOpen = todaySched.openMinutes - currentMinutes;
    return {
      isOpen: false,
      statusLabel: lang === 'ar' ? 'مغلق الآن' : 'Fermé actuellement',
      detailLabel:
        lang === 'ar'
          ? `يفتح اليوم الساعة 09:00 (خلال ${formatDurationText(untilOpen, 'ar')})`
          : `Ouvre aujourd'hui à 09:00 (dans ${formatDurationText(untilOpen, 'fr')})`,
    };
  }

  // Find next open day
  let minutesUntilOpen = (24 * 60 - currentMinutes) + 9 * 60;
  let nextDayIdx = (dayOfWeek + 1) % 7;
  let daysAdded = 1;

  while (!getDaySchedule(nextDayIdx) && daysAdded < 7) {
    minutesUntilOpen += 24 * 60;
    nextDayIdx = (nextDayIdx + 1) % 7;
    daysAdded += 1;
  }

  const dayLabel = DAY_NAMES[lang]?.[nextDayIdx] || '';
  return {
    isOpen: false,
    statusLabel: lang === 'ar' ? 'مغلق الآن' : 'Fermé actuellement',
    detailLabel:
      lang === 'ar'
        ? `يفتح ${dayLabel} الساعة 09:00 (خلال ${formatDurationText(minutesUntilOpen, 'ar')})`
        : `Ouvre ${dayLabel} à 09:00 (dans ${formatDurationText(minutesUntilOpen, 'fr')})`,
  };
}

export function generate30MinSlotsForDate(isoDateStr, nowDate = new Date()) {
  if (!isoDateStr) return [];
  const [y, m, d] = isoDateStr.split('-').map(Number);
  if (!y || !m || !d) return [];

  const targetDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dayOfWeek = targetDate.getUTCDay();
  const sched = getDaySchedule(dayOfWeek);
  if (!sched) return [];

  const { isoDate: todayIso, currentMinutes } = getCasablancaNowParts(nowDate);
  const isToday = isoDateStr === todayIso;
  const isPastDate = isoDateStr < todayIso;
  if (isPastDate) return [];

  const slots = [];
  for (let start = sched.openMinutes; start + 30 <= sched.closeMinutes; start += 30) {
    const end = start + 30;
    const sh = String(Math.floor(start / 60)).padStart(2, '0');
    const sm = String(start % 60).padStart(2, '0');
    const eh = String(Math.floor(end / 60)).padStart(2, '0');
    const em = String(end % 60).padStart(2, '0');
    const label = `${sh}:${sm} – ${eh}:${em}`;
    const isPastSlot = isToday && start <= currentMinutes;
    slots.push({
      id: label,
      label,
      startMinutes: start,
      disabled: isPastSlot,
    });
  }
  return slots;
}

export function getTodayCasablancaIso(nowDate = new Date()) {
  return getCasablancaNowParts(nowDate).isoDate;
}
