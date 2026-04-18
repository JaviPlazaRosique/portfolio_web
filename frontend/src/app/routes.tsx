import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { SobreMi } from "./components/SobreMi";
import { CalculadoraFinOps } from "./components/CalculadoraFinOps";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "sobre-mi", Component: SobreMi },
      { path: "calculadora-finops", Component: CalculadoraFinOps },
    ],
  },
]);
