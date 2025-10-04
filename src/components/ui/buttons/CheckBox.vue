<template>
    <label class="container">
        <input type="checkbox" />
        <div class="checkmark"></div>
    </label>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    @use "../../../assets/var.scss";

    /* Hide the default checkbox */
    .container input {
        @include var.flexbox;
        display: none;
    }

    .container {
        display: block;
        position: relative;
        cursor: pointer;
        font-size: 20px;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }

    /* Create a custom checkbox */
    .checkmark {
        height: 32px;
        width: 32px;
        background-color: transparent;
        border-radius: 10px;
        transition: all 0.25s;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: var.$checkbox-color;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        transform: rotate(0deg);
        border: 0.1em solid var.$checkbox-color;
        left: 0;
        top: 0;
        height: 32px;
        width: 32px;
        border-radius: 10px;
        box-sizing: border-box;
        transition: all 0.25s, border-width 0.1s;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        left: 0.6em;
        top: 0.25em;
        width: 0.45em;
        height: 0.9em;
        border-color: #fff0 white white #fff0;
        border-width: 0 0.15em 0.15em 0;
        border-radius: 0em;
        transform: rotate(45deg);
    }
</style>
