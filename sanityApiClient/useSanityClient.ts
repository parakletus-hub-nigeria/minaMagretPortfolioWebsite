import {sanityClient} from './sanityClient';

export const fetchBackgroundImage = async () => {
  const query = '*[_type == "MainBackgroundImage"]{image{asset->{_id}}}';
  const data = await sanityClient.fetch(query);
  return data; 
};


export const fetchHomePageHeroImage = async () => {
  const query = '*[_type == "HomePageHeroImage"]{image{asset->{_id}}}';
  const data = await sanityClient.fetch(query);


  return data; 
};


export const fetchAuthorDetails = async () => {
  const query = `*[_type == "Author"]{author,logo { asset -> { _id } }}`;
  const data = await sanityClient.fetch(query);
    return data;
};


export const fetchProfilePageHeroImage = async () => {
  const query = '*[_type == "ProfilePageHeroImage"]{image{asset->{_id}}}';
  const data = await sanityClient.fetch(query);
  return data;
};

export const fetchProfilePageText = async () => {
  const query = '*[_type == "ProfilePageText"]{_id, content}';
  const data = await sanityClient.fetch(query);
  return data;
};



export const fetchWorkPageInput = async () => {
  const query = `*[_type == "WorkPageInput"]{heading, description, image { asset -> { _id, } }}`;
  const data = await sanityClient.fetch(query);
  return data;
};


export const fetchEducationPageInput = async () => {
  const query = `*[_type == "EducationPageInput"]{_id, placeOfStudy, details}`;
  const data = await sanityClient.fetch(query);
  return data;
};



export const fetchEducationPageHeroImage = async () => {
  const query = `*[_type == "EducationPageHeroImage"] {image { asset -> { _id,  }}}`;
  const data = await sanityClient.fetch(query);
  return data;
};



export const fetchAwardsPageHeroImage = async () => {
  const query = `*[_type == "AwardsAndRecognitionsPageHeroImage"] {image { asset -> { _id,  }}}`;
  const data = await sanityClient.fetch(query);
  return data;
};



export const fetchAwardsPageInput = async () => {
  const query = `*[_type == "AwardsAndRecognitionsPageInput"]{_id,details}`;
  const data = await sanityClient.fetch(query);
  return data;
};


export const fetchFellowshipsAndRecognitionsPageHeroImage = async () => {
  const query = `*[_type == "FellowshipsAndSchloarshipsPageHeroImage"] {image { asset -> { _id,  }}}`;
  const data = await sanityClient.fetch(query);
  return data;
};


export const  fetchFellowshipsAndRecognitionsPageInput = async () => {
  const query = `*[_type == "FellowshipsAndSchloarshipsPageInput"]{_id,  details}`;
  const data = await sanityClient.fetch(query);
  return data;
};



export const fetchManualsImageWritingsLinks = async () => {
  const query = `*[_type == "ManualsImageWritingsLinks"]{title, url , image { asset -> { _id} }}`;
  const data = await sanityClient.fetch(query);
  return data;
};


export const fetchManualsWritingsLinks = async () => {
  const query = `*[_type == "ManualsWritingsLinks"]{
  items[]{
    title,
    url
  }
}`;
  const data = await sanityClient.fetch(query);
   return data;
};


export const fetchPapersImageWritingsLinks = async () => {
  const query = `*[_type == "PapersImageWritingsLinks"]{
    title, 
    url, 
    image { 
      asset -> { _id} 
    }
  }`;

  const data = await sanityClient.fetch(query);
  return data;
};



export const fetchPapersWritingsLinks = async () => {
  const query = `*[_type == "PapersWritingsLinks"]{
  items[]{
    title,
    url
  }
}`;
  const data = await sanityClient.fetch(query);
  return data;
};




export const fetchTextBooksImageWritingsLinks = async () => {
  const query = `*[_type == "TextbooksImageWritingsLinks"]{title, url , image { asset -> { _id, url } }}`;
  const data = await sanityClient.fetch(query);
  return data;
};


export const fetchTextBooksWritingsLinks = async () => {
  const query = `*[_type == "TextBooksWritingsLinks"]{
  items[]{
    title,
    url
  }
}`;
  const data = await sanityClient.fetch(query);
 
   return data;
};



export const fetchVideoLinks = async () => {
  const query = ` *[_type == "youtubeEmbedLinks"] {
    youtubeEmbedLinks[]  
  }
`;
  const data = await sanityClient.fetch(query);
  return data;
};

export const fetchPortaitPicturesLinks = async () => {
  const query = `
    *[_type == "PortraitPictures"]{
      _id,
      imageTitle,
      description,
      uploadedAt,
      image {
        asset -> {
          _id,
         
        }
      }
    }
  `;

  const data = await sanityClient.fetch(query);
  return data;  
};




export const fetchSocialLinks = async () => {
  const query = '*[_type == "Socials"]'; 
  const data = await sanityClient.fetch(query);
  return data;
};


export const fetchNewsLinks = async () => {
  const query = '*[_type == "NewsLinks"]'; 
  const data =  await sanityClient.fetch(query);
  return data;
};