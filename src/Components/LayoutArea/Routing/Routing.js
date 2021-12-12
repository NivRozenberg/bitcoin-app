import "./Routing.css";
// import {Redirect, Route, Navigate } from "react-router";
import Overview from "../Overview/Overview";

import Test from "../Overview/Overview"
import Layout from "../Layout/Layout";
import {BrowserRouter,Routes, Route, Link, Navigate } from 'react-router-dom'
import History from "../History/History";
import {  } from "react-router-dom";
import Page404 from "../Page404";

function Routing() {
    return (
      
        <div className="Routing">  

          <Routes>
          {/* <Route path="/overview" component={Test} exact/> */}
             {/* <Route path="/" component={Layout} exact/> */}

             <Route path="/overview" element={<Overview />}/>

             <Route path="/history" element={<History />}/>


             <Route path="/" element={<Navigate to ="/overview" />}/>

             <Route path="*" element={<Page404 />} />

            
         </Routes>
        </div>






/* /* <BrowserRouter>
<Switch>
  <Route path="/" >
    <Manatee />
  </Route>
</Switch> */




    );
}

export default Routing;
