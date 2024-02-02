import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([
    { id: 1, title: "Buy one get one", isFev: true },
    { id: 2, title: "Buy two get two", isFev: false },
  ]);

  const fav = computed(() => tasks.value.filter((t) => t.isFev === true));

  const favCount = computed(() =>
    tasks.value.reduce((prev, current) => {
      return current.isFev ? prev + 1 : prev;
    }, 0)
  );

  const totalCount = computed(() => tasks.value.length);

  return {
    tasks,
    fav,
    favCount,
    totalCount,
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
