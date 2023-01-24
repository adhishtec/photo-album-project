import "./photos.scss";
import { useState } from "react";
import { useEffect } from "react";
import getData from "../../service/index";
import { useParams } from "react-router-dom";
import PhotoDetail from "./photo-detail";
import { useNavigate } from "react-router-dom";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  let { id } = useParams();
  let navigate = useNavigate();

  const getAPIData = async () => {
    try {
      const apiResponse = await getData(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}&_start=${currentPage}&_limit=${itemsPerPage}`
      );
      setIsLoading(false);
      if (apiResponse?.data) {
        setPhotos(apiResponse?.data);
      }
    } catch (error) {
      // Can be replaced with error notification
      console.log("error occurred");
    }
  };

  useEffect(() => {
    getAPIData();
  }, [currentPage]);

  useEffect(() => {
    getAPIData();
  }, [itemsPerPage]);

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const previous = () => {
    setCurrentPage(currentPage - 1);
  };

  const moveToPage = (page) => {
    setItemsPerPage(page);
  };

  const showPhotoPreview = (url, title) => {
    setShowModal(true);
    setModalUrl(url);
    setModalTitle(title);
  };

  if (isLoading && !photos.length) {
    return <div className="loader"></div>;
  } else {
    return (
      <>
        {!showModal && (
          <div className="main-layout">
            <div className="headline">
              <h2 className="main-layout__title">Photos</h2>
              <button
                className="main-layout__back"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
            <div className="photos-container">
              {photos.map(({ title, url, thumbnailUrl }) => {
                return (
                  <div
                    key={thumbnailUrl}
                    onClick={() => showPhotoPreview(url, title)}
                    className="photos-container__content"
                  >
                    <div className="title">{title}</div>
                    <img alt="thumbnail" src={thumbnailUrl} />
                  </div>
                );
              })}
            </div>
            <div className="pagination">
              <button disabled={currentPage === 0} onClick={previous}>
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
        {showModal && (
          <PhotoDetail
            url={modalUrl}
            title={modalTitle}
            setModal={() => setShowModal(false)}
          ></PhotoDetail>
        )}
      </>
    );
  }
};

export default Photos;
