import Login from "views/outlet/login";
import Register from "views/outlet/register";
import Tables from "views/outlet/tables";

let routes = [
  {
    path: "/tables",
    name: "Contactos",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/register",
    name: "Registrar",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Salir",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
