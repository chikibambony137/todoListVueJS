<template>
    <button class="add-bttn">
        <img src="../icons/addbttn.png" alt="add" draggable="false" />
    </button>
</template>

<script>
    export default {
        name: "AddButton"
    };
</script>

<style scoped lang="scss">
    @use "../../../assets/var.scss";

    .add-bttn {
        @include var.flexbox;

        min-width: 50px;
        width: 50px;
        min-height: 50px;

        border-radius: 10px;
        border: none;

        transition: width 0.2s ease-in-out;
        background-color: var.$add-bttn-background;

        img {
            width: 38px;
            height: auto;
            transition: width 0.2s ease-in-out, height 0.2s ease-in-out,
                rotate 0.2s ease-in-out;
        }

        &:hover {
            background-color: var.$add-bttn-hover;

            width: 70px;
            @media (max-width: 691px) {
                width: 50px;
            }
        }

        &:active {
            background-color: var.$add-bttn-active;

            img {
                rotate: 180deg;
            }
        }

        @media (max-width: 691px) {
            min-width: 32px;
            width: 32px;
            min-height: 32px;

            img {
                width: 30px;
            }
        }
    }
</style>
