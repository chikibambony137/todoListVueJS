import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Создаем хранилище с помощью defineStore
export const useTaskStore = defineStore("tasks", () => {

    const tasks = ref(JSON.parse(localStorage.getItem("tasklist")) || []);
    const taskListVisuality = ref([]);

    const taskCount = computed(() => tasks.value.length);

    const updateLocalStorage = () => {
        localStorage.setItem("tasklist", JSON.stringify(tasks.value));
    };

    /** adds task template without name to start of taskList and focuses to DOM input */
    const addTaskTemplate = () => {
        tasks.value.unshift({ id: Date.now(), checked: false });
        updateLocalStorage();
        taskListVisuality.value = [...tasks.value];
    };

    const setTaskName = (id, name) => {
        tasks.value.forEach((task) => {
            if (task.id == id) {
                task.name = name;
            }
        });

        updateLocalStorage();
    };

    const checkTask = (checked, id) => {
        tasks.value.forEach((task) => {
            if (task.id == id) task.checked = checked;
        });

        updateLocalStorage();
    };

    /** filters taskList and changes taskListVisuality by name
     * @param {string} input
     */
    const searchTask = (input) => {
        if (input == "") {
            taskListVisuality.value = [...tasks.value];
        } else {
            taskListVisuality.value = [...tasks.value].filter((task) =>
                task.name?.toLowerCase().includes(input.toLowerCase())
            );
        }
    };

    /** removes task by from original taskList & taskListVisuality
     * @param {number} id
     */
    const removeTask = (id) => {
        tasks.value = tasks.value.filter((task) => task.id != id);
        updateLocalStorage();

        taskListVisuality.value = taskListVisuality.value.filter(
            (task) => task.id != id
        );
    };

    const sortTasksByDate = () => {
        taskListVisuality.value = [...tasks.value];
        console.log("Сортировка по дате добавления (по умолчанию)");
    };

    const sortTasksByDateDESC = () => {
        taskListVisuality.value = taskListVisuality.value.reverse();
        console.log("Сортировка по дате добавления (реверс)");
    };

    const sortTasksByAlphabet = () => {
        taskListVisuality.value.sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
        console.log("Сортировка по алфавиту (ABC)");
    };

    const sortTasksByAlphabetDESC = () => {
        taskListVisuality.value.sort((a, b) => {
            return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
        });
        console.log("Сортировка по алфавиту (CBA)");
    };

    const sortTasksByChecked = () => {
        taskListVisuality.value.sort((a, b) => {
            return a.checked && !b.checked
                ? -1
                : !a.checked && b.checked
                ? 1
                : 0;
        });
        console.log("Сортировка по выполненным заданиям");
    };

    const sortTasksByCheckedDESC = () => {
        taskListVisuality.value
            .sort((a, b) => {
                return a.checked && !b.checked
                    ? -1
                    : !a.checked && b.checked
                    ? 1
                    : 0;
            })
            .reverse();
        console.log("Сортировка по невыполненным заданиям");
    };

    const sortMethods = [
        sortTasksByDate,
        sortTasksByDateDESC,
        sortTasksByAlphabet,
        sortTasksByAlphabetDESC,
        sortTasksByChecked,
        sortTasksByCheckedDESC,
    ];

    const sortMethodsCount = computed(() => sortMethods.length);

    const sortTasks = (sortMethodId) => {
        sortMethods[sortMethodId]();
    };

    // Возвращаем все состояния, геттеры и действия
    return {
        tasks,
        taskListVisuality,
        taskCount,
        sortMethods,
        sortMethodsCount,
        addTaskTemplate,
        setTaskName,
        checkTask,
        searchTask,
        removeTask,
        sortTasks,
    };
});
