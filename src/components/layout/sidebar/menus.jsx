import {
  FolderOutlined,
  HomeOutlined,
  ReadOutlined,
  FileTextOutlined,
  SmileOutlined,
  TeamOutlined,
  FontSizeOutlined,
  ContainerOutlined
} from "@ant-design/icons";

const menus = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "services",
    icon: <ReadOutlined />,
    label: "Services",
  },
  {
    key: "projects",
    icon: <FolderOutlined />,
    label: "Projects",
  },
  {
    key: "social-network",
    icon: <SmileOutlined />,
    label: "Social Networks",
  },
  {
    key: "info",
    icon: <FileTextOutlined />,
    label: "Info",
  },
  {
    key: "clients",
    icon: <TeamOutlined />,
    label: "Clients",
  },
  {
    key: "jobs",
    icon: <ContainerOutlined />,
    label: "Jobs",
  }
];

export default menus;
