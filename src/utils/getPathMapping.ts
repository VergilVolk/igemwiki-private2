import pages from "../pages.ts";

export const getPathMapping = () => {
  const map: {
    [key: string]: {
      name: string | undefined;
      title: string | undefined;
      component: React.FC;
      lead: string | undefined;
    };
  } = {};

  // Walks the page tree, collecting routes from pages at any nesting depth.
  const collect = (item: (typeof pages)[number]) => {
    if ("path" in item && item.path && item.component) {
      map[item.path] = {
        name: item.name,
        title: item.title,
        component: item.component,
        lead: item.lead,
      };
    } else if ("folder" in item && item.folder) {
      item.folder.forEach(collect);
    }
  };

  pages.forEach(collect);
  return map;
};
