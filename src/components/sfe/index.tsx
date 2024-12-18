import { Stack, Typography, TextField } from "@mui/material";
import { ChangeEventHandler, ReactElement, useState } from "react";
import Panel from "../Panel";

const Safe = (): ReactElement => {
    const [numbers, setNumbers] = useState(["0","0","0","0"]);

    if (numbers[0] === "1" && numbers[1] === "6" && numbers[2] === "7" && numbers[3] === "8") {
        return (
            <Panel title="Σ Security">
                <Typography>{"[Continue to page 7]"}</Typography>
            </Panel>
        )
    }

    const inputs = [0,1,2,3].map((n) => {
        const value = numbers[n];
        const onChange: ChangeEventHandler<HTMLInputElement> = ({target}) => {
            const copy = [...numbers];
            copy[n] = target.value;
            setNumbers(copy);
        }
        return <TextField variant="standard" focused color="success" value={value} onChange={onChange}/>
    });

    return (
        <Panel title="Σ Security">
            <Stack direction="row">
                {inputs}
            </Stack>
        </Panel>
    )
}

export default Safe;