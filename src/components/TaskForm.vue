<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need something..." v-model="newTask" />
    <button type="submit">Add Todo</button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();

const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      title: newTask.value,
      isFav: false,
      id: Math.floor(Math.random() * 1000000).toString(),
    });
    newTask.value = "";
  } else {
    return;
  }
};

// add watch for data change to update data in UI without fresh the page

// watch(
//   () => taskStore.tasks,
//   (newTask, oldTask) => {
//     console.log("Task changed ", newTask, oldTask);
//   },
//   { deep: true }
// );
</script>

<style scoped></style>
