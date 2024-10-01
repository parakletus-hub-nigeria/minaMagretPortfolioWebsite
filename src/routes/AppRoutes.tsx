import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProfilePage, { profilePageLoader } from '../pages/aboutPages/ProfilePage';
import WorkPage, { workPageLoader } from '../pages/aboutPages/WorkPage';
import EducationPage, { EducationPageLoader } from '../pages/aboutPages/EducationPage';
import FellowShipSchloarshipPage, { fellowshipsAndSchloarshipPageLoader } from '../pages/aboutPages/FellowShipSchloarshipPage';
import LawHumanRightsPage, { lawAndHumanRightsPageLoader } from '../pages/writingsPages/LawHumanRightsPage';
import WomenGirlsPage, { womenAndGirlsPageLoader } from '../pages/writingsPages/WomenGirlsPage';
import PeaceAndSecurityPage, { peaceAndSecurityPageLoader } from '../pages/writingsPages/PeaceAndSecurityPage';
import VideosPage, { videoPageLoader } from '../pages/GalleryPages/VideosPage';
import Layout from './Layout';
import AwardsPage, { awardsPageLoader } from '../pages/aboutPages/AwardsPage';
import FieldWorkPage, { fieldWorkPageLoader } from '../pages/GalleryPages/PicturesPages/FieldWorkPage';
import NewsPage, { newsPageLoader } from '../pages/GalleryPages/NewsPage';
import BlogPage from '../pages/BlogPage';
import ContactPage, { contactPageLoader } from '../pages/ContactPage';
import CampaignsPage from '../pages/GalleryPages/PicturesPages/CampaignsPage';
import EventsPage from '../pages/GalleryPages/PicturesPages/EventsPage';
import GraduationsPage from '../pages/GalleryPages/PicturesPages/GraduationsPage';
import PotraitsPage from '../pages/GalleryPages/PicturesPages/PotraitsPage';
import SpeakingEngagementPage from '../pages/GalleryPages/PicturesPages/SpeakingEngagementPage';
import { HomePageLoader } from '../pages/HomePage';
import { LayoutLoader } from './Layout';
import ErrorPage from '../pages/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
    index: true,
    loader:HomePageLoader
  },
  {
    path: "/",
    element: <Layout />,
    loader: LayoutLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace={true} />,
      },
      {
        path: "about",
        children: [
          {
            index: true, 
            element: <Navigate to="profile" replace={true} />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
            loader: profilePageLoader
          },
          {
            path: 'my-work',
            element: <WorkPage/>,
            loader: workPageLoader
          },
          {
            path: 'education',
            element: <EducationPage/>,
            loader: EducationPageLoader
          },
          {
             path: 'fellowships-and-scholarships',
             element: <FellowShipSchloarshipPage/>,
             loader: fellowshipsAndSchloarshipPageLoader
          },
          {
            path:'awards-and-recognitions',
            element: <AwardsPage/>,
            loader: awardsPageLoader
          }
        ]
      },
      {path: "writings",
        children: [
          {
            index: true, 
            element: <Navigate to="law-and-human-rights" replace={true} />,
          },
          {
            path: "law-and-human-rights",
            element: <LawHumanRightsPage/>,
            loader: lawAndHumanRightsPageLoader
          },
          {
            path: "women-and-girls",
            element: <WomenGirlsPage/>,
            loader: womenAndGirlsPageLoader
            
          },
          {
            path: "peace-and-security",
            element: <PeaceAndSecurityPage/>,
            loader: peaceAndSecurityPageLoader
          }
        ]
      },
      {
        path:"gallery",
        children:[
          {
           index: true,
           element: <Navigate to="videos" replace={true} />,
          },
          {
            path: "videos",
            element: <VideosPage/>,
            loader: videoPageLoader
          },
          {
            path: "news",
            element: <NewsPage/>,
            loader: newsPageLoader
          },
          {
            path: "pictures",
            children:[
              {
                path:"field-work",
                element: <FieldWorkPage/>,
                loader: fieldWorkPageLoader
              },
              {
                path: "campaigns",
                element: <CampaignsPage/>
              },
              {
                path: "graduations",
                element: <GraduationsPage/>
              },
              {
                path: "potraits",
                element: <PotraitsPage/>
              },
              {
                path: "events",
                element: <EventsPage/>
              },
              {
                path: "speaking-engagements",
                element: <SpeakingEngagementPage/>
              }
            ]
          }
        ]
      },
      {
        path: 'blog',
        element: <BlogPage/>
      },
      {
        path: 'contact',
        element: <ContactPage/>,
        loader: contactPageLoader
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />, 
  },
]);



const AppRoutes:React.FC = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRoutes;