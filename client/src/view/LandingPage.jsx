import { useNavigate } from "react-router-dom";
import "../App.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="landing-page">
      <button onClick={handleClick}>Enter the page of all the runners</button>
    </div>
  );
};

export default LandingPage;
