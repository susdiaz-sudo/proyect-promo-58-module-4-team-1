import Hero from "./layout/Hero";
import Card from "./Card";
import { Link } from "react-router";
import CardList from "./CardList";
import { useState } from "react";

function LandingPage() {
  const [cardsData, setCardsData] = useState([]);

  fetch("http://localhost:3000/api/projectCards")
    .then((res) => res.json())
    .then((data) => {
      setCardsData(data);
    });

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
