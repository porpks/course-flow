import Navbar from "../components/Navbar.jsx";
import Instructure from "../components/Instructure.jsx";
import SubFooter from "../components/SubFooter.jsx";
import Footer from "../components/Footer.jsx";
// import { useAuth } from '../contexts/AuthContext.jsx'

function HomePage() {
  // const { state } = useAuth()
  return (
    <>
      {/* <h1>{state}</h1> */}
      <Navbar />
      <Instructure />
      <SubFooter />
      <Footer />
    </>
  );
}
export default HomePage;
