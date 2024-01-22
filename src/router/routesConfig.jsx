import { HeroesApp } from "../HeroesApp";
import { LoginPage } from "../auth";
import { MarvelPage,DcPage, SearchPage, HeroPage } from "../heroes";
import { Navigate} from "react-router-dom"
import { PublicRoute, PrivateRoute } from "./";

export const routesConfig =[
    {
      path: "/",
      element: 
        <PrivateRoute>
          <HeroesApp />
        </PrivateRoute>,
      children: [
        {
          path: "/marvel",
          element: <MarvelPage />,
        },
        {
          path: "/dc",
          element: <DcPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/hero/:id",
          element: <HeroPage />,
        },
        {
          path: "/",
          element: <Navigate to={"/marvel"} />,
        },
      ],
    },
    {
      path: "/login",
      element: 
        <PublicRoute>
          <LoginPage />
        </PublicRoute>,
    },    
    {
      path: "/*",
      element: <Navigate to={"/"} />,
    },    
  ];


