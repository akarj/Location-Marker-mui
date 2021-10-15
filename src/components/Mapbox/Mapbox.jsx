import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@mui/icons-material";

import "./Mapbox.scss";

require("dotenv").config();

function Mapbox() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 28.7041,
    longitude: 77.1025,
    zoom: 4,
  });
  return (
    <div className="mapbox-container">
      <ReactMapGL
        {...viewport}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        //   onDblClick={currentUsername && handleAddClick}
        transitionDuration="500"
      >
        <Marker
          latitude={28.7041}
          longitude={77.1025}
          offsetLeft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
        >
          <Room
            style={{
              fontSize: 7 * viewport.zoom,
              color: "slateblue",
              //   color: currentUsername === p.username ? "tomato" : "slateblue",
              cursor: "pointer",
            }}
          />
        </Marker>
        {/* <Popup
          //  key={p._id}
          latitude={28.7041}
          longitude={77.1025}
          closeButton={true}
          closeOnClick={false}
          //  onClose={() => setCurrentPlaceId(null)}
          anchor="left"
          className="popup"
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">Delhi</h4>
            <label>Review</label>
            <p>Capital</p>
            <label>Rating</label>
            <div className="stars">
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
            </div>

            <label>Information</label>
            <span className="username">
              Created by<b>Anuj</b>
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup> */}
      </ReactMapGL>
    </div>
  );
}

export default Mapbox;
