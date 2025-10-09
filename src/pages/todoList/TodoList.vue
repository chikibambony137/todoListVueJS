<template>
    <div class="content">
        <Header
            class="content__header"
            v-bind:taskList="taskStore"
            @search="searchItem"
            @addTaskTemplate="addTaskTemplate"></Header>
        <Main
            class="content__tasklist"
            v-bind:taskList="taskListVisuality"
            @remove="removeTask"
            @add="addTask"
            @inputFocus="
                (newItemTemplate) => (itemTemplate = newItemTemplate)
            "
            @checked="toggleCheckBoxTask"></Main>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useTaskStore } from "../../stores/taskStore";

    import Header from "./components/Header.vue";
    import Main from "./components/Main.vue";

    // Подключаем хранилище Pinia
    const taskStore = useTaskStore();

    // // original list of tasks
    // let taskList = ref(JSON.parse(localStorage.getItem("tasklist")) || []);

    // visuality list of tasks
    let taskListVisuality = ref([]);

    onMounted(() => {
        taskListVisuality.value = taskStore.tasks;
    });

    // if taskList is changed then he will be saved in localStorage
    watch(
        taskStore,
        () => {
            localStorage.setItem("taskList", taskStore.tasks);
            console.log('taskList was changed');
        },
        { deep: true }
    );

    /** removes task by from original taskList & taskListVisuality
     * @param {number} id
     */
    function removeTask(id) {
        taskStore.removeTask(id);

        taskListVisuality.value = taskListVisuality.value.filter(
            (task) => task.id != id
        );
    }

    /** sets name to task by id in taskList
     * @param {number} id
     * @param {string} name
     */
    function addTask(id, name) {
        taskStore.setTaskName(id, name);
    }

    /** filters taskList and changes taskListVisuality by name
     * @param {string} input
     */
    function searchItem(input) {
        if (input == "") {
            taskListVisuality.value = taskStore.tasks;
        } else {
            taskListVisuality.value = taskStore.tasks.filter((task) =>
                task.name?.toLowerCase().includes(input.toLowerCase())
            );
        }
    }

    /** ref to DOM input */
    const itemTemplate = ref(null);

    /** adds task template without name to start of taskList and focuses to DOM input */
    function addTaskTemplate() {
        taskListVisuality.value = taskStore.tasks;
        // taskStore.tasks.unshift({ id: Date.now(), checked: false });
        taskStore.addTask({ id: Date.now(), checked: false });
        setTimeout(() => {
            itemTemplate.value.focus();
        }, 500);
    }

    function toggleCheckBoxTask(checked, taskId) {
        taskStore.checkTask(checked, taskId);
    }
</script>

<style scoped lang="scss">
    @use "../../assets/var.scss";

    .content {
        display: flex;
        flex-direction: column;
        gap: 20px;

        width: 100%;
        max-width: 1280px;
        height: 96vh;
    }
</style>
