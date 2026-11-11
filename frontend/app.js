import { activities, contest } from './data.js';
import { icon } from './icons.js';
import { addDays, defaultAvailability, planStudies, today, weekStart } from './planner.js';
import { activityDetails, availabilityForm, exams, overview, plan, trail } from './views.js';

const main = document.querySelector('main');
const navigation = document.querySelector('.navigation');
const availabilityDialog = document.querySelector('#availability-dialog');
const activityDialog = document.querySelector('#activity-dialog');
const announcement = document.querySelector('#announcement');
const activityById = new Map(activities.map(activity => [activity.id, activity]));
const storageKey = 'concurso-ai:v1';
const pages = {
  'visao-geral': 'Escrevente TJSP',
  trilha: 'Trilha de estudos',
  provas: 'Provas anteriores',
  'meu-plano': 'Meu plano de estudos',
};

const state = loadState();
let week = weekStart(today());
let openActivityId;
let activityOpenerIndex;
let availabilityOpener;
let savedAvailability = false;

function loadState() {
  const initial = { planStart: null, availability: null, schedule: [], unscheduled: [], completed: {}, review: [], answers: {} };
  try {
    const saved = { ...initial, ...JSON.parse(localStorage.getItem(storageKey)) };
    const known = id => activityById.has(id);
    saved.schedule = saved.schedule.filter(entry => known(entry.id));
    saved.review = saved.review.filter(known);
    saved.unscheduled = saved.unscheduled.filter(known);
    saved.completed = Object.fromEntries(Object.entries(saved.completed).filter(([id]) => known(id)));
    saved.answers = Object.fromEntries(Object.entries(saved.answers).filter(([id]) => known(id)));
    return saved;
  } catch {
    return initial;
  }
}

function saveState(message) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    message += ' O navegador só pôde guardar as mudanças nesta aba.';
  }
  announcement.textContent = message;
}

function route() {
  const [page, subject] = location.hash.slice(1).split('/');
  return { page: Object.hasOwn(pages, page) ? page : 'visao-geral', subject };
}

function render({ focus = false } = {}) {
  const { page, subject } = route();
  const date = today();
  const firstWeek = weekStart([state.planStart || date, state.schedule[0]?.date || date, date].sort()[0]);
  const lastWeek = weekStart([date, state.schedule.at(-1)?.date || date, addDays(contest.examDate, -1)].sort().at(-1));
  week = week < firstWeek ? firstWeek : week > lastWeek ? lastWeek : week;

  switch (page) {
    case 'trilha': main.innerHTML = trail(state, subject); break;
    case 'provas': main.innerHTML = exams(); break;
    case 'meu-plano': main.innerHTML = plan(state, date, week, firstWeek, lastWeek); break;
    default: main.innerHTML = overview(state, date);
  }

  for (const link of navigation.querySelectorAll('[data-route]')) {
    if (link.dataset.route === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  document.title = `Concurso AI | ${pages[page]}`;
  if (focus) {
    main.querySelector('h1').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

function refreshWeek(selector) {
  render();
  const target = selector && main.querySelector(selector);
  (target && !target.disabled ? target : main.querySelector('#week-title'))?.focus({ preventScroll: true });
}

function schedulePlan(availability) {
  const date = today();
  state.planStart ||= date;
  state.availability = availability;
  Object.assign(state, planStudies({ ...state, activities, start: date, deadline: contest.examDate }));
  week = weekStart(date);
}

function setFlag(id, flagged) {
  state.review = state.review.filter(item => item !== id);
  if (flagged) state.review.push(id);
  else {
    state.schedule = state.schedule.filter(entry => entry.id !== id || entry.kind !== 'review' || entry.doneOn);
    if (state.completed[id]) state.unscheduled = state.unscheduled.filter(item => item !== id);
  }
}

function updateCompletion(input) {
  const id = input.dataset.complete;
  if (input.dataset.reviewDate) {
    const entry = state.schedule.find(item => item.id === id && item.kind === 'review' && item.date === input.dataset.reviewDate);
    if (!entry) return;
    if (input.checked) entry.doneOn = today();
    else {
      delete entry.doneOn;
      state.schedule = state.schedule.filter(item => item === entry || item.id !== id || item.kind !== 'review' || item.doneOn);
    }
    setFlag(id, !input.checked);
  } else if (input.checked) {
    state.completed[id] = today();
    state.unscheduled = state.unscheduled.filter(item => item !== id);
  } else {
    delete state.completed[id];
    state.schedule = state.schedule.filter(entry => entry.id !== id || entry.kind !== 'review' || entry.doneOn);
  }
  saveState(input.checked ? 'Conclusão registrada.' : 'Conclusão desmarcada.');
}

function activityOpeners(id) {
  return [...main.querySelectorAll(`[data-open-activity="${id}"]`)];
}

function refreshActivity(selector, answer) {
  render();
  activityDialog.innerHTML = activityDetails(openActivityId, state, answer);
  activityDialog.querySelector(selector)?.focus({ preventScroll: true });
}

function pendingAnswer() {
  const input = activityDialog.querySelector('input[name="answer"]:checked');
  return input ? Number(input.value) : undefined;
}

for (const element of document.querySelectorAll('[data-icon]')) element.innerHTML = icon(element.dataset.icon);

document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});

main.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const { availability, jumpDate, openActivity, replan, week: step } = button.dataset;
  if (availability !== undefined) {
    availabilityOpener = button;
    availabilityDialog.innerHTML = availabilityForm(state.availability || defaultAvailability, Boolean(state.planStart));
    availabilityDialog.showModal();
  } else if (openActivity) {
    openActivityId = openActivity;
    activityOpenerIndex = activityOpeners(openActivity).indexOf(button);
    activityDialog.innerHTML = activityDetails(openActivity, state);
    activityDialog.showModal();
    activityDialog.querySelector('#activity-title').focus();
  } else if (step) {
    week = addDays(week, Number(step) * 7);
    refreshWeek(`[data-week="${step}"]`);
  } else if (jumpDate) {
    week = weekStart(jumpDate);
    refreshWeek();
  } else if (replan !== undefined) {
    schedulePlan(state.availability);
    saveState('Atividades reorganizadas.');
    refreshWeek();
  }
});

main.addEventListener('change', event => {
  const input = event.target.closest('[data-complete]');
  if (!input) return;
  updateCompletion(input);
  const review = input.dataset.reviewDate;
  refreshWeek(`[data-complete="${input.dataset.complete}"]${review ? `[data-review-date="${review}"]` : ':not([data-review-date])'}`);
});

availabilityDialog.addEventListener('change', event => {
  const input = event.target.closest('input[name="day"]');
  if (!input) return;
  availabilityDialog.querySelector(`#duration-${input.value}`).disabled = !input.checked;
  if (input.checked) availabilityDialog.querySelector('.form-error').hidden = true;
});

availabilityDialog.addEventListener('submit', event => {
  if (event.target.id !== 'availability-form') return;
  event.preventDefault();
  const form = new FormData(event.target);
  const selectedDays = form.getAll('day');
  if (!selectedDays.length) {
    availabilityDialog.querySelector('.form-error').hidden = false;
    availabilityDialog.querySelector('input[name="day"]').focus();
    return;
  }
  const availability = Object.fromEntries(selectedDays.map(day => [day, Number(form.get(`duration-${day}`))]));
  schedulePlan(availability);
  saveState('Cronograma salvo.');
  savedAvailability = true;
  availabilityDialog.close();
});

availabilityDialog.addEventListener('close', () => {
  if (savedAvailability) {
    savedAvailability = false;
    if (route().page === 'meu-plano') refreshWeek();
    else location.hash = '#meu-plano';
  } else availabilityOpener?.focus();
});

activityDialog.addEventListener('change', event => {
  const input = event.target.closest('[data-complete]');
  if (!input) return;
  updateCompletion(input);
  refreshActivity('[data-complete]', pendingAnswer());
});

activityDialog.addEventListener('click', event => {
  const button = event.target.closest('[data-flag]');
  if (!button) return;
  const id = button.dataset.flag;
  const flagged = !state.review.includes(id);
  setFlag(id, flagged);
  saveState(flagged ? 'Tópico sinalizado para revisão.' : 'Tópico removido da revisão.');
  refreshActivity('[data-flag]', pendingAnswer());
});

activityDialog.addEventListener('submit', event => {
  if (event.target.id !== 'quiz-form') return;
  event.preventDefault();
  const id = event.target.dataset.activity;
  const answer = Number(new FormData(event.target).get('answer'));
  const correct = answer === activityById.get(id).quiz.answer;
  state.answers[id] = answer;
  if (!correct) setFlag(id, true);
  saveState(correct ? 'Resposta correta.' : 'Tópico sinalizado para revisão.');
  refreshActivity('.quiz-feedback', answer);
});

activityDialog.addEventListener('close', () => {
  const openers = activityOpeners(openActivityId);
  (openers[activityOpenerIndex] || openers[0] || main.querySelector('h1'))?.focus({ preventScroll: true });
});

window.addEventListener('hashchange', () => {
  if (route().page === 'meu-plano') week = weekStart(today());
  render({ focus: true });
});
render();
