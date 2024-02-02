<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons">delete</i>
      <i class="material-icons">favorite</i>
    </div>
  </div>
</template>

<script setup>
// export default {
//   props: ["task"],
// };
// const props = defineProps(["task"]);
defineProps({
  task: Object,
});
</script>

<style scoped></style>
