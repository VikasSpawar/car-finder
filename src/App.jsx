import { BrowserRouter as Router, Routes, Route } from "react-router";

import "./App.css";
import CarFinder from "./Components/CarFinder";
import { useEffect, useState } from "react";
import WishlistPage from "./Components/WishlistPage";

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleWishlist = (car) => {
    const exists = wishlist.some(
      (item) =>
        item.make === car.make &&
        item.model === car.model &&
        item.year === car.year
    );

    const updated = exists
      ? wishlist.filter(
          (item) =>
            !(
              item.make === car.make &&
              item.model === car.model &&
              item.year === car.year
            )
        )
      : [...wishlist, car];

    setWishlist(updated);
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white ">
        <Routes>
          <Route
            path="/"
            element={
              <CarFinder wishlist={wishlist} toggleWishlist={toggleWishlist} />
            }
          />

          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                key={JSON.stringify(wishlist)}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
