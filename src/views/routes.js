import Login from "./outlet/Login.js";
import Register from "./outlet/Register.js";

let routes = [
    {
      path: "/register",
      name: "Registrar",
      icon: "ni ni-circle-08 text-pink",
      component: Register,
      layout: "/auth"
    },
    {
      path: "/login",
      name: "Salir",
      icon: "ni ni-key-25 text-info",
      component: Login,
      layout: "/auth"
    }
  ];
  export default routes;
  