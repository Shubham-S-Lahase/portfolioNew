import CustomSwiper from "./swiper";
import "./Skills.css";

const images = [
    { id: 1, url: "/assets/js.svg" },
    { id: 2, url: "/assets/html5.svg" },
    { id: 3, url: "/assets/css.svg" },
    { id: 4, url: "/assets/react.svg" },
    { id: 5, url: "/assets/vue.svg" },
    { id: 6, url: "/assets/next.svg" },
    { id: 7, url: "/assets/node.svg" },
    { id: 8, url: "/assets/express.svg" },
    { id: 9, url: "/assets/mysql.svg" },
    { id: 9, url: "/assets/mongo.svg" },
    { id: 9, url: "/assets/jira.svg" },
  ];
  
  
  const Skills = ({background}) => {
  
      const imageUrls = images.map(image => image.url);
    return (
      <div className="maincont" style={{background: background}}>
        <CustomSwiper images={imageUrls} />
      </div>
    );
  };
  
  export default Skills;