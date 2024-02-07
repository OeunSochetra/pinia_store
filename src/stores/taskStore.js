import { defineStore } from "pinia";
import { computed, ref } from "vue";
// Ensure this path is correct and GET_DATA is properly implemented
import { GET_TASKS, POST_TASK, DELETE_TASK, TOGGLE_FAV } from "../../api/task";

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
    }, 1000);
  };

  // Computed properties for filtering favorites and calculating counts
  const fav = computed(() => tasks.value.filter((t) => t.isFav));
  const favCount = computed(() => fav.value.length);
  const totalCount = computed(() => tasks.value.length);

  // Function to add a new task to API
  const addTask = async (task) => {
    try {
      const response = await POST_TASK(task);
      task.value?.push(task);
      await fetchData(); // after add new task call this to fetch data to refresh UI
    } catch (error) {
      console.error("post add new task error", error);
    }
  };

  // Function to remove a task by id
  const removeTask = async (id) => {
    try {
      const response = await DELETE_TASK(id);
      tasks.value = tasks.value.filter((t) => {
        return t.id !== id;
      });
    } catch (error) {
      console.error("Could not delete the Task", error);
    }
  };

  // Function to toggle the favorite status of a task by id
  const toggleFav = async (id) => {
    const task = tasks.value.find((t) => t.id === id);

    if (task) {
      try {
        const updateToggle = await TOGGLE_FAV(id, !task.isFav);
        // Assuming the server returns the updated task, directly update the task in the local state
        Object.assign(task, updateToggle);
      } catch (error) {
        "Failed to toggle favorite status", error;
      }
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
