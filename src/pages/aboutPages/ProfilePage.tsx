import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { fetchProfilePageHeroImage, fetchProfilePageText } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { urlFor } from '../../../sanityApiClient/sanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

export interface FetchProfilePageHeroImageResponse {
  image: {
    asset: {
      _id: string;
    };
  };
}

export interface FetchProfilePageTextResponse {
  _id: string;
  content: {
    _key: string;
    children: {
      _key: string;
      marks: string[];
      text: string;
    }[];
    markDefs: {
      _key: string;
      href: string;
      openInNewTab: boolean;
    }[];
  }[];
}

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
  const { profilePageHeroImage, profilePageText } = useLoaderData() as {
    profilePageHeroImage: FetchProfilePageHeroImageResponse[];
    profilePageText: FetchProfilePageTextResponse[];
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState('');

  useEffect(() => {
    document.title = `Profile Page - ${authorName}`;
    const profileUrl = urlFor(profilePageHeroImage[0]?.image?.asset?._id)
      .width(1920)
      .quality(80)
      .format('webp')
      .url();
    setProfileImgUrl(profileUrl);
    
    const profileImg = new Image();
    profileImg.src = profileUrl;
    profileImg.onload = () => {
      setIsImageLoaded(true);
    };
  }, [authorName, profilePageHeroImage]);

  if (!isImageLoaded) {
    return (
      <div className='z-[999]'>
        <WholePageSpinner/>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 md:block md:w-[95%] mx-auto px-4 md:px-6 py-8 text">
      <picture className="py-4 md:float-left md:mr-4">
        <img
          srcSet={`
            ${profileImgUrl} 1920w,
            ${urlFor(profilePageHeroImage[0]?.image?.asset?._id)
              .width(768)
              .quality(80)
              .format('webp')
              .url()} 768w,
            ${urlFor(profilePageHeroImage[0]?.image?.asset?._id)
              .width(480)
              .quality(80)
              .format('webp')
              .url()} 480w
          `}
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1920px"
          src={profileImgUrl}
          alt={`Portrait of ${authorName}`}
          loading="lazy"
          className="md:max-w-[380px] md:max-h-[560px]"
        />
      </picture>

      <div>
        <span className="flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white border-b border-white">
          <h1 className="text-4xl">Profile</h1>
        </span>

        <div className="flex flex-col gap-8 pt-6 md:block">
          {profilePageText.map((paragraph) => (
            <div key={paragraph._id} className="paragraph flex flex-col gap-8 md:block">
              {paragraph.content.map((block) => (
                <p key={block._key} className="text-white text-base font-normal leading-7 tracking-wide text-justify md:my-6">
                  {block.children.map((child) => {
                    const link = block.markDefs.find((def) => child.marks.includes(def._key));
                    if (link) {
                      return (
                        <a
                          key={child._key}
                          href={link.href}
                          target={link.openInNewTab ? '_blank' : '_self'}
                          rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="text-[#49A3AC] hover:text-[#fd7e14]"
                        >
                          {child.text}
                        </a>
                      );
                    }
                    return <span key={child._key}>{child.text}</span>;
                  })}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
