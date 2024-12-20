import { IconButton, Stack, TextField, Typography } from "@mui/material"
import Panel from "../Panel"
import { ReactElement, useState } from "react"
import { Header } from "../Nav"
import { Send } from "@mui/icons-material"

const Document = (): ReactElement => {
    const [chat, setChat] = useState(["Enigma: Welche Pigmente beweisen eindeutig, dass die Carpaccios Fälschungen sein müssen?"]);
    const [solved, setSolved] = useState("none");
    const [carpaccio, setCarpaccio] = useState("");
    const [bellini, setBellini] = useState("");
    const [place, setPlace] = useState("");
    
    const onClick = () => {
        if (solved === "none") {
            const carpLower = carpaccio.toLowerCase();
            const pig1Solved = carpLower.includes('py35') || carpLower.includes('cadmiumgelb')
            const pig2Solved = carpLower.includes('pr92') || carpLower.includes('manganviolett')
            if (pig1Solved && pig2Solved) {
                setChat([
                    ...chat,
                    "You: Die Pigmente Cadmiumgelb (PY35) und Manganviolett (PR92) gab es noch nicht.",
                    "Enigma: Korrekt. Welche Pigmente sind es bei Bellini?"
                ])
                setSolved("carpaccio");
            } else {
                setChat([...chat, `You: ${carpaccio}?`, "Enigma: Da stimmt etwas nicht. Schaut nochmal genau hin."])
            }
        }
        if (solved === "carpaccio") {
            const bellLower = bellini.toLowerCase();
            const pig1Solved = bellLower.includes('pb28') || bellLower.includes('kobaltblau')
            const pig2Solved = bellLower.includes('pw6') || bellLower.includes('titanweiß')
            if (pig1Solved && pig2Solved) {
                setChat([
                    ...chat,
                    "You: Die Pigmente Kobaltblau (PB28) und Titanweiß (PW6) standen Bellini noch nicht zur Verfügung.",
                    "Enigma: Absolut richtig. Der Gutachter hat offensichtlich versucht etwas zu vertuschen. [Weiter auf Seite 4]"
                ])
                setSolved("bellini");
            } else {
                setChat([...chat, `You: ${bellini}?`, "Enigma: Da stimmt etwas nicht. Keine Zahlendreher?."])
            }
        }
        if (solved === "bellini") {
            const isPlaceSolved = place.toLowerCase().includes('bad') && place.toLowerCase().includes('füssing');
            if (isPlaceSolved) {
                setChat([
                    ...chat,
                    "You: W. Groll ist in Bad Füssing.",
                    "Enigma: Gute Arbeit. [Weiter auf Seite 5]"
                ])
                setSolved("all");
            } else {
                setChat([...chat, `You: ${place}?`, "Enigma: Ich denke nicht, dass er sich dort aufhält."])
            }
        }
    }

    return (
        <>
        <Header label="Encrypted Chat" variant="h4" />
        <Header label="Der geflohene Gutachter" variant="h6" />
        <Panel>
            {
                chat.map(m => <Typography sx={{ pb: 2 }}>{m}</Typography>)
            }
            {
                solved !== "none" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: Die Pigmente</Typography>
                        <TextField variant="standard" focused color="success" value={carpaccio} onChange={({target}) => setCarpaccio(target.value)}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
            {
                solved !== "carpaccio" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: Bei Bellini sind es</Typography>
                        <TextField variant="standard" focused color="success" value={bellini} onChange={({target}) => setBellini(target.value)}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
            {
                solved !== "bellini" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: W. Groll ist in</Typography>
                        <TextField variant="standard" focused color="success" value={place} onChange={({target}) => setPlace(target.value)}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
        </Panel>
        </>
    )
}

export default Document;