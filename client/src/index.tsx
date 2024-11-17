import { createRoot } from "react-dom/client";
import "./index.css";
import FakeStackOverflow from "./components/fakestackoverflow";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <>
      <FakeStackOverflow />
    </>
  );
}
