import React, { useEffect } from "react"; //import thư viện react
import "./ResultList.css"; // import file css cho component ResultList

// tại đây ta sẽ thực hiện hiển thị danh sách các bộ phim mà ta đã nhập vào ô từ khóa tìm kiếm
let lastId;
function ResultList({ sendData }) {
  const [displaySearchMovie, setdisplaySearchMovie] = React.useState();
  const [isOke, setIsOke] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [dataDetailInfoItem, setDataDetailItem] = React.useState();

  const handleDetaileMovieSearch = (e) => {
    const movie_id = e.target.closest("li").getAttribute("id");
    sendData.results.map((item) => {
      if (item.id == movie_id) {
        setDataDetailItem(item);
      }
    });
    const sending = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=ecdccbc6db9089b36fd6df2185e5a3cd`
        );
        const data = await res.json();
        const arr = data.results.filter((item) => {
          if (item.site === "YouTube" && item.type === "Trailer") {
            return item.key;
          }
        });
        if (arr.length !== 0) {
          setdisplaySearchMovie(arr);
          setIsEmpty(false);
          setIsOke(true);
        } else {
          setIsEmpty(true);
          setIsOke(true);
        }
      } catch (error) {
        setIsEmpty(true);
        setIsOke(true);
        console.log("error", error);
      }
      lastId = movie_id;
    };
    if (lastId === movie_id) {
      setIsOke(false);
      lastId = "";
    } else {
      sending();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        event.target.nodeName === "IMG" ||
        event.target.closest(".detail-movie") ||
        event.target.closest("form")
      ) {
      } else {
        setIsOke(false);
      }
    }
    if (sendData) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {};
  }, [sendData]);

  return (
    <>
      <h2>Search result</h2>
      <ul className="search-result">
        {sendData &&
          sendData.results.map((item) => {
            return (
              <li key={item.id} id={item.id} className="search-result-item">
                <img
                  onClick={handleDetaileMovieSearch}
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                ></img>
              </li>
            );
          })}
      </ul>
      {isOke && (
        <div
          className="detail-movie"
          style={{
            display: "flex",
            justifyContent: "space-between",
            // marginBottom: "100px",
            border: "1px solid green",
            backgroundColor: "black",
            color: "white",
            paddingTop: "10px",
            paddingBottom: "10px",
            margin: "10px",
            borderRadius: "15px",
          }}
        >
          <div style={{ width: "50%", paddingLeft: "20px" }}>
            <h2>
              {isEmpty ? "Title empty" : dataDetailInfoItem.original_title}
            </h2>
            <hr />
            <p>Release Date: {dataDetailInfoItem.release_date}</p>
            <p>Vote: {dataDetailInfoItem.vote_average}</p>
            <p style={{ textAlign: "justify", paddingRight: "30px" }}>
              {dataDetailInfoItem.overview}{" "}
            </p>
          </div>
          <div
            style={{
              width: "50%",
              height: "400px",
              paddingRight: "20px",
            }}
          >
            {isEmpty ? (
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: "10px" }}
                src={`https://image.tmdb.org/t/p/original${dataDetailInfoItem.backdrop_path}`}
              ></img>
            ) : (
              <iframe
                width="100%"
                height="400"
                style={{ borderRadius: "10px" }}
                src={`https://www.youtube.com/embed/${displaySearchMovie[0].key}`}
              ></iframe>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default React.memo(ResultList);
