import { Send } from "@mui/icons-material";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { Header } from "../Nav";
import Panel from "../Panel";

const Flight = (): ReactElement => {
    const [chat, setChat] = useState(["Enigma: Habt ihr die Flugnummer entdeckt?"]);
    const [solved, setSolved] = useState("none");
    const [flight, setFlight] = useState("");
    const [seat, setSeat] = useState("");

    const onClick = () => {
        if (solved === "none") {
            const isChemistSolved = flight === "LH231"
            if (isChemistSolved) {
                setChat([
                    ...chat,
                    "You: Es war Flug LH231.",
                    "Enigma: Oh, toll! Vielleicht findet ihr jetzt sogar wer es war?"
                ])
                setSolved("flight");
            } else {
                setChat([...chat, `You: Vllt ${flight}?`, "Enigma: Nein da stimmt etwas nicht."])
            }
        }
        if (solved === "flight") {
            const isMenuSolved = seat === "A21"
            if (isMenuSolved) {
                setChat([
                    ...chat,
                    `You: Es war der Sitz ${seat}: Greta Weber. Hast du eine Idee wie wir sie finden können?`,
                    "Enigma: Die Identität ist gefunden. Manchmal können harmlose Wörter einen Ort kodieren. Wenn ihr die richtigen findet, findet ihr Greta hier: what3words.com [Weiter auf Seite 6]"
                ])
                setSolved("all");
            } else {
                setChat([...chat, `You: War es Sitz ${seat}?`, "Enigma: Nein, ich denke da liegt eine Verwechslung vor."])
            }
        }
    }

    return (
        <>
        <Header label="Encrypted Chat" variant="h4" />
        <Header label="Der fehlgeschlagene Flug" variant="h6" />
        <Panel>
            {
                chat.map(m => <Typography sx={{ pb: 2 }}>{m}</Typography>)
            }
            {
                solved !== "none" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: Die Flugnummer lautet</Typography>
                        <TextField variant="standard" focused color="success" value={flight} onChange={({target}) => setFlight(target.value.toUpperCase())}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
            {
                solved !== "flight" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: Es war der Sitz</Typography>
                        <TextField variant="standard" focused color="success" value={seat} onChange={({target}) => setSeat(target.value.toUpperCase())}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
        </Panel>
        </>
    )
}

export default Flight;