import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoView from "../views/Todos/TodoView.vue";
import TodoCreate from "../views/Todos/TodoCreate.vue";
import TodoEdit from "../views/Todos/TodoEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",

      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/todos",
      name: "todos",
      component: TodoView,
    },
    {
      path: "/todo/create",
      name: "todoCreate",
      component: TodoCreate,
    },
    {
      path: "/todos/:id/edit",
      name: "todoEdit",
      component: TodoEdit,
    },
  ],
});

export default router;
