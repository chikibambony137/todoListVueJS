<template>
    <main class="tasklist">
        <ul class="tasklist__list">
            <TaskItem
                v-for="task in taskList"
                v-bind:key="task.id"
                class="tasklist__item"
                v-bind:task="task"
                @remove="(id) => this.$emit('remove', id)"
                @add="(id, name) => this.$emit('add', id, name)"
                @inputFocus="
                    (newItemInput) => this.$emit('inputFocus', newItemInput)
                "
                @checked="
                    (checked, taskId) => this.$emit('checked', checked, taskId)
                "></TaskItem>
        </ul>
    </main>
</template>

<script setup>
    import { defineProps } from "vue";
    import TaskItem from "./TaskItem.vue";

    const props = defineProps({
        taskList: {
            type: Array,
            required: true,
        },
    });
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
