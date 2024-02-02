<template>
  <main>
    <!-- heading -->
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- filter -->

    <div class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'fav'">Favorite Tasks</button>
    </div>

    <!-- Tasks Listing -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have total tasks {{ taskStore.totalCount }} to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'fav'">
      <p>You have total tasks {{ taskStore.favCount }} to do</p>
      <div v-for="task in taskStore.fav" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import TaskDetail from "./components/TaskDetail.vue";
import { useTaskStore } from "./stores/taskStore";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
// const { tasks } = storeToRefs(taskStore);
const filter = ref("all");
</script>

<style scoped></style>
