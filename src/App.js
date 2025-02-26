import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/store";
function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
