import NavItem from "./NavItem";

const NavMenu = ({
  items,
  isCollapsed,
  currentPath,
  unreadCounts = {},
}) => (
  <ul className={`${isCollapsed ? "mx-auto" : "w-full"} space-y-4`}>
    {items.map((item) => (
      <NavItem
        key={item.to}
        item={item}
        isCollapsed={isCollapsed}
        isActive={
          item.isActive
            ? item.isActive(currentPath)
            : (item.to === "" && (currentPath === "" || currentPath === "admin")) ||
              (item.to !== "" && currentPath === item.to)
        }
        unreadCount={unreadCounts[item.label] || 0}
      />
    ))}
  </ul>
);

export default NavMenu;