import Sidebar from "./components/Sidebar";
import { Outlet, useParams } from "react-router";

function App() {
  const { id } = useParams();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-col flex-1 ${id ? "flex" : "hidden lg:flex"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
