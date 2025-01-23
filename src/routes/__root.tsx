import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <Outlet />
          {/* <Navigation /> */}
        </div>
        {/* <TanStackRouterDevtools /> */}
      </>
    );
  },
});
