import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import{
  BrowserRouter as Router,
  Routes,
  Route

}from "react-router-dom";




const App=()=> {
  
  const pageSize=6;
  const apiKey=process.env.REACT_APP_NEWS_API;   //api key is hidden in .env.local

  
  const [progress, setProgress] = useState(0) 

  
 

//function to det the value of progress
  const loading=(prog)=>{
    
    setProgress(prog)
  }

    return (
      <>
      <Router>

      <NavBar/>
      
      <LoadingBar
      height={3}
        color='#f11946'
        progress={progress}
       
      />

      
   <Routes>
<Route exact path="/" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="sports"   country="in"  category="general"/>}>

</Route>
<Route exact path="/business" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="business"   country="in"  category="business"/>}>

</Route>
<Route exact path="/entertainment" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="entertainment"   country="in"  category="entertainment"/>}>

</Route>
<Route exact path="/general" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="general"   country="in"  category="general"/>}>  

</Route>
<Route exact path="/health" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="health"   country="in"  category="health"/>}> 

</Route>
<Route exact path="/science" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="science"   country="in"  category="science"/>}>

</Route>
<Route exact path="/sports" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="sports"   country="in"  category="sports"/>}>

</Route>
<Route exact path="/technology" element={<News loading={loading}  pageSize={pageSize}  apiKey={apiKey}  key="technology"   country="in"  category="technology"/>}>

</Route>

</Routes>
    </Router>
    </>
    )
  
}

export default App;
