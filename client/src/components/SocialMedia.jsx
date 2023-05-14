import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function SocialMedia() {
  return (
    <div className="d-flex gap-3 ">
      <NavLink to="https://twitter.com/rezzak_2" target="_blank">
        <span>
          <AiOutlineTwitter className="text-white" size={24} />
        </span>
      </NavLink>
      <NavLink to="https://www.facebook.com/rezzakali22" target="_blank">
        <span>
          <AiFillFacebook className="text-white" size={24} />
        </span>
      </NavLink>
      <NavLink to="https://www.instagram.com/rezzak134" target="_blank">
        <span>
          <AiOutlineInstagram className="text-white" size={24} />
        </span>
      </NavLink>
      <NavLink to="https://www.linkedin.com/in/rezzak" target="_blank">
        <span>
          <AiFillLinkedin className="text-white" size={24} />
        </span>
      </NavLink>
    </div>
  );
}

export default SocialMedia;
