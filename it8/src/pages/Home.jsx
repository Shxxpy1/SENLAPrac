import { useState } from "react";
import {useNavigate} from "react-router-dom";
import RepoCard from "../components/RepoCard";

function Home() {
    const [username, setUsername] = useState("")
    const [repos, setRepos] = useState([])
    const navigate = useNavigate()

    async function fetchRepos(user) {
        const res =  await fetch(`https://api.github.com/users/${user}/repos`)
        const data = await res.json()
        setRepos(data)
    

    return data.map(r => ({
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
   

    async function handleSubmit(e) {
        e.preventDefault()
        if (!username.trim()){
            alert("Введите имя пользователя")
            return
        } 
        const data = await fetchRepos(username)
        setRepos(data)
    }

    return(
        <div>
            <h1>Repository</h1>

            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                 /> 
                <button className="search-submit" type="submit">Найти</button>
            </form>
            <ul className="cards">
                {repos.map(repo => (
                    <RepoCard 
                        key={repo.id} 
                        repo={repo}
                        onClick={() => navigate(`/repo/${repo.id}`, { state: { repo } })}
                    />
                ))}  
            </ul>
        </div>
    )
    }

export default Home