export type Repo = {
    id: number;
    name: string;
    stars: number;
    forks: number;
    language?: string;
}

export function sumStars(repos: Repo[]): number {
    return repos.reduce((sum, repo) => sum + repo.stars, 0); 
}

export function getPopularRepos(repos: Repo[], minStars: number): Repo[]{
    return repos.filter(repo => repo.stars >= minStars);
}

export function groupByLanguage(repos: Repo[]) : Record<string, Repo[]> {
    return repos.reduce((groups, repo) => {
        const language = repo.language ?? "unknown";
        if (!groups[language]) groups[language] = []
        groups[language].push(repo);
        return groups;
    }, {} as Record<string, Repo[]>)
}

export async function fetchRepos(username: string){
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    return response.json()
}