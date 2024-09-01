import { useState, useEffect, useRef, forwardRef } from "react";

const Projects = forwardRef((props, ref) => {
  const menu = [
    {
      name: "Feedback Form",
      heading: "Custom Feedback Form System",
      image: "/assets/cffs.gif",
      description:
        "The Feedback Form Builder is a versatile web application that allows users to create and manage custom feedback forms. Built with React, Redux, and Firebase, it features an intuitive drag-and-drop interface, real-time data handling, and advanced conditional logic, enabling forms to be displayed based on specific URL, date, or time conditions. The application also includes an admin dashboard for managing forms and tracking submissions, showcasing my ability to develop dynamic, user-focused applications.",
      tech: "React, MUI, Redux, Firebase",
      live: "https://cffs.vercel.app/",
    },
    {
      name: "Blog App",
      image: "/assets/blog.gif",
      heading: "Full Stack Blog App",
      description:
        "Developed a comprehensive blog management platform with a React.js frontend and a Node.js and Express backend. The application includes features such as user signup and sign-in, allowing users to create, edit, and delete blogs. Additional functionalities include the ability to comment on posts, as well as delete comments, providing a dynamic and interactive user experience. The platform ensures seamless performance and efficient data handling across all operations.",
      tech: "React, Node, Express, MongoDB, CSS",
      live: "https://clientzuai.onrender.com/"
    },
    {
      name: "Zoom App",
      heading: "Zoom Clone",
      image: "/assets/zoom.gif",
      description:
        "Developed a Zoom clone utilizing Next.js and Tailwind for the frontend, integrated with Stream.io for real-time communication and Clerk for user authentication. The application allows users to create new meetings, react with emojis, share screens, and record meetings. Additionally, users can schedule meetings, ensuring a fully-featured and user-friendly video conferencing experience. The platform leverages modern technologies to provide a seamless and interactive interface for all participants.",
      tech: "Next.js, Tailwind, Clerk, Stream.io, MongoDB",
      live: "https://zoomclone-sepia.vercel.app/",
    },
    {
      name: "Music App",
      heading: "Simple Static Music App",
      image: "/assets/msp.gif",
      description:
        "This music player app is a feature-rich application designed for an engaging user experience. It allows users to browse through a list of songs with a sleek, responsive interface. Users can drag and drop songs to rearrange the playlist, click on any song to play it, and control playback through a customizable player card that includes options for play, pause, next, previous, shuffle, and repeat. The player card also offers a progress bar and detailed information about the currently playing song. The app is optimized for both desktop and mobile devices, ensuring seamless music playback across different screen sizes.",
      tech: "React, CSS",
      live: "https://music-player-sepia-xi.vercel.app/",
    },
  ];

  const [digital, setDigital] = useState(0);
  const [heading, setHeading] = useState(menu[0].heading);
  const [content, setContent] = useState(menu[0].description);
  const [tech, setTech] = useState(menu[0].tech);
  const [liveLink, setLiveLink] = useState(menu[0].live); // State for live link
  const [stateActive, setActive] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  const contentRef = useRef(null);
  const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMinHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const stateChanger = (id) => {
    setDigital(id);
    setHeading(menu[id].heading);
    setContent(menu[id].description);
    setTech(menu[id].tech);
    setLiveLink(menu[id].live); // Update live link when project changes
    setActive({
      0: false,
      1: false,
      2: false,
      3: false,
      [id]: true,
    });
  };

  function list(item, id) {
    return (
      <li
        className={`inline-block text-slate-950 mb-3 cursor-pointer ${
          stateActive[id] ? "font-bold" : ""
        }`}
        key={id}
        onClick={() => {
          stateChanger(id);
        }}
      >
        <div className="p-2">{item}</div>
      </li>
    );
  }

  const ele = menu.map((i, id) => {
    return list(i.name, id);
  });

  return (
    <div ref={ref} className="w-5/6 mx-auto flex justify-center pb-16 flex-col items-center py-24">
      <h2 className="text-3xl font-medium text-center mb-8 text-slate-950">
        My Projects
      </h2>
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row mt-8 items-center">
        <div className="w-full lg:w-1/5 flex justify-center lg:justify-start">
          <ul className="list-none flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 lg:border-r-2 lg:border-gray-300">
            {ele}
          </ul>
        </div>

        <div
          className="w-full lg:w-4/5 mt-8 lg:mt-0 flex flex-col lg:flex-row items-center transition-all duration-500"
          style={{ minHeight: `${minHeight}px` }}
        >
          <div className="w-full lg:w-2/3 lg:pr-8" ref={contentRef}>
            <h2 className="text-2xl font-bold mb-4 text-center lg:text-left text-slate-950">
              {heading}
            </h2>
            <p className="text-base text-slate-950 text-center lg:text-left mb-4">
              {content}
            </p>
            <p className="text-sm font-semibold text-slate-950 text-center lg:text-left mb-4">
              Technologies: {tech}
            </p>
            <p className="text-sm font-semibold text-slate-950 text-center lg:text-left">
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 underline"
              >
                View Live
              </a>
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
            <img
              src={menu[digital].image}
              alt={heading}
              className="object-contain w-full h-full transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Projects;