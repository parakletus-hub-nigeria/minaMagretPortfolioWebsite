import React from 'react';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { useQuery } from '@tanstack/react-query'; 
import { fetchVideoLinks } from '../../../sanityApiClient/useSanityClient';

interface YouTubeEmbedLinks {
  youtubeEmbedLinks: string[];
}

const fetchVideos = async (): Promise<YouTubeEmbedLinks[]> => {
  const videoLinks = await fetchVideoLinks();
  
  if (!videoLinks || videoLinks.length === 0) {
    throw new Error('No videos found');
  }

  return videoLinks;
};

const VideosPage: React.FC = () => {
  // Use useQuery to fetch video links
  const { data: videoLinks = []} = useQuery<YouTubeEmbedLinks[]>({
    queryKey: ['videoLinks'], 
    queryFn: fetchVideos 
  });

  

  return (
    <section>
      <div className='md:w-[90%]  px-4 md:px-6 py-8'>
        <div className="flex flex-wrap gap-4">
          {videoLinks[0]?.youtubeEmbedLinks.map((url, index) => (
            <YoutubeEmbed key={index} videoUrl={url} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideosPage;
