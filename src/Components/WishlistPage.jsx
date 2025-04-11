import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const WishlistPage = ({  toggleWishlist }) => {

    const [wishlist, setWishlist] = useState([]);
  useEffect(()=>{

    setWishlist(JSON.parse(localStorage.getItem("wishlist")))

  },[])


  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 flex text-center  "><FaHeart className="my-auto text-red-500 mx-2" /> My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No cars in wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((car, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <img
                src={`/car-placeholder.jpeg`}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover rounded mb-3"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold mb-1">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">{car.vehicle_class}</p>
              <button
                onClick={() => toggleWishlist(car)}
                className="mt-3 px-3 py-1 rounded-full text-sm bg-red-600 text-white hover:bg-red-700"
              >
                Remove 💔
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
