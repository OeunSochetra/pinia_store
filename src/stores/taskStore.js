import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { GET_DATA } from "../../api/task"; // Ensure this path is correct and GET_DATA is properly implemented

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  // Fetch tasks data from API
  const fetchData = async () => {
    try {
      const data = await GET_DATA();
      tasks.value = data;
    } catch (error) {
      console.error("fetch data error", error);
    }
  };

  // Computed properties for filtering favorites and calculating counts
  const fav = computed(() => tasks.value.filter((t) => t.isFav));
  const favCount = computed(() => fav.value.length);
  const totalCount = computed(() => tasks.value.length);

  // Function to add a new task
  const addTask = (task) => {
    tasks.value.push(task);
  };

  // Function to remove a task by id
  const removeTask = (id) => {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
      alert(`Task with ID ${id} has been removed`);
    }
  };

  // Function to toggle the favorite status of a task by id
  const toggleFav = (id) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      task.isFav = !task.isFav;
    }
  };

  return {
    fetchData,
    tasks,
    fav,
    favCount,
    totalCount,
    addTask,
    removeTask,
    toggleFav,
  };
});
