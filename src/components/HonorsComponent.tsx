import React from 'react';
import { useAuthorContext } from '../hooks/AuthorContext';

interface HonorsComponentProps{
   title: string;
   listData: string[];
   imgUrl: string
}

const HonorsComponent:React.FC<HonorsComponentProps> = ({title, listData, imgUrl}) => {
    const {authorName} = useAuthorContext();
    return (
        <section>
            <div className='flex flex-col-reverse  gap-6 md:flex-row px-4 md:px-6 py-8'>
                <div>
                <span className='flex flex-col gap-2 pb-6 capitalize text-left font-bold text-white  border-b border-white'>
            <h2 className='text-2xl'>about me</h2>
            <h1 className='text-4xl'>{title}</h1>
            
          </span>
          <ul className='pl-6 md:pl-8 pt-6'>
            {
                listData.map((listItem,i)=>
                    <li key={i} className='text-white list-disc pl-2 leading-9'>{listItem}</li>
                )
            }
    
          </ul>
                </div>
    
                <picture>
                    <img src={imgUrl} className='md:max-w-[371px] md:max-h-[560px] ' 
                        alt={`Portrait of ${authorName}`}
                    />
                </picture>
            </div>
        </section>
      )
}

export default HonorsComponent;