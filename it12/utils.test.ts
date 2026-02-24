import { sumStars, getPopularRepos, groupByLanguage, fetchRepos, type Repo } from "./utils";

describe("sumStars", () => {
    const repos: Repo[] = [
        {id : 1, name: "Repo1", stars: 10, forks: 1},
        {id : 2, name: "Repo2", stars: 5, forks: 2},
    ]
    it("Корректно считает сумму звезд", () => {
        expect(sumStars(repos)).toBeGreaterThan(10)
    })
    it("Корректно считает сумму звезд для пустого массива", () => {
        expect(sumStars([])).toBe(0)
    })
})

describe("getPopularRepos", () => {
    const repos: Repo[] = [
        {id : 1, name: "Repo1", stars: 10, forks: 1},
        {id : 2, name: "Repo2", stars: 5, forks: 2},
    ]
    it("Корректно сортирует репозитории по minStars", () => {
        const result = getPopularRepos(repos, 6)
        expect(result).toHaveLength(1)
    })
    it("Возвращает пустой массив, если нет совпадений", () => {
        expect(getPopularRepos(repos, 100)).toEqual([])
    })
})

describe("groupByLanguage", () => {
    const repos: Repo[] = [
        {id : 1, name: "A", stars: 10, forks: 1, language: "TypeScript"},
        {id : 2, name: "B", stars: 5, forks: 2, language: "JavaScript"},
        {id : 3, name: "C", stars: 1, forks: 1}
    ]
    it("Корректно группирует репозитории по языку", () => {
        const result = groupByLanguage(repos)
        expect(result["TypeScript"]).toHaveLength(1)
    })
    it("Группирует репозитории без языка в 'unknown'", () => {
        const result = groupByLanguage(repos)
        expect(result["unknown"]).toHaveLength(1)
    })
})

///Мок

describe("Пример мок функции", () => {
    it("Проверка вызова и параметров", () => {
        const mockFn = jest.fn((x: number) => x*2)
        mockFn(2)
        mockFn(3)

        expect(mockFn).toHaveBeenCalledTimes(2)
        expect(mockFn).toHaveBeenCalledWith(2)
        expect(mockFn).toHaveReturnedWith(4)
    })
})

global.fetch = jest.fn()

describe("fetchRepos", () => {
    it("Корректно получает данные", async () => {
        ;(fetch as jest.Mock).mockRejectedValue({
            json: jest.fn().mockResolvedValue([{id: 1}])
        })

        const data = await fetchRepos("Shoopy")

        expect(fetch).toHaveBeenCalledWith("https://api.github.com/users/Shoopy/repos")
        expect(data).toEqual([{ id : 1 }])
    })
})

///Разница toBe и toEqual

/// expect(5).toBe(5)  -> OK

///expect({a: 1}).toBe({a: 1}) -> ошибка, так как сравниваются ссылки на объекты

///expect({a: 1}).toEqual({a: 1}) -> OK, т.к toEqual сравнивает по структуре, а не по ссылке