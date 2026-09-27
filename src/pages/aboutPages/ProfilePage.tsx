import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfilePageHeroImage, fetchProfilePageText } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { urlFor } from '../../../sanityApiClient/sanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface FetchProfilePageHeroImageResponse {
  image: {
    asset: {
      _id: string;
    };
  };
}

interface FetchProfilePageTextResponse {
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

interface ProfilePageData {
  profilePageHeroImage: FetchProfilePageHeroImageResponse[];
  profilePageText: FetchProfilePageTextResponse[];
}

const fetchProfilePageData = async (): Promise<ProfilePageData> => {
  const profilePageHeroImage = await fetchProfilePageHeroImage();
  const profilePageText = await fetchProfilePageText();

  if (!profilePageHeroImage || profilePageHeroImage.length === 0) {
    throw new Error('Hero image not found');
  }
  if (!profilePageText || profilePageText.length === 0) {
    throw new Error('Profile Page text not found');
  }

  return { profilePageHeroImage, profilePageText };
};

const ProfilePage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  const { data, isLoading } = useQuery<ProfilePageData>({
    queryKey: ['profilePageData'],  
    queryFn: fetchProfilePageData,  
  });

  const heroAssetId = data?.profilePageHeroImage?.[0]?.image?.asset?._id;
  const profileImgUrl = heroAssetId
    ? urlFor(heroAssetId).width(1200).quality(85).format('webp').url()
    : '';
  const profileImgTablet = heroAssetId
    ? urlFor(heroAssetId).width(768).quality(80).format('webp').url()
    : '';

  useEffect(() => {
    document.title = `Executive Biography & Profile - ${displayName}`;
  }, [displayName]);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section className="py-8 md:py-12 font-sans">
      <div className="md:w-[92%] lg:w-[88%] mx-auto px-4 md:px-6">
        {/* Academic Page Header */}
        <header className="mb-10 pb-6 border-b border-slate-800 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              Biography & Leadership
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight">
            Executive Profile
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            First Professor of Social Work & Environmental Sustainability Globally • Acadapreneur • Ford Foundation Fellow
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait & Key Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              {profileImgUrl && (
                <img
                  srcSet={`${profileImgUrl} 1200w, ${profileImgTablet} 768w`}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  src={profileImgUrl}
                  alt={`Official portrait of ${displayName}`}
                  loading="eager"
                  className="w-full h-auto object-cover max-h-[620px]"
                />
              )}
            </div>

            {/* Quick Credentials Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2 text-xs">
              <p className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                Primary Affiliation
              </p>
              <p className="text-gray-200 font-bold text-sm">
                Rivers State University (RSU), Port Harcourt
              </p>
              <p className="text-slate-400">
                Centre for Water and Sanitation Studies • Global Associate, IUPUI School of Social Work
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl space-y-6">
              {data?.profilePageText.map((paragraph) => (
                <div key={paragraph._id} className="space-y-4">
                  {paragraph.content.map((block) => (
                    <p
                      key={block._key}
                      className="text-slate-200 text-base md:text-lg leading-relaxed font-sans font-normal"
                    >
                      {block.children.map((child) => {
                        const link = block.markDefs.find((def) => child.marks.includes(def._key));
                        if (link) {
                          return (
                            <a
                              key={child._key}
                              href={link.href}
                              target={link.openInNewTab ? '_blank' : '_self'}
                              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                              className="text-blue-400 hover:text-blue-300 underline font-semibold transition-colors"
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
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
