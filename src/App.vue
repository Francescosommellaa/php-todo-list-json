<script>
import axios from 'axios';

export default {
    data() {
        return {
        tasks: [],
        newTask: ''
        };
    },
    created() {
        this.fetchTasks();
    },
    methods: {
        fetchTasks() {
            axios.get('src/server/tasks.php')
            .then(response => {
                const tasks = Array.isArray(response.data) ? response.data : [];
                this.tasks = tasks.filter(task => task.text && task.text.trim() !== '');
            });
        },

        addTask() {
            if (this.newTask.trim() === '') {
                return;
        }
        axios.post('src/server/tasks.php', {
            action: 'add',
            text: this.newTask
        }).then(response => {
            const tasks = Array.isArray(response.data) ? response.data : [];
            this.tasks = tasks.filter(task => task.text && task.text.trim() !== '');
            this.newTask = '';
        });
    },

    removeTask(index) {
        axios.post('src/server/tasks.php', {
            action: 'remove',
            index: index
        }).then(response => {
            this.tasks = response.data.filter(task => task.text && task.text.trim() !== '');
        });
    },

    toggleTask(index) {
        axios.post('src/server/tasks.php', {
        action: 'toggle',
        index: index
        }).then(response => {
            const tasks = Array.isArray(response.data) ? response.data : [];
            this.tasks = tasks.filter(task => task.text && task.text.trim() !== '');
        });
    }
}}
</script>


<template>
    <div>
        <h1>Todo List</h1>
        <ul>
            <li v-for="(task, index) in tasks" :key="index">
                <span :class="{ completed: task.completed }" @click="toggleTask(index)">{{ task.text }}</span>
                <button @click="removeTask(index)">X</button>
            </li>
        </ul>
        <input type="text" v-model="newTask" placeholder="Inserisci elemento...">
        <input type="submit" @click="addTask" value="Inserisci">
    </div>
</template>

<style scoped>
    .completed {
        text-decoration: line-through;
    }
</style>
