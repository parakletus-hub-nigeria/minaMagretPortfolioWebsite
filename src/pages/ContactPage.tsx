import React, { useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaEnvelope, FaSnapchat } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { fetchSocialLinks } from '../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../hooks/AuthorContext';

export interface SocialLinks {
  _id: string;            
  facebook?: string;      
  linkedin?: string;       
  instagram?: string;      
  twitter?: string;       
  snapchat?: string;      
  email?: string;          
}


const fetchSocialLinksData = async (): Promise<SocialLinks[]> => {
  const socialLinks = await fetchSocialLinks();

  if (!socialLinks || socialLinks.length === 0) {
    throw new Error('No social links found');
  }

  return socialLinks;
};

const ContactPage: React.FC = () => {
  const { data: socialLinks = []} = useQuery<SocialLinks[]>({
    queryKey: ['socialLinks'],
    queryFn: fetchSocialLinksData
  });

  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Contact - ${authorName}`;
  }, [authorName]);

  return (
    <section>
      <div className='flex justify-start items-center h-screen md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <div className='flex flex-col gap-6'>
          <h4 className='text-white text-4xl font-semibold'>Contact</h4>
          <div>
            {socialLinks.map((link, index) => (
              <div key={index} className='flex gap-4 flex-wrap items-center'>
                {link.facebook && (
                  <a href={link.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebookF size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.linkedin && (
                  <a href={link.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.instagram && (
                  <a href={link.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.twitter && (
                  <a href={link.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.snapchat && (
                  <a href={link.snapchat} target="_blank" rel="noopener noreferrer">
                    <FaSnapchat size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.email && (
                  <a href={`mailto:${link.email}`}>
                    <FaEnvelope size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}  

export default ContactPage;
