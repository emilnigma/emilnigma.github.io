import { Paper, PaperProps, Typography } from "@mui/material";
import { ReactElement } from "react";

type PanelProps = { title?: string } & PaperProps

const Panel = ({ title, children, className, ...props }: PanelProps): ReactElement => {
    const classes = `panel ${className ?? ''}`;
    return (
        <Paper elevation={0} className={classes} {...props}>
            {title ? <Typography variant="h5" fontWeight={500}>{title}</Typography> : null}
            {children}
        </Paper>
    )
}
export default Panel