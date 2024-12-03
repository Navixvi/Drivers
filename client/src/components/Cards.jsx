import { useSelector } from "react-redux";
import Card from "./Card";

const CardList = () => {
  const drivers = useSelector((state) => state.filteredDrivers);

  return (
    <div className="card-list">
      {drivers.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
};

export default CardList;
