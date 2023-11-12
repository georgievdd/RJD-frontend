import {Button, Grid, Group, SimpleGrid} from "@mantine/core";

export const Carriage = () => {
    const arr = Array.from({length: 36}, (_, i) => i + 1)
    const matrix = arr.reduce((acc, el, i) => {
        if (i % 4 === 0) {
            acc.push([])
        }
        acc[acc.length - 1].push(el)
        return acc
    }, [])
    return (
        <>
            <Group grow>
                {matrix.map((row, i) =>
                    <SimpleGrid gap='sm' style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)'}} key={i}>
                        {row.map((el, i) =>
                            <Button key={i} p={5}>{el}</Button>)}
                    </SimpleGrid>
                )}
            </Group>
        </>
)
}


