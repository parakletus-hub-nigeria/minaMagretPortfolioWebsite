import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaResearchgate,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { SiAcademia, SiGooglescholar } from "react-icons/si";
import { 
  HiOutlineAcademicCap, 
  HiOutlineLocationMarker, 
  HiOutlineCheckCircle,
  HiOutlineSparkles
} from "react-icons/hi";
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
  researchgate?: string;
  academiaEdu?: string;
  googlescholar?: string;
  telegram?: string;
  whatsapp?: string;
}

const fetchSocialLinksData = async (): Promise<SocialLinks[]> => {
  const socialLinks = await fetchSocialLinks();
  return socialLinks || [];
};

const ContactPage: React.FC = () => {
  const { data: socialLinks = [] } = useQuery<SocialLinks[]>({
    queryKey: ["socialLinks"],
    queryFn: fetchSocialLinksData,
  });

  const { authorName } = useAuthorContext();
  const displayName = authorName || "Professor Mina Margaret Ogbanga";

  const [inquiryType, setInquiryType] = useState("Keynote Address & Guest Lecture");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    eventDate: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = `Engagements & Contact - ${displayName}`;
  }, [displayName]);

  const social = socialLinks[0] || {};
  const recipientEmail = social.email || "info@minaogbanga.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${inquiryType}] Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Organization / Institution: ${formData.organization}\n` +
      `Proposed Timeline / Date: ${formData.eventDate || "Flexible"}\n` +
      `Inquiry Category: ${inquiryType}\n\n` +
      `Message Details:\n${formData.message}`
    );

    // Open email client with pre-formatted structure
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <section className="py-8 md:py-14 font-sans">
      <div className="md:w-[92%] lg:w-[88%] mx-auto px-4 md:px-6 space-y-12">
        {/* Header */}
        <header className="text-left space-y-3 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold bg-blue-950/70 px-3 py-1 rounded-full border border-blue-800/40 flex items-center gap-1.5">
              <HiOutlineSparkles className="text-sm" />
              Speaking & Consultations
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold font-serif tracking-tight">
            Engagements, Advisory & Contact
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Invite {displayName} for keynote lectures, policy advisory, research collaborations, or international conference panels.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Structured Engagement Form */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-100 font-serif mb-1">
              Submit an Invitation or Inquiry
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Please specify the scope, proposed dates, and institutional context for the promptest response.
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-6 text-center space-y-3">
                <HiOutlineCheckCircle className="text-emerald-400 text-4xl mx-auto" />
                <h3 className="text-emerald-300 font-bold text-base">Inquiry Prepared</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your mail application has been opened with your structured message. If it didn't open automatically, send directly to{' '}
                  <a href={`mailto:${recipientEmail}`} className="text-blue-400 underline font-semibold">
                    {recipientEmail}
                  </a>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-lg mt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Engagement Category
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Keynote Address & Guest Lecture">🎓 Keynote Address & Guest Lecture</option>
                    <option value="Environmental & Climate Policy Advisory">🌍 Environmental & Climate Policy Advisory</option>
                    <option value="Academic & Research Collaboration">🤝 Academic & Research Collaboration</option>
                    <option value="Press & Media Interview">🎙️ Press & Media Interview</option>
                    <option value="General Academic Inquiry">✉️ General Academic Inquiry</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.doe@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Organization */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Organization / University
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. United Nations / Oxford"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Proposed Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Proposed Date / Timeline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Q4 2026 / November 15"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Engagement Details / Agenda *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the occasion, audience profile, topic objectives, or collaboration goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-gray-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Send Formal Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Academic Networks & Affiliations */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Academic Profiles Card */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-base font-bold text-gray-100 font-serif flex items-center gap-2">
                <HiOutlineAcademicCap className="text-blue-400 text-lg" />
                Scholarly Repositories & Profiles
              </h3>
              <p className="text-xs text-slate-400">
                Explore publication indices, citation metrics, and peer connections:
              </p>

              <div className="space-y-2">
                {social.googlescholar && (
                  <a
                    href={social.googlescholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-950 text-blue-400 group-hover:scale-110 transition-transform">
                        <SiGooglescholar size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-200">Google Scholar</p>
                        <p className="text-[11px] text-slate-400">Citations & Academic Index</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-400 font-medium">View &rarr;</span>
                  </a>
                )}

                {social.researchgate && (
                  <a
                    href={social.researchgate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 group-hover:scale-110 transition-transform">
                        <FaResearchgate size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-200">ResearchGate</p>
                        <p className="text-[11px] text-slate-400">Peer Publications & Discussion</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">View &rarr;</span>
                  </a>
                )}

                {social.academiaEdu && (
                  <a
                    href={social.academiaEdu}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900 text-gray-300 group-hover:scale-110 transition-transform">
                        <SiAcademia size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-200">Academia.edu</p>
                        <p className="text-[11px] text-slate-400">Scholarly Papers & Research</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-400 font-medium">View &rarr;</span>
                  </a>
                )}

                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-900/60 text-blue-300 group-hover:scale-110 transition-transform">
                        <FaLinkedinIn size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-200">LinkedIn Profile</p>
                        <p className="text-[11px] text-slate-400">Executive & Professional Network</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-400 font-medium">Connect &rarr;</span>
                  </a>
                )}
              </div>
            </div>

            {/* Direct Contacts & Institutional Office */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-base font-bold text-gray-100 font-serif flex items-center gap-2">
                <HiOutlineLocationMarker className="text-amber-400 text-lg" />
                Institutional Affiliations
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <p className="font-semibold text-gray-200">Rivers State University (RSU)</p>
                  <p className="text-slate-400 mt-0.5">Centre for Water and Sanitation Studies</p>
                  <p className="text-[11px] text-slate-500">Port Harcourt, Rivers State, Nigeria</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <p className="font-semibold text-gray-200">Indiana University–Purdue University Indianapolis (IUPUI)</p>
                  <p className="text-slate-400 mt-0.5">Global Associate, School of Social Work</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <p className="font-semibold text-gray-200">Direct Office Email</p>
                  <a href={`mailto:${recipientEmail}`} className="text-blue-400 font-semibold underline block mt-0.5">
                    {recipientEmail}
                  </a>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                {social.whatsapp && (
                  <a
                    href={social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 hover:bg-emerald-900 transition-colors"
                    title="WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 text-sky-400 border border-slate-800 hover:bg-slate-800 transition-colors"
                    title="Twitter / X"
                  >
                    <FaTwitter size={18} />
                  </a>
                )}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 text-blue-400 border border-slate-800 hover:bg-slate-800 transition-colors"
                    title="Facebook"
                  >
                    <FaFacebookF size={18} />
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 text-pink-400 border border-slate-800 hover:bg-slate-800 transition-colors"
                    title="Instagram"
                  >
                    <FaInstagram size={18} />
                  </a>
                )}
                {social.telegram && (
                  <a
                    href={social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800 hover:bg-slate-800 transition-colors"
                    title="Telegram"
                  >
                    <FaTelegramPlane size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
