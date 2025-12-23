import Card from "./Card";

const CardList = ({cardsData, serverUrl}) => {
  return (
    <div className="cards-container">
        {cardsData.map((cardData) => (
          <Card key={cardData.id} formData={cardData} serverUrl={serverUrl} />
        ))}
      </div>
  );
};

export default CardList;