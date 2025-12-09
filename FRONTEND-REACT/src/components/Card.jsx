function Card({ formData }) {
  return (
    <article className="card">
      <h2 className="card__projectTitle">
        <span className="card__projectTitle--text">Personal project card</span>
      </h2>

      <div className="card__author">
        <div
          className="card__authorPhoto"
          style={{
            backgroundImage: formData.photo ? `url(${formData.photo})` : "",
          }}
        ></div>
        <p className="card__job">
          {formData.job === "" ? "Full Stack Developer" : formData.job}
        </p>
        <h3 className="card__name">
          {formData.author === "" ? "Emmelie Björklund" : formData.author}
        </h3>
      </div>

      <div className="card__project">
        <h3 className="card__name">
          {formData.name === "" ? "Elegant workspace" : formData.name}
        </h3>
        <p className="card__slogan">
          {formData.slogan === "" ? "Diseños exlusivos" : formData.slogan}
        </p>
        <h3 className="card__descriptionTitle">Product description</h3>
        <p className="card__description">
          {formData.desc === ""
            ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi corporis et molestiae libero iure repellendus possimus voluptates deleniti eligendi perspiciatis! Atque voluptates aut cum, quam accusantium nostrum accusamus fuga dicta."
            : formData.desc}
        </p>
        <div className="card__technicalInfo">
          <p className="card__technologies">
            {formData.technologies === ""
              ? "React JS - HTML - CSS"
              : formData.technologies}
          </p>

          <a
            className="icon icon__www"
            href={formData.demo}
            title="Haz click para ver el proyecto online"
          >
            {formData.demo}
          </a>
          <a
            className="icon icon__github"
            href={formData.repo}
            title="Haz click para ver el código del proyecto"
          >
            {formData.repo}
          </a>
        </div>
      </div>
    </article>
  );
}
export default Card;
