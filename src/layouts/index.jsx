import React from "react";
import PropTypes from "prop-types";
import "@assets/css/icofont.min.css";
import "@assets/css/modal-video.min.css";
import Header from "./header";
import Footer from "./footer";
import BodyImage from "../data/images/others/body-bg.webp";
import Wrapper from "../Wrapper";

const Layout = ({ data, children }) => {
    return (
        <div
            className="wrapper"
            style={{
                backgroundImage: `url(${BodyImage})`,
            }}
        >
            {/* {children} */}
            <Wrapper>
                <Header data={data} />
                {children}
                <Footer data={data} />
            </Wrapper>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.shape({}),
};

export default Layout;
