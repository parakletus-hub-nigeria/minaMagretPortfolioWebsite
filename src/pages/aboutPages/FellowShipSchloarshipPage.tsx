import React, { useEffect, useState } from 'react';
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
  const { data, isLoading } = useQuery<FellowshipsAndScholarshipsPageData>({
    queryKey: ['fellowshipsAndScholarshipsData'],
    queryFn: fetchFellowshipsAndScholarshipsData,
  });

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [fellowshipsHeroImageUrl, setFellowshipsHeroImageUrl] = useState('');

  useEffect(() => {
    document.title = `Fellowships and Scholarships - ${authorName}`;

    if (data) {
      const heroImageUrl = urlFor(data.fellowshipsAndScholarshipsHeroImage[0].image.asset._id)
        .width(1920)
        .quality(80)
        .format('webp')
        .url();
      setFellowshipsHeroImageUrl(heroImageUrl);

      const img = new Image();
      img.src = heroImageUrl;
      img.onload = () => {
        setIsImageLoaded(true);
      };
    }
  }, [data, authorName]);

  if (isLoading || !isImageLoaded) {
    return <WholePageSpinner />;
  }

  return (
    <section className="flex flex-col gap-6 md:block md:w-[95%] mx-auto px-4 md:px-6 py-8 text">
      <picture className="py-4 md:float-left md:mr-4">
        <img
          srcSet={`${
            fellowshipsHeroImageUrl
          } 1920w, ${urlFor(data?.fellowshipsAndScholarshipsHeroImage[0]?.image?.asset?._id)
            .width(768)
            .quality(80)
            .format('webp')
            .url()} 768w, ${urlFor(data?.fellowshipsAndScholarshipsHeroImage[0]?.image?.asset?._id)
            .width(480)
            .quality(80)
            .format('webp')
            .url()} 480w`}
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1920px"
          src={fellowshipsHeroImageUrl}
          alt={`Portrait of ${authorName}`}
          loading="lazy"
          className="md:max-w-[380px] md:max-h-[560px]"
        />
      </picture>

      <div>
        <span className="flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white border-b border-white">
          <h1 className="text-4xl">Fellowships and Scholarships</h1>
        </span>

        <div className="flex flex-col gap-8 pt-6 md:block">
          {data?.fellowshipsAndScholarshipsInput.map((fellowship) => (
            <div key={fellowship._id} className="flex flex-col gap-8 md:block">
              <h2 className="text-xl font-semibold text-white">{fellowship.placeOfStudy}</h2>
              {fellowship.details.map((detail, index) => (
                <p key={index} className="text-white text-base font-normal leading-7 tracking-wide text-justify md:my-6">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FellowShipScholarshipPage;
