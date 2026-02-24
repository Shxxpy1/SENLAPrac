import type { Config } from 'Jest';

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js"],
    setupFilesAfterEnv : ["<rootDir>/jest.setup.ts"]
}

export default config;