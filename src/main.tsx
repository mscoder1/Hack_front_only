import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import eruda from "eruda";
import { ConfigProvider, AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

import store from "./reducers/store";
import App from "./App";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";
import WagmiProvider from "./components/WagmiProvider";

// Обязательно нужно инициализировать bridge
bridge.send("VKWebAppInit", {});

// Инициализация eruda для дебага на мобильных устройствах
const element = document.createElement("div");
document.body.appendChild(element);
eruda.init({ container: element });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiProvider>
    <Provider store={store}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </Provider>
  </WagmiProvider>
);
