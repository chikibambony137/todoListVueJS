<template>
    <div class="search-bar">
        <form
            class="search-bar__form"
            @submit.prevent="search">
            <div class="search-bar__field">
                <input v-model="searchInput" placeholder="Search..." />
            </div>
            <button
                class="search-bar__bttn"
                type="submit"
                v-if="!isLoading">
                <img
                    src="../ui/icons/search (1) 1.png"
                    alt="search"
                    draggable="false" />
            </button>
            <Loading v-else />
        </form>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import Loading from "../ui/buttons/Loading.vue";

    const searchInput = ref("");
    const isLoading = ref(false);

    const timeoutID = ref(function () {});
    const defaultSearchDelay = 500;
    const searchDelay = ref(defaultSearchDelay);

    const emit = defineEmits(["search"]);

    function search() {
        clearTimeout(timeoutID.value);
        emit("search", searchInput.value);
        isLoading.value = false;
    }

    watch(
        searchInput,
        () => {
            clearTimeout(timeoutID.value);
            isLoading.value = true;

            if (searchInput.value == "") searchDelay.value = 0;
            else searchDelay.value = defaultSearchDelay;

            timeoutID.value = setTimeout(
                search,
                searchDelay.value,
                searchInput.value
            );
        },
        { deep: true }
    );
</script>

<style scoped lang="scss">
    @use "../../assets/var.scss";

    .search-bar {
        @include var.flexbox;
        justify-content: right;

        width: 500px;
        height: 50px;
        border-radius: 10px;

        padding-left: 1em;
        box-sizing: border-box;

        background-color: var.$search-bar-background;

        @media (max-width: 691px) {
            height: 30px;
        }
    }

    .search-bar__form {
        @include var.flexbox;
        justify-content: right;
        flex-wrap: nowrap;

        width: 100%;
        height: 100%;
    }

    .search-bar__field {
        @include var.flexbox;

        width: 84%;
        height: 100%;

        input,
        input:active {
            font-family: var.$default-font-family;
            color: var.$default-text-color;
            font-size: 1.5rem;
            font-weight: 300;
            letter-spacing: 2px;

            width: 100%;

            background-color: inherit;
            border: none;
            outline: none;

            ::placeholder {
                color: var.$search-placeholder-text-color;
            }
        }
    }

    .search-bar__bttn {
        @include var.flexbox;

        min-width: 50px;
        min-height: 50px;
        border-radius: 10px;

        background-color: transparent;
        border: none;

        img {
            width: 30px;
            height: auto;
            transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
        }

        &:hover {
            background-color: var.$search-bttn-hover-color;

            img {
                width: 35px;
            }
        }

        &:active {
            background-color: var.$search-bttn-active-color;

            img {
                width: 28px;
            }
        }

        @media (max-width: 691px) {
            min-width: 30px;
            min-height: 30px;

            img {
                width: 20px;
            }
        }
    }
</style>
