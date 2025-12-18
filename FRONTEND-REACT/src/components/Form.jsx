import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetAvatar from "../components/GetAvatar";

function Form({
  formData,
  handleInput,
  handleAuthorImage,
  handleHeroImage,
  handleSubmit,
}) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(t);
  }, [alert]);

  const handleClick = (ev) => {
    ev.preventDefault();
    fetch("http://localhost:3000/api/projectCards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          setAlert({ type: "ok", msg: "Proyecto guardado" });
          setTimeout(() => navigate("/"), 3000);
        } else {
          setAlert({ type: "error", msg: "No se pudo guardar" });
        }
      })
      .catch(() => setAlert({ type: "error", msg: "Error de red o servidor" }));
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
          name="description"
          id="description"
          placeholder="Descripción"
          rows="5"
          onInput={handleInput}
          value={formData.description}
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
        <button onClick={handleClick} className="button--large">
          Guardar proyecto
        </button>
        {alert && (
          <>
            <div className="overlay"></div>
            <div
              className={
                alert.type === "ok" ? "alert alert--ok" : "alert alert--error"
              }
            >
              {alert.msg}
            </div>
          </>
        )}
      </fieldset>
    </form>
  );
}
export default Form;
