import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
// const Registration = lazy(() => import("pages/auth/registration"));
// const Login = lazy(() => import("pages/auth/login"));
const SignIn = lazy(() => import("pages/auth/signIn"))
const Services = lazy(() => import("pages/services"))
const CreateServices = lazy(() => import("pages/services/create"))
const UpdateServices = lazy(() => import("pages/services/update"))
const Projects = lazy(() => import("pages/projects"))
const CreateProjects = lazy(() => import("pages/projects/create"))
const UpdateProjects = lazy(() => import("pages/projects/update"))
const SocialNetworks = lazy(() => import("pages/social-network"))
const Info = lazy(() => import("pages/info"))
const CreateInfo = lazy(() => import("pages/info/create"))
const UpdateInfo = lazy(() => import("pages/info/update"))
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
    path: "/services-create",
    element: <CreateServices />,
  },
  {
    path: "/services-update/:id",
    element: <UpdateServices />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/projects-create",
    element: <CreateProjects />,
  },
  {
    path: "/projects-update/:id",
    element: <UpdateProjects />,
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
    path: "/info-create",
    element: <CreateInfo />,
  },
  {
    path: "/info-update",
    element: <UpdateInfo />,
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
