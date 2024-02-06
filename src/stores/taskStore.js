import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { GET_TASKS } from "../../api/task"; // Ensure this path is correct and GET_DATA is properly implemented
import { POST_TASK } from "../../api/task";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);
  const isLoading = ref(false);
  // Fetch tasks data from API
  const fetchData = async () => {
    isLoading.value = true;
    setTimeout(async () => {
      try {
        const data = await GET_TASKS();
        console.log("data", data);
        tasks.value = data;
      } catch (error) {
        console.error("fetch data error", error);
      } finally {
        isLoading.value = false;
      }
    }, 2000);
  };

  // Computed properties for filtering favorites and calculating counts
  const fav = computed(() => tasks.value.filter((t) => t.isFav));
  const favCount = computed(() => fav.value.length);
  const totalCount = computed(() => tasks.value.length);

  // Function to add a new task to API
  const addTask = async (task) => {
    try {
      const response = await POST_TASK(task);
      task.value.push(task);
    } catch (error) {
      console.error("post add new task error", error);
    }
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
    isLoading,
    tasks,
    fav,
    favCount,
    totalCount,
    addTask,
    removeTask,
    toggleFav,
  };
});
