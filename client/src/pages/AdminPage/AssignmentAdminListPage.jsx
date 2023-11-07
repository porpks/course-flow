import AssignmentListAdmin from "../../components/adminAssignment/AssignmentListAdmin.jsx";
import AssignmentTopbar from "../../components/adminAssignment/AssignmentTopbar.jsx";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import ModalAssignmentDelete from "../../components/adminAssignment/modalAssignmentDelete.jsx";
import Sidebar from "../../components/Sidebar.jsx";

function AssignmentAdminListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { deleteAssignment, setDeleteAssignment } = useAuth();

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(8);
  const [page, setPage] = useState(1);

  return (
    <>
      {deleteAssignment.state ? (
        <ModalAssignmentDelete />
      ) : (
        <>
          <div className="flex justify-center w-full ">
            <div className="w-[240px]  shadow-xl">
              <Sidebar isAssignmentPage={true} />
            </div>
            <div className="w-[1200px]  shadow-xl">
              <AssignmentTopbar
                setSearchQuery={setSearchQuery}
                setStart={setStart}
                setEnd={setEnd}
                setPage={setPage}
              />
              <AssignmentListAdmin
                searchQuery={searchQuery}
                start={start}
                end={end}
                page={page}
                setStart={setStart}
                setEnd={setEnd}
                setPage={setPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AssignmentAdminListPage;
