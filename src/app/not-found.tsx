import { buttonVariants } from '@/shared/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div
      className={'relative flex flex-col items-center justify-center top-16'}
    >
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className={buttonVariants({ variant: 'outline' })} href={'/'}>
        Return Home!
      </Link>
    </div>
  );
}
