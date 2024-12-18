import { Typography, TypographyOwnProps } from '@mui/material';

export const Header = ({ label, ...props }: { label: string } & TypographyOwnProps) => (
    // <a href={`#${label}`} style={{zIndex: 5, textDecoration: 'none'}}>
        <Typography id={label} variant="h1" fontWeight={650} align="center" sx={{ mb: '-2px' }} {...props}>
            {label}
        </Typography>
    // </a>
);
