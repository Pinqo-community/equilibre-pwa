import { createLazyFileRoute } from "@tanstack/react-router";
import EncryptionComponent from "../components/EncryptionDemo";

export const Route = createLazyFileRoute("/journal")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Journal Page</h1>
      <EncryptionComponent />
    </div>
  );
}
