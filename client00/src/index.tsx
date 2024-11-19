import { createRoot } from "react-dom/client";
import "./index.css";
import FakeStackOverflow from "./components/fakestackoverflow";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import '@fontsource/roboto'; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#D27519", // Customize your primary color
    },
    secondary: {
      main: "#dc004e", // Customize your secondary color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent styling across browsers */}
      <FakeStackOverflow />
    </ThemeProvider>
  );
}
