export interface Project {
  title: string;
  description: string;
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
}

const CACHE_KEY = 'ezzedev-gh-portfolio-v1';
const CACHE_TTL_MS = 60 * 60 * 1000;

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

  const projects = repos
    .filter((r) => !r.fork && r.topics.includes(topic))
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        b.pushed_at.localeCompare(a.pushed_at),
    )
    .slice(0, 6)
    .map<Project>((r) => ({
      title: prettifyName(r.name),
      description: r.description ?? 'Projeto sem descrição no GitHub.',
      tech: buildTechList(r, topic),
      github: r.html_url,
      demo: r.homepage?.trim() || undefined,
      type: inferType(r),
      stars: r.stargazers_count,
    }));

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
