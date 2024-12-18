import { observer } from 'mobx-react'
// import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { Header } from './Nav';
import { useUrlState } from '../core/State';
import Panel from './Panel';
import Paint from './pnt';
import Safe from './sfe';
import Flight from './flt';
import Document from './doc';
import Forgery from './frg';

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
                        <Typography>
                            You seem to be lost Scan the QR code again to arrive at the correct page.
                        <br />
                        <br />
                        Du hast dich anscheinend verirrt. Scanne nochmal den QR code um auf der richtigen Seite zu landen.
                            </Typography>
                    </Panel>
                </Box>
            )
        },
        pnt: {
            content: <Box className="content"><Paint /></Box>
        },
        sfe: {
            content: <Box className="content"><Safe /></Box>
        },
        frg: {
            content: <Box className="content"><Forgery /></Box>
        },
        flt: {
            content: <Box className="content"><Flight /></Box>
        },
        doc: {
            content: <Box className="content"><Document /></Box>
        },
    };
    const isValidKey = Object.keys(tabs).includes(active)
    const { content } = isValidKey ? tabs[active as keyof typeof tabs] : tabs.error
    return content;
})

export default App
