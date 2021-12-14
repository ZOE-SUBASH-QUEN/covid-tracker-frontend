import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-content">
          <h4>Follow Us</h4>
          <div className="row">
            <div className="col-3 mx-auto">
              <a
                href="https://github.com/ZOE-SUBASH-QUEN"
                target="_blank"
              >
                <FaGithub color="#fff" size={25} />
              </a>
              <a
                href="https://dev.do2oxane2zo2h.amplifyapp.com/"
                className="live-link"
                target="_blank"
              >
                Try it out!
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
