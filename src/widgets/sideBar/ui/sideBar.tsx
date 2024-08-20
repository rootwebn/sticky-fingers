import { Checkbox } from '@/shared/ui/checkbox';

export const SideBar = () => {
  return (
    <div
      className={
        'sticky top-0 z-11 dark:bg-space bg-space min-h-screen max-w-72 border-altSpace border-r-2 pt-2 pl-11 min-w-[288px]'
      }
    >
      <div className={'flex flex-col gap-1.5'}>
        <div className={'flex flex-row items-center gap-1.5'}>
          <Checkbox />
          Wireless
        </div>
      </div>
    </div>
  );
};
