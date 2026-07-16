import React from 'react';
import './projects.css';

const ProjectCard = ({ title, description, image, link,   technologies, videos}) => {
  const body = (
    <>
      <div className="projectDetails">
        <h3>{title}</h3>
        <p>{description}</p>

        {/* <div className="technologies">
          {technologies && technologies.map((tech, index) => (
            <img key={index} src={tech} alt="Technology icon" className="techIcon" />
          ))}
        </div> */}
      </div>

      {image && <div className="projectImageContainer"><img src={image} alt=""/></div>}
    </>
  );

  return (
    <div className="projectCard">

    {link && link !== "not available"
      ? <a className="projectLink" href={link} target="_blank" rel="noopener noreferrer">{body}</a>
      : body}

      {videos && videos.length > 0 && (
        <div className="projectVideos">
          {videos.map((video, index) => (
            <figure key={index} className="projectVideoItem">
              <video
                className="projectVideo"
                src={video.src}
                poster={video.poster}
                controls
                loop
                muted
                playsInline
                preload="metadata"
              />
              {video.caption && <figcaption>{video.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
