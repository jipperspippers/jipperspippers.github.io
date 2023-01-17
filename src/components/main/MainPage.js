import "./MainPage.css"
import ButtonLink  from "../buttons/Button";
import AboutMe from "../aboutMe/AboutMe";
import Navbar from "../navbar/NavBar";
import Projects from "../projects/ProjectsSection";
import Background from "../background/Background";

function MainPage() {
  return (
    <div className = "mainContainer">
    <Background/>

    <Navbar/>
    <div className = "landingContainer">
      <AboutMe/>
          <div className="buttonContainer">
            <ButtonLink text="COURSES" />
            <ButtonLink text = "EXPERIENCE"/>
            <ButtonLink text = "PROJECTS"/>
            <ButtonLink text = "RESUME"/>
          </div>
    </div>
    <div className = "projectsContainer">
    
    <Projects/>
    </div>
    <footer>
      Created by John P. Ma                                             
    </footer>
    </div>
  );
}

export default MainPage;
