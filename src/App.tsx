import { useState } from "react";
import subframeLogo from "./assets/subframe-logo.svg?url"
import PlanEditModal from "./pages/PlanEditModal";
import PlanManagement from "./pages/PlanManagement";

export default function App() {
  const [view, setView] = useState<"edit" | "list">("list");
  return view === "edit" ? (
    <PlanEditModal onBack={() => setView("list")} />
  ) : (
    <PlanManagement onEdit={() => setView("edit")} />
  );
}