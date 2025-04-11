import { IoCloseSharp  } from "react-icons/io5";


const CarModal = ({ car, onClose, wishlist, toggleWishlist }) => {
  if (!car) return null;

  const isWished = wishlist.some(
    (item) => item.make === car.make && item.model === car.model && item.year === car.year
  );

  return (
    <div className="fixed  inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl p-6 w-[90%] max-w-xl shadow-xl transform scale-95 animate-[zoom_0.3s_ease-out_forwards] relative">
        <button
          onClick={()=>onClose(null)}
          className="absolute text-4xl top-1  right-1 text-gray-600  text-red-500"
        >
      <IoCloseSharp  className="rotate-1" />
        </button>

        <img
          src={'/car-placeholder.jpeg'}
          alt={`${car.make} ${car.model}`}
          className="w-full h-64 object-cover rounded-md mb-4"
        />

        <h2 className="text-2xl font-bold mb-2">
          {car.year} {car.make} {car.model}
        </h2>

        <button
          onClick={() => toggleWishlist(car)}
          className={`mb-4 px-4 py-2 rounded-full font-medium transition-colors ${
            isWished
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {isWished ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist"}
        </button>

        <div className="space-y-1 text-sm">
          <p>
            <strong>Class:</strong> {car.vehicle_class || "N/A"}
          </p>
          <p>
            <strong>Fuel Type:</strong> {car.fueltype || "N/A"}
          </p>
          <p>
            <strong>Transmission:</strong> {car.trany || "N/A"}
          </p>
          <p>
            <strong>Seating Capacity:</strong> {car.seating_capacity || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};


export default CarModal