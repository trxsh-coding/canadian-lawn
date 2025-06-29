export const extendCoreRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = [...extraRoutes, ...innerRouter.routes];
      return routes;
    },
  };
};
