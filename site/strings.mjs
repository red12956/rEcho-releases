// Keep the website's advertised languages aligned with the application.
export function resolveWebsiteLocale(preferredLanguages) {
  for (const identifier of preferredLanguages) {
    let locale;
    try { locale = new Intl.Locale(identifier); }
    catch { continue; }
    if (locale.language === 'en') return 'en';
    if (locale.language !== 'zh') continue;
    if (locale.script === 'Hans') return 'zh';
    if (locale.script === 'Hant') continue;
    if (['TW', 'HK', 'MO'].includes(locale.region)) continue;
    if (!locale.region || ['CN', 'SG'].includes(locale.region)) return 'zh';
  }
  return 'en';
}

export const strings = {
  zh: {
    description: '阅读 · 书写 · 提问',
    loading: '正在检查版本…',
    notPublished: '尚未发布安装包',
    unavailable: '无法获取版本，请重试或前往 GitHub',
    preparing: '此平台尚未发布',
    download: '下载 {platform}',
    version: '{version}',
    downloadsLabel: '下载',
    navigationLabel: '链接与语言',
    github: 'GitHub 发布仓库',
    releaseNotes: '版本说明',
    retry: '重试',
    languageLabel: 'Switch to English',
  },
  en: {
    description: 'Read · Write · Ask',
    loading: 'Checking releases…',
    notPublished: 'No installers published yet',
    unavailable: 'Unable to check releases. Retry or visit GitHub.',
    preparing: 'Not released for this platform',
    download: 'Download {platform}',
    version: '{version}',
    downloadsLabel: 'Downloads',
    navigationLabel: 'Links and language',
    github: 'Releases on GitHub',
    releaseNotes: 'Release notes',
    retry: 'Retry',
    languageLabel: '切换到简体中文',
  },
};
