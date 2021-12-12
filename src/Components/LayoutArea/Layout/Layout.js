import "./Layout.css";
import LiveService from "../../../LiveService";
import { useEffect } from "react";
import Header from "../Header/Header";
import { BrowserRouter } from "react-router-dom";
import Routing from '../Routing/Routing'
import Overview from "../Overview/Overview";


function Layout() {


   

    return (
        <BrowserRouter>
        
                <div className="Layout">
                    <header>
                        <Header/>
                     
                    </header>
                    {/* <nav>
                        <Menu />
                    </nav> */}
                    <main>
                        
                        <Routing />

                    </main>
                </div>
            </BrowserRouter>
    );
}

export default Layout;
