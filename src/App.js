import { Provider } from "react-redux";
import { store } from "./store/store";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
