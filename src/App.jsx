import { store } from "./store";
import { Provider } from "react-redux";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
const App = () => {

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    );
}

export default App;
