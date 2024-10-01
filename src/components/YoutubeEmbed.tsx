import React from 'react'

interface YoutubeEmbedProps{
    videoUrl:string;
}
const YoutubeEmbed:React.FC<YoutubeEmbedProps> = ({ videoUrl }) => {
  return (
    <div className="max-w-[400px] max-h-[300px] overflow-hidden">
      <iframe
        className="w-full h-full"
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;