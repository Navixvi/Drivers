import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../redux/actions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
  // Estado inicial del formulario
  const initialState = {
    name: '', 
    lastName: '', 
    nationality: '',
    image: '',
    dob: '',
    description: '',
    teams: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener la lista de equipos al montar el componente
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3001/teams');
      setTeams(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setLoading(false);
    }
  };

  // Validaciones del formulario
  const validate = () => {
    const newErrors = {};
    if (!formData.name.match(/^[a-zA-Z]+$/)) {
      newErrors.name = 'Nombre solo debe contener letras';
    }
    if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      newErrors.lastName = 'Apellido solo debe contener letras';
    }
    if (!formData.nationality.match(/^[a-zA-Z]+$/)) {
      newErrors.nationality = 'Nacionalidad solo debe contener letras';
    }
    if (!formData.dob) {
      newErrors.dob = 'Fecha de Nacimiento es requerida';
    }
    if (!formData.description) {
      newErrors.description = 'Descripción es requerida';
    }
    if (formData.teams.length === 0) {
      newErrors.teams = 'Debes agregar al menos una escudería';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, options } = e.target;
    const newValue = name === 'teams' ? 
      Array.from(options).filter(option => option.selected).map(option => option.value) 
      : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(createDriver(formData));
        setSuccessMessage('Driver Successfully Created');
        setFormData(initialState); // Limpiar campos del formulario
      } catch (error) {
        console.error('Error creating driver:', error);
      }
    }
  };

  // Manejo del clic para volver a home
  const handleClick = () => {
    navigate('/home');
  };

  // Mostrar mensaje de carga mientras se obtienen los equipos
  if (loading) return <p>Loading...</p>;

  return (
    <div className="create-form">
      <h1>Crear Nuevo Conductor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label>Nacionalidad</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
          {errors.nationality && <p className="error">{errors.nationality}</p>}
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>Escuderías</label>
          <select
            name="teams"
            value={formData.teams}
            onChange={handleChange}
            multiple
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          {errors.teams && <p className="error">{errors.teams}</p>}
        </div>
        <button type="submit">Crear Conductor</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleClick}>Volver a Home</button>
    </div>
  );
};

export default CreateForm;
