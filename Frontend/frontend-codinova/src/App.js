import { BrowserRouter, Route, Routes } from "react-router-dom";
import Exchange from "./Pages/Exchange-UI";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Exchange />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
