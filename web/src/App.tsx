import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="bottom-left" />
    </>
  );
}

export default App;
