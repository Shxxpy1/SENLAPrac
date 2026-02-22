import { create } from 'zustand';

const useRepoStore = create((set) => ({
    repos: [],
    setRepos: (repos) => set({ repos }),
}))

export default useRepoStore;