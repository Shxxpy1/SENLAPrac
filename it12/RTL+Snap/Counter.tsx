type Props = { count: number}

export function Counter({count}: Props){
    return <p data-testid="count"> {count} </p>
}
