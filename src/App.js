import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*
const API_KEY = "ecdccbc6db9089b36fd6df2185e5a3cd";
  fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });

    link hinh anh
    https://image.tmdb.org/t/p/original....
*/
