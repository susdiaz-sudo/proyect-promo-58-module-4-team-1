import Card from "./Card";

const CardList = ({cardsData}) => {
  return (
    <div className="cards-container">
        {cardsData.map((cardData, index) => (
          <Card key={index} formData={cardData} />
        ))}
      </div>
  );
};

export default CardList;