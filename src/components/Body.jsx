import React from "react";
import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TvProgram from "./TvProgram";
import Films from "./Films";
import Search from "./Search";
import WatchPage from "./WatchPage";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <Browse />,
      path: "/browse",
    },
    {
      element: <TvProgram />,
      path: "/tvprograms",
    },
    {
      element: <Films />,
      path: "/films",
    },
    {
      element: <Search />,
      path: "/search",
    },
    {
      element: <WatchPage />,
      path: "/watch/:movieId",
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
