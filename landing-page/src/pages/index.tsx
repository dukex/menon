import type { ChangeEvent } from 'react';
import { useId, useRef, useState } from 'react';

import { Button } from '@/button/Button';
import { Meta } from '@/layout/Meta';
import { Hero } from '@/templates/Hero';
import { AppConfig } from '@/utils/AppConfig';

const validUrl = (url: string) => {
  const id = url.split('list=')[1] || '';
  return id.length > 2;
};

const Index = () => {
  const urlId = useId();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);

    setDisabled(!validUrl(e.target.value));
  };

  const handleClick = async () => {
    if (validUrl(url)) {
      console.log(url);
    } else {
      inputRef.current?.focus();
      setError('Invalid playlist URL');
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between bg-gray-100 text-gray-600 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Hero
        title={
          <>
            {'Transform any YouTube playlist into '}
            <span className="inline-block bg-primary-500 px-4">
              structured courses
            </span>
          </>
        }
        description=""
      >
        <div className="flex flex-col">
          <label
            htmlFor={urlId}
            className="pb-2 text-lg font-bold text-primary-900"
          >
            Youtube Playlist URL:
          </label>
          <input
            ref={inputRef}
            id={urlId}
            value={url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/playlist?list=..."
            type="text"
            className=" rounded-sm border border-primary-900 p-5 font-mono text-xl text-primary-900"
          />
          <p
            className={`${error.length < 1 ? '' : 'bg-red-500'} text-md h-10  p-2 text-white`}
          >
            {error}
          </p>

          <div className="mt-5">
            <Button xxl disabled={disabled} onClick={handleClick}>
              Import now
            </Button>
          </div>
        </div>
      </Hero>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
