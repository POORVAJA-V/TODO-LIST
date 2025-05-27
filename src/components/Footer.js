import React from 'react'
import {
  FaGithub,
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

const socialLinks = [
  {
    icon: <FaGithub />,
    url: "https://github.com/POORVAJA-V/TODO-LIST.git",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
  {
    icon: <FaYoutube />,
    url: "https://www.youtube.com/",
    label: "YouTube",
  },
  {
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    icon: <FiInstagram />,
    url: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    icon: <FaTwitter />,
    url: "https://twitter.com/",
    label: "Twitter",
  }
];

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-5 mb-3">
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="text-gray-700 text-2xl hover:text-indigo-500 transition-colors duration-200 rounded-full p-3 shadow-lg animate-bounce hover:animate-none"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-sm opacity-80">
          &copy; {new Date().getFullYear()} TODO LIST
        </p>
      </div>
    </footer>
  );
}

export default Footer