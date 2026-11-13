import {fetchLatestRelease} from './releases.mjs';
import {strings, resolveWebsiteLocale} from './strings.mjs';

let locale = resolveWebsiteLocale(navigator.languages?.length
  ? navigator.languages : [navigator.language]);
let release;
let state = 'loading';
let request;
const status = document.querySelector('#release-status');
const language = document.querySelector('#language');
const notes = document.querySelector('#release-notes');
const retry = document.querySelector('#retry');

function render() {
  const text = strings[locale];
  document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : 'en';
  document.title = text.pageTitle;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = text[node.dataset.i18n];
  });
  document.querySelector('nav').setAttribute('aria-label', text.navigationLabel);
  document.querySelector('.principles').setAttribute('aria-label', text.featuresLabel);
  language.textContent = locale === 'zh' ? 'English' : '简体中文';
  language.setAttribute('aria-label', text.languageLabel);
  status.textContent = state === 'available'
    ? text.version.replace('{version}', release.version)
    : text[state];
  retry.hidden = state !== 'unavailable';
  notes.hidden = !release;
  if (release) notes.href = release.notesUrl;
  for (const card of document.querySelectorAll('[data-target]')) {
    const download = release?.downloads[card.dataset.target];
    const link = card.querySelector('a');
    link.hidden = !download;
    const availability = card.querySelector('.availability');
    availability.hidden = Boolean(download);
    availability.textContent = state === 'loading' ? text.downloadPending
      : state === 'unavailable' ? text.downloadUnavailable : text.preparing;
    if (download) link.href = download.url;
    else link.removeAttribute('href');
  }
}

async function load() {
  request?.abort();
  request = new AbortController();
  const controller = request;
  state = 'loading';
  render();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const latest = await fetchLatestRelease(fetch, controller.signal);
    if (request !== controller) return;
    release = latest;
    state = latest ? 'available' : 'notPublished';
  } catch {
    if (request !== controller) return;
    release = undefined;
    state = 'unavailable';
  } finally {
    clearTimeout(timeout);
    if (request === controller) render();
  }
}

language.addEventListener('click', () => {locale = locale === 'zh' ? 'en' : 'zh'; render();});
retry.addEventListener('click', load);
window.addEventListener('pagehide', () => request?.abort());
load();
