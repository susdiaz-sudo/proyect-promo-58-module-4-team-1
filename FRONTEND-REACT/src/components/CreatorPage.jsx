import { useState, useEffect } from "react";
import {Link} from "react-router";

import Hero from "../components/layout/Hero";
import Preview from "../components/Preview";
import Form from "../components/Form";


function CreatorPage() {
  const inicialData = {
    name: "",
    slogan: "",
    repo: "",
    demo: "",
    technologies: "",
    desc: "",
    author: "",
    job: "",
    image: "",
    photo: "",
  };

  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("form.backup")) || inicialData
  );

  useEffect(() => {
    localStorage.setItem("form.backup", JSON.stringify(formData));
  }, [formData]);

  const changeData = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleInput = (ev) => {
    changeData(ev.target.id, ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleAuthorImage = (image) => {
    setFormData({
      ...formData,
      photo: image,
    });
  };

  const handleHeroImage = (image) => {
    setFormData({
      ...formData,
      image: image,
    });
  };

  return (
    <>
      <Hero>
        <Link className="button--link" to="/">Volver al inicio</Link>
      </Hero>
      <Preview formData={formData} />
      <Form
        formData={formData}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        handleAuthorImage={handleAuthorImage}
        handleHeroImage={handleHeroImage}
      />
    </>
  );
}

export default CreatorPage;
