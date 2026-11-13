import './vendor/material.js';
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
  document.title = 'rEcho';
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = text[node.dataset.i18n];
  });
  document.querySelector('nav').setAttribute('aria-label', text.navigationLabel);
  document.querySelector('#downloads').setAttribute('aria-label', text.downloadsLabel);
  document.querySelectorAll('[data-label]').forEach(node => {
    node.setAttribute('aria-label', text[node.dataset.label]);
    node.title = text[node.dataset.label];
  });
  status.textContent = state === 'available'
    ? text.version.replace('{version}', release.version)
    : text[state];
  retry.hidden = state !== 'unavailable';
  notes.hidden = !release;
  if (release) notes.href = release.notesUrl;
  for (const button of document.querySelectorAll('[data-target]')) {
    const download = release?.downloads[button.dataset.target];
    button.disabled = !download;
    const label = download ? text.download.replace('{platform}', button.textContent.trim()) : text.preparing;
    button.setAttribute('aria-label', label);
    button.title = label;
    if (download) button.href = download.url;
    else button.removeAttribute('href');
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
