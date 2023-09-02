import Image from 'next/image';
import Link from 'next/link';

import invoiceLanding from '../public/images/invoice-landing.svg';
import { routes } from '../constants/links';
import Logo from '@/components/Logo';

export default function Landing() {
  return (
    <div className="max-w-[90vw] mx-auto">
      <nav className="h-[6rem] mt-[20px] ">
        <Logo width={180} height={180} />
      </nav>
      <main className="grid grid-cols-2 gap-10 tabPort:grid-cols-1 ">
        <section className="row-[50%] self-center tabPort:mt-10">
          <div className="mb-[1.38rem]">
            <h1 className="font-headingFont mb-[1.38rem] text-[3.052rem]  font-semibold capitalize tracking-[1px] phone:text-[2.052rem]  ">
              Invoice <span className="text-[#3b82f6]">Management</span> App
            </h1>
            <p className="font-bodyFont tracking-[1px] leading-[1.73] text-grey-600">
              In a world where time is money, this app is designed to be the
              ultimate time-saving companion for freelancers, entrepreneurs, and
              business owners alike. Say goodbye to stacks of paper invoices and
              the hassle of manually tracking payments. With this app,
              generating, sending, managing invoices, and gaining financial
              insights will be as simple as a few taps and clicks.
            </p>
          </div>
          <Link href={`${routes.AUTH}`} className="btn">
            Get Started
          </Link>
        </section>
        <section className="tabPort:hidden">
          <Image
            priority
            src={invoiceLanding}
            height={500}
            width={500}
            alt="Invoice Logo"
          />
        </section>
      </main>
    </div>
  );
}
