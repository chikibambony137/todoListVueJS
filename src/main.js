import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import buttons from "./components/ui/buttons";
import { createPinia } from "pinia";

const app = createApp(App);

// глобальная регистрация компонентов (кнопок)
buttons.forEach(button => {
    app.component(button.name, button)
});

// Создаем экземпляр Pinia
const pinia = createPinia();
// Подключаем Pinia к приложению
app.use(pinia);

app.mount("#app");
