<template>
    <div class="root">
        <TodoList></TodoList>
    </div>
</template>

<script>
    import TodoList from "./pages/todoList/TodoList.vue";

    export default {
        components: {
            TodoList,
        },
    };
</script>

<style lang="scss">
    @use "./assets/var.scss";

    .root {
        @include var.flexbox;

        width: 100%;

        padding: 20px 20px 20px 20px;
    }
</style>
