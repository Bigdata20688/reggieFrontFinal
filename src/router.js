import Vue from "vue";
import Router from "vue-router";
import Login from "./views/LoginView.vue";
import Dashboard from "./views/DashboardView.vue";
import EmployeeManagement from "./views/EmployeeManagement.vue";
import DishManagement from "./views/DishManagement.vue";
import SetMealManagement from "./views/SetMealManagement.vue";
import AddSetMeal from "@/components/AddSetMeal";
import CategoryManagement from "./views/CategoryManagement.vue";
import OrderManagement from "./views/OrderManagement.vue";
import AddEmployee from "@/components/AddEmployee";
import AddDish from "@/components/AddDish";
import ElementUITableTest from "@/views/ElementUITableTest";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "login",
            component: Login,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            children: [
                {
                    path: "employee-management",
                    name: "employee-management",
                    component: EmployeeManagement,
                },
                {
                    path: "add-employee",
                    name: "add-employee",
                    component: AddEmployee,
                },
                {
                    path: "dish-management",
                    name: "dish-management",
                    component: DishManagement,
                },
                {
                    path: "add-dish",
                    name: "add-dish",
                    component: AddDish,
                },
                {
                    path: "set-meal-management",
                    name: "set-meal-management",
                    component: SetMealManagement,
                },
                {
                    path: "add-set-meal",
                    name: "add-set-meal",
                    component: AddSetMeal,
                },
                {
                    path: "category-management",
                    name: "category-management",
                    component: CategoryManagement,
                },
                {
                    path: "order-management",
                    name: "order-management",
                    component: OrderManagement,
                },
                {
                    path: "element-ui-table-test",
                    name: "element-ui-table-test",
                    component: ElementUITableTest,
                },
            ],
        },
    ],
});
