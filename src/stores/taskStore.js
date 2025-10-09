import { defineStore } from "pinia";

// Создаем хранилище с помощью defineStore
export const useTaskStore = defineStore("tasks", {
    // Состояние (state): данные, которые хранит хранилище
    state: () => ({
        tasks: JSON.parse(localStorage.getItem("tasklist")) || [], // Список задач
    }),

    // Геттеры (getters): вычисляемые свойства
    getters: {
        // Возвращает количество задач
        taskCount: (state) => state.tasks.length,
    },

    // Действия (actions): методы для изменения состояния
    actions: {
        // Добавляет новую задачу
        addTask(task) {
            this.tasks.unshift(task);
            localStorage.setItem("tasklist", JSON.stringify(this.tasks));
        },

        // Удаляет задачу по индексу
        removeTask(index) {
            this.tasks = this.tasks.filter((task) => task.id != index);
            localStorage.setItem("tasklist", JSON.stringify(this.tasks));
        },

        checkTask(checked, index) {
            this.tasks.forEach((task) => {
                if (task.id == index) task.checked = checked;
            });
            localStorage.setItem("tasklist", JSON.stringify(this.tasks));
        },

        setTaskName(index, name) {
            this.tasks.forEach((task) => {
                if (task.id == index) {
                    task.name = name;
                    console.log(task.name);
                };
                
            });
            
            localStorage.setItem("tasklist", JSON.stringify(this.tasks));
        }
    },
});
