import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="flex flex-col gap-16 justify-center items-center w-5/6 mx-auto my-24">
      <h1 className="w-5/6 mx-auto text-center text-slate-950 text-xl underline">
        Projects
      </h1>
      <div
        className="carousel carousel-vertical rounded-box w-3/4 mx-auto hcar"
      >
        <div
          className="flex justify-center items-start carousel-item h-full w-full border bgstyle"
        >
          <div className="bg-gray-400 bg-opacity-90 w-full h-full flex justify-start gap-4 flex-col">
            <h1 className="text-center text-slate-950 text-xl font-semibold mt-8">
              Blog App
            </h1>
            <p id="desc" className="text-center text-slate-950 text-xl font-thin">
              Developed a comprehensive blog management platform with a React.js
              frontend and a Node.js and Express backend. The application
              includes features such as user signup and sign-in, allowing users
              to create, edit, categorize, and delete blogs. Additional
              functionalities include the ability to like and comment on posts,
              as well as unlike and delete comments, providing a dynamic and
              interactive user experience. The platform ensures seamless
              performance and efficient data handling across all operations.
            </p>
            <a
              href="https://blog-react-node-express-mysql-client.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center"
            >
              <button id="live" className="text-zinc-950 py-2 px-4 w-1/6 mx-auto rounded-lg border-2 border-gray-600 hover:bg-slate-800 hover:text-pink-50 hover:border-slate-800">
                View Live
              </button>
            </a>
          </div>
        </div>
        <div
          className="flex justify-center items-start carousel-item h-full w-full border"
          style={{
            backgroundImage: "url('/assets/zoom.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-gray-400 bg-opacity-90 w-full h-full flex justify-start gap-4 flex-col">
            <h1 className="text-center text-slate-950 text-xl font-semibold mt-8">
              Zoom App
            </h1>
            <p id="desc" className="text-center text-slate-950 text-xl font-thin">
              Developed a Zoom clone utilizing Next.js and Tailwind for the
              frontend, integrated with Stream.io for real-time communication
              and Clerk for user authentication. The application allows users to
              create new meetings, react with emojis, share screens, and record
              meetings. Additionally, users can schedule meetings, ensuring a
              fully-featured and user-friendly video conferencing experience.
              The platform leverages modern technologies to provide a seamless
              and interactive interface for all participants.
            </p>
            <a
              href="https://zoomclone-sepia.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center"
            >
              <button id="live" className="text-zinc-950 py-2 px-4 w-1/6 mx-auto rounded-lg border-2 border-gray-600 hover:bg-slate-800 hover:text-pink-50 hover:border-slate-800">
                View Live
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;