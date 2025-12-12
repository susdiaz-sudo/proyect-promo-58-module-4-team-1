import Hero from "./layout/Hero";
import Card from "./Card";
import { Link } from "react-router";
import CardList from "./CardList";

function LandingPage() {
  const cardsData = [{}, {}, {}, {}];

  return (
    <>
      <Hero>
        <Link className="button--link" to="/creator">
          Ver proyectos
        </Link>
      </Hero>
      <CardList cardsData={cardsData} />
    </>
  );
}

export default LandingPage;
