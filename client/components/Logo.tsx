import Image from 'next/image';

import logo from '../public/images/logo.png';

interface LogoProps {
  width: number;
  height: number;
}

const Logo = ({ width, height }: LogoProps) => {
  return (
    <div className="h-nav-height mt-[20px] ">
      <Image width={width} height={height} src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
