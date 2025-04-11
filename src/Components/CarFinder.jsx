import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CarCard from "./CarCard";
import CarModal from "./CarModal";

export default function CarFinder({toggleWishlist ,wishlist}) {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);


  const [filters, setFilters] = useState({
    brand: "",
    fuel_type: "",
    transmission: "",
    year: "2016",
  });


  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12;

  
  const buildQuery = (filters) => {
    const parts = [];

    if (filters.brand) parts.push(`make:${filters.brand}`);
    if (filters.fuel_type) parts.push(`fueltype:"${filters.fuel_type}"`);
    if (filters.transmission) parts.push(`trany:"${filters.transmission}"`);
    if (filters.year) parts.push(`year:${filters.year}`);

    return parts.length ? parts.join(" AND ") : "";
  };

  //  cars from API with filters & pagination
  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = {
        dataset: "all-vehicles-model",
        rows: perPage,
        start: (currentPage - 1) * perPage,
        q: buildQuery(filters),
      };

      const res = await axios.get(
        "https://public.opendatasoft.com/api/records/1.0/search/",
        { params }
      );

      const totalHits = 1200;
      setTotalPages(Math.ceil(totalHits / perPage));
      const mappedCars = res.data.records.map((r) => r.fields);
      setCars(mappedCars);
    } catch (err) {
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();

  }, [filters, currentPage]);


  return (
    <div >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
  

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Brand"
            className="p-2 rounded border dark:bg-gray-700"
            onChange={(e) => {
              setCurrentPage(1);
              setFilters({ ...filters, brand: e.target.value });
            }}
          />
          <select
            className="p-2 rounded border dark:bg-gray-700"
            onChange={(e) => {
              setCurrentPage(1);
              setFilters({ ...filters, fuel_type: e.target.value });
            }}
          >
            <option value="">Fuel Type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electricity">Electricity</option>
          </select>
          <select
            className="p-2 rounded border dark:bg-gray-700"
            onChange={(e) => {
              setCurrentPage(1);
              setFilters({ ...filters, transmission: e.target.value });
            }}
          >
            <option value="">Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <select
            className="p-2 rounded border dark:bg-gray-700"
            onChange={(e) => {
              setCurrentPage(1);
              setFilters({ ...filters, year: e.target.value });
            }}
          >
            <option  value="">Year</option>
            {[2015,2016,2017,2018,2019,2020,2021,2022,2023].map((n) => (
              <option key={n} value={n}>
                {n} 
              </option>
            ))}
          </select>
        </div>

        {/* Car List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-lg">Loading cars...</p>
          ) : cars.length ? (
            cars.map((car, idx) => (
        
              <CarCard
              key={car.id}
                car={car}
                idx={idx}
                setSelectedCar={setSelectedCar}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
                FaHeart={FaHeart}
                FaRegHeart={FaRegHeart}
              
              />
            ))
          ) : (
            <p className="col-span-full text-center text-lg">No cars found.</p>
          )}

          <CarModal

            car={selectedCar}
            onClose={() => setSelectedCar(null)}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
