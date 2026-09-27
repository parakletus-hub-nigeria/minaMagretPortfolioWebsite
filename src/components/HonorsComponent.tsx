import React from 'react';
import { useAuthorContext } from '../hooks/AuthorContext';
import { HiOutlineSparkles } from 'react-icons/hi';

interface HonorsComponentProps {
  title: string;
  listData?: string[];
  imgUrl?: string;
  categoryBadge?: string;
}

const HonorsComponent: React.FC<HonorsComponentProps> = ({
  title,
  listData = [],
  imgUrl,
  categoryBadge = 'Honors & Distinctions',
}) => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  return (
    <section className="py-8 md:py-12 font-sans">
      <div className="md:w-[92%] lg:w-[88%] mx-auto px-4 md:px-6">
        {/* Header */}
        <header className="mb-10 pb-6 border-b border-slate-800 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <HiOutlineSparkles className="text-sm" />
              {categoryBadge}
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            International fellowships, civic recognitions, and professional awards honoring {displayName}.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait */}
          {imgUrl && (
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                <img
                  src={imgUrl}
                  alt={`Portrait of ${displayName}`}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[620px]"
                />
              </div>
            </div>
          )}

          {/* Right Column: Structured Honor Cards */}
          <div className={imgUrl ? 'lg:col-span-7 space-y-4 text-left' : 'lg:col-span-12 space-y-4 text-left'}>
            <div className="space-y-3">
              {listData.map((listItem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-200 shadow-sm"
                >
                  <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/30 flex-shrink-0 mt-0.5">
                    <HiOutlineSparkles size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-200 text-sm md:text-base leading-relaxed font-normal">
                      {listItem}
                    </p>
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

export default HonorsComponent;