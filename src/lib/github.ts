export interface Project {
  title: string;
  description: string;
  preview: string;
  thumbnail: string;
  readme?: string;
  readmeBase?: string;
  tech: string[];
  github: string;
  demo?: string;
  type: string;
  stars?: number;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
  default_branch: string;
}

const CACHE_KEY = 'ezzedev-gh-portfolio-v2';
const CACHE_TTL_MS = 60 * 60 * 1000;

async function fetchReadme(
  username: string,
  repoName: string,
): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/readme`,
      { headers: { Accept: 'application/vnd.github.v3.raw' } },
    );
    if (!res.ok) return undefined;
    return await res.text();
  } catch {
    return undefined;
  }
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>]/g, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractPreview(md: string | undefined, fallback: string): string {
  if (!md) return fallback;
  const stripped = stripMarkdown(md);
  if (stripped.length < 40) return fallback;
  return stripped.length > 220 ? stripped.slice(0, 220).trim() + '…' : stripped;
}

// Extrai a primeira imagem "grande" do README, ignorando shields/badges.
function extractFirstImage(
  md: string | undefined,
  readmeBase: string,
): string | undefined {
  if (!md) return undefined;

  const candidates: string[] = [];

  // Markdown: ![alt](url)
  const mdRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m: RegExpExecArray | null;
  while ((m = mdRegex.exec(md)) !== null) candidates.push(m[1]);

  // HTML: <img src="url">
  const htmlRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  while ((m = htmlRegex.exec(md)) !== null) candidates.push(m[1]);

  const isBadge = (url: string) => {
    const lower = url.toLowerCase();
    return (
      lower.includes('shields.io') ||
      lower.includes('badge') ||
      lower.includes('/badges/') ||
      lower.includes('img.shields') ||
      lower.includes('codecov.io') ||
      lower.includes('travis-ci') ||
      lower.includes('circleci') ||
      lower.endsWith('.svg')
    );
  };

  const firstValid = candidates.find((url) => !isBadge(url));
  if (!firstValid) return undefined;

  // Resolve URL relativa → raw.githubusercontent
  if (/^https?:/.test(firstValid)) return firstValid;
  return readmeBase + firstValid.replace(/^\.?\//, '');
}

export async function fetchPortfolioRepos(
  username: string,
  topic: string,
): Promise<Project[]> {
  const forceRefresh = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('refresh') === '1';

  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { fetchedAt, projects } = JSON.parse(cached) as {
          fetchedAt: number;
          projects: Project[];
        };
        if (Date.now() - fetchedAt < CACHE_TTL_MS) return projects;
      }
    } catch {}
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);

  const repos: GitHubRepo[] = await res.json();

  const filtered = repos
    .filter((r) => !r.fork && r.topics.includes(topic))
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        b.pushed_at.localeCompare(a.pushed_at),
    );

  const readmes = await Promise.all(
    filtered.map((r) => fetchReadme(username, r.name)),
  );

  const projects: Project[] = filtered.map((r, i) => {
    const fallbackDesc = r.description ?? 'Projeto sem descrição no GitHub.';
    const readmeBase = `https://raw.githubusercontent.com/${username}/${r.name}/${r.default_branch}/`;
    const readmeImage = extractFirstImage(readmes[i], readmeBase);
    const socialPreview = `https://opengraph.githubassets.com/1/${username}/${r.name}`;

    return {
      title: prettifyName(r.name),
      description: fallbackDesc,
      preview: extractPreview(readmes[i], fallbackDesc),
      thumbnail: readmeImage ?? socialPreview,
      readme: readmes[i],
      readmeBase,
      tech: buildTechList(r, topic),
      github: r.html_url,
      demo: r.homepage?.trim() || undefined,
      type: inferType(r),
      stars: r.stargazers_count,
    };
  });

  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), projects }),
    );
  } catch {}

  return projects;
}

function prettifyName(name: string): string {
  return name
    .replace(/[-_.]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function buildTechList(repo: GitHubRepo, markerTopic: string): string[] {
  const result: string[] = [];
  if (repo.language) result.push(repo.language);
  for (const topic of repo.topics) {
    if (topic === markerTopic) continue;
    if (result.some((t) => t.toLowerCase() === topic.toLowerCase())) continue;
    result.push(prettifyTopic(topic));
  }
  return result.slice(0, 5);
}

function prettifyTopic(topic: string): string {
  const overrides: Record<string, string> = {
    nodejs: 'Node.js',
    nextjs: 'Next.js',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    postgresql: 'PostgreSQL',
    mysql: 'MySQL',
    tailwindcss: 'Tailwind',
    'gemini-ai': 'Gemini AI',
    'gemini-api': 'Gemini AI',
    n8n: 'n8n',
    typebot: 'Typebot',
    php: 'PHP',
    react: 'React',
    docker: 'Docker',
    redis: 'Redis',
  };
  if (overrides[topic.toLowerCase()]) return overrides[topic.toLowerCase()];
  return topic.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function inferType(repo: GitHubRepo): string {
  const t = repo.topics.map((x) => x.toLowerCase());
  if (t.includes('saas') && t.includes('ai')) return 'SaaS / AI';
  if (t.includes('saas')) return 'SaaS';
  if (t.includes('ai') || t.includes('gemini-ai')) return 'AI';
  if (t.includes('fullstack') || t.includes('full-stack')) return 'Full Stack';
  if (t.includes('backend')) return 'Backend';
  if (t.includes('frontend')) return 'Frontend';
  if (t.includes('edtech')) return 'EdTech';
  if (t.includes('automation')) return 'Automation';
  return repo.language ?? 'Project';
}
