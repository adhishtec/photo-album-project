import "./detail.scss";

const PhotoDetail = ({ url, title, setModal }) => {
  return (
    <>
      <div className="preview-container">
        <button onClick={() => setModal(false)}>Close</button>
        <div className="preview-container__title">{title}</div>
        <img alt="preview" src={url} className="preview-container__img"></img>
      </div>
    </>
  );
};

export default PhotoDetail;

