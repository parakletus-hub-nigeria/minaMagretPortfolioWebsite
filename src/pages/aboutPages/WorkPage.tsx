import React, { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router';
import { fetchWorkPageInput } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { urlFor } from '../../../sanityApiClient/sanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface WorkPageImage {
  asset: {
    _id: string;
    url: string;
  };
}

interface WorkPageHeading {
  style: string;
  _key: string;
  markDefs: { href?: string; openInNewTab?: boolean }[]; 
  children: { text: string }[];
}

interface WorkPageResponse {
  heading: WorkPageHeading[];
  description: string;
  image: WorkPageImage;
}

export const workPageLoader: LoaderFunction = async () => {
  try {
    const workPageResponse = await fetchWorkPageInput();
     if (!workPageResponse || workPageResponse.length === 0) {
      throw new Error('Work Page input data not found');
    }

    return { workPageResponse };
  } catch (error) {
    throw new Response('Failed to fetch input data', { status: 500 });
  }
};

const WorkPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const { workPageResponse } = useLoaderData() as { workPageResponse: WorkPageResponse[] };
  
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const totalImages = workPageResponse.length;

  useEffect(() => {
    document.title = `My Work - ${authorName}`;

    const images: string[] = [];

    const handleImageLoad = () => {
      setLoadedImagesCount((prevCount) => prevCount + 1);
    };

    workPageResponse.forEach((item) => {
      const imgUrl = urlFor(item.image.asset._id).width(1920).quality(80).format('webp').url();
      images.push(imgUrl); 
      const img = new Image();
      img.src = imgUrl;
      img.onload = handleImageLoad;
    });

    setPreloadedImages(images); 

    return () => {
      
    };
  }, [authorName, workPageResponse]);



  if (loadedImagesCount < totalImages) {
    return (
     <WholePageSpinner/>
    );
  }

  return (
    <section>
      <div>
        <div className='flex flex-col justify-center px-4 md:px-6 py-8'>
          <div className='max-w-[680px] md:pl-8 lg:pl-12 py-12'>
            <span className='flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white border-b border-white'>
              <h2 className='text-2xl'>About Me</h2>
              <h1 className='text-4xl'>My Work</h1>
            </span>

            <div className="flex flex-col gap-4">
              {workPageResponse.map((ele, index) => (
                <div key={ele.image.asset._id} className="flex flex-col md:flex-row gap-4 items-start pt-4">
                  <img
                    src={preloadedImages[index]} // Use the preloaded image URL
                    className="w-full md:w-[153px] md:h-[132px] max-w-[100%] object-contain"
                    alt={ele.description} // Use description as alt text
                  />
                  <div className="flex flex-col justify-start md:justify-between">
                    {ele.heading.map((headingItem) => {
                      const linkDef = headingItem.markDefs[0];
                      const content = headingItem.children[0]?.text; 

                      return linkDef && linkDef.href ? (
                        <a
                          key={headingItem._key}
                          href={linkDef.href}
                          className="font-bold underline text-blue-500 py-0"
                          target={linkDef.openInNewTab ? '_blank' : '_self'}
                          rel={linkDef.openInNewTab ? 'noopener noreferrer' : undefined} // Added rel attribute for security
                        >
                          {content}
                        </a>
                      ) : (
                        <h2 key={headingItem._key} className="font-bold text-2xl text-white">
                          {content}
                        </h2>
                      );
                    })}

                    <p className="text-white leading-6">{ele.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkPage;

