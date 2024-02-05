import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { GET_DATA } from "../../api/task";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([
    { id: 1, title: "Play video console game", isFav: true },
    { id: 2, title: "Work the gog", isFav: false },
    { id: 3, title: "Read the book", isFav: true },
  ]);

  const fav = computed(() => tasks.value.filter((t) => t.isFav === true));

  const favCount = computed(() =>
    tasks.value.reduce((prev, current) => {
      return current.isFav ? prev + 1 : prev;
    }, 0)
  );

  const totalCount = computed(() => tasks.value.length);

  const addTask = (task) => {
    console.log("value", task);
    tasks.value.push(task);
  };

  const removeTask = (id) => {
    if ((tasks.value = tasks.value.filter((t) => t.id !== id))) {
      alert(`Task with ID ${id} has been removed`);
    } else {
      // console.warn(`No task with the ID ${id}`);
      return;
    }
  };

  const toggleFav = (id) => {
    const task = tasks.value.find((t) => t.id == id);
    task.isFav = !task.isFav;
    console.log("value", task);
  };

  return {
    tasks,
    fav,
    favCount,
    totalCount,
    addTask,
    removeTask,
    toggleFav,
  };

  // state: () => ({
  //   task: [
  //     { id: 1, title: "Buy one get one", isFev: true },
  //     { id: 2, title: "Buy two get two", isFev: false },
  //   ],
  // }),
  // getters: {
  //   fav() {
  //     return this.task.filter((t) => t.isFev);
  //   },
  //   favCount() {
  //     return this.task.reduce((prev, current) => {
  //       return current.isFev ? prev + 1 : prev;
  //     }, 0);
  //   },
  //   totalCount(state) {
  //     return state.task.length;
  //   },
  // },
});
