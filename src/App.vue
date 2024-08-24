<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      newTask: ''
    };
  }
}
</script>

<template>
  <div>
    <h1>Todo List</h1>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <span :class="{ completed: task.completed }">{{ task.text }}</span>
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
