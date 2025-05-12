export const isNavItemActive = (navTo, currentPath) => {
  // If navTo is empty, it's the dashboard root
  if (navTo === "" && (currentPath === "" || currentPath === "admin")) {
    return true;
  }

  // Otherwise, check if the current path matches the nav item's path
  return navTo === currentPath;
};

export const generateResizeHandler = (setIsCollapsed) => {
  return () => {
    if (window.innerWidth < 768) setIsCollapsed(true);
    else setIsCollapsed(false);
  };
};

export const getPathSegment = (location, index = 1) => {
  return location.pathname.split("/").filter(Boolean)[index] || "";
};
