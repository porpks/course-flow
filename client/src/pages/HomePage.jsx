import Navbar from "../components/Navbar.jsx";
import Instructure from "../components/Instructure.jsx";
import SubFooter from "../components/SubFooter.jsx";
import Footer from "../components/Footer.jsx";
// import { useAuth } from '../contexts/AuthContext.jsx'
import AssignmentBox from "../components/AssignmentBox.jsx";

function HomePage() {
  // const { state } = useAuth()
  return (
    <>
      {/* <h1>{state}</h1> */}
      <Navbar />
      <Instructure />
      <SubFooter />
      <Footer />
      {/* <AssignmentBox /> */}
    </>
  );
}
export default HomePage;
