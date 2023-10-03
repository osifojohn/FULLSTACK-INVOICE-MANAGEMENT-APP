import { routes } from '@/constants/links';
import Link from 'next/link';

export default function Invoice() {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col items-center mt-14  ">
        <section className="">
          <h2 className="font-bodyFont text-2xl phone:text-xl text-[#939393]">
            Page under construction
          </h2>
        </section>

        <Link
          href={`${routes.DASHBOARD}/home`}
          className="btn block w-[60%] text-center mt-5"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
