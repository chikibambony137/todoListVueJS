<template>
    <div class="item" >
        <CheckBox class="item__checkbox"></CheckBox>
        <form v-if="task.name == undefined" @submit.prevent="accessNameTask(task.id, this.newItemInputName)">
            <input
                class="item__input"
                v-model="newItemInputName"
                placeholder="Введите задание" />
        </form>
        <span v-else class="item__name"> {{ task.name }} </span>
        <TrashButton
            class="item__trash-bttn"
            @click="removeItem(task.id)"></TrashButton>
    </div>
</template>

<script>
    import CheckBox from "../../../components/ui/buttons/CheckBox.vue";
    import TrashButton from "../../../components/ui/buttons/TrashButton.vue";

    export default {
        emits: ['add', 'remove'],
        data() {
            return {
                newItemInputName: "",
            };
        },
        props: {
            task: {
                type: Object,
                required: true,
            },
        },
        components: {
            CheckBox,
            TrashButton,
        },
        methods: {
            removeItem(taskId) {
                this.$emit("remove", taskId);
                console.log(`item with id ${taskId} was removed!`);
            },
            accessNameTask(taskId, taskName) {
                this.$emit("add", taskId, taskName);
                console.log(`item ${taskName} was added!`);
                this.newItemInputName = "";
            },
        },
    };
</script>

<style lang="scss" scoped>
    @use "../../../assets/var.scss";

    .item {
        @include var.flexbox;
        justify-content: space-between;
        flex-wrap: nowrap;
        gap: 20px;

        width: 100%;

        padding: 9px 20px 9px 20px;
        border-radius: 10px;

        background-color: var.$list-item-background;
    }

    form {
        width: 100%;
        .item__input {
            width: 100%;
        }
    }

    .item__name {
        flex: 1;

        color: var.$default-text-color;
        font-family: var.$default-font-family;
        font-size: 1.5rem;
        overflow-wrap: anywhere;
    }

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
</style>
