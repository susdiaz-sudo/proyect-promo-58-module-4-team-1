import { useState } from "react";
import GetAvatar from "../components/GetAvatar";



function Form({
  formData,
  handleInput,
  handleAuthorImage,
  handleHeroImage,
  handleSubmit,
}) 

{
  const [savedUrl,setSavedUrl] = useState(null);
  const handleClick = () => {
  fetch ("https://dev.adalab.es/api/projectCard",
    {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(formData),
    })
    .then (res => res.json())
    .then (responseData => {
      if (responseData.success) {
         setSavedUrl( responseData.cardURL);

      } 
      
    })

};
  return (
    <form onSubmit={handleSubmit} className="addForm">
      <h2 className="title">Información</h2>
      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
        <input
          className="addForm__input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombre del proyecto"
          onInput={handleInput}
          value={formData.name}
        />
        <input
          className="addForm__input"
          type="text"
          name="slogan"
          id="slogan"
          placeholder="Slogan"
          onInput={handleInput}
          value={formData.slogan}
        />
        <div className="addForm__2col">
          <input
            className="addForm__input"
            type="url"
            name="repo"
            id="repo"
            placeholder="Repositorio"
            onInput={handleInput}
            value={formData.repo}
          />
          <input
            className="addForm__input"
            type="url"
            name="demo"
            id="demo"
            placeholder="Demo"
            onInput={handleInput}
            value={formData.demo}
          />
        </div>
        <input
          className="addForm__input"
          type="text"
          name="technologies"
          id="technologies"
          placeholder="Tecnologías"
          onInput={handleInput}
          value={formData.technologies}
        />
        <textarea
          className="addForm__input"
          type="text"
          name="desc"
          id="desc"
          placeholder="Descripción"
          rows="5"
          onInput={handleInput}
          value={formData.desc}
        ></textarea>
      </fieldset>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre la autora</legend>
        <input
          className="addForm__input"
          type="text"
          name="author"
          id="author"
          placeholder="Nombre"
          onInput={handleInput}
          value={formData.author}
        />
        <input
          className="addForm__input"
          type="text"
          name="job"
          id="job"
          placeholder="Trabajo"
          onInput={handleInput}
          value={formData.job}
        />
      </fieldset>

      <fieldset className="addForm__group--upload">
        <label className="button">
          <GetAvatar
            avatar={FormData.image}
            updateAvatar={handleHeroImage}
            text="Subir foto del proyecto"
          />
        </label>
        <label className="button">
          <GetAvatar
            avatar={FormData.photo}
            updateAvatar={handleAuthorImage}
            text="Subir foto de la autora"
          />
        </label>
        <button onClick={handleClick} className="button--large">Guardar proyecto</button>
        {savedUrl && (
        <small>Proyecto guardado:  <a href={savedUrl} target="_blank" rel="noopener noreferrer">{savedUrl}</a> </small>)}
      </fieldset>
    </form>
  );
}
export default Form;

