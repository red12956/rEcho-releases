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
    pageTitle: 'rEcho · 阅读，落笔，再想一步', navDownload: '下载', navQuestions: '常见问题',
    eyebrow: '为思考留一块画布', headline: '阅读，落笔，\n再想一步。',
    intro: '把文档、手写和 AI 对话放在同一处。读一页，写下想法，圈出问题，然后继续。',
    getApp: '获取 rEcho', offline: '本地保存 · 离线阅读与书写 · 按需连接 AI',
    loopTitle: '一个简单的学习循环', read: '读进去',
    readDetail: '打开 Markdown 或 PDF，让原文成为思考的起点。', write: '写下来',
    writeDetail: '用圆珠笔、铅笔或荧光笔批注，在页边展开推导。', ask: '问清楚',
    askDetail: '圈选文档与笔迹，向助手提问，保留对话与上下文。',
    localTitle: '思考留在本地', localDetail: '画板、笔迹和会话保存在工作区。无需账号即可阅读与书写，也可导出工作区备份。',
    penTitle: '从笔尖开始', penDetail: '原生文档与手写画布，支持压感设备，也能使用鼠标与触摸操作。',
    aiTitle: 'AI 由你选择', aiDetail: '配置自己的提供商与模型。AI 回答留在助手中，原始文档保持只读。',
    downloadEyebrow: '带到你的设备上', downloadTitle: '下载 rEcho', releaseNotes: '版本说明 ↗',
    loading: '正在检查可用版本…', preparing: '尚未发布', downloadInstaller: '下载安装程序',
    downloadNote: '安装包由 GitHub Releases 提供。仅显示已经发布的版本；macOS 与 iOS 暂未提供公开下载。',
    questionsEyebrow: '开始之前', questionsTitle: '几个常见问题',
    accountQuestion: '需要账号或 AI 密钥吗？', accountAnswer: '阅读、书写与本地保存无需账号或密钥。使用 AI 助手时，需要配置自己的提供商和模型。',
    originalQuestion: '会修改原始文件吗？', originalAnswer: '不会。导入的 Markdown 与 PDF 是只读快照，笔迹和对话由 rEcho 单独保存。工作区里的文件也可用系统默认应用打开。',
    updateQuestion: '之后如何更新？', updateAnswer: '在设置 → 关于中检查更新。支持的构建可在应用内下载并校验安装包，然后交给系统安装；安装仍需你确认。',
    footer: '留出思考的空间。', github: 'GitHub 发布仓库 ↗',
    notPublished: '首个公开版本正在准备中。发布后，安装包会显示在这里。',
    unavailable: '暂时无法获取版本信息。请重试，或前往 GitHub 发布仓库查看。',
    downloadPending: '正在检查…', downloadUnavailable: '暂无法确认版本', retry: '重新检查', version: '最新版本：{version}', navigationLabel: '网站导航', featuresLabel: '功能', languageLabel: 'Switch to English',
  },
  en: {
    pageTitle: 'rEcho · Read. Write. Think further.', navDownload: 'Download', navQuestions: 'Questions',
    eyebrow: 'A little room to think', headline: 'Read. Write.\nThink further.',
    intro: 'Documents, handwriting, and AI conversations in one workspace. Read a page, work through an idea, circle a question, and keep going.',
    getApp: 'Get rEcho', offline: 'Saved locally · Read and write offline · Connect AI when you need it',
    loopTitle: 'One simple study loop', read: 'Read into it',
    readDetail: 'Open Markdown or a PDF. Let the source be the starting point.', write: 'Work it out',
    writeDetail: 'Annotate with a ballpoint, pencil, or highlighter. Make room for your reasoning in the margins.', ask: 'Ask clearly',
    askDetail: 'Select the document and ink together. Ask the assistant, keeping the conversation and its context.',
    localTitle: 'Your work stays local', localDetail: 'Boards, ink, and conversations live in your workspace. Read and write without an account, and export workspace backups.',
    penTitle: 'Start at the pen tip', penDetail: 'Native documents and handwriting, with pressure on supported devices. Mouse and touch work, too.',
    aiTitle: 'Choose your AI', aiDetail: 'Configure your own providers and models. Answers stay in the assistant; original documents stay read-only.',
    downloadEyebrow: 'Bring it to your device', downloadTitle: 'Download rEcho', releaseNotes: 'Release notes ↗',
    loading: 'Checking available releases…', preparing: 'Not released yet', downloadInstaller: 'Download installer',
    downloadNote: 'Installers are hosted on GitHub Releases. Only published packages appear here. Public macOS and iOS downloads are not available yet.',
    questionsEyebrow: 'Before you begin', questionsTitle: 'A few common questions',
    accountQuestion: 'Do I need an account or an AI key?', accountAnswer: 'Reading, writing, and local saving need neither. To use the assistant, configure your own AI provider and model.',
    originalQuestion: 'Will it change my original files?', originalAnswer: 'No. Imported Markdown and PDFs are read-only snapshots. rEcho saves ink and conversations separately. Workspace files can also open in your system’s default app.',
    updateQuestion: 'How will updates work?', updateAnswer: 'Check for updates in Settings → About. Supported builds can download and verify an installer inside the app, then hand it to the system. Installation still needs your confirmation.',
    footer: 'Leave room for thought.', github: 'Releases on GitHub ↗',
    notPublished: 'The first public release is being prepared. Installers will appear here when it is published.',
    unavailable: 'Release information is unavailable right now. Retry, or check the releases on GitHub.',
    downloadPending: 'Checking…', downloadUnavailable: 'Release unavailable', retry: 'Check again', version: 'Latest release: {version}', navigationLabel: 'Site navigation', featuresLabel: 'Features', languageLabel: '切换到简体中文',
  },
};
