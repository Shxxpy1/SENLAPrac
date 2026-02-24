//snap тест
import { render } from "@testing-library/react";
import { Counter } from "./Counter";

it("matches snapshot", () => {
    const {asFragment} = render(<Counter count={5} />)
    expect(asFragment()).toMatchSnapshot()
})

//Тест без снапшота
import { screen } from "@testing-library/react";

it("renders count correctly", () => {
    render(<Counter count={5} />)
    expect(screen.getByTestId("count")).toHaveTextContent("5")
})