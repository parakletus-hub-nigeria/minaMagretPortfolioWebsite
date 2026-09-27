import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DropdownComponent from '../../components/DropdownComponent';
import { fetchEducationPageHeroImage, fetchEducationPageInput } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import WholePageSpinner from '../../components/WholePageSpinner';
import { urlFor } from '../../../sanityApiClient/sanityClient';

// Interface for the asset (image) structure
interface ImageAsset {
  _id: string;
  url: string;
}

// Interface for Education Page Input
interface EducationPageInputData {
  _id: string;
  placeOfStudy: string;
  details: string[]; // Adjust as necessary
}

// Interface for the Hero Image
interface EducationPageHeroImageData {
  image: {
    asset: ImageAsset;
  };
}

// Combined type for both data types
interface EducationPageData {
  educationPageInput: EducationPageInputData[];
  educationPageHeroImage: EducationPageHeroImageData[];
}

const fetchEducationPageData = async (): Promise<EducationPageData> => {
  const educationPageInput = await fetchEducationPageInput();
  const educationPageHeroImage = await fetchEducationPageHeroImage();

  if (!educationPageInput || educationPageInput.length === 0) {
    throw new Error('Education Page input not found');
  }
  if (!educationPageHeroImage || educationPageHeroImage.length === 0) {
    throw new Error('Hero image not found');
  }

  return { educationPageInput, educationPageHeroImage };
};


const EducationPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  const { data, isLoading } = useQuery<EducationPageData>({
    queryKey: ['educationPageData'],
    queryFn: fetchEducationPageData,
  });

  const [activeDropdowns, setActiveDropdowns] = useState<boolean[]>([]);

  const heroAssetId = data?.educationPageHeroImage?.[0]?.image?.asset?._id;
  const educationPageHeroImageUrl = heroAssetId
    ? urlFor(heroAssetId).width(1200).quality(85).format('webp').url()
    : '';

  useEffect(() => {
    if (data && data.educationPageInput) {
      // By default open the first institution (e.g. Cambridge / Harvard)
      const initial = new Array(data.educationPageInput.length).fill(false);
      if (initial.length > 0) initial[0] = true;
      setActiveDropdowns(initial);
    }
  }, [data]);

  const handleToggle = (index: number) => {
    setActiveDropdowns((prev) =>
      prev.map((isActive, i) => (i === index ? !isActive : isActive))
    );
  };

  useEffect(() => {
    document.title = `Education & Credentials - ${displayName}`;
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
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/40">
              Academic Qualifications & Pedagogy
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight">
            Education & Executive Studies
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            University of Cambridge, Harvard University, and doctoral research in sustainable development.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait */}
          {educationPageHeroImageUrl && (
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                <img
                  src={educationPageHeroImageUrl}
                  alt={`Portrait of ${displayName}`}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[620px]"
                />
              </div>
            </div>
          )}

          {/* Right Column: Institutions & Accordion Details */}
          <div className={educationPageHeroImageUrl ? 'lg:col-span-7 space-y-4 text-left' : 'lg:col-span-12 space-y-4 text-left'}>
            <div className="w-full flex flex-col gap-3">
              {data?.educationPageInput.map((item, index) => (
                <DropdownComponent
                  key={item._id}
                  title={item.placeOfStudy}
                  content={item.details}
                  isActive={activeDropdowns[index]}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationPage;
