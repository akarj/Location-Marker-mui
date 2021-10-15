import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import "./Mapbox.scss";

require("dotenv").config();

function Mapbox() {
  //states
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 28.7041,
    longitude: 77.1025,
    zoom: 4,
  });

  //Effects
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        // console.log("pins data", allPins.data.data);
        //   const arr = allPins.data.data;
        //   console.log("Array data", arr);

        setPins(allPins.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  //Functions
  //   const handleMarkerClick = (id, lat, long) => {
  const handleMarkerClick = id => {
    setCurrentPlaceId(id);
    //  setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  return (
    <div className="mapbox-container">
      <ReactMapGL
        {...viewport}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        //   onClick={e => console.log(e.lngLat)}
        //   onDblClick={currentUsername && handleAddClick}
        transitionDuration="500"
      >
        {pins.map(p => (
          <div key={`${p.lat}${p._id}`}>
            <Marker
              latitude={p.lat}
              longitude={p.long}
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
                onClick={() => handleMarkerClick(p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                //  onClose={() => setCurrentPlaceId(null)}
                anchor="left"
                className="popup"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p>{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>

                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Mapbox;
