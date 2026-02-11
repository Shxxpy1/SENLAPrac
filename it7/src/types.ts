export interface Repository {
    id: number,
    name: string,
    privacy: "Private" | "Public",
    description: string,
    language: string,
    stars: number,
    forks: number,
    author: string,
    url: string
}