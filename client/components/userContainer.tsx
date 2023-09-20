import Image from 'next/image';
import myImg from '../public/images/my-img.jpg';

const userContainer = () => {
  return (
    <div className="flex items-center pb-3">
      <div className="mr-2">
        <Image
          src={myImg}
          alt="me"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-bodyFont font-medium flex justify-center text-lg">
          John
        </p>
        <p className="text-gray-400 text-[13px]">Admin</p>
      </div>
    </div>
  );
};

export default userContainer;
