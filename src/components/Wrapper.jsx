import {AppShell, Burger, Container, rem} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {Header} from "./Header/Header";
import { Footer } from "./Footer/Footer";
import {useDisclosure} from "@mantine/hooks";


export function Wrapper() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
            {/*    /!*<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />*!/*/}
            {/*    <div>Logo</div>*/}
            </AppShell.Header>

            {/*<AppShell.Navbar p="md">Navbar</AppShell.Navbar>*/}
            <Container size='lg'>
                <AppShell.Main><Outlet/></AppShell.Main>
            </Container>
        </AppShell>
    );
    // return (
    //     <AppShell
    //         header={{height: 60}}
    //         navbar={{width: 300 }}
    //     >
    //         <Header/>
    //         <br/><br/><br/><br/>
    //         <Container size='lg' style={{
    //             minHeight: '70vh',
    //         }}>
    //             <Outlet/>
    //         </Container>
    //         <Footer />
    //     </AppShell>
    // );
}