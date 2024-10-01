import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage:React.FC = () => {
   return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 animate-bounce">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
      <Link
        to="/home"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Go to Homepage
      </Link>
    </div>
  );



};

export default ErrorPage;