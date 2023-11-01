import React from "react"; //impoer thư viện react
// đưa toàn bộ link api vào một object để dễ dàng quản lý và sử dụng
const API_KEY = "ecdccbc6db9089b36fd6df2185e5a3cd";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
// đưa dữ liệu ra ngoài
const UrlContextAPI = React.createContext(requests);
export default UrlContextAPI;
