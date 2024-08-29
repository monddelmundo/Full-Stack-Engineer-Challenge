import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorPage from "./error-page";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScanResultList from "./components/ScanResultList";
import SubmitScanResult from "./components/SubmitScanResult";
import FindingList from "./components/FindingList";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SubmitScanResult />,
    errorElement: <ErrorPage />,
  },
  {
    path: "scan-results",
    element: <ScanResultList />,
  },
  {
    path: "findings/:scanResultId",
    element: <FindingList />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <Navbar />
      <RouterProvider router={router}>
      </RouterProvider>
    </ChakraProvider>
  </StrictMode>
);
