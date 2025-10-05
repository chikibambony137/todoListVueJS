<template>
    <div class="content">
        <Header
            class="content__header"
            v-bind:taskList="taskList"
            @search="searchItem"
            @addTaskTemplate="addTaskTemplate"></Header>
        <Main
            class="content__tasklist"
            v-bind:taskList="taskListVisuality"
            @remove="removeTask"
            @add="addTask"
            @inputFocus="(newItemTemplate) => itemTemplate = newItemTemplate"></Main>
    </div>
</template>

<script>
    import Header from "./components/Header.vue";
    import Main from "./components/Main.vue";
    export default {
        data() {
            return {
                taskList: JSON.parse(localStorage.getItem("tasklist")),
                taskListVisuality: [],

                itemTemplate: ""
            };
        },
        methods: {
            removeTask(id) {
                this.taskList = this.taskList.filter((task) => task.id != id);
                this.taskListVisuality = this.taskListVisuality.filter(
                    (task) => task.id != id
                );
                localStorage.setItem("tasklist", JSON.stringify(this.taskList));
            },
            addTask(id, name) {
                const task = this.taskList.filter((task) => task.id == id)[0];
                task.name = name;
                localStorage.setItem("tasklist", JSON.stringify(this.taskList));
            },
            searchItem(input) {
                this.taskList = JSON.parse(localStorage.getItem("tasklist"));
                const filteredList = this.taskList.filter((task) =>
                    task.name.toLowerCase().includes(input.toLowerCase())
                );
                this.taskListVisuality = filteredList;
            },
            addTaskTemplate() {
                this.taskListVisuality = this.taskList;
                this.taskList.unshift({ id: Date.now() });
                setTimeout(() => {
                    this.itemTemplate?.focus();
                }, 500);
            },
        },
        mounted() {
            this.taskListVisuality = this.taskList;
        },
        components: {
            Header,
            Main,
        },
        watch: {
            taskList: {
                handler(newList) {
                    console.log(newList);
                },
                deep: true,
            },
        },
    };
</script>

<style scoped lang="scss">
    @use "../../assets/var.scss";

    .content {
        display: flex;
        flex-direction: column;
        gap: 20px;

        width: 100%;
        max-width: 1280px;
        height: 96vh;
    }
</style>
