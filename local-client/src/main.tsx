import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./state";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
