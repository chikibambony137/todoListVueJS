import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import buttons from "./components/ui/buttons";

const app = createApp(App);

// глобальная регистрация компонентов (кнопок)
buttons.forEach(button => {
    app.component(button.name, button)
});

app.mount("#app");
