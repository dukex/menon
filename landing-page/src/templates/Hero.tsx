import Link from 'next/link';
import type { ReactNode } from 'react';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = ({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description: string;
  children: ReactNode;
}) => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="/app">Sign in</Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <header className="text-center">
        <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-gray-900">
          {title}
        </h1>
        <div className="mb-16 mt-4 text-2xl">{description}</div>

        {children}
      </header>
    </Section>
  </Background>
);

export { Hero };
