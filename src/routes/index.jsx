import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
// const Registration = lazy(() => import("pages/auth/registration"));
// const Login = lazy(() => import("pages/auth/login"));
const SignIn = lazy(() => import("pages/auth/signIn"))
const Services = lazy(() => import("pages/services"))
const Projects = lazy(() => import("pages/projects"))
const SocialNetworks = lazy(() => import("pages/social-network"))
const Info = lazy(() => import("pages/info"))
const Clients = lazy(() => import("pages/clients"))
const Jobs = lazy(() => import("pages/job"))

const authRoutes = [
  // {
  //   path: "/auth/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/auth/registration",
  //   element: <Registration />,
  // },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [{}]
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/social-network",
    element: <SocialNetworks />,
  },
  {
    path: "/info",
    element: <Info />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  }
];

export { authRoutes, privateRoutes };
