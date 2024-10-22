import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface ButtonInterface {
  buttonText: string;
  buttonClass?: string;
  buttonIcon: ReactElement | null;
  buttonHref: string;
  buttonOnClickFunction?: () => void;
}

interface ButtonInterfaceCart {
  buttonText: string;
  buttonClass?: string;
  buttonTextClass?: string;
  buttonIcon: ReactElement | null;
  buttonOnClickFunction?: () => void;
}

export const ButtonComponent: React.FC<ButtonInterface> = ({
  buttonClass,
  buttonIcon,
  buttonText,
  buttonHref,
}) => {
  return (
    <Button
      asChild
      variant={'outline'}
      className={`dark:bg-darkSpace bg-space text-white hover:text-lightSpace md:max-w-52 flex items-center justify-start ${buttonClass} `}
    >
      <Link href={buttonHref} className={`flex flex-row gap-1.5 text-xl`}>
        <div>{buttonIcon}</div>
        {buttonText}
      </Link>
    </Button>
  );
};

export const ButtonComponentCart: React.FC<ButtonInterfaceCart> = ({
  buttonClass,
  buttonTextClass,
  buttonIcon,
  buttonText,
  buttonOnClickFunction,
}) => {
  return (
    <Button
      asChild
      variant={'outline'}
      className={`flex dark:bg-darkSpace bg-space text-white hover:text-lightSpace items-center justify-start max-w-52 p-1 ${buttonClass}`}
      onClick={buttonOnClickFunction}
    >
      <div
        className={`flex flex-row gap-1.5 hover:cursor-pointer ${buttonTextClass}`}
      >
        <div>{buttonIcon}</div>
        {buttonText}
      </div>
    </Button>
  );
};
