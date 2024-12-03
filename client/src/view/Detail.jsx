import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDriverById } from "../redux/actions";

const Detail = () => {
  const { id } = useParams(); // Obtiene el ID del conductor desde los parámetros de la URL
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.selectedDriver); // Selecciona el conductor del estado global
  const navigate = useNavigate(); // Hook para navegación

  // Maneja el clic para volver a la página de inicio
  const handleClick = () => {
    navigate("/home");
  };

  // Efecto que se ejecuta al montar el componente o cuando el ID cambia
  useEffect(() => {
    dispatch(fetchDriverById(id)); // Despacha la acción para obtener el conductor por ID
  }, [dispatch, id]);

  // Muestra un mensaje de carga mientras se obtiene el conductor
  if (!driver) return <p className="loading">Loading...</p>;
  // Muestra un mensaje de error si hay un error al obtener el conductor
  if (driver.error) return <p className="error">Error: {driver.error}</p>;

  // Construye los datos del conductor a mostrar
  const imageUrl = driver.image?.url || driver.image; // URL de la imagen
  const name =
    driver.name?.forename && driver.name?.surname
      ? `${driver.name.forename} ${driver.name.surname}`
      : `${driver.name} ${driver.lastName}`; // Nombre completo
  const dob = driver.dob || driver.birthDate; // Fecha de nacimiento
  const teams = Array.isArray(driver.teams) ? driver.teams.join(", ") : driver.teams; // Equipos

  return (
    <div className="driver-detail">
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} />
      <p>
        <strong>ID:</strong> {driver.id}
      </p>
      <p>
        <strong>Nationality:</strong> {driver.nationality}
      </p>
      <p>
        <strong>Date of Birth:</strong> {dob}
      </p>
      <p>
        <strong>Teams:</strong> {teams}
      </p>
      <p>
        <strong>Description:</strong> {driver.description}
      </p>
      <button onClick={handleClick}>Return to Home</button>
    </div>
  );
};

export default Detail;
