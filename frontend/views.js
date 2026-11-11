import { activities, contest, previousExams, subjects } from './data.js';
import { icon } from './icons.js';
import { addDays, days, formatDate, reviewMinutes, weekday, weekdayOrder } from './planner.js';

const activityById = new Map(activities.map(activity => [activity.id, activity]));
const dateShort = { day: 'numeric', month: 'short', year: 'numeric' };

export function externalLink(url, label, className = 'text-link', symbol = 'external') {
  return `<a class="${className}" href="${url}" target="_blank" rel="noopener">${label}${icon(symbol)}<span class="sr-only"> (abre em nova aba)</span></a>`;
}

function time(date, options = dateShort) {
  return `<time datetime="${date}">${formatDate(date, options)}</time>`;
}

function chip(label, tone, symbol) {
  return `<span class="chip ${tone}">${icon(symbol)}${label}</span>`;
}

function registrationStatus(date) {
  if (date < contest.registrationStart) return chip('Inscrições previstas', 'info', 'clock');
  if (date > contest.registrationEnd) return chip('Inscrições encerradas', 'error', 'clock');
  return chip('Inscrições abertas', 'success', 'check-circle');
}

function progress(complete, total, label) {
  const progressText = `${complete} de ${total} atividades`;
  return `<div class="progress"><div class="progress-label"><span>${label}</span><span>${progressText}</span></div>
    <progress max="${total || 1}" value="${complete}" aria-label="${label}" aria-valuetext="${progressText}"></progress></div>`;
}

function iconTile(name) {
  return `<span class="icon-tile">${icon(name)}</span>`;
}

function heroIllustration() {
  return `<div class="hero-art" aria-hidden="true">
    <div class="art-grid"></div>
    <div class="art-orbit"></div>
    <div class="art-sheet art-sheet-back"></div>
    <div class="art-sheet art-sheet-front">
      <div class="art-sheet-header">${icon('clipboard')}<span></span></div>
      <div class="art-check-row"><span>${icon('check')}</span><i></i></div>
      <div class="art-check-row"><span>${icon('check')}</span><i></i></div>
      <div class="art-check-row"><span></span><i></i></div>
    </div>
    <div class="art-calendar">${icon('calendar')}</div>
  </div>`;
}

export function overview(state, date) {
  const nextAction = state.planStart
    ? `<a class="button primary" href="#meu-plano">${icon('calendar')}Acessar meu plano</a>`
    : date < contest.examDate
      ? `<button class="button primary" type="button" data-availability>${icon('calendar')}Montar meu plano</button>`
      : `<a class="button primary" href="#trilha">${icon('book')}Ver trilha de estudos</a>`;
  const facts = [
    ['graduation', 'Escolaridade', 'Ensino médio completo'],
    ['calendar', 'Fim das inscrições', time(contest.registrationEnd)],
    ['clock', 'Data prevista da prova', time(contest.examDate)],
    ['wallet', 'Salário inicial', contest.salary],
  ];

  return `<section class="hero" aria-labelledby="page-title">
    <div class="hero-content">
      <p class="hero-institution">${icon('scale')}${contest.institution}</p>
      <h1 id="page-title" tabindex="-1">${contest.title}</h1>
      <p class="hero-description">Prepare-se para a prova com uma trilha gratuita e um plano de estudos que cabe na sua rotina.</p>
      <div class="actions hero-actions">
        ${nextAction}
        ${externalLink(contest.notice, 'Ver edital oficial', 'button secondary', 'external')}
      </div>
    </div>
    ${heroIllustration()}
  </section>
  <dl class="facts" aria-label="Informações principais do concurso">
    ${facts.map(([symbol, label, value]) => `<div class="fact">${iconTile(symbol)}<div><dt>${label}</dt><dd>${value}</dd></div></div>`).join('')}
  </dl>
  <div class="overview-grid">
    <section aria-labelledby="summary-title">
      <div class="section-heading summary-heading"><h2 id="summary-title">Resumo do edital</h2>${registrationStatus(date)}</div>
      <div class="card summary-card">
        ${contest.summary.map(item => `<div class="summary-row">${iconTile(item.icon)}<div>
          <h3>${item.title}</h3><p>${item.text}</p>
          ${externalLink(item.page ? `${contest.notice}#page=${item.page}` : `${contest.news}#:~:text=Provas`, item.source, 'source-link', 'file')}
        </div></div>`).join('')}
      </div>
      <div class="notice attention">${icon('alert')}<div><strong>Confira no edital</strong><p>A data da prova é prevista. Acompanhe as publicações da Vunesp antes de se programar.</p>${externalLink(contest.examPage, 'Acompanhar o concurso')}</div></div>
    </section>
    <section class="overview-track" aria-labelledby="overview-track-title">
      <div class="section-heading"><h2 id="overview-track-title">Trilha de estudos</h2></div>
      <div class="card track-preview">
        <p>Veja o que estudar em cada disciplina e acesse materiais gratuitos por tópico.</p>
        <ul class="track-preview-list">
          ${subjects.slice(0, 3).map(subject => {
            const count = activities.filter(activity => activity.subjectId === subject.id).length;
            return `<li><a href="#trilha/${subject.id}">${iconTile(subject.icon)}<span><strong>${subject.name}</strong><small>${count} atividades</small></span>${icon('chevron')}</a></li>`;
          }).join('')}
        </ul>
        <a class="text-link" href="#trilha">Ver trilha completa${icon('arrow')}</a>
      </div>
    </section>
  </div>`;
}

function pageHeading(title, description, actions = '') {
  return `<div class="page-heading"><div><h1 id="page-title" tabindex="-1">${title}</h1><p>${description}</p></div>${actions}</div>`;
}

function activityRow(activity, state, reviewOnly = false) {
  const complete = Boolean(state.completed[activity.id]);
  const marked = state.review.includes(activity.id);
  return `<li class="activity-row">
    <span class="activity-status-icon ${complete ? 'is-complete' : ''}">${icon(complete ? 'check-circle' : 'book')}</span>
    <button class="activity-name" type="button" data-open-activity="${activity.id}"><strong>${activity.title}</strong><span>${reviewOnly ? `${activity.subject} · ` : ''}${activity.minutes} min${complete ? ' · Concluída' : ''}</span></button>
    ${marked ? chip('Revisar', 'attention', 'flag') : ''}
    <span class="activity-chevron" aria-hidden="true">${icon('chevron')}</span>
  </li>`;
}

export function trail(state, subjectId) {
  if (subjectId === 'revisao') {
    const marked = activities.filter(activity => state.review.includes(activity.id));
    return `<a class="text-link back-link" href="#trilha">${icon('left')}Voltar para a trilha</a>
      ${pageHeading('Tópicos para revisão', 'Retome os tópicos que você sinalizou durante o estudo.')}
      ${marked.length ? `<ul class="card activity-list">${marked.map(activity => activityRow(activity, state, true)).join('')}</ul>` : `<div class="card empty"><span>${iconTile('flag')}</span><h2>Nenhum tópico sinalizado</h2><p>Abra uma atividade da trilha e use “Sinalizar para revisão” para encontrá-la aqui.</p><a class="button secondary" href="#trilha">Ver disciplinas</a></div>`}`;
  }

  const selected = subjects.find(subject => subject.id === subjectId);
  if (selected) {
    const list = activities.filter(activity => activity.subjectId === selected.id);
    return `<a class="text-link back-link" href="#trilha">${icon('left')}Voltar para a trilha</a>
      ${pageHeading(selected.name, 'Abra uma atividade para acessar o material e registrar seu progresso.')}
      <div class="notice info">${icon('info')}<div><strong>Conteúdo de exemplo</strong><p>Consulte o Anexo VIII do edital para ver o conteúdo programático completo.</p>${externalLink(contest.notice, 'Ver edital oficial')}</div></div>
      <div class="subject-detail">
        <div class="subject-modules">${selected.modules.map((module, index) => `<section class="card module" aria-labelledby="module-${index}">
          <h2 id="module-${index}">${module.name}</h2><ul class="activity-list">${module.activities.map(activity => activityRow(activity, state)).join('')}</ul>
        </section>`).join('')}</div>
        <aside class="card subject-progress">${progress(list.filter(activity => state.completed[activity.id]).length, list.length, 'Progresso na disciplina')}
          <a class="text-link" href="#meu-plano">Ver meu plano${icon('arrow')}</a></aside>
      </div>`;
  }

  return `${pageHeading('Trilha de estudos', 'Escolha uma disciplina e avance pelos tópicos no seu ritmo.', `<a class="button secondary" href="#trilha/revisao">${icon('flag')}Tópicos para revisão (${state.review.length})</a>`)}
    <div class="subject-grid">${subjects.map(subject => {
      const list = activities.filter(activity => activity.subjectId === subject.id);
      const complete = list.filter(activity => state.completed[activity.id]).length;
      return `<a class="card subject-card" href="#trilha/${subject.id}"><div class="subject-card-top">${iconTile(subject.icon)}${icon('chevron')}</div>
        <h2>${subject.name}</h2><p>${subject.modules.length} ${subject.modules.length === 1 ? 'módulo' : 'módulos'}</p>${progress(complete, list.length, 'Concluídas')}</a>`;
    }).join('')}</div>`;
}

export function exams() {
  return `${pageHeading('Provas anteriores', 'Pratique com os cadernos e gabaritos de Escrevente Técnico Judiciário publicados pela Vunesp.')}
    <div class="exam-list">${previousExams.map(exam => `<article class="card exam-card">
      ${iconTile('clipboard')}<div><h2>Escrevente TJSP ${exam.year}</h2><p>${exam.location}</p><small>Vunesp (${exam.code})</small>
      <div class="actions">${externalLink(exam.url, 'Cadernos e gabaritos', 'button secondary')}${externalLink(exam.answerKey, 'Gabarito da capital', 'button button-text')}</div></div>
    </article>`).join('')}</div>`;
}

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder} min`;
  return remainder ? `${hours} h ${remainder} min` : `${hours} h`;
}

function planEntry(entry, state) {
  const activity = activityById.get(entry.id);
  const review = entry.kind === 'review';
  const complete = review ? entry.doneOn : state.completed[entry.id];
  return `<li class="plan-entry">
    <label class="check-target" title="Marcar ${review ? 'revisão' : 'atividade'} como concluída"><input type="checkbox" data-complete="${activity.id}" ${review ? `data-review-date="${entry.date}"` : ''} ${complete ? 'checked' : ''} aria-label="Concluir ${review ? 'revisão de ' : ''}${activity.title}"></label>
    <button class="activity-name" type="button" data-open-activity="${activity.id}"><strong>${activity.title}</strong><span>${activity.subject}${review ? ' · Revisão' : ''}${complete ? ' · Concluída' : ''}</span></button>
    <span class="entry-time">${icon('clock')}${review ? reviewMinutes(activity) : activity.minutes} min</span>
  </li>`;
}

export function plan(state, date, week, firstWeek, lastWeek) {
  const heading = pageHeading('Meu plano de estudos', 'Organize sua semana e retome os estudos de onde parou.', state.planStart && date < contest.examDate ? `<button class="button secondary" type="button" data-availability>${icon('sliders')}Editar disponibilidade</button>` : '');
  if (!state.planStart) {
    const canPlan = date < contest.examDate;
    return `${heading}<div class="card empty plan-empty">${iconTile('calendar')}<h2>${canPlan ? 'Quais dias você pode estudar?' : 'A data prevista da prova passou'}</h2>
      <p>${canPlan ? 'Escolha seus dias e o tempo disponível em cada um. As atividades da trilha serão distribuídas até a data prevista da prova.' : 'Você ainda pode acessar os materiais gratuitos e registrar seu progresso pela trilha.'}</p>
      ${canPlan ? `<button class="button primary" type="button" data-availability>Configurar disponibilidade${icon('arrow')}</button>` : '<a class="button secondary" href="#trilha">Ver trilha de estudos</a>'}</div>`;
  }

  const end = addDays(week, 6);
  const entries = state.schedule.filter(entry => entry.date >= week && entry.date <= end);
  const activeDays = [...new Set(entries.map(entry => entry.date))];
  const doneThisWeek = entries.filter(entry => entry.kind === 'review' ? entry.doneOn : state.completed[entry.id]).length;
  const next = state.schedule.find(entry => entry.kind === 'review' ? !entry.doneOn : !state.completed[entry.id]);
  const hasPending = activities.some(activity => !state.completed[activity.id]) || state.review.length > 0;
  const minutes = Object.values(state.availability).reduce((total, value) => total + value, 0);
  const count = state.unscheduled.length;
  return `${heading}
    ${count ? `<div class="notice attention">${icon('alert')}<div><strong>${count === 1 ? 'Uma atividade ficou sem horário' : `${count} atividades ficaram sem horário`}</strong><p>Aumente sua disponibilidade para encaixar mais atividades antes da prova.</p></div></div>` : ''}
    <div class="plan-grid">
      <section class="card calendar-panel" aria-labelledby="week-title">
        <div class="calendar-header"><div><h2 id="week-title" tabindex="-1">Cronograma da semana</h2><p>${time(week, { day: 'numeric', month: 'short' })} a ${time(end)}</p></div>
          <div class="week-controls"><button class="button icon-button" type="button" data-week="-1" aria-label="Semana anterior" ${week <= firstWeek ? 'disabled' : ''}>${icon('chevron-left')}</button><button class="button icon-button" type="button" data-week="1" aria-label="Próxima semana" ${week >= lastWeek ? 'disabled' : ''}>${icon('chevron')}</button></div></div>
        ${entries.length ? activeDays.map(day => `<section class="plan-day"><h3>${days[weekday(day)]} <span>${time(day, { day: '2-digit', month: '2-digit' })}</span></h3><ul class="activity-list">${entries.filter(entry => entry.date === day).map(entry => planEntry(entry, state)).join('')}</ul></section>`).join('') : `<div class="empty week-empty"><h3>Nenhuma atividade nesta semana</h3><p>${next ? 'Consulte as próximas sessões do seu plano.' : 'Confira sua trilha para escolher o próximo passo.'}</p>${next ? `<button class="button secondary" type="button" data-jump-date="${next.date}">Ir para atividade pendente</button>` : '<a class="text-link" href="#trilha">Ver trilha de estudos</a>'}</div>`}
      </section>
      <aside class="plan-sidebar">
        <section class="card sidebar-card"><h2>Progresso</h2>
          ${progress(doneThisWeek, entries.length, 'Nesta semana')}
          ${progress(Object.keys(state.completed).length, activities.length, 'Na trilha')}
        </section>
        <section class="card sidebar-card"><h2>Disponibilidade</h2><p>${formatMinutes(minutes)} por semana</p>
          <dl class="availability-list">${weekdayOrder.filter(day => state.availability[day]).map(day => `<div><dt>${days[day]}</dt><dd>${formatMinutes(state.availability[day])}</dd></div>`).join('')}</dl>
          ${date < contest.examDate && hasPending ? `<button class="button button-text" type="button" data-replan>Reorganizar atividades</button>` : ''}
        </section>
      </aside>
    </div>`;
}

function closeButton() {
  return `<form method="dialog"><button class="button icon-button" aria-label="Fechar">${icon('x')}</button></form>`;
}

export function availabilityForm(availability, editing) {
  const durations = [30, 45, 60, 90, 120, 150, 180];
  return `<div class="dialog-inner">
    <div class="dialog-header"><h2 id="availability-title">${editing ? 'Editar disponibilidade' : 'Sua disponibilidade'}</h2>${closeButton()}</div>
    <p>Selecione os dias em que você pode estudar e quanto tempo tem em cada dia.</p>
    <form id="availability-form">
      <fieldset class="availability-fields"><legend class="sr-only">Dias e tempo de estudo</legend>
        ${weekdayOrder.map(day => `<div class="availability-field">
          <label class="day-label"><input type="checkbox" name="day" value="${day}" ${availability[day] ? 'checked' : ''}>${days[day]}</label>
          <label class="sr-only" for="duration-${day}">Tempo de estudo de ${days[day].toLowerCase()}</label>
          <select name="duration-${day}" id="duration-${day}" ${availability[day] ? '' : 'disabled'}>${durations.map(minutes => `<option value="${minutes}" ${(availability[day] || 60) === minutes ? 'selected' : ''}>${formatMinutes(minutes)}</option>`).join('')}</select>
        </div>`).join('')}
      </fieldset>
      <p class="form-error" role="alert" hidden>${icon('alert')}Selecione pelo menos um dia de estudo.</p>
      <div class="actions dialog-actions"><button class="button primary" type="submit">${editing ? 'Salvar e reorganizar' : 'Gerar cronograma'}</button></div>
    </form>
  </div>`;
}

export function activityDetails(id, state, selectedAnswer = state.answers[id]) {
  const activity = activityById.get(id);
  const { material, quiz } = activity;
  const complete = Boolean(state.completed[id]);
  const marked = state.review.includes(id);
  const checkedAnswer = state.answers[id];
  const answered = Number.isInteger(checkedAnswer);
  const correct = quiz && checkedAnswer === quiz.answer;
  return `<div class="dialog-inner">
    <div class="dialog-header"><div><p class="dialog-kicker">${activity.subject}</p><h2 id="activity-title" tabindex="-1">${activity.title}</h2></div>${closeButton()}</div>
    <p class="activity-meta">${icon('clock')}${activity.minutes} min estimados</p>
    <p>${activity.task}</p>
    <section class="card material-card" aria-labelledby="material-title">${iconTile('file')}<div>
      <h3 id="material-title">${material.title}</h3><p>${material.type} em ${material.source}. Abre o site original.</p>${externalLink(material.url, 'Abrir material gratuito')}
    </div></section>
    ${quiz ? `<form id="quiz-form" data-activity="${id}" class="quiz">
      <h3>Teste rápido</h3><fieldset><legend>${quiz.question}</legend>
        ${quiz.options.map((option, index) => `<label class="quiz-option"><input required type="radio" name="answer" value="${index}" ${selectedAnswer === index ? 'checked' : ''}>${option}</label>`).join('')}
      </fieldset>
      <button class="button secondary" type="submit">Conferir resposta</button>
      ${answered ? `<div class="notice ${correct ? 'success' : 'attention'} quiz-feedback" role="status" tabindex="-1">${icon(correct ? 'check-circle' : 'flag')}<div><strong>${correct ? 'Resposta correta' : 'Resposta incorreta'}</strong><p>${quiz.explanation}</p>${!correct && marked ? '<p>Tópico sinalizado para revisão.</p>' : ''}</div></div>` : ''}
    </form>` : ''}
    <div class="activity-actions">
      <label class="check-target activity-check"><input type="checkbox" data-complete="${id}" ${complete ? 'checked' : ''}>Atividade concluída</label>
      <button class="button button-text" type="button" data-flag="${id}">${icon('flag')}${marked ? 'Remover da revisão' : 'Sinalizar para revisão'}</button>
    </div>
  </div>`;
}
