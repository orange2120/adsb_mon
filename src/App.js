// import logo from './logo.svg';
import "./App.css";
import List from "./components/List";
import Map from "./components/Map";
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
      <div style={{display: "flex"}}>
        <div id="list" className="List">
          <List  />
        </div>
        <div id="mapid" className="Map">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
