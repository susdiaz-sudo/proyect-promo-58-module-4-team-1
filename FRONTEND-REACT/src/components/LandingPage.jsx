import Hero from "./layout/Hero";
import { Link } from "react-router";
import CardList from "./CardList";
import { useState, useEffect } from "react";

function LandingPage() {

  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setCardsData(data);
      });
  }, []);

  return (
    <>
      <Hero>
        <Link className="button--link" to="/creator">
          Crear proyecto
        </Link>
      </Hero>
      <CardList cardsData={cardsData} />
    </>
  );
}

export default LandingPage;
