import Image from 'next/image';
import myImg from '../public/images/my-img.jpg';

interface UserContainerProps {
  isTopbar?: boolean;
}

const UserContainer = ({ isTopbar = false }: UserContainerProps) => {
  return (
    <div className={`flex items-center  ${!isTopbar && 'pb-3'}`}>
      <div className="mr-2 tabPort1:mr-1">
        <Image
          src={myImg}
          alt="me"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center phone:hidden">
        <p
          className={`font-bodyFont font-medium flex justify-center text-lg ${
            isTopbar && 'text-sm'
          }`}
        >
          John
        </p>
        <p className={`text-gray-400 text-[13px] ${isTopbar && 'text-[9px]'}`}>
          Admin
        </p>
      </div>
    </div>
  );
};

export default UserContainer;
