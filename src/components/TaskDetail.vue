<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="taskStore.removeTask(task.id)" class="material-icons"
        >delete</i
      >
      <i
        @click="taskStore.toggleFav(task.id)"
        :class="{ active: task.isFav }"
        class="material-icons"
        >favorite</i
      >
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";

// export default {
//   props: ["task"],
// };
// const props = defineProps(["task"]);
const taskStore = useTaskStore();

defineProps({
  task: Object,
});
</script>

<style scoped></style>
