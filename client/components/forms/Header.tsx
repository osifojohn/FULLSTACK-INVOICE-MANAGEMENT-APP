import Link from 'next/link';
import Logo from '../Logo';

interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  toggle: () => void;
}

export default function Header({
  heading,
  paragraph,
  linkName,
  toggle,
}: HeaderProps) {
  return (
    <div className="">
      <div className="flex justify-center">
        <Logo width={120} height={120} />
      </div>
      <h2 className="text-center text-xl font-semibold text-gray-900 mt-2 mb-1">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 ">
        {paragraph}{' '}
        <button
          onClick={toggle}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </button>
      </p>
    </div>
  );
}
