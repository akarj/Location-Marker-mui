import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { format } from "timeago.js";
import "./Mapbox.scss";

require("dotenv").config();

function Mapbox() {
  //states
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);

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
        setPins(allPins.data.data);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
    };
    getPins();
  }, []);

  //Functions

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = e => {
    const [long, lat] = e.lngLat;
    console.log("Long :=> ", long);
    console.log("Lat :=> ", lat);
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      console.log("newPins => ", newPin);
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data.data]);
      setNewPlace(null);
    } catch (err) {
      console.log("newPin Error at 72", { err }, { ...newPin });
    }
  };

  return (
    <div className="mapbox-container">
      <ReactMapGL
        {...viewport}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        //   onClick={e => console.log(e.lngLat)}
        onDblClick={handleAddClick}
        transitionDuration="500"
      >
        {pins.map(p => (
          <div key={`${p.lat}${p._id}`}>
            <Marker
              latitude={p.lat ? p.lat : 28.7041}
              longitude={p.long ? p.long : 77.1025}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,

                  color:
                    currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
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

        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div className="formDiv">
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={e => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={e => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={e => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}

        {currentUsername ? (
          <Button variant="contained" id="logout" color="info">
            Log out
          </Button>
        ) : (
          <Stack direction="row" spacing={2} className="btnGroup">
            <Button variant="contained" className="btn login">
              Login
            </Button>
            <Button
              variant="contained"
              color="success"
              className="btn register"
            >
              Register
            </Button>
          </Stack>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Mapbox;
