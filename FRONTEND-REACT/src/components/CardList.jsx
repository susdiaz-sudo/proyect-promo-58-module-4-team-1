import Card from "./Card";

const CardList = ({cardsData}) => {
  return (
    <div className="cards-container">
        {cardsData.map((cardData) => (
          <Card key={cardData.id} formData={cardData} />
        ))}
      </div>
  );
};

export default CardList;