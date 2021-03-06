/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

import Vue from "vue";
import Router from "vue-router";

import Home from "../components/site/home/home";
import ClientExtBlog from "../components/site/collection/collection";
import Story from "../components/site/story/story";

import Admin from "../components/admin/admin";
import AdminHome from "../components/admin/home/home.admin";
import AdminBlog from "../components/admin/blog/blog";
import AdminExtBlog from "../components/admin/ext_blog/ext";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {path: "/", component: Home},
    {path: "/story", component: Story},
    {path: "/links", component: ClientExtBlog},
    {
      path: "/admin",
      component: Admin,
      children: [
        {
          path: "",
          component: AdminHome
        },
        {
          path: "blog",
          component: AdminBlog
        },
        {
          path: "ext",
          component: AdminExtBlog
        }
      ]
    },
    {path: "*", component: Home}
  ]
});
