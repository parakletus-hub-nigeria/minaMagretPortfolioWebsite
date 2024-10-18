import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthorDetails } from '../../sanityApiClient/useSanityClient'; 
import { urlFor } from '../../sanityApiClient/sanityClient';

interface Author {
  author: string;
  logo: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

interface AuthorContext {
  authorName: string;
  authorLogoUrl: string;
}

const AuthorContext = createContext<AuthorContext | undefined>(undefined);

export const AuthorContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, error, isLoading } = useQuery<Author[], Error>({
    queryKey: ['authorData'],
    queryFn: fetchAuthorDetails,
    staleTime: 0, 
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  
  const [authorName, setAuthorName] = useState<string>('');
  const [authorLogoUrl, setAuthorLogoUrl] = useState<string>('');

  const persistAuthorData = (name: string, logoUrl: string) => {
    localStorage.setItem('authorName', name);
    localStorage.setItem('authorLogoUrl', logoUrl);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('authorName');
    const storedLogoUrl = localStorage.getItem('authorLogoUrl');

    if (data && data.length > 0) {
      const fetchedAuthor = data[0];
      const name = fetchedAuthor.author;
      const logoUrl = urlFor(fetchedAuthor.logo.asset._id).width(120).quality(80).format('webp').url();

      // Check and compare Compare with stored values
      if (name !== storedName || logoUrl !== storedLogoUrl) {
        setAuthorName(name);
        setAuthorLogoUrl(logoUrl);
        persistAuthorData(name, logoUrl); // Update local storage
      } else {
        // If the fetched data matches, use the one in local storage
        setAuthorName(storedName || '');
        setAuthorLogoUrl(storedLogoUrl || '');
      }
    }
  }, [data]);

  useEffect(() => {
    const changeFavicon = (newFaviconUrl: string) => {
      const faviconElement = document.getElementById('favicon') as HTMLLinkElement;
      if (faviconElement) {
        faviconElement.href = newFaviconUrl;
      }
    };

    if (authorLogoUrl) {
      changeFavicon(authorLogoUrl);
    }
  }, [authorLogoUrl]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <div>Error fetching author data</div>;
  }

  return (
    <AuthorContext.Provider value={{ authorName, authorLogoUrl }}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthorContext = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error('useAuthorContext must be used within an AuthorContextProvider');
  }
  return context;
};
