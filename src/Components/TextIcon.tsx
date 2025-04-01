/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { sizes } from '../Assets/Theme';
import mechanics from '../Assets/Mechanics';

export type TextIconProps = {
    img: string,
    rgb: string,
    text?: string | number
    large?: boolean
    small?: boolean
    sx?: any
};

function TextIcon({
  img, rgb, text = '', large = false, small = false, sx,
}: TextIconProps) {
  const variant = large ? 'h5' : 'body1';
  return (
    <Box
      sx={{
        height: large ? sizes.L : small ? sizes.S : sizes.M,
        width: large ? sizes.L : small ? sizes.S : sizes.M,
        backgroundImage: `url("${img}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center',
        textShadow: `0 0 2px ${rgb}`,
        alignContent: 'center',
        color: 'white',
        display: 'inline-block',
        ...sx,
      }}
    >
      <Typography variant={variant}>{text}</Typography>
    </Box>
  );
}

export default TextIcon;

type IconProps = Partial<TextIconProps>;

export function ScoreIcon(props: IconProps) {
  return <TextIcon img={mechanics.score.img} rgb={mechanics.score.rgb} {...props} />;
}

export function CurrencyIcon(props: IconProps) {
  return <TextIcon img={mechanics.currency.img} rgb={mechanics.currency.rgb} {...props} />;
}

export function RubyIcon(props: IconProps) {
  return <TextIcon img={mechanics.rubies.img} rgb={mechanics.rubies.rgb} {...props} />;
}
