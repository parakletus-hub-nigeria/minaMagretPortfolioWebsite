import React from 'react';
import { AuthorContextProvider } from './hooks/AuthorContext';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './assets/styles/App.css';



const queryClient = new QueryClient();




const App:React.FC = () => {


  return (
   <>
<QueryClientProvider client={queryClient}>
  <AuthorContextProvider>
   <AppRoutes/>
  </AuthorContextProvider>
 </QueryClientProvider>
  </>
   
  )
}



export default App;