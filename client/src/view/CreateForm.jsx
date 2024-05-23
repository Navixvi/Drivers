import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../redux/actions';
import axios from 'axios';

const CreateForm = () => {
  const [formData, setFormData] = useState({
    name: '', 
    lastName: '', 
    nationality: '',
    image: '',
    dob: '',
    description: '',
    teams: [],
  });

  const [teams, setTeams] = useState([]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3001/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

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
  
  const handleChange = (e) => {
    const { name, value, options } = e.target;
    const newValue = name === 'teams' ? Array.from(options).filter(option => option.selected).map(option => option.value) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createDriver(formData));
    }
  };

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
  multiple // Permitir selección múltiple
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
    </div>
  );
};

export default CreateForm;
