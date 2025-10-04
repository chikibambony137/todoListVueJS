<template>
    <button class="sort-bttn">
        <img src="../icons/sort (1).png" alt="sort" draggable="false" />
    </button>
</template>

<script>
    export default {
        name: "SortButton"
    };
</script>

<style scoped lang="scss">
    @use "../../../assets/var.scss";

    .sort-bttn {
        @include var.flexbox;

        min-width: 50px;
        width: 50px;
        min-height: 50px;

        border-radius: 10px;
        border: none;

        background-color: var.$sort-bttn-background;

        img {
            width: 30px;
            height: auto;
            transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
            opacity: 75%;
        }

        &:hover {
            background-color: var.$sort-bttn-hover;
        }

        &:active {
            background-color: var.$sort-bttn-active;

            img {
                width: 27px;
            }
        }

        @media (max-width: 691px) {
            min-width: 32px;
            width: 32px;
            min-height: 30px;

            img {
                width: 25px;
            }
        }
    }
</style>
