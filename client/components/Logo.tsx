import Image from 'next/image';

import logo from '../public/images/logo.png';

interface LogoProps {
  width: number;
  height: number;
}

const Logo = ({ width, height }: LogoProps) => {
  return <Image width={width} height={height} src={logo} alt="Logo" />;
};

export default Logo;
