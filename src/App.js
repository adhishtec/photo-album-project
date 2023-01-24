import "./App.scss";
import Albums from "./components/albums";
import Photos from "./components/photos";
import PhotoDetail from "./components/photos/photo-detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h2>Gallery</h2>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Albums />} />
          <Route path="/album" element={<Albums />} />
          <Route path="album/:id" element={<Photos />} />
          <Route path="detail" element={<PhotoDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
