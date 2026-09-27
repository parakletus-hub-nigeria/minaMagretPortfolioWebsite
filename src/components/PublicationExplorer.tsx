import React, { useState, useMemo } from 'react';
import { FiSearch, FiExternalLink, FiCopy, FiCheck, FiBookOpen, FiFilter } from 'react-icons/fi';
import { urlFor } from '../../sanityApiClient/sanityClient';

export interface PublicationItem {
  title: string;
  url: string;
  year?: string | number;
  authors?: string;
  journal?: string;
  doi?: string;
  category?: string;
}

export interface PublicationImageItem {
  title: string;
  url: string;
  image: {
    asset: {
      _id: string;
    };
  };
}

interface PublicationExplorerProps {
  papers: PublicationItem[];
  imagePapers?: PublicationImageItem[];
  authorName?: string;
}

type CitationFormat = 'APA' | 'Harvard' | 'BibTeX';

export const PublicationExplorer: React.FC<PublicationExplorerProps> = ({
  papers = [],
  imagePapers = [],
  authorName = 'Prof. Mina Margaret Ogbanga',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCiteIndex, setActiveCiteIndex] = useState<number | null>(null);
  const [citationFormat, setCitationFormat] = useState<CitationFormat>('APA');
  const [copied, setCopied] = useState(false);

  // Auto-detect categories or topics from titles if category is not explicitly set
  const categorizePaper = (paper: PublicationItem): string => {
    if (paper.category) return paper.category;
    const lower = paper.title.toLowerCase();
    if (lower.includes('environment') || lower.includes('climate') || lower.includes('sustainab') || lower.includes('water') || lower.includes('wash')) {
      return 'Environmental Sustainability';
    }
    if (lower.includes('extractive') || lower.includes('oil') || lower.includes('gas') || lower.includes('mining') || lower.includes('delta')) {
      return 'Extractives & Energy';
    }
    if (lower.includes('social work') || lower.includes('welfare') || lower.includes('community') || lower.includes('health') || lower.includes('youth')) {
      return 'Social Work & Community';
    }
    if (lower.includes('policy') || lower.includes('govern') || lower.includes('law') || lower.includes('rights') || lower.includes('conflict')) {
      return 'Policy, Law & Governance';
    }
    return 'Research & Scholarship';
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    papers.forEach((p) => set.add(categorizePaper(p)));
    return ['All', ...Array.from(set)];
  }, [papers]);

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (paper.authors && paper.authors.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (paper.journal && paper.journal.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || categorizePaper(paper) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [papers, searchQuery, selectedCategory]);

  const generateCitation = (paper: PublicationItem, format: CitationFormat): string => {
    const author = paper.authors || 'Ogbanga, M. M.';
    const year = paper.year || 'n.d.';
    const title = paper.title.trim().replace(/\.$/, '');
    const url = paper.url;
    const journal = paper.journal || 'Academic Research Archive';

    switch (format) {
      case 'APA':
        return `${author} (${year}). ${title}. ${journal}. ${url}`;
      case 'Harvard':
        return `${author} ${year}, '${title}', ${journal}, viewed ${new Date().toLocaleDateString('en-GB')}, <${url}>.`;
      case 'BibTeX': {
        const citeKey = `ogbanga_${title.split(' ')[0]?.toLowerCase() || 'paper'}_${year}`;
        return `@article{${citeKey},\n  author = {${author}},\n  title = {${title}},\n  journal = {${journal}},\n  year = {${year}},\n  url = {${url}}\n}`;
      }
      default:
        return `${author} (${year}). ${title}.`;
    }
  };

  const handleCopyCitation = (paper: PublicationItem) => {
    const text = generateCitation(paper, citationFormat);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Featured Cover Publications (if any) */}
      {imagePapers && imagePapers.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 text-emerald-400 text-sm font-semibold tracking-wider uppercase">
            <FiBookOpen className="text-lg" />
            <span>Featured Highlights & Volumes</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {imagePapers.map((item, idx) => {
              const imgUrl = item.image?.asset?._id
                ? urlFor(item.image.asset._id).width(400).quality(85).format('webp').url()
                : '';
              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col rounded-xl overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-blue-500/60 transition-all duration-300 shadow-md hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-slate-950">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <FiBookOpen size={32} />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-gray-200 font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </p>
                    <span className="mt-2 text-[10px] text-blue-400 font-semibold flex items-center gap-1">
                      Read Online <FiExternalLink size={10} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and Filters Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search publications by title, keyword, or journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-gray-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Result Count Badge */}
          <div className="text-xs text-slate-400 font-medium px-3 py-2 bg-slate-950/60 rounded-lg border border-slate-800 self-start md:self-auto whitespace-nowrap">
            Showing <span className="text-white font-semibold">{filteredPapers.length}</span> of {papers.length} publications
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            <FiFilter className="text-slate-400 text-sm flex-shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-base">No research publications found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-xs font-semibold text-blue-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredPapers.map((paper, index) => {
            const categoryBadge = categorizePaper(paper);
            const isModalOpen = activeCiteIndex === index;

            return (
              <article
                key={index}
                className="group relative p-5 md:p-6 bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Publication Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-blue-950/70 text-blue-400 border border-blue-800/40">
                        {categoryBadge}
                      </span>
                      {paper.year && (
                        <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                          {paper.year}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-gray-100 group-hover:text-white transition-colors leading-snug">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-start gap-1.5"
                      >
                        <span>{paper.title}</span>
                      </a>
                    </h3>

                    <p className="text-xs text-slate-400">
                      Author: <span className="text-slate-300 font-medium">{paper.authors || authorName}</span>
                      {paper.journal && <span> • {paper.journal}</span>}
                    </p>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0 pt-2 md:pt-0">
                    {/* Cite Button */}
                    <button
                      onClick={() => setActiveCiteIndex(isModalOpen ? null : index)}
                      className={`text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 border ${
                        isModalOpen
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600'
                      }`}
                      title="Cite this paper"
                    >
                      <span>Cite</span>
                    </button>

                    {/* View / Download Button */}
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-sm transition-all duration-200"
                    >
                      <span>View Paper</span>
                      <FiExternalLink className="text-xs" />
                    </a>
                  </div>
                </div>

                {/* Inline Citation Drawer */}
                {isModalOpen && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 bg-slate-950/70 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {(['APA', 'Harvard', 'BibTeX'] as CitationFormat[]).map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => setCitationFormat(fmt)}
                            className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                              citationFormat === fmt
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleCopyCitation(paper)}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800/50 transition-colors"
                      >
                        {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                        <span>{copied ? 'Copied to Clipboard!' : 'Copy Citation'}</span>
                      </button>
                    </div>

                    <pre className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg overflow-x-auto font-mono whitespace-pre-wrap leading-relaxed border border-slate-800">
                      {generateCitation(paper, citationFormat)}
                    </pre>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PublicationExplorer;
