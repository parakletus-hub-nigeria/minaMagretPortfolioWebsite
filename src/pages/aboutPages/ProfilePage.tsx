import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { fetchProfilePageHeroImage } from '../../../sanityApiClient/useSanityClient';
import { fetchProfilePageText } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';

// Interfaces for the fetched data
export interface FetchProfilePageHeroImageResponse {
  image: {
    asset: {
      url: string;
    };
  };
}

export interface FetchProfilePageTextResponse {
  _id: string; // Unique ID for the paragraph
  content: {
    _key: string; // Unique key for the block
    children: {
      _key: string; // Unique key for the child
      marks: string[]; // Array of marks applied to the child
      text: string; // Text content of the child
    }[];
    markDefs: {
      _key: string; // Unique key for the mark definition
      href: string; // Link URL
      openInNewTab: boolean; // Flag for opening the link in a new tab
    }[];
  }[];
}

// Loader function to fetch profile page data
export const profilePageLoader = async () => {
  try {
    const profilePageHeroImage = await fetchProfilePageHeroImage();
    const profilePageText = await fetchProfilePageText();

    if (!profilePageHeroImage || profilePageHeroImage.length === 0) {
      throw new Error('Hero image not found');
    }

    if (!profilePageText || profilePageText.length === 0) {
      throw new Error('Profile Page text not found');
    }

    return { profilePageHeroImage, profilePageText };
  } catch (error) {
    throw new Response('Failed to load one or more items', { status: 500 });
  }
};

const ProfilePage: React.FC = () => {
  const { authorName } = useAuthorContext();

  // Effect to set document title
  useEffect(() => {
    document.title = `Profile Page - ${authorName}`;
  }, [authorName]);

  // Get data loaded by the loader function
  const { profilePageHeroImage, profilePageText } = useLoaderData() as {
    profilePageHeroImage: FetchProfilePageHeroImageResponse[];
    profilePageText: FetchProfilePageTextResponse[];
  };

  return (
    <section>
      <div className='flex flex-col gap-6 md:flex-row md:w-[95%] mx-auto px-4 md:px-6 py-8'>
        <picture className='py-4'>
          <img 
            src={profilePageHeroImage[0]?.image?.asset?.url} 
            alt="Profile Hero" 
            className='md:max-w-[380px] md:max-h-[560px]' 
          />
        </picture>
        <div>
          <span className='flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white border-b border-white'>
            <h2 className='text-2xl'>About Me</h2>
            <h1 className='text-4xl'>Profile</h1>
          </span>

          <div className='flex flex-col gap-8 pt-6'>
            {profilePageText.map((paragraph) => (
              <div key={paragraph._id} className="paragraph flex flex-col gap-8">
                {paragraph.content.map((block) => (
                  <p key={block._key} className='text-white text-base font-normal'>
                    {block.children.map((child) => {
                      const link = block.markDefs.find(def => child.marks.includes(def._key));
                      if (link) {
                        return (
                          <a
                            key={child._key}
                            href={link.href}
                            target={link.openInNewTab ? '_blank' : '_self'}
                            rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                            className='text-[#49A3AC] hover:text-[#fd7e14]' // Style your links
                          >
                            {child.text}
                          </a>
                        );
                      }
                      return (
                        <span key={child._key} className={child.marks.join(' ')}>
                          {child.text}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
