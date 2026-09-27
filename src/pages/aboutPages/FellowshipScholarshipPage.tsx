import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFellowshipsAndRecognitionsPageInput, fetchFellowshipsAndRecognitionsPageHeroImage } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { urlFor } from '../../../sanityApiClient/sanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface FetchFellowshipsAndScholarshipsHeroImageResponse {
  image: {
    asset: {
      _id: string;
    };
  };
}

interface FetchFellowshipsAndScholarshipsInputResponse {
  _id: string;
  placeOfStudy: string;
  details: string[];
}

interface FellowshipsAndScholarshipsPageData {
  fellowshipsAndScholarshipsInput: FetchFellowshipsAndScholarshipsInputResponse[];
  fellowshipsAndScholarshipsHeroImage: FetchFellowshipsAndScholarshipsHeroImageResponse[];
}

const fetchFellowshipsAndScholarshipsData = async (): Promise<FellowshipsAndScholarshipsPageData> => {
  const fellowshipsAndScholarshipsHeroImage = await fetchFellowshipsAndRecognitionsPageHeroImage();
  const fellowshipsAndScholarshipsInput = await fetchFellowshipsAndRecognitionsPageInput();

  if (!fellowshipsAndScholarshipsHeroImage || fellowshipsAndScholarshipsHeroImage.length === 0) {
    throw new Error('Hero image not found');
  }
  if (!fellowshipsAndScholarshipsInput || fellowshipsAndScholarshipsInput.length === 0) {
    throw new Error('Fellowships and scholarships input not found');
  }

  return { fellowshipsAndScholarshipsInput, fellowshipsAndScholarshipsHeroImage };
};

const FellowShipScholarshipPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  const { data, isLoading } = useQuery<FellowshipsAndScholarshipsPageData>({
    queryKey: ['fellowshipsAndScholarshipsData'],
    queryFn: fetchFellowshipsAndScholarshipsData,
  });

  const heroAssetId = data?.fellowshipsAndScholarshipsHeroImage?.[0]?.image?.asset?._id;
  const fellowshipsHeroImageUrl = heroAssetId
    ? urlFor(heroAssetId).width(1200).quality(85).format('webp').url()
    : '';

  useEffect(() => {
    document.title = `Fellowships & Scholarships - ${displayName}`;
  }, [displayName]);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section className="py-8 md:py-12 font-sans">
      <div className="md:w-[92%] lg:w-[88%] mx-auto px-4 md:px-6">
        {/* Header */}
        <header className="mb-10 pb-6 border-b border-slate-800 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
              International Fellowships & Endowments
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight">
            Fellowships & Scholarships
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Ford Foundation Fellowships and distinguished academic research grants awarded to {displayName}.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait */}
          {fellowshipsHeroImageUrl && (
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                <img
                  src={fellowshipsHeroImageUrl}
                  alt={`Portrait of ${displayName}`}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[620px]"
                />
              </div>
            </div>
          )}

          {/* Right Column: Fellowships List */}
          <div className={fellowshipsHeroImageUrl ? 'lg:col-span-7 space-y-6 text-left' : 'lg:col-span-12 space-y-6 text-left'}>
            <div className="space-y-6">
              {data?.fellowshipsAndScholarshipsInput.map((fellowship) => (
                <div
                  key={fellowship._id}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl space-y-3"
                >
                  <h2 className="text-lg md:text-xl font-bold text-gray-100 font-serif border-b border-slate-800/80 pb-2">
                    {fellowship.placeOfStudy}
                  </h2>
                  <div className="space-y-2">
                    {fellowship.details.map((detail, index) => (
                      <p
                        key={index}
                        className="text-slate-300 text-sm md:text-base font-normal leading-relaxed"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FellowShipScholarshipPage;
