import React, { Component, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import publicApi from "../api/publicApi";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("down", "spring", 0.5 * index, 0.95)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 250,
          }}
          className="bg-tertiary rounded-[20px]
         py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col
         "
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {" "}
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};
const About = () => {
  const [about, setAbout] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const getAbout = async () => {
    const { data } = await publicApi.get("/about/get");
    setAbout(data.data);
    console.log(data);
  };

  // const createAbout = async (e) => {
  //   e.preventDefault();
  //   const { data } = await publicApi.post("/about/create");
  //   console.log(data);
  //   if (data.message === "About created succesfully") {
  //     setAbout([...about, data.data]);
  //     setShow(false);
  //   }
  // };

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>OverView.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {about && about[0] && about[0].about ? about[0].about : null}
      </motion.p>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
