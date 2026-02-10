let repoList 
let searchForm

function createRepository(name, privacy, description, language, stars, forks, author) {
    repo = {
        name: name,
        privacy: privacy,
        description: description,
        language: language,
        stars: stars,
        forks: forks,
        author: author
    }
    return repo
}

repos = []

repos.push(createRepository("vscode", "Public", "123", "C++", 10, 200, "Shoopy"))
repos.push(createRepository("Frontend", "Private", "Много-много-много-много-много-много-много-много текста", "JavaScript", "1.5K", 21, "sAgressor"))
repos.push(createRepository("Project №?", "Private", "Какой-то загадочный проект.", "Python", 50, 5, "F1re"))
repos.push(createRepository("Typescript", "Public", "Типизированный JavaScript", "TypeScript", 500, 100, "Morkovka"))


reposColor = {
    "C++": "#f34b7d",
    "JavaScript": "#f1e05a",
    "Python": "#3572A5",
    "TypeScript": "#2b7489"
}

function getRepos (list) {
    
    repoList.innerHTML = ""

    list.forEach(repo => {
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
    repoList.appendChild(card)
 
});

}


var container = document.querySelector(".container")

document.addEventListener('DOMContentLoaded', () => {

    searchForm = document.querySelector(".search-form")
    repoList = document.getElementById("repo-list")

    const url = new URL(window.location)
    const username = url.searchParams.get('username')
    const filteredRepos = username
        ? repos.filter(r => r.author === username)
        : repos;
    getRepos(filteredRepos)

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()
        var username_value = document.querySelector(".search-input").value
        if (username_value.length != 0) {
            const url = new URL(window.location)
            url.searchParams.set("username", username_value)
            window.location.href = url.toString()
        }
    })
})
 

