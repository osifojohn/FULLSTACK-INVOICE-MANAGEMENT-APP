import Image from 'next/image';

import logo from '../public/images/logo.png';

const Logo = () => {
  return (
    <div className="h-nav-height mt-[20px] ">
      <Image width={180} height={180} src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
