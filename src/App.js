import "./App.scss";
import Mapbox from "./components/Mapbox/Mapbox";

function App() {
  return (
    <div className="App">
      <Mapbox />
    </div>
  );
}
// mapStyle={`${process.env.REACT_APP_MAPBOX_STYLE}`}
//         mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
export default App;
