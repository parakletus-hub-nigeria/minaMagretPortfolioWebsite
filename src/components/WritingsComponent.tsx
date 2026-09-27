import React from 'react';
import { urlFor } from '../../sanityApiClient/sanityClient';

interface LinksDataProps {
  title: string;
  url: string;
}

interface BooksDataProps {
  title: string;
  image: {
    asset: {
      _id: string;
    };
  };
  url: string;
}

interface WritingsProps {
  title: string;
  linksData: LinksDataProps[];
  booksData: BooksDataProps[];
}

const WritingsComponent: React.FC<Partial<WritingsProps>> = ({ title, linksData, booksData }) => {
  const imageUrls = (booksData || []).map((bookData) =>
    bookData.image?.asset?._id
      ? urlFor(bookData.image.asset._id).width(600).quality(80).format('webp').url()
      : ''
  );

  return (
    <section>
      <div>
        <span className='flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white border-b border-white'>
          <h1 className='text-white text-2xl font-semibold'>Writings</h1>
          <h1 className='text-white capitalize text-4xl font-semibold'>{title}</h1>
        </span>

        <div className='pt-12 flex flex-col gap-12'>
          {linksData && (
            <div>
              <ul className='pl-6 md:pl-16'>
                {linksData.map((ele, i) => (
                  <li key={i} className='text-blue-500 list-disc pl-2 font-semibold text-base'>
                    <a href={ele.url} target="_blank" rel="noopener noreferrer">{ele.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {booksData && (
            <div className='flex md:flex-row gap-6 flex-wrap'>
              {booksData.map((bookData, i) => (
                <a key={i} href={bookData.url} target="_blank" rel="noopener noreferrer">
                  <picture className='flex flex-col items-center justify-center md:max-h-[295px] md:max-w-[210px]'>
                    <img src={imageUrls[i]} className='w-full h-full' alt={bookData.title} />
                    <p className='text-center text-white'>{bookData.title}</p>
                  </picture>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WritingsComponent;
