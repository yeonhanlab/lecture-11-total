import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import CoinPage from "../pages/coin/CoinPage.tsx";
import MovieHome from "../pages/Movie/MovieHome.tsx";
import BoardPage from "../pages/Board/BoardPage.tsx";
import RocketPage from "../pages/Rocket/RocketPage.tsx";
import BookPage from "../pages/Book/BookPage.tsx";
import MovieSearch from "../pages/Movie/MovieSearch.tsx";
import MovieDetail from "../pages/Movie/MovieDetail.tsx";
import BoardDetail from "../pages/Board/BoardDetail.tsx";
import BookDetail from "../pages/Book/BookDetail.tsx";
import BookSearch from "../pages/Book/BookSearch.tsx";

const GetRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "todo", element: <TodoPage /> },
            { path: "coin", element: <CoinPage /> },
            { path: "Movie", element: <MovieHome /> },
            { path: "movie-search", element: <MovieSearch /> },
            { path: "movie-detail/:id", element: <MovieDetail />},
            { path: "Board", element: <BoardPage /> },
            { path: "board-detail/:id", element: <BoardDetail />},
            { path: "Rocket", element: <RocketPage /> },
            { path: "Book", element: <BookPage /> },
            { path: "book-search", element: <BookSearch />},
            { path: "book-detail/:id", element: <BookDetail />}

            //     "/"로 시작하는 주소로 사용자가 들어왔다면,
            //     <MainLayout /> 먼저 화면에 출력되고,
            //     주소가 "/"만 있다면, <Home /> 을 덧붙이고,
            //     주소가 "/" + "todo" 라면, <TodoPage /> 를 덧붙인다
        ],
    },
]);

export default GetRouter;
