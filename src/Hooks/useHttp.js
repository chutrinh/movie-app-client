import { useEffect, useState } from "react";
// tạo custom hook request API để dễ đang tái sử dụng
function useHttp(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState(null);
  // thự hiện yêu cầu request API
  useEffect(() => {
    const test = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3${url}`);
        const data = await res.json();
        setMovies(data);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setMovies(null);
        setIsLoading(false);
      }
    };
    test();
    return () => {};
  }, []);
  // trả về 1 object chứa 3 dữ liệu cần thiết
  return { isLoading, error, movies };
}
export default useHttp;
