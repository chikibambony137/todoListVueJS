<template>
    <div class="root">
        <TodoList></TodoList>
    </div>
</template>

<script setup>
    import TodoList from "./pages/todoList/TodoList.vue";

</script>

<style lang="scss">
    @use "./assets/var.scss";

    .root {
        @include var.flexbox;

        width: 100%;

        padding: 20px 20px 20px 20px;
    }
</style>
