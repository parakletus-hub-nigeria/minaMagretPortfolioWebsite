import React, { useEffect } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router';
import { fetchWorkPageInput } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';

interface WorkPageImage {
  asset: {
    _id: string;
    url: string;
  };
}

interface WorkPageHeading {
  style: string;
  _key: string;
  markDefs: { href?: string; openInNewTab?: boolean }[]; // Ensure this reflects your structure
  children: { text: string }[];
}

interface WorkPageResponse {
  heading: WorkPageHeading[]; // Changed to use the defined interface
  description: string;
  image: WorkPageImage; // Changed to use the defined interface
}

export const workPageLoader: LoaderFunction = async () => {
  try {
    const workPageResponse = await fetchWorkPageInput();

    if (!workPageResponse || workPageResponse.length === 0) {
      throw new Error('Profile Page text not found');
    }

    return { workPageResponse };
  } catch (error) {
    throw new Response('Failed to fetch input data', { status: 500 });
  }
};

const WorkPage: React.FC = () => {
  const {authorName} = useAuthorContext();


  useEffect(() => {
     document.title = `My Work - ${authorName}`;
   }, [authorName]);

  const { workPageResponse } = useLoaderData() as { workPageResponse: WorkPageResponse[] };

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
              {workPageResponse.map((ele) => (
                <div key={ele.image.asset._id} className="flex flex-col md:flex-row gap-4 items-start pt-4">
                  <img
                    src={ele.image.asset.url || '/path/to/fallback-image.jpg'} // Use the fetched image URL
                    className="w-full md:w-[153px] md:h-[132px] max-w-[100%] object-contain"
                    alt={ele.description} // Changed alt text to use description
                  />
                  <div className="flex flex-col justify-start md:justify-between">
                    {/* Map over the heading array to render the appropriate tag */}
                    {ele.heading.map((headingItem) => {
                      const linkDef = headingItem.markDefs[0]; // Assuming first markDef holds the link
                      const content = headingItem.children[0]?.text; // Get the text from children with optional chaining

                      // Check if link is defined
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
