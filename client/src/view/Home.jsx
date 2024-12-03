import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDrivers } from "../redux/actions";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();

  // Extrayendo el estado de los conductores y la paginación del store
  const { drivers, totalPages, loading, error } = useSelector(
    (state) => state.drivers || { drivers: [], totalPages: 1, loading: false, error: null }
  );

  // Estado local para la página actual y filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [ascending, setAscending] = useState(true);
  const [teamFilter, setTeamFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [teams, setTeams] = useState([]);
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [nationalities, setNationalities] = useState([]);

  // Efecto para cargar conductores al montar el componente o cambiar filtros
  useEffect(() => {
    dispatch(fetchAllDrivers(currentPage, teamFilter, sourceFilter, nationalityFilter));
  }, [dispatch, currentPage, teamFilter, sourceFilter, nationalityFilter]);

  // Actualizar conductores filtrados cuando cambie el estado de los conductores
  useEffect(() => {
    setFilteredDrivers(drivers);
  }, [drivers]);

  // Efecto para cargar equipos al montar el componente
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  // Efecto para cargar nacionalidades al montar el componente
  useEffect(() => {
    const fetchNationalitiesData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/nationalities");
        setNationalities(response.data);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };
    fetchNationalitiesData();
  }, []);

  // Funciones para manejar la paginación
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Función para manejar el ordenamiento
  const handleSort = (type) => {
    if (type === sortBy) {
      setAscending((prev) => !prev);
    } else {
      setSortBy(type);
      setAscending(true);
    }
  };

  // Funciones para manejar cambios en los filtros
  const handleTeamFilterChange = (e) => {
    setTeamFilter(e.target.value);
  };

  const handleNationalityFilterChange = (e) => {
    setNationalityFilter(e.target.value);
  };

  // Ordenar conductores según el tipo y el orden seleccionados
  const sortedDrivers =
    filteredDrivers && filteredDrivers.length > 0
      ? filteredDrivers.sort((a, b) => {
          if (sortBy === "name") {
            const nameA = a.name && a.name.forename ? a.name.forename.toLowerCase() : "";
            const nameB = b.name && b.name.forename ? b.name.forename.toLowerCase() : "";
            return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
          } else if (sortBy === "dob") {
            const dobA = a.dob ? new Date(a.dob) : new Date(0);
            const dobB = b.dob ? new Date(b.dob) : new Date(0);
            return ascending ? dobA - dobB : dobB - dobA;
          }
          return 0;
        })
      : [];

  // Manejo de estados de carga y error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Renderizar la página principal
  return (
    <div>
      <div className="home">
        <h1>Drivers</h1>
        <SearchBar setDrivers={setFilteredDrivers} />
        <NavBar />
        <div>
          <label>Filter by Team:</label>
          <select onChange={handleTeamFilterChange} value={teamFilter}>
            <option value="">All</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <label>Filter by Nationality:</label>
          <select onChange={handleNationalityFilterChange} value={nationalityFilter}>
            <option value="">All</option>
            {nationalities.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
          <label>Filter by Source:</label>
          <select onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="">All</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
          </select>
        </div>
        <div>
          <button onClick={() => handleSort("name")}>
            Sort by Name {sortBy === "name" && (ascending ? "↑" : "↓")}
          </button>
          <button onClick={() => handleSort("dob")}>
            Sort by DOB {sortBy === "dob" && (ascending ? "↑" : "↓")}
          </button>
        </div>
        <div className="driver-list">
          {sortedDrivers.map((driver) => (
            <Card key={driver.id} driver={driver} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
