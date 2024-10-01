import React, {useEffect} from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaEnvelope, FaSnapchat, FaRegEnvelope } from 'react-icons/fa';
import { useLoaderData, LoaderFunction } from 'react-router';
import { fetchSocialLinks } from '../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../hooks/AuthorContext';
export const contactPageLoader: LoaderFunction = async () => {
  try {
    const socialLinks = await fetchSocialLinks();

    if (!socialLinks || socialLinks.length === 0) {
      throw new Error('No social Links found');
    }

    return { socialLinks }; 
  } catch (error) {
    console.error('Error fetching links:', error);
    throw new Response('Error loading links', { status: 500 });
  }
};




export interface SocialLinks {
  _id: string;             // Unique identifier for the social links document
  facebook?: string;       // URL for the Facebook link
  linkedin?: string;       // URL for the LinkedIn link
  instagram?: string;      // URL for the Instagram link
  twitter?: string;        // URL for the Twitter link
  snapchat?: string;       // URL for the Snapchat link
  email?: string;          // Email address
}


const ContactPage:React.FC = () => {
  const { socialLinks } = useLoaderData() as { socialLinks: SocialLinks[] };

  
  const {authorName} = useAuthorContext();

  useEffect(() => {
   document.title = `Contact - ${authorName}`;
 }, [authorName]);



  return (
    <section>
      <div className='flex justify-start items-center h-screen md:w-[85%] mx-auto px-4 md:px-6 py-8'>
        <div className='flex flex-col gap-6'>
          <h4 className='text-white text-4xl font-semibold'>Contact</h4>
          <div >
            {socialLinks.map((link, index) => (
              <div key={index} className='flex gap-4 flex-wrap items-center'> {/* Use a div instead of span for block-level elements */}
                {link.facebook && (
                  <a href={link.facebook}>
                    <FaFacebookF size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.linkedin && (
                  <a href={link.linkedin}>
                    <FaLinkedinIn size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.instagram && (
                  <a href={link.instagram}>
                    <FaInstagram size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.twitter && (
                  <a href={link.twitter}>
                    <FaTwitter size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" />
                  </a>
                )}
                {link.snapchat && (
                  <a href={link.snapchat}>
                    <FaTwitter size={48} className="text-white p-2 bg-[#17a2b8] rounded-lg" /> {/* Make sure to replace with the correct Snapchat icon */}
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

export default ContactPage