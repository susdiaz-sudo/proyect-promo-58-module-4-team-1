
function Hero({children}) {
    return(
      
        <section className="hero">
          <h2 className="title">Proyectos molones</h2>
          <p className="hero__text">Escaparate en línea para recoger ideas a través de la tecnología</p>
           {children}
          
        </section>
       
        
    );
};
export default Hero;