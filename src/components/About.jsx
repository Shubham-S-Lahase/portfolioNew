import React, { forwardRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Skills from "./Skills";

const timelineItems = [
  {
    year: "May,2019",
    title: "Bachelor of Computer Applications",
    description:
      "Graduated with an 83.86% from JTES's Arts, Commerce, and Science College, Jamnern Maharashtra",
  },
  {
    year: "July,2021",
    title: "Master of Business Administration",
    description:
      "Completed MBA from North Maharashtra University, Jalgaon, Maharashtra, with a score of 78.56%.",
  },
  {
    year: "November,2022",
    title: "6 Months Full Stack (MERN) Program",
    description:
      "Completed an intensive 6-month Full Stack (MERN) bootcamp, where I gained in-depth knowledge and practical skills in both frontend and backend development using the MERN stack. The program covered key technologies including MongoDB, Express.js, React.js, and Node.js. Throughout the course, I participated in numerous hands-on projects, which helped me master end-to-end development processes. These projects ranged from building dynamic, responsive user interfaces to implementing robust server-side logic and efficient database management. The bootcamp provided me with a solid foundation and expertise in creating full-fledged web applications using the MERN stack.",
  },
  {
    year: "August, 2023 - June 2024",
    title: "Full Stack Developer",
    description:
      "Played a key role in various projects with a primary focus on frontend development.Utilized technologies such as React.js, Next.js, Framer Motion, and Tailwind CSS to create dynamic, responsive user interfaces.Enhanced user experiences and ensured cross-device compatibility through effective use of modern web technologies.Contributed to a diverse range of projects, including marketing websites, low-code portals, and comprehensive blog management platforms.",
  }
];

const About = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col gap-16 border-b-2 border-gray-300 py-24"
    >
      <h1 className="w-5/6 mx-auto text-3xl font-medium text-center mb-8 text-slate-950">
        About Me
      </h1>
      <div>
        <p className="text-slate-950 text-xl mb-4 text-center mx-auto w-5/6">
          I am an experienced Frontend Engineer with a strong focus on creating
          dynamic, responsive user interfaces using React.js and other modern
          technologies. With a year of industrial experience, I have honed my
          skills in JavaScript and front-end frameworks, delivering high-quality
          and performance-optimized web applications. I am a quick learner and
          an effective communicator, thriving in team environments and
          consistently meeting project goals. I am eager to contribute to
          innovative projects and advance my expertise in frontend development
          within a dynamic and challenging environment.
        </p>
      </div>
      <div>
        <Skills />
      </div>
      <div>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mx-auto w-5/6">
          {timelineItems.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
});

const TimelineItem = ({ item, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <div className="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        className={`timeline-${
          index % 2 === 0 ? "start" : "end"
        } mb-10 md:text-${index % 2 === 0 ? "end" : "start"}`}
      >
        <time className="text-slate-950 text-xl font-mono italic opacity-100">
          {item.year}
        </time>
        <div className="text-lg text-slate-950 font-black opacity-100">
          {item.title}
        </div>
        <p className="text-slate-950 opacity-100">{item.description}</p>
      </div>
      <hr />
    </motion.li>
  );
};

export default About;
