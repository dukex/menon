import Image from 'next/image';

import { App as AppConfig } from '@/config/App';

type ILogoProps = {
};

const Logo = (props: ILogoProps) => {
  const size = '32';
  const fontStyle = 'font-semibold text-xl';

  return (
    <span className={`inline-flex items-center text-gray-900 ${fontStyle}`}>
      <Image alt="Menon" src="/logo.png" width={size} height={size} className='mr-2' />

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
