<template>
    <div class="content">
        <Header
            class="content__header"
            v-bind:taskList="taskList"
            @search="searchItem"
            @addTaskTemplate="addTaskTemplate"></Header>
        <Main
            class="content__tasklist"
            v-bind:taskList="taskListVisuality"
            @remove="removeTask"
            @add="addTask"
            @inputFocus="
                (newItemTemplate) => (itemTemplate = newItemTemplate)
            "></Main>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from "vue";

    import Header from "./components/Header.vue";
    import Main from "./components/Main.vue";

    // original list of tasks
    let taskList = ref(JSON.parse(localStorage.getItem("tasklist")) || []);
    // visuality list of tasks
    let taskListVisuality = ref([]);

    onMounted(() => {
        taskListVisuality.value = taskList.value;
    });

    // if taskList is changed then he will be saved in localStorage
    watch(
        taskList,
        (newValue) => {
            localStorage.setItem("tasklist", JSON.stringify(newValue));
        },
        { deep: true }
    );

    /** removes task by from original taskList & taskListVisuality
     * @param {number} id
     */
    function removeTask(id) {
        taskList.value = taskList.value.filter((task) => task.id != id);
        taskListVisuality.value = taskListVisuality.value.filter(
            (task) => task.id != id
        );
    }

    /** sets name to task by id in taskList
     * @param {number} id
     * @param {string} name
     */
    function addTask(id, name) {
        const task = taskList.value.filter((task) => task.id == id)[0];
        task.name = name;
    }

    /** filters taskList and changes taskListVisuality by name
     * @param {string} input
     */
    function searchItem(input) {
        if (input == "") {
            taskListVisuality.value = taskList.value;
        } else {
            taskListVisuality.value = taskList.value.filter((task) =>
                task.name?.toLowerCase().includes(input.toLowerCase())
            );
        }
    }

    /** ref to DOM input */
    const itemTemplate = ref(null);

    /** adds task template without name to start of taskList and focuses to DOM input */
    function addTaskTemplate() {
        taskListVisuality.value = taskList.value;
        taskList.value.unshift({ id: Date.now() });
        setTimeout(() => {
            itemTemplate.value.focus();
        }, 500);
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
