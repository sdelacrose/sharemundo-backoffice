import React from "react";

import {
    Billings,
    Dashboard,
    FeedbackWhite,
    ManageCustomers,
    ManageUsers, Promotion,
    SolutionLicenses,
} from "@/app/assets/icons";

export interface DropdownItem {
    label: string;
    translationKey?: string;
    href?: string;
}

export interface SidebarItem {
    label: string;
    translationKey?: string;
    icon: React.ElementType;
    hasDropdown?: boolean;
    dropdownItems?: DropdownItem[];
    href?: string;
}

export const sidebarItems: SidebarItem[] = [
    {label: "Dashboard", icon: Dashboard, href: "/dashboard"},
    {
        label: "Manage Customers",
        icon: ManageCustomers,
        href: "/manage-customers",
    },
    {
        label: "Manage Users",
        icon: ManageUsers,
        href: "/manage-users",
    },
    {
        label: "Solutions and Licenses",
        icon: SolutionLicenses,
        href: "/solutions-and-licenses",
    },
    {
        label: "Billing",
        icon: Billings,
        href: "/billing",
    },
    {
        label: "Promo Code",
        icon: Promotion,
        href: "/promo-code",
    },
    {
        label: "Feedbacks",
        icon: FeedbackWhite,
        href: "/feedbacks",
    },
    {
        label: "MCP Servers",
        translationKey: "sidebar.mcpServers",
        icon: SolutionLicenses,
        href: "/ai-chat/review",
    },
];
