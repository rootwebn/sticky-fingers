import { ButtonComponent } from '@/entities/buttonComponent';
import { CartButton } from '@/entities/cartButton';
import { Boxes, Clipboard, Headset } from 'lucide-react';
import React from 'react';

interface NavMenuProps {
  isMobile: boolean;
  className?: string;
}

export const NavMenu = ({ isMobile, className }: NavMenuProps) => {
  return (
    <div className={`flex flex-col md:flex-row gap-3 md:pr-8 md:items-center`}>
      <ButtonComponent
        buttonText={'Store'}
        buttonIcon={<Boxes />}
        buttonHref={'/store'}
        buttonClass={className}
      />
      <CartButton isMobile={false} className={className} />
      <ButtonComponent
        buttonText={'Orders'}
        buttonIcon={<Clipboard />}
        buttonHref={'/orders'}
        buttonClass={className}
      />
      <ButtonComponent
        buttonText={'Support'}
        buttonIcon={<Headset />}
        buttonHref={'/support'}
        buttonClass={className}
      />
      <ButtonComponent
        buttonText={'Login'}
        buttonIcon={<Headset />}
        buttonHref={'/login'}
        buttonClass={className}
      />
    </div>
  );
};
