<template>
    <main class="tasklist">
        <ul class="tasklist__list">
            <TaskItem
                class="tasklist__item"
                v-for="task in taskStore.taskListVisuality"
                v-bind:key="task.id"
                v-bind:task="task"></TaskItem>
        </ul>
    </main>
</template>

<script setup>
    import { useTaskStore } from "../../../stores/taskStore";
    import TaskItem from "./TaskItem.vue";

    const taskStore = useTaskStore();
</script>

<style lang="scss" scoped>
    @use "/src/assets/var.scss";

    .tasklist {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: 85dvh;
        padding: 20px;

        border-radius: 10px;
        overflow: scroll;

        box-sizing: border-box;
        background-color: var.$block-background-color;
    }

    .tasklist__list {
        @include var.flexbox;
        flex-direction: column;

        list-style: none;
        margin: 0;
        padding: 0;
        gap: 20px;
    }

    .tasklist__item {
        @media (max-width: 691px) {
            padding: 2px;
        }
    }
</style>
