import React, { useEffect } from 'react';
import PublicationExplorer, { PublicationItem } from '../../components/PublicationExplorer';
import { useQuery } from '@tanstack/react-query';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { fetchPapersImageWritingsLinks, fetchPapersWritingsLinks } from '../../../sanityApiClient/useSanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface ImageBookLink {
  title: string;
  image: {
    asset: {
      _id: string;
    };
  };
  url: string;
}

interface BookLink {
  items: PublicationItem[];
}

interface PapersPageData {
  papersImageWritingsData: ImageBookLink[];
  papersWritingsData: BookLink[];
}

const fetchPapersPageData = async (): Promise<PapersPageData> => {
  const [papersImageWritingsData, papersWritingsData] = await Promise.all([
    fetchPapersImageWritingsLinks(),
    fetchPapersWritingsLinks(),
  ]);

  return {
    papersImageWritingsData: papersImageWritingsData || [],
    papersWritingsData: papersWritingsData || [],
  };
};

const PapersPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Research Publications & Papers - ${authorName || 'Prof. Mina Margaret Ogbanga'}`;
  }, [authorName]);

  const { data, isLoading } = useQuery<PapersPageData>({
    queryKey: ['papersData'],
    queryFn: fetchPapersPageData,
  });

  const papers: PublicationItem[] = (data?.papersWritingsData || []).flatMap((d) => d.items || []);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section className="py-8 md:py-12">
      <div className="md:w-[90%] lg:w-[85%] mx-auto px-4 md:px-6">
        {/* Academic Page Header */}
        <header className="mb-10 pb-6 border-b border-slate-800 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/40">
              Scholarship & Research
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight">
            Academic Papers & Publications
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Peer-reviewed articles, scholarly monographs, and policy research on environmental social work, sustainability, conflict resolution, and the extractive sector by {authorName || 'Prof. Mina Margaret Ogbanga'}.
          </p>
        </header>

        {/* Interactive Publication Explorer */}
        <PublicationExplorer
          papers={papers}
          imagePapers={data?.papersImageWritingsData}
          authorName={authorName}
        />
      </div>
    </section>
  );
};

export default PapersPage;

