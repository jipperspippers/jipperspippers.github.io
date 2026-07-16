import "./sections.css";
import {flower3} from '../assets'
import '../sections/project/projects.css';
import ProjectCard  from "../sections/project/ProjectCard";
import {projects, projectBacklog} from "./ProjectList"



const Projects = () => {
  return (
    <div className="section_projects">
    <div className="section_projects_inner">
      <h2>Finished Projects</h2>
    <div className="projectsContainer">
      
      {projects.map((project, index) => (
        
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          // technologies={project.technologies}
          image={project.image}
          link={project.link}
          videos={project.videos}
        />
      ))}
      
    </div>
      <h2> Project Backlog</h2>
      <div className="projectsContainer">
      
      {projectBacklog.map((project, index) => (
        
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          image={project.image}
          technologies={project.technologies}
          link={project.link}
          
        />
      ))}
    </div>
    </div>
    <div className="project_flower"><img src={flower3} alt=":)"/></div>
    </div>
  );
};

export default Projects;
