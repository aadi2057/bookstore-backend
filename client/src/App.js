import "./App.css";
import Main from "./components/MainComponent";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

function App() {
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <Main />
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
