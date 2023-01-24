import "./albums.scss";
import { useEffect, useState } from "react";
import getData from "../../service/index";
import { useNavigate } from "react-router-dom";

const getRendomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const Albums = () => {
  const navigate = useNavigate();
  const [albumList, setAlbumList] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [startPage, setStartPage] = useState(0);

  const fetchUsersFromApi = async (userId) => {
    const response = await getData(
      `https://jsonplaceholder.typicode.com/users`
    );

    if (response?.data) {
      setUsers(response?.data);
    }
  };

  const fetchAlbumsFromApi = async () => {
    try {
      const response = await getData(
        `https://jsonplaceholder.typicode.com/albums?_start=${startPage}&_limit=${itemsPerPage}`
      );
      if (response?.data) {
        const albumList = response?.data.map((album) => {
          const hexCode = getRendomColor();
          const userName = users.find(
            (user) => user.id === album.userId
          )?.username;
          return {
            ...album,
            imgSrc: `https://via.placeholder.com/2/${hexCode}`,
            userName,
          };
        });
        setAlbumList(albumList);
        setIsLoading(false);
      }
    } catch (error) {
      // Can be replaced with error notification
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchUsersFromApi();
    } catch (error) {
      // Can be replaced with error notification
      console.log("error occurred");
    }
  }, []);

  useEffect(() => {
    if (users.length) {
      fetchAlbumsFromApi();
    }
  }, [users]);

  useEffect(() => {
    fetchAlbumsFromApi();
  }, [startPage]);

  useEffect(() => {
    fetchAlbumsFromApi();
  }, [itemsPerPage]);

  const moveToPhotos = (id) => {
    navigate(`album/${id}`);
  };

  const next = () => {
    setStartPage(startPage + 1);
  };

  const previous = () => {
    setStartPage(startPage - 1);
  };

  const moveToPage = (page) => {
    setItemsPerPage(page);
  };

  if (isLoading && !albumList.length && !users.length) {
    return <div className="loader"></div>;
  } else {
    return (
      <>
        {!isLoading && albumList.length && users.length && (
          <div className="main-layout">
            <h2 className="main-layout__title">Albums</h2>
            <div className="album-container">
              {albumList.map((album) => {
                return (
                  <div
                    onClick={() => moveToPhotos(album.id)}
                    className="content-container"
                    key={album.hexCode}
                  >
                    <div className="title">{album.title}</div>
                    <img
                      alt="album cover"
                      className="album-name"
                      src={album.imgSrc}
                    />
                    <div className="user-name">
                      Created by - <strong>{album.userName}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pagination">
              <button disabled={startPage === 0} onClick={previous}>
                Previous
              </button>
              <button onClick={next}>Next</button>
            </div>
            <div className="items-per-page">
              <span className="title">Items per page: </span>
              <button onClick={() => moveToPage(20)}>20</button>
              <button onClick={() => moveToPage(30)}>30</button>
              <button onClick={() => moveToPage(50)}>50</button>
            </div>
          </div>
        )}
      </>
    );
  }
};
export default Albums;
