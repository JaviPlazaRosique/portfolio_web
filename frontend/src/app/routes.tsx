import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { SobreMi } from "./components/SobreMi";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "sobre-mi", Component: SobreMi },
      ],
    },
  ],
  { basename: import.meta.env.VITE_BASE_URL ?? "/" }
);
