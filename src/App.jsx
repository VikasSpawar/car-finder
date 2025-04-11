import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

import "./App.css";
import CarFinder from "./Components/CarFinder";
import { useEffect, useState } from "react";
import WishlistPage from "./Components/WishlistPage";
import { FaCar, FaHeart, FaMoon, FaSun } from "react-icons/fa";

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || savedTheme === null; // true = dark
  });
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  const toggleWishlist = (car) => {

    const exists = wishlist.some(
      (item) =>item.id === car.id
    );

    // console.log(exists, car)

    const updated = exists?wishlist.filter((item) => item.id!==car.id)
      : [...wishlist, car];

    setWishlist(updated);
  };
  // const toggleWishlist = (car) => {
  //   const exists = wishlist.some(
  //     (item) =>
  //       item.make === car.make &&
  //       item.model === car.model &&
  //       item.year === car.year
  //   );

  //   const updated = exists
  //     ? wishlist.filter(
  //         (item) =>
  //           !(
  //             item.make === car.make &&
  //             item.model === car.model &&
  //             item.year === car.year
  //           )
  //       )
  //     : [...wishlist, car];

  //   setWishlist(updated);
  // };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    const root = document.documentElement;

    localStorage.setItem('theme',JSON.stringify(darkMode))
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [wishlist ]);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white ${darkMode ? "dark" : ""}`}>
      <div className="flex p-4 justify-between items-center mb-4">
          <h1 className=" flex align-middle text-4xl font-bold text-blue-600 dark:text-blue-400">
           <FaCar className="text-red-500 mx-1  my-auto " /> Car Finder
          </h1>
           <nav className="space-x-4  flex">
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/wishlist" className="hover:text-blue-400">
              Wishlist <FaHeart className="inline text-red-500"/>
            </Link>
            <button onClick={() => setDarkMode(!darkMode)} className="text-xl  my-auto">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </nav>
        </div>
     
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
