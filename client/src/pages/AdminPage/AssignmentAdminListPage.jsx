import AssignmentListAdmin from "../../components/adminAssignment/AssignmentListAdmin.jsx";
import AssignmentTopbar from "../../components/adminAssignment/AssignmentTopbar.jsx";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import ModalAssignmentDelete from "../../components/adminAssignment/modalAssignmentDelete.jsx";
function AssignmentAdminListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { deleteAssignment, setDeleteAssignment } = useAuth();
  return (
    <>
      {deleteAssignment.state ? (
        <ModalAssignmentDelete />
      ) : (
        <>
          <AssignmentTopbar setSearchQuery={setSearchQuery} />
          <AssignmentListAdmin searchQuery={searchQuery} />
        </>
      )}
    </>
  );
}

export default AssignmentAdminListPage;
