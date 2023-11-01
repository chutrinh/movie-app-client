import React from "react"; //import thư viện react
import "./SearchForm.css"; // import file css để css cho component

// tại đây ta sẽ thực hiện việc gửi yêu cầu đi và tìm kiếm danh sách bộ phim theo từ khóa
function SearchForm({ getData }) {
  const inputForm = React.useRef();
  // xũ lý sự kiện khi người dùng nhấp vào ô tìm kiếm sẽ thực hiện tìm kiếm danh sách bộ phim theo yêu cầu và đưa ra các thông báo cho người dùng biết nếu không nhập gì cả vào ô tìm kiếm
  const handleSeacrMovie = (e) => {
    e.preventDefault();
    if (inputForm.current.value !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ecdccbc6db9089b36fd6df2185e5a3cd&language=en-US&query=${inputForm.current.value}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.results.length === 0) {
            alert("Không có dữ liệu ! vui lòng nhập từ khóa khác");
          } else {
            getData(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      inputForm.current.value = "";
    } else {
      alert("Vui lòng nhập từ khóa vào ô tìm kiếm");
    }
  };

  return (
    <>
      <div className="form">
        <form className="form-container">
          <div className="input-form">
            <input ref={inputForm} placeholder="Search"></input>
            <svg
              onClick={handleSeacrMovie}
              className="svg-inline--fa fa-search fa-w-16"
              fill="#ccc"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </div>
          <hr></hr>
          <div className="btn-search">
            <button>RESET</button>
            <button onClick={handleSeacrMovie}>SEARCH</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default SearchForm; // xuất dữ liệu ra ngoài
