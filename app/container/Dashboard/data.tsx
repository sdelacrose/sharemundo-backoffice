import {
  ActiveUser,
  BillingCard,
  BlockUser,
  Downfall,
  HomeBlackIcon,
  Progress,
  TotalUser,
} from "@/app/assets/icons";

export const homeBreadcrumb = [{ title: "Home", icon: HomeBlackIcon }];
export const statsData = [
  {
    icon: <ActiveUser />,
    title: "Active Users",
    value: "29,405",
    percentage: 15,
    isPositive: true,
    checkIcon: <Progress />,
  },
  {
    icon: <BlockUser />,
    title: "Blocked Users",
    value: "2.40%",
    percentage: -6,
    isPositive: false,
    checkIcon: <Downfall />,
  },
  {
    icon: <TotalUser />,
    title: "Total Users",
    value: "2.40%",
    percentage: 6,
    isPositive: true,
    checkIcon: <Progress />,
  },
];

export const billingData = [
  {
    icon: <BillingCard />,
    title: "Current Revenue",
    value: "29,405",
    percentage: 15,
    isPositive: true,
    checkIcon: <Progress />,
  },
  {
    icon: <BillingCard />,
    title: "Next Billings",
    value: "2.40%",
    percentage: -6,
    isPositive: false,
    checkIcon: <Downfall />,
  },
  {
    icon: <BillingCard />,
    title: "Total Users",
    value: "2.40%",
    percentage: 6,
    isPositive: true,
    checkIcon: <Progress />,
  },
];
export const activities = [
  {
    user: "David",
    action: "left a comment on",
    target: "Site Redesign",
    date: "Thurs 21, 2023",
    category: "Marketing Design",
  },
  {
    user: "David",
    action: "left a comment on",
    target: "Site Redesign",
    date: "Thurs 21, 2023",
    category: "Marketing Design",
  },
  {
    user: "David",
    action: "left a comment on",
    target: "Site Redesign",
    date: "Thurs 21, 2023",
    category: "Marketing Design",
  },
  {
    user: "David",
    action: "left a comment on",
    target: "Site Redesign",
    date: "Thurs 21, 2023",
    category: "Marketing Design",
  },
];
