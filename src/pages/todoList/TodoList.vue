<template>
    <div class="content">
        <Header class="content__header"></Header>
        <Main class="content__tasklist"></Main>
    </div>
</template>

<script setup>
    import { onMounted, watch } from "vue";
    import { useTaskStore } from "../../stores/taskStore";

    import Header from "./components/Header.vue";
    import Main from "./components/Main.vue";

    // Подключаем хранилище Pinia
    const taskStore = useTaskStore();

    onMounted(() => {
        taskStore.taskListVisuality = taskStore.tasks;
    });

    // if taskList is changed then he will be saved in localStorage
    watch(
        taskStore.tasks,
        () => {
            localStorage.setItem("taskList", taskStore.tasks);
            console.log("taskList was changed");
        },
        { deep: true }
    );
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
