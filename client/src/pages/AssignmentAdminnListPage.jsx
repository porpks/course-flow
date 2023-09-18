import AssignmentListAdmin from "../components/adminAssignment/AssignmentListAdmin.jsx";
import AssignmentTopbar from "../components/adminAssignment/AssignmentTopbar.jsx";
import { useState } from "react";
function AssignmentAdminnListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <AssignmentTopbar setSearchQuery={setSearchQuery} />
      <AssignmentListAdmin searchQuery={searchQuery} />
    </>
  );
}

export default AssignmentAdminnListPage;
