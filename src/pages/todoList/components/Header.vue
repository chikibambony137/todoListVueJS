<template>
    <header class="header">
        <div class="header__title">
            <h1 class="header__h1">
                <a href="/" draggable="false">TodoList</a>
            </h1>
        </div>
        <div class="header__toolbar">
            <SearchBar
                class="header__search-bar"
                @search="(input) => emit('search', input)"></SearchBar>
            <sort-button
                class="header__sort-bttn"
                @click="
                    console.log(localStorage.getItem('tasklist'))
                "></sort-button>
            <add-button
                class="header__add-bttn"
                @click="emit('addTaskTemplate')"></add-button>
        </div>
    </header>
</template>

<script setup>
    import { defineProps } from "vue";
    import SearchBar from "../../../components/blocks/SearchBar.vue";

    const props = defineProps({
        taskList: {
            type: Array,
            required: true,
        },
    });

    const emit = defineEmits(["addTaskTemplate", "search"]);
</script>

<style scoped lang="scss">
    @use "/src/assets/var.scss";

    .header {
        @include var.flexbox;
        gap: 10px;

        width: 100%;
        height: auto;
        border-radius: 10px;
        padding: 10px 20px;

        background-color: var.$block-background-color;
    }

    .header__title {
        @include var.flexbox;

        width: 30%;
        min-width: 150px;
        height: 60px;

        @media (max-width: 691px) {
            height: 40px;
        }
    }

    .header__h1 {
        font-family: var.$default-font-family;
        font-weight: 500;
        font-size: 2.5rem;
        margin: 0;

        a {
            text-decoration: none;
            color: var.$default-text-color;
        }
    }

    .header__toolbar {
        @include var.flexbox;
        justify-content: right;
        gap: 20px;
        flex: 1;

        width: 70%;
        min-width: 200px;
        height: 60px;

        @media (max-width: 691px) {
            height: 40px;
            gap: 10px;
        }
    }

    .header__search-bar {
        flex: 1;
        width: 60%;
        min-width: 100px;
        max-width: 500px;
    }
</style>
