import { IconButton, Stack, TextField, Typography } from "@mui/material"
import Panel from "../Panel"
import { ReactElement, useState } from "react"
import { Header } from "../Nav"
import { Send } from "@mui/icons-material"

const Forgery = (): ReactElement => {
    const [chat, setChat] = useState(["Enigma: Habt ihr den Ort eingrenzen können?"]);
    const [solved, setSolved] = useState("none");
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    
    const onClick = () => {
        if (solved === "none") {
            const isLocationSolved = location.toLowerCase() === "volciano"
            if (isLocationSolved) {
                setChat([
                    ...chat,
                    "You: Es muss jemand aus Volciano sein.",
                    "Enigma: Das kann gut sein. Ich kenne dort ein Museum, das ihr euch näher ansehen solltet. [Weiter auf Seite 4]",
                    "Enigma: Ich denke wir suchen jemanden, der Zeit hatte seine Fähigkeiten richtig zu entwickeln. Aber die Person muss noch mobil sein. Mit anderen Worten es sollte eine Person zwischen 50 und 60 sein. Sagt bescheid, wenn ihr damit weiterkommt."
                ])
                setSolved("location");
            } else {
                setChat([...chat, `You: War es ${location}?`, "Enigma: Das kann nicht sein. Versucht es nochmal."])
            }
        }
        if (solved === "location") {
            const nameToLower = name.toLowerCase();
            const isMenuSolved = nameToLower.includes('fabio') && nameToLower.includes('giglia')
            if (isMenuSolved) {
                setChat([
                    ...chat,
                    `You: Es war ein Mann mit dem Namen: Fabio Giglia.`,
                    "Enigma: Gute Arbeit! Jetzt müssen wir ihn nur noch finden ... [Weiter auf Seite 5]"
                ])
                setSolved("all");
            } else {
                setChat([...chat, `You: ${name}?`, "Enigma: Nein, ich glaube da ist ein Fehler passiert."])
            }
        }
    }

    return (
        <>
        <Header label="Encrypted Chat" variant="h4" />
        <Header label="Der böswillige Betrüger" variant="h6" />
        <Panel>
            {
                chat.map(m => <Typography sx={{ pb: 2 }}>{m}</Typography>)
            }
            {
                solved !== "none" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: Der Ort heißt </Typography>
                        <TextField variant="standard" focused color="success" value={location} onChange={({target}) => setLocation(target.value)}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
            {
                solved !== "location" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: Es war</Typography>
                        <TextField variant="standard" focused color="success" value={name} onChange={({target}) => setName(target.value)}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
        </Panel>
        </>
    )
}

export default Forgery;