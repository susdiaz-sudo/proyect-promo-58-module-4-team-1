import Hero from "./layout/Hero";
import {Link} from "react-router";

function LandingPage() {
  return (
    <Hero><Link className="button--link" to="/creator">Ver proyectos</Link></Hero>
  );
}

export default LandingPage;
