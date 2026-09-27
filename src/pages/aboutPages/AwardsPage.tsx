import React, { useEffect } from "react";
import HonorsComponent from "../../components/HonorsComponent";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAwardsPageInput,
  fetchAwardsPageHeroImage,
} from "../../../sanityApiClient/useSanityClient";
import { useAuthorContext } from "../../hooks/AuthorContext";
import WholePageSpinner from "../../components/WholePageSpinner";
import { urlFor } from "../../../sanityApiClient/sanityClient";

interface ImageAsset {
  _id: string;
  url: string;
}

interface AwardsPageInputData {
  _id: string;
  placeOfStudy: string;
  details: string[];
}

interface AwardsPageHeroImageData {
  image: {
    asset: ImageAsset;
  };
}

interface AwardsPageData {
  awardsPageInput: AwardsPageInputData[];
  awardsPageHeroImage: AwardsPageHeroImageData[];
}

// Main component
const AwardsPage: React.FC = () => {
  const fetchAwardsPageData = async (): Promise<AwardsPageData> => {
    const awardsPageInput = await fetchAwardsPageInput();
    const awardsPageHeroImage = await fetchAwardsPageHeroImage();

    if (!awardsPageInput || awardsPageInput.length === 0) {
      throw new Error("Awards Page input not found");
    }
    if (!awardsPageHeroImage || awardsPageHeroImage.length === 0) {
      throw new Error("Hero image not found");
    }

    return { awardsPageInput, awardsPageHeroImage };
  };

  const { data, isLoading } = useQuery<AwardsPageData>({
    queryKey: ["awardsPageData"], // Updated the query key to match the correct data
    queryFn: fetchAwardsPageData,
  });

  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  const heroAssetId = data?.awardsPageHeroImage?.[0]?.image?.asset?._id;
  const awardsPageHeroImageUrl = heroAssetId
    ? urlFor(heroAssetId).width(1200).quality(85).format("webp").url()
    : "";

  useEffect(() => {
    document.title = `Awards & Recognitions - ${displayName}`;
  }, [displayName]);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section>
      {data && (
        <HonorsComponent
          title="Awards and Recognitions"
          imgUrl={awardsPageHeroImageUrl}
          listData={data.awardsPageInput[0]?.details || []}
          categoryBadge="Distinctions & Accolades"
        />
      )}
    </section>
  );
};

export default AwardsPage;
