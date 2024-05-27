import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDrivers } from '../redux/actions';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const dispatch = useDispatch();
  const { drivers, totalPages, loading, error } = useSelector((state) => state.drivers || { drivers: [], totalPages: 1, loading: false, error: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [ascending, setAscending] = useState(true);
  const [teamFilter, setTeamFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAllDrivers(currentPage, teamFilter, sourceFilter));
  }, [dispatch, currentPage, teamFilter, sourceFilter]);

  useEffect(() => {
    setFilteredDrivers(drivers);
  }, [drivers]);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSort = (type) => {
    if (type === sortBy) {
      setAscending(prev => !prev);
    } else {
      setSortBy(type);
      setAscending(true);
    }
  };

  const sortedDrivers = filteredDrivers && filteredDrivers.length > 0 ? filteredDrivers.sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = (a.name && a.name.forename) ? a.name.forename.toLowerCase() : '';
      const nameB = (b.name && b.name.forename) ? a.name.forename.toLowerCase() : '';
      return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (sortBy === 'dob') {
      const dobA = (a.dob) ? new Date(a.dob) : null;
      const dobB = (b.dob) ? new Date(b.dob) : null;
      return ascending ? dobA - dobB : dobB - dobA;
    }
  }) : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <NavBar />
      <div className="home">
        <h1>Drivers</h1>
        <SearchBar setDrivers={setFilteredDrivers} />
        <div>
          <label>Filter by Team:</label>
          <select onChange={(e) => setTeamFilter(e.target.value)}>
            <option value="">All</option>
            <option value="TeamA">TeamA</option>
            <option value="TeamB">TeamB</option>
            {/* Add other teams as options */}
          </select>
          <label>Filter by Source:</label>
          <select onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="">All</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
          </select>
        </div>
        <div>
          <button onClick={() => handleSort('name')}>Sort by Name {sortBy === 'name' && (ascending ? '↑' : '↓')}</button>
          <button onClick={() => handleSort('dob')}>Sort by DOB {sortBy === 'dob' && (ascending ? '↑' : '↓')}</button>
        </div>
        <div className="driver-list">
          {sortedDrivers.map((driver) => (
            <Card key={driver.id} driver={driver} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
          <span>{currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
