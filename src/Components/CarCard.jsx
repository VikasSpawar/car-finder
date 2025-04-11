import React from "react";

const CarCard = ({
  car,
  idx,
  setSelectedCar,
  toggleWishlist,
  wishlist,
  FaHeart,
  FaRegHeart,
}) => {
  return (
    <div
      key={idx}
      onClick={() => setSelectedCar(car)}
      className="cursor-pointer border bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow relative"
    >
      <img
        src={"/car-placeholder.jpeg"}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover rounded-md mb-4"
        loading="lazy"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(car);
        }}
        className="absolute text-xl  top-2 right-2 text-red-500"
      >
        {wishlist.find((w) => w.model === car.model && w.year === car.year) ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )}
      </button>
      <h3 className="text-lg font-semibold">
        {car.year} {car.make} {car.model}
      </h3>
      <p
        className="text-sm  
      text-gray-600 dark:text-gray-300"
      >
        {car.vehicle_class}
      </p>
      <p
        className="text-sm  
        text-gray-500 dark:text-gray-400"
      >
        {car.fueltype} | {car.trany}
      </p>
    </div>
  );
};

export default CarCard;
