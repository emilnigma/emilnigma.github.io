import { observer } from 'mobx-react'
// import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { Header } from './Nav';
import { useUrlState } from '../core/State';
import Panel from './Panel';
import Paint from './paint';

const App = observer(() => {
    // const { feature } = useApp();
    const [active, _] = useUrlState('p', 'menu');
    // const {t} = useTranslation();
    const tabs = {
        error : {
            content: (
                <Box className="content">
                    <Header label="Oops" />
                    <Panel>
                        You seem to be lost Scan the QR code again to arrive at the correct page.
                        <br />
                        <br />
                        Du hast dich anscheinend verirrt. Scanne nochmal den QR code um auf der richtigen Seite zu landen.
                    </Panel>
                </Box>
            )
        },
        pnt: {
            content: (
                <Box className="content">
                    <Header label="Chapter 1:" variant="h5" />
                    <Header label="The Counterfeit Colors" variant="h3" />
                    <Paint />
                </Box>
            )
        },
        frg: {
            content: (
                <Box className="content">
                    <Header label="Kapitel 2:" variant="h5" />
                    <Header label="Der böswillige Betrüger" variant="h3" />
                    <Paint />
                </Box>
            )
        },
        flt: {
            content: (
                <Box className="content">
                    <Header label="Kapitel 3:" variant="h5" />
                    <Header label="Der fehlgeschlagene Flug" variant="h3" />
                    <Paint />
                </Box>
            )
        },
        doc: {
            content: (
                <Box className="content">
                    <Header label="Kapitel 4:" variant="h5" />
                    <Header label="Der geflohene Gutachter" variant="h3" />
                    <Paint />
                </Box>
            )
        },
    };
    const isValidKey = Object.keys(tabs).includes(active)
    const { content } = isValidKey ? tabs[active as keyof typeof tabs] : tabs.error
    return content;
})

export default App
