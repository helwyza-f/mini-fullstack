import "./App.css";
import Users from "./components/Users";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./components/Test";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
