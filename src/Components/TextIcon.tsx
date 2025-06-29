/* eslint-disable react/jsx-props-no-spreading */
import { Box, Typography } from '@mui/material';
import { Ref } from 'react';
import { sizes } from '../Assets/Theme';
import mechanics from '../Assets/Mechanics';

export type TextIconProps = {
    img: string,
    rgb: string,
    text?: string | number
    large?: boolean
    small?: boolean
    sx?: any
    ref?: Ref<HTMLElement>
};

function TextIcon({
  img, rgb, text = '', large = false, small = false, sx, ref,
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
        textShadow: `0 0 5px ${rgb}`,
        alignContent: 'center',
        color: 'white',
        display: 'inline-block',
        ...sx,
      }}
    >
      <Typography ref={ref} variant={variant} fontFamily="PT Serif">{text}</Typography>
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

export function EmeraldIcon(props: IconProps) {
  return <TextIcon img={mechanics.emerald.img} rgb={mechanics.emerald.rgb} {...props} />;
}

export function RubyIcon(props: IconProps) {
  return <TextIcon img={mechanics.ruby.img} rgb={mechanics.ruby.rgb} {...props} />;
}

export function SapphireIcon(props: IconProps) {
  return <TextIcon img={mechanics.sapphire.img} rgb={mechanics.sapphire.rgb} {...props} />;
}

export function TopazIcon(props: IconProps) {
  return <TextIcon img={mechanics.topaz.img} rgb={mechanics.topaz.rgb} {...props} />;
}
