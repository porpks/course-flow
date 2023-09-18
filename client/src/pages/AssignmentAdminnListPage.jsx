import AssignmentListAdmin from "../components/adminAssignment/AssignmentListAdmin.jsx";
import AssignmentTopbar from "../components/adminAssignment/AssignmentTopbar.jsx";
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function AssignmentAdminnListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <div className="flex">
        <Sidebar isAssignmentPage={true} />
        <div>
          <AssignmentTopbar setSearchQuery={setSearchQuery} />
          <AssignmentListAdmin searchQuery={searchQuery} />
        </div>
      </div>
    </>
  );
}

export default AssignmentAdminnListPage;
