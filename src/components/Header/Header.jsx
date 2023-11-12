import {useState} from 'react';
import {Burger, Container, Group} from '@mantine/core';
import classes from './Header.module.css';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mantine/hooks';
import BurgerNavigation from './BurgerNavigation';

export function Header() {

    const largeMenu = useMediaQuery('(min-width: 850px)');
    const [opened, setOpened] = useState(false);

    return (
        <>
            <header className={classes.header} style={{position: 'fixed', zIndex: '20', width: '100%'}}>
                <Container size="lg" className={classes.inner}>
                    <Group justify="space-between" w='100%'>
                        {!largeMenu &&
                        <Burger opened={opened} onClick={() => {
                            setOpened(!opened)
                        }}></Burger>}
                    </Group>
                </Container>
                {/*<BurgerNavigation show={!largeMenu && opened} userCardData={userCardData} getImlementerLinks={getImlementerLinks}/>*/}
            </header>
        </>


    );
}