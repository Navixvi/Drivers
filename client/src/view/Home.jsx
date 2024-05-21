import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDrivers } from '../redux/actions';
import Card from '../components/Card';

const Home = () => {
    const dispatch = useDispatch();
    const { drivers, totalPages, loading, error } = useSelector((state) => state.drivers || { drivers: [], totalPages: 1, loading: false, error: null });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchAllDrivers(currentPage));
    }, [dispatch, currentPage]);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className="home">
            <h1>Drivers</h1>
            <div className="driver-list">
            {drivers && drivers.map((driver) => (
            <Card key={driver.id} driver={driver} />
            ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Home;
