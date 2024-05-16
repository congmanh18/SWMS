import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./modules/login/Login";
import EmployeeManagement from "./modules/home/EmployeeManagement";
import { ActionProvider } from "./modules/home/components/ActionContext";
import { Provider } from "react-redux";
import store from "./store/store";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<EmployeeManagement />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<EmployeeManagement />} />
    </Route>,
  ),
);
function App() {
  return (
    <>
      <Provider store={store}>
        <ActionProvider>
          <RouterProvider router={router} />
        </ActionProvider>
      </Provider>
    </>
  );
}

export default App;
