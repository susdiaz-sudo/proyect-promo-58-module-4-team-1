import Hero from "./layout/Hero";
import Card from "./Card";
import { Link } from "react-router";

function LandingPage() {
  const cardsData = [{}, {}, {}, {}];

  return (
    <>
      <Hero>
        <Link className="button--link" to="/creator">
          Ver proyectos
        </Link>
      </Hero>
      <div className="cards-container">
        {cardsData.map((cardData, index) => (
          <Card key={index} formData={cardData} />
        ))}
      </div>
    </>
  );
}

export default LandingPage;
