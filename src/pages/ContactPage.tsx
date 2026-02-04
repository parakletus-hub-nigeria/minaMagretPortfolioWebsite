import { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaSnapchat,
  FaResearchgate,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
// Importing specific icons for Academia and Google Scholar
import { SiAcademia, SiGooglescholar } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import { fetchSocialLinks } from "../../sanityApiClient/useSanityClient";
import { useAuthorContext } from "../hooks/AuthorContext";

export interface SocialLinks {
  _id: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  snapchat?: string;
  email?: string;
  // Added new fields for academic platforms
  researchgate?: string;
  academiaEdu?: string;
  googlescholar?: string;
  telegram?: string;
  whatsapp?: string;
}

const fetchSocialLinksData = async (): Promise<SocialLinks[]> => {
  const socialLinks = await fetchSocialLinks();

  if (!socialLinks || socialLinks.length === 0) {
    throw new Error("No social links found");
  }

  return socialLinks;
};

const ContactPage: React.FC = () => {
  const { data: socialLinks = [] } = useQuery<SocialLinks[]>({
    queryKey: ["socialLinks"],
    queryFn: fetchSocialLinksData,
  });

  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Contact - ${authorName}`;
  }, [authorName]);

  return (
    <section>
      <div className="flex justify-start items-center h-screen md:w-[85%] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-4xl font-semibold">Contact</h4>
          <div>
            {socialLinks.map((link, index) => (
              <div key={index} className="flex gap-4 flex-wrap items-center">
                {/* --- Existing Socials --- */}
                {link.facebook && (
                  <a
                    href={link.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}
                {link.linkedin && (
                  <a
                    href={link.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}
                {link.instagram && (
                  <a
                    href={link.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}
                {link.twitter && (
                  <a
                    href={link.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}
                {link.snapchat && (
                  <a
                    href={link.snapchat}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSnapchat
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}

                {/* --- New Academic Links --- */}

                {/* ResearchGate */}
                {link.researchgate && (
                  <a
                    href={link.researchgate}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="ResearchGate"
                  >
                    <FaResearchgate
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}

                {/* Google Scholar */}
                {link.googlescholar && (
                  <a
                    href={link.googlescholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Google Scholar"
                  >
                    <SiGooglescholar
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}

                {/* Academia.edu */}
                {link.academiaEdu && (
                  <a
                    href={link.academiaEdu}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Academia.edu"
                  >
                    <SiAcademia
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}

                {/* Email */}
                {link.email && (
                  <a href={`mailto:${link.email}`}>
                    <FaEnvelope
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}

                {/* --- Telegram --- */}
                {link.telegram && (
                  <a
                    href={link.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                  >
                    <FaTelegramPlane
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}

                {/* --- WhatsApp Channel --- */}
                {link.whatsapp && (
                  <a
                    href={link.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp Channel"
                  >
                    <FaWhatsapp
                      size={48}
                      className="text-white p-2 bg-[#17a2b8] rounded-lg hover:bg-[#138496] transition-colors"
                    />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
