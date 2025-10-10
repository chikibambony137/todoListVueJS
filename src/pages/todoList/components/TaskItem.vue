<template>
    <div class="item">
        <CheckBox
            class="item__checkbox"
            @checked="(checked) => check(checked, task.id)"
            :checked="task.checked"></CheckBox>
        <form
            v-if="task.name == undefined"
            @submit.prevent="setName(task.id, newItemInputName)">
            <input
                ref="newItemInput"
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

<script setup>
    import { ref, useTemplateRef } from "vue";

    import { useTaskStore } from "../../../stores/taskStore";

    import CheckBox from "../../../components/ui/buttons/CheckBox.vue";
    import TrashButton from "../../../components/ui/buttons/TrashButton.vue";

    const taskStore = useTaskStore();

    const props = defineProps({
        task: {
            type: Object,
            required: true,
        },
    });

    const newItemInputName = ref("");

    function check(checked, id) {
        taskStore.checkTask(checked, id);
    }

    function removeItem(taskId) {
        taskStore.removeTask(taskId);
    }

    function setName(taskId, taskName) { 
        taskStore.setTaskName(taskId, taskName);
        newItemInputName.value = "";
    }

    const newItemInput = useTemplateRef("newItemInput"); // for focus WIP
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
