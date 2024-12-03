import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <Link to="/driver/create" className="CreateButton">
          Create driver
        </Link>
        <Link to="/" className="LandingButton">
          Landing Page
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
