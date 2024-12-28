"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import { sidebarItems } from "./sidebarData";
import Image from "next/image";
import { Box } from "@mui/material";
import logoMin from "../../../assets/images/logoMin.png";
import { Dropdown, HambergerIcon } from "@/app/assets/icons";
import LogoPic from "../../../assets/images/SharemundoLinks.png";

interface SideBarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}
const SideBar: React.FC<SideBarProps> = ({ isCollapsed, toggleSidebar }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggleAccordion = (label: string) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleExpand = () => {
    if (isCollapsed) {
      toggleSidebar();
    }
  };
  const handleSidebarToggle = () => {
    setExpanded({});
    toggleSidebar();
  };
  return (
    <div
      className={`${styles.sideBar} ${
        isCollapsed ? styles.collapsed : styles.expanded
      }`}
    >
      <div
        className={styles.sideBarContainer}
        style={
          !isCollapsed ? { alignItems: "flex-start" } : { alignItems: "center" }
        }
      >
        {isCollapsed ? (
          <Image src={logoMin} alt="logo" className={styles.image} />
        ) : (
          <Image
            src={LogoPic}
            alt="SharemundoLinks"
            className={styles.iconLogo}
            height={94}
            width={200}
          />
          // <Logo className={styles.iconLogo} />
        )}
        <Box
          onClick={handleSidebarToggle}
          sx={{
            marginLeft: !isCollapsed ? "16px" : "0px",
            cursor: "pointer",
            marginBottom: "14px",
          }}
        >
          <HambergerIcon />
        </Box>
        {sidebarItems.map((item) => (
          <div key={item.label} className={!isCollapsed ? styles.wFull : ""}>
            {item.href ? (
              <Link href={item.href} legacyBehavior>
                <a className={styles.linkWrapper} onClick={handleExpand}>
                  <div
                    className={
                      isCollapsed ? styles.sideBarCollapsed : styles.sideBarItem
                    }
                  >
                    <item.icon />
                    {!isCollapsed && (
                      <span className={styles.sideBarItemName}>
                        {item.label}
                      </span>
                    )}
                  </div>
                </a>
              </Link>
            ) : (
              <div
                onClick={() => {
                  handleExpand();
                  if (item.hasDropdown) toggleAccordion(item.label);
                }}
                className={styles.linkWrapper}
              >
                <div
                  className={
                    isCollapsed ? styles.sideBarCollapsed : styles.sideBarItem
                  }
                >
                  <item.icon />
                  <div className={isCollapsed ? "" : styles.dropdown}>
                    {!isCollapsed && (
                      <span className={styles.sideBarItemName}>
                        {item.label}
                      </span>
                    )}
                    {!isCollapsed && item.hasDropdown && <Dropdown />}
                  </div>
                </div>
              </div>
            )}
            {item.hasDropdown && expanded[item.label] && (
              <div>
                {item.dropdownItems?.map((dropdownItem: any) => (
                  <div key={dropdownItem.label} className={styles.linkWrapper}>
                    {dropdownItem.href ? (
                      <Link href={dropdownItem.href} legacyBehavior>
                        <a className={styles.linkWrapper}>
                          <div className={styles.dropDownItem}>
                            <span className={styles.sideBarItemNameDropdown}>
                              {dropdownItem.label}
                            </span>
                          </div>
                        </a>
                      </Link>
                    ) : (
                      <div className={styles.dropDownItem}>
                        <span className={styles.sideBarItemNameDropdown}>
                          {dropdownItem.label}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SideBar;
