import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <>
      <p> Final Project App</p>
    </>
  );
}
