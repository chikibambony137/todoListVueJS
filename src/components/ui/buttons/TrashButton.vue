<template>
    <button class="trash-bttn">
        <img src="../icons/trash.png" alt="trash" draggable="false" />
    </button>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    @use "../../../assets/var.scss";

    .trash-bttn {
        @include var.flexbox;

        min-width: 32px;
        width: 32px;
        min-height: 32px;
        height: 32px;

        border-radius: 10px;
        border: none;
        background-color: transparent;

        img {
            width: 28px;
            height: auto;
            transition: all 0.2s ease-in-out;
            opacity: 50%;
        }

        &:hover {
            background-color: var.$trash-bttn-hover;
            img {
                opacity: 100%;
                width: 25px;

                animation: var.$trash-bttn-hover-animation;
            }
        }

        &:active {
            background-color: var.$trash-bttn-active;

            img {
                width: 15px;
                animation: none;
            }
        }
    }

    @keyframes trash-hover {
        from {
            transform: rotate(-15deg);
        }
        50% {
            transform: rotate(15deg);
        }
        to {
            transform: rotate(-15deg);
        }
    }
</style>
