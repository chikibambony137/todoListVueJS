import { defineStore } from "pinia";

// Создаем хранилище с помощью defineStore
export const useTaskStore = defineStore("tasks", {
    // Состояние (state): данные, которые хранит хранилище
    state: () => ({
        tasks: JSON.parse(localStorage.getItem("tasklist")) || [], // Список задач
        taskListVisuality: [],

        sortMethods: (state) => [
            state.sortTasksByDate,
            state.sortTasksByDateDESC,
            state.sortTasksByAlphabet,
            state.sortTasksByAlphabetDESC,
            state.sortTasksByChecked,
            state.sortTasksByCheckedDESC,
        ],
    }),

    // Геттеры (getters): вычисляемые свойства
    getters: {
        // Возвращает количество задач
        taskCount: (state) => state.tasks.length,
        sortMethodsCount: (state) => state.sortMethods(state).length,
    },

    // Действия (actions): методы для изменения состояния
    actions: {
        /** adds task template without name to start of taskList and focuses to DOM input */
        addTaskTemplate() {
            this.tasks.unshift({ id: Date.now(), checked: false });
            localStorage.setItem("tasklist", JSON.stringify(this.tasks));
            this.taskListVisuality = [...this.tasks];
        },

        setTaskName(id, name) {
            this.tasks.forEach((task) => {
                if (task.id == id) {
                    task.name = name;
                    console.log(task.name);
                }
            });

            localStorage.setItem("tasklist", JSON.stringify(this.tasks));
        },

        checkTask(checked, id) {
            this.tasks.forEach((task) => {
                if (task.id == id) task.checked = checked;
            });
            localStorage.setItem("tasklist", JSON.stringify(this.tasks));
        },

        /** filters taskList and changes taskListVisuality by name
         * @param {string} input
         */
        searchTask(input) {
            if (input == "") {
                this.taskListVisuality = [...this.tasks];
            } else {
                this.taskListVisuality = [...this.tasks].filter((task) =>
                    task.name?.toLowerCase().includes(input.toLowerCase())
                );
            }
        },

        /** removes task by from original taskList & taskListVisuality
         * @param {number} id
         */
        removeTask(id) {
            this.tasks = this.tasks.filter((task) => task.id != id);
            localStorage.setItem("tasklist", JSON.stringify(this.tasks));

            this.taskListVisuality = this.taskListVisuality.filter(
                (task) => task.id != id
            );
        },

        sortTasksByDate() {
            this.taskListVisuality = [...this.tasks];
            console.log('Сортировка по дате добавления (по умолчанию)');
        },

        sortTasksByDateDESC() {
            this.taskListVisuality = this.taskListVisuality.reverse();
            console.log('Сортировка по дате добавления (реверс)');
        },

        sortTasksByAlphabet() {
            this.taskListVisuality.sort((a, b) => {
                return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
            });
            console.log('Сортировка по алфавиту (ABC)');
        },

        sortTasksByAlphabetDESC() {
            this.taskListVisuality.sort((a, b) => {
                return (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0;
            });
            console.log("Сортировка по алфавиту (CBA)");
        },

        sortTasksByChecked() {
            this.taskListVisuality.sort((a, b) => {
                return (a.checked && !b.checked) ? -1 : (!a.checked && b.checked) ? 1 : 0;
            });
            console.log("Сортировка по выполненным заданиям");
        },

        sortTasksByCheckedDESC() {
            this.taskListVisuality.sort((a, b) => {
                return (a.checked && !b.checked) ? -1 : (!a.checked && b.checked) ? 1 : 0;
            }).reverse();
            console.log("Сортировка по невыполненным заданиям");
        },

        sortTasks(sortMethodId) {
            this.sortMethods(this)[sortMethodId]();
        },

        
    },
});
