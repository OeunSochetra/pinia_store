<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need something..." v-model="newTask" />
    <button type="submit">Add Todo</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();

const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      title: newTask.value,
      isFav: false,
      id: Math.floor(Math.random() * 1000000),
    });
    newTask.value = "";
  } else {
    return;
  }
};
</script>

<style scoped></style>
