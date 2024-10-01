import React from 'react'
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { useLoaderData, LoaderFunction } from 'react-router';
import { fetchVideoLinks } from '../../../sanityApiClient/useSanityClient';


interface YouTubeEmbedLinks {
  youtubeEmbedLinks: string[];
}

export const videoPageLoader: LoaderFunction = async () => {
  try {
    const videoLinks = await fetchVideoLinks();
    
    if (!videoLinks || videoLinks.length === 0) {
      throw new Error('No videos found');
    }

    return {videoLinks};
  } catch (error) {
    console.error('Error fetching YouTube links:', error);
    throw new Response('Error loading video page', { status: 500 });
  }
};

const VideosPage:React.FC = () => {

  const {videoLinks} = useLoaderData() as {videoLinks: YouTubeEmbedLinks[]}

   
    return (
      <section>
      <div className='md:w-[90%] mx-auto px-4 md:px-6 py-8'>
        <div className="flex flex-wrap gap-4">
          {videoLinks[0].youtubeEmbedLinks.map((url, index) => (
            <YoutubeEmbed key={index} videoUrl={url} />
          ))}
        </div>

      </div>

      </section>
      );
}

export default VideosPage;