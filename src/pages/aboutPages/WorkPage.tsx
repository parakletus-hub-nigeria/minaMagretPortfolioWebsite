import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
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

const fetchWorkPageData = async () => {
  const workPageResponse = await fetchWorkPageInput();
  if (!workPageResponse || workPageResponse.length === 0) {
    throw new Error('Work Page input data not found');
  }
  return workPageResponse;
};

const WorkPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';
  
  const { data = [], isLoading } = useQuery<WorkPageResponse[]>({
    queryKey: ['workPageData'],
    queryFn: fetchWorkPageData,
    staleTime: 0,
  });

  useEffect(() => {
    document.title = `Professional Impact & Work - ${displayName}`;
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
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              Community & Sectoral Impact
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight">
            Professional Work & Initiatives
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Advancing community empowerment, environmental restoration, WASH infrastructure, and sustainable development across Nigeria and globally.
          </p>
        </header>

        {/* Initiatives List */}
        <div className="space-y-6 text-left">
          {data.map((ele: WorkPageResponse) => {
            const imgUrl = ele.image?.asset?._id
              ? urlFor(ele.image.asset._id).width(600).quality(85).format('webp').url()
              : '';

            return (
              <div
                key={ele.image?.asset?._id || Math.random()}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 backdrop-blur-md shadow-xl transition-all"
              >
                {imgUrl && (
                  <div className="w-full md:w-56 h-40 md:h-auto flex-shrink-0 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-2 border border-slate-800">
                    <img
                      src={imgUrl}
                      className="w-full h-full object-contain"
                      alt={ele.description}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {ele.heading?.map((headingItem) => {
                      const linkDef = headingItem.markDefs?.[0];
                      const content = headingItem.children?.[0]?.text;

                      return linkDef && linkDef.href ? (
                        <a
                          key={headingItem._key}
                          href={linkDef.href}
                          className="font-bold font-serif text-xl md:text-2xl text-blue-400 hover:text-blue-300 underline block mb-2"
                          target={linkDef.openInNewTab ? '_blank' : '_self'}
                          rel={linkDef.openInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          {content}
                        </a>
                      ) : (
                        <h2 key={headingItem._key} className="font-bold font-serif text-xl md:text-2xl text-gray-100 mb-2">
                          {content}
                        </h2>
                      );
                    })}

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {ele.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
