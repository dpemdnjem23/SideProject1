import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "../../css/common/Footer.css";
const Footer = () => {
  const faPropIcon = faGithub as IconProp;

  return (
    <div className="Footer">
      <div className="Footer_section">
          <div className='Footer_text'>
          subgather

          </div>
        <a href="https://github.com/dpemdnjem23" className="GitIcon">
          <FontAwesomeIcon icon={faPropIcon} /> - dpemdnjem23
        </a>
      </div>
    </div>
  );
};

export default Footer;
