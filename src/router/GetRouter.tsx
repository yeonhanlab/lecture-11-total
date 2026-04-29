import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

const GetRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "todo", element: <TodoPage /> },

        //     "/"로 시작하는 주소로 사용자가 들어왔다면,
        //     <MainLayout /> 먼저 화면에 출력되고,
        //     주소가 "/"만 있다면, <Home /> 을 덧붙이고,
        //     주소가 "/" + "todo" 라면, <TodoPage /> 를 덧붙인다
        ],
    },
]);

export default GetRouter;