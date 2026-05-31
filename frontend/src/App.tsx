import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "@/providers/query-provider";
import { router } from "@/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <QueryProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e1e2e",
            color: "#cdd6f4",
            border: "1px solid #313244",
            borderRadius: "12px",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
