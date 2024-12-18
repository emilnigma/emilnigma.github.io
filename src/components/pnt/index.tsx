import { IconButton, Stack, TextField, Typography } from "@mui/material"
import Panel from "../Panel"
import { ReactElement, useState } from "react"
import { Header } from "../Nav"
import { Send } from "@mui/icons-material"

/*
Rätsel 2
Enigma: Ah Owen! I remember him now. We shared a meal together. I only had a salad but somehow I ended up paying for the entire thing 🤬 That clown treated himself to a whole three course menu. He made fun of the descriptions in the menu the entire time. I’m sure fancy detectives like yourselves can trace back what three words they used … [Contiunue to page 4 and 5]

Detectives: The three words were “crunchy dark flamed”
But why are we talking about food now? Shouldn’t we try to find this guy?

Enigma: Maybe this will help: https://what3words.com/. After you find him continue to page 6.
*/

const Paint = (): ReactElement => {
    const [chat, setChat] = useState(["Enigma: Did you figure out your person of interest?"]);
    const [solved, setSolved] = useState("none");
    const [chemist, setChemist] = useState("");
    const [word1, setWord1] = useState("");
    const [word2, setWord2] = useState("");
    const [word3, setWord3] = useState("");
    
    const onClick = () => {
        if (solved === "none") {
            const isChemistSolved = chemist === "4"
            if (isChemistSolved) {
                setChat([
                    ...chat,
                    "You: It's suspect #4 Owen Paars.",
                    "Enigma: Ah Owen! I remember him now. We shared a meal together. I only had a salad but somehow I ended up paying for the entire thing 🤬 That clown treated himself to a whole three course menu. He made fun of the descriptions in the menu the entire time. I'm sure fancy detectives like yourselves can trace back what three words they used … [Continue to page 4 and 5]"
                ])
                setSolved("chemist");
            } else {
                setChat([...chat, `You: We think it was suspect #${chemist}.`, "Enigma: That cannot be true. Try again."])
            }
        }
        if (solved === "chemist") {
            const isMenuSolved = word1 === "crunchy" && word2 === "dark" && word3 === "flamed"
            if (isMenuSolved) {
                setChat([
                    ...chat,
                    `You: The words were ${word1}, ${word2} and ${word3}. But why are we talking about food now? Shouldn't we try to find this guy?`,
                    "Enigma: Maybe this will help: what3words.com. After you find him continue to page 6."
                ])
                setSolved("all");
            } else {
                setChat([...chat, `You: ${word1}, ${word2} and ${word3}?`, "Enigma: No, I don't think that's it."])
            }
        }
    }

    return (
        <>
        <Header label="Encrypted Chat" variant="h4" />
        <Header label="The Counterfeit Colors" variant="h6" />
        <Panel>
            {
                chat.map(m => <Typography sx={{ pb: 2 }}>{m}</Typography>)
            }
            {
                solved !== "none" ? null : (
                    <Stack direction="row">
                        <Typography sx={{mt: '15px'}}>You: We think it was suspect #</Typography>
                        <TextField variant="standard" focused color="success" value={chemist} onChange={({target}) => setChemist(target.value)}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                )
            }
            {
                solved !== "chemist" ? null : (
                    <>
                    <Typography sx={{mt: '15px'}}>You: The three words are</Typography> 
                    <Stack direction="row">
                        <TextField variant="standard" focused color="success" value={word1} onChange={({target}) => setWord1(target.value.toLowerCase())}/>
                        <Typography sx={{mt: '15px'}}>,</Typography>
                        <TextField variant="standard" focused color="success" value={word2} onChange={({target}) => setWord2(target.value.toLowerCase())}/>
                        <Typography sx={{mt: '15px'}}>{" and "}</Typography>
                        <TextField variant="standard" focused color="success" value={word3} onChange={({target}) => setWord3(target.value.toLowerCase())}/>
                        <IconButton color="inherit" onClick={onClick}><Send /></IconButton>
                    </Stack>
                    </>
                )
            }
        </Panel>
        </>
    )
}

export default Paint;