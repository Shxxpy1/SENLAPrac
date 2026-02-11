import reposColor from "./colors.ts";
import type { Repository } from "./types.ts";

let repoList!: HTMLUListElement 
let searchForm!: HTMLFormElement
let repos: Repository[] =  []

async function fetchRepos(username: string): Promise<Repository[]> {
    const res =  await fetch(`https://api.github.com/users/${username}/repos`)
    const data = await res.json()

    return data.map((r: any): Repository => ({
        id: r.id,
        name: r.name,
        privacy: r.private ? "Private" : "Public",
        description: r.description || "No description",
        language: r.language || "Unknown",
        stars: r.stargazers_count,
        forks: r.forks_count,
        author: r.owner.login,
        url: r.html_url
    }))
}


function navigate(path: string){
    history.pushState({}, "", path)
    router()
}

window.addEventListener("popstate", router)

async function router() {
    const url = new URL(window.location.href)
    const repoID = url.pathname.slice(1)
    const username = url.searchParams.get('username')

    if (repoID) {
        const repo = repos.find(r => r.id === Number(repoID))
        renderDetails(repo)
    } else {
        getRepos(username ?? "")
    }
}

function renderDetails(repo?: Repository) {
    if (!repo) {
        repoList.innerHTML = `<p class="error">Репозиторий не найден</p>`
        return
    }

    repoList.innerHTML = `
        <div class="details">
            <button id="backBtn">Назад</button>

            <h2>${repo.name}</h2>
            <p>${repo.description}</p>
            <div class="card-footer">
                <span class="language-color" style="background-color: ${reposColor[repo.language]}"></span>
                <p>Language: ${repo.language}</p>
            </div>
            <span class="stars"><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star mr-1">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                        </svg> ${repo.stars}</span>
            <span class="forks"><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                    </svg> ${repo.forks}</span>
            <a href="${repo.url}" target="_blanck">Открыть на GitHub</a>
        </div>
    `
    document.getElementById("backBtn")!.onclick = () => history.back()
}

async function getRepos (username: string) {
    
    if (!username) {
        repoList.innerHTML = `<p class="error">Введите имя пользователя в строку поиска</p>`
        return
    }    

    

    repos = await fetchRepos(username)

    repoList.innerHTML = ""

    repos.forEach(repo => {
        const card = document.createElement("li")
        card.className = "card"
        card.innerHTML = `
            <div class="card-name">
            <span>
            <svg aria-hidden="true" focusable="false" class="octicon octicon-repo" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align:text-bottom"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                </span> 
                <h2>${repo.name}</h2>
                <span class="repo-privacy">${repo.privacy}</span>
            </div>
            <p class="description">${repo.description}</p>
            <div class="card-footer">
                <span class="card-footer-color" style="background-color: ${reposColor[repo.language]}"></span>
                <span class="language">${repo.language}</span>
                <span class="stars"><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star mr-1">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                        </svg> ${repo.stars}</span>
                <span class="forks"><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                    </svg> ${repo.forks}</span>
                    <span class="author">${repo.author}</span>
            </div>
        `

        card.onclick = () => navigate(`/${repo.id}`)
        repoList.appendChild(card)
 
    });
}

document.addEventListener('DOMContentLoaded', () => {

    searchForm = document.querySelector(".search-form") as HTMLFormElement
    repoList = document.getElementById("repo-list") as HTMLUListElement

    
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const username = (document.querySelector(".search-input") as HTMLInputElement).value.trim()
        if (!username) {
            alert("Пожалуйста, введите имя пользователя")
            return
        }
        navigate(`/?username=${username}`)
    })
    router()
})
 

