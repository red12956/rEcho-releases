export const repository = 'red12956/rEcho-releases';
export const releaseEndpoint = `https://api.github.com/repos/${repository}/releases/latest`;
export const targets = Object.freeze({
  'windows-x64': 'recho-windows-x64-setup.exe',
  'windows-arm64': 'recho-windows-arm64-setup.exe',
  'android-arm64': 'recho-android-arm64.apk',
  'linux-x64': 'recho-linux-x64.deb',
});

export function parseGitHubRelease(value) {
  if (!value || value.draft !== false || value.prerelease !== false ||
      typeof value.tag_name !== 'string' || !/^[A-Za-z0-9._-]{1,100}$/.test(value.tag_name) ||
      !Array.isArray(value.assets)) throw new Error('invalidRelease');
  const root = `https://github.com/${repository}/releases`;
  const tag = encodeURIComponent(value.tag_name);
  const downloads = {};
  for (const [target, name] of Object.entries(targets)) {
    const candidates = value.assets.filter(asset => asset.name === name);
    if (candidates.length !== 1) continue;
    const asset = candidates[0];
    const expected = `${root}/download/${tag}/${name}`;
    if (asset.browser_download_url !== expected || asset.state !== 'uploaded' ||
        !Number.isSafeInteger(asset.size) || asset.size <= 0) continue;
    downloads[target] = {url: expected, size: asset.size};
  }
  return {
    version: value.tag_name,
    notesUrl: `${root}/tag/${tag}`,
    downloads,
  };
}

export async function fetchLatestRelease(fetcher = fetch, signal) {
  const response = await fetcher(releaseEndpoint, {
    headers: {Accept: 'application/vnd.github+json'},
    signal,
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('releaseUnavailable');
  return parseGitHubRelease(await response.json());
}
