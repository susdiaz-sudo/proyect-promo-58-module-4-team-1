import Hero from "./layout/Hero";
import { Link } from "react-router";
import CardList from "./CardList";
import { useState, useEffect } from "react";

function LandingPage({serverUrl}) {

  const [cardsData, setCardsData,] = useState([]);
  useEffect(() => {
    fetch(`${serverUrl}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setCardsData(data);
      });
  }, [serverUrl]);

  return (
    <>
      <Hero>
        <Link className="button--link" to="/creator">
          Crear proyecto
        </Link>
      </Hero>
      <CardList cardsData={cardsData} serverUrl={serverUrl} />
    </>
  );
}

export default LandingPage;
