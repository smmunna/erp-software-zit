import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";

const Main = () => {
    return (
        <div>
            <Header />
            <ScrollRestoration />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
}

export default Main;
