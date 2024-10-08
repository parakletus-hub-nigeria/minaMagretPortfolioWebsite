import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsLinks } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import WholePageSpinner from '../../components/WholePageSpinner';

export interface NewsLink {
    _id: string;
    urls: string[];  
}

const NewsPage: React.FC = () => {
    const { authorName } = useAuthorContext();

    const { data: newsLinks = [], error, isLoading } = useQuery<NewsLink[], Error>({
        queryKey: ['newsLinks'],
        queryFn: fetchNewsLinks,
        staleTime: 0
    });

    useEffect(() => {
        document.title = `News - ${authorName}`;
    }, [authorName]);

    if (isLoading) {
        return <WholePageSpinner />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">Error loading news links: {error.message}</p>
            </div>
        );
    }

    return (
        <section>
            <div className='md:w-[95%] mx-auto px-4 md:px-6 py-8 flex flex-col gap-20'>
                <span>
                    <h2 className="text-white text-4xl font-bold text-center mb-4">News</h2>
                </span>

                <div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newsLinks[0]?.urls.map((link) => (
                            <li key={link} className='list-disc md:pl-2 marker:text-[#E19618] marker:text-lg'>
                                <a
                                    href={link}
                                    className="block text-blue-500 text-lg font-semibold hover:underline hover:text-orange-500 break-words"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default NewsPage;

