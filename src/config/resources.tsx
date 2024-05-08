import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

/* These resources are gonna be path definitions that are gonna 
help refine reconginize the available actions for all our resources at specific paths,
actions are basically the paths that we can use to perform CRUD operations on a specific resource,
its like grouping the CRUD operations under a single name */
export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/new",
    edit: "/users/edit/:id",
    meta: {
      label: "Users",
      icon: <UserOutlined />,
    },
  },

  {
    name: "companies",
    list: "/companies",
    show: "/companies/:id",
    create: "/companies/new",
    edit: "/companies/edit/:id",

    meta: {
      label: "Companies",
      icon: <ShopOutlined />,
    },
  },
  {
    name: "tasks",
    list: "/tasks",
    // show: "/tasks/:id", // we won't have project id since we are going to show multiple projects
    create: "/tasks/new",
    edit: "/tasks/edit/:id",

    meta: {
      label: "Projects",
      icon: <ProjectOutlined />,
    },
  },
];
