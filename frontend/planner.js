export const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
export const weekdayOrder = [1, 2, 3, 4, 5, 6, 0];
export const defaultAvailability = { 1: 60, 3: 60, 6: 90 };

// Use dates in São Paulo for the contest calendar and UTC for date-only arithmetic.
export function today() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function addDays(date, amount) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + amount);
  return value.toISOString().slice(0, 10);
}

export function weekday(date) {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

export function weekStart(date) {
  return addDays(date, -((weekday(date) + 6) % 7));
}

export function formatDate(date, options) {
  return new Intl.DateTimeFormat('pt-BR', { ...options, timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export function reviewMinutes(activity) {
  return Math.min(activity.minutes, 20);
}

export function planStudies({ activities, completed, review, schedule, availability, start, deadline }) {
  const retained = schedule.filter(entry => entry.kind === 'review' ? entry.doneOn : completed[entry.id]);
  const retainedStudies = new Set(retained.filter(entry => entry.kind === 'study').map(entry => entry.id));
  for (const activity of activities) {
    if (completed[activity.id] && !retainedStudies.has(activity.id)) {
      retained.push({ id: activity.id, kind: 'study', date: completed[activity.id] });
    }
  }

  const byId = new Map(activities.map(activity => [activity.id, activity]));
  const elapsed = new Map();
  const finishedReviews = new Set();
  for (const entry of retained) {
    const activity = byId.get(entry.id);
    const isReview = entry.kind === 'review';
    const date = isReview ? entry.doneOn : completed[entry.id];
    const minutes = isReview ? reviewMinutes(activity) : activity.minutes;
    elapsed.set(date, (elapsed.get(date) || 0) + minutes);
    if (isReview) finishedReviews.add(`${entry.id}/${entry.date}`);
  }
  const slots = [];
  for (let date = start; date < deadline; date = addDays(date, 1)) {
    const remaining = (availability[weekday(date)] || 0) - (elapsed.get(date) || 0);
    if (remaining > 0) slots.push({ date, remaining });
  }

  // Interleave disciplines before scheduling. Flagged topics go into the first available sessions.
  const groups = [...groupBySubject(activities).values()];
  const ordered = Array.from({ length: Math.max(...groups.map(group => group.length), 0) }, (_, index) =>
    groups.flatMap(group => group.slice(index, index + 1)),
  ).flat();
  const flagged = new Set(review);
  const priority = ordered.filter(activity => flagged.has(activity.id));
  const regular = ordered.filter(activity => !flagged.has(activity.id) && !completed[activity.id]);
  const entries = [...retained];
  const unscheduled = [];

  for (const activity of priority) {
    const kind = completed[activity.id] ? 'review' : 'study';
    const minutes = kind === 'review' ? reviewMinutes(activity) : activity.minutes;
    const slot = slots.find(candidate => candidate.remaining >= minutes && !finishedReviews.has(`${activity.id}/${candidate.date}`));
    if (slot) {
      slot.remaining -= minutes;
      entries.push({ id: activity.id, kind, date: slot.date });
    } else {
      unscheduled.push(activity.id);
    }
  }

  const openSlots = slots.filter(slot => slot.remaining > 0);
  for (const [index, activity] of regular.entries()) {
    const target = Math.floor(index * openSlots.length / regular.length);
    const canFit = slot => slot.remaining >= activity.minutes;
    const slot = openSlots.slice(target).find(canFit) || openSlots.slice(0, target).find(canFit);
    if (slot) {
      slot.remaining -= activity.minutes;
      entries.push({ id: activity.id, kind: 'study', date: slot.date });
    } else {
      unscheduled.push(activity.id);
    }
  }

  return { schedule: entries.sort((first, second) => first.date.localeCompare(second.date)), unscheduled };
}

function groupBySubject(activities) {
  const groups = new Map();
  for (const activity of activities) {
    if (!groups.has(activity.subjectId)) groups.set(activity.subjectId, []);
    groups.get(activity.subjectId).push(activity);
  }
  return groups;
}
