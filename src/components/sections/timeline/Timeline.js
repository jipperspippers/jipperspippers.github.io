import "./timeline.scss";
import { timelineFlower, finchlogo, uoftlogo, qnxlogo, methackslogo } from "../../assets";


function Timeline() {
  return (
	<div class="timeline">

	<div class="timeline-event">
		<img src={timelineFlower} alt=":)" class="timeline-event-icon" />

		<div class="timeline-event-copy">
		{/* drop a uma logo into components/assets and add it here like the others */}
		<p class="timeline-event-thumbnail">September 2025-present</p>
		<h3>Uma Ltd.</h3>
		<h4>Founding Engineer</h4>
		<ul>
            <li>
            <p>
            Built a real-time C++ computer vision pipeline (YOLO26n on a Rockchip RK3588 NPU) with
            multi-object tracking and a temporal-voting classification gate, cutting end-to-end
            inference to 28ms vs. the chip's published 66ms benchmark.
            </p>
            </li>
            <li>
            <p>
            Designed a dual-app watchdog architecture over MQTT/AWS IoT so a machine stays remotely
            manageable through crashes and OTA updates, recovering state within 10 seconds.
            </p>
            </li>
            <li>
            <p>
            Hardened the fleet: Keystore/TEE-bound key encryption, one-time provisioning certs, and
            integrity checks on every remote APK/model download. Set up two-tier CI/CD with a
            self-hosted runner running ~111 tests against real hardware.
            </p>
            </li>
            <li>
            <p>
            Wrote the customer-facing ordering web app (Next.js) end-to-end including Apple/Google Pay
            through Moneris, plus device management and payment features on the operator dashboard and
            FastAPI backend.
            </p>
            </li>
            </ul>
		</div>
	</div>

	<div class="timeline-event">
		<img src={timelineFlower} alt=":)" class="timeline-event-icon" />

		<div class="timeline-event-copy">
		{/* drop a themis logo into components/assets and add it here like the others */}
		<p class="timeline-event-thumbnail">May 2025 - August 2025</p>
		<h3>Themis</h3>
		<h4>Machine Learning Engineer</h4>
		<ul>
            <li>
            <p>
            Implemented state-of-the-art uncertainty estimation methods for active learning and wired
            them into the platform's evaluation pipelines, benchmarking several computer vision models.
            </p>
            </li>
            <li>
            <p>
            Built configurable Python CLI tooling for multi-annotator labeling, training and iterative
            experimentation at scale, and experimented with combining uncertainty-based selection
            techniques to improve labeling efficiency.
            </p>
            </li>
            </ul>
		</div>
	</div>

	<div class="timeline-event">
		<img src={timelineFlower} alt=":)" class="timeline-event-icon" />

		<div class="timeline-event-copy">
            <div ><img src={uoftlogo} width="40%" alt="logo"></img></div>
		<p class="timeline-event-thumbnail">June 2024-present</p>
		<h3>University of Toronto </h3>
		<h4>Undergraduate Researcher</h4>
		<ul>
            <li> 
            <p >
            Researching, and developing models to estimate biomass through a phone camera.
            </p>
            </li>
            </ul>

		</div>
	</div>

	<div class="timeline-event">
		<img src={timelineFlower} alt=":)" class="timeline-event-icon" />
		<div class="timeline-event-copy">
            <div ><img src={finchlogo} width="25%" alt="logo"></img></div>
		<p class="timeline-event-thumbnail">  September 2023-present</p>
		<h3>University of Toronto - Aerospace Team</h3>
		<h4>Machine Learning Researcher</h4>
		<ul>
            <li> 
            <p >
            The Field Imaging Nanosatellite for Crop Residue Hyperspectral Mapping (FINCH)
            mission is a 3U CubeSat mission aimed at conducting technological research.
            As a data processing member of the FINCH mission, I researched models for 
            denoising and destriping hyperspectral images and developed a function to
            generate realistic stripes. This function is used to create synthetic images
            to train a model for destriping images captured by a hyperspectral camera.
            This work resulted in an academic paper presented at the SmallSat Conference 2024.

            </p>
            </li>
            </ul>
		</div>
            
	</div>

	<div class="timeline-event">
		<img src={timelineFlower} alt=":)" class="timeline-event-icon" />
		<div class="timeline-event-copy">
            <div ><img src={methackslogo} width="25%" alt="logo"></img></div>
		<p class="timeline-event-thumbnail">  September 2023-present</p>
		<h3> METHacks</h3>
		<h4>Hackathon Mentor</h4>
		<ul>
            <li> 
            <p>
            Assisted hackers in utilizing APIs like Cohere, React, GQL, Tensorflow and Mongoose, and helped 
            further develop their hackathon ideas. 
            </p>
            </li>
            </ul>
		</div>
	</div> 


	<div class="timeline-event">
		<img src={timelineFlower} alt=":)" class="timeline-event-icon" />
		<div class="timeline-event-copy">
            <div><img src={qnxlogo} width="50%" alt="logo"></img></div>
		<p class="timeline-event-thumbnail"> September 2021 - December 2021</p>
		<h3> Blackberry QNX</h3>
		<h4> Build Infrastructure Dev </h4>
		<ul>
            <li> 
            <p >
            Migrated a significant number of old Jenkins jobs 
            from virtual machines to docker containers which
            resulted in the ability to re-purpose storage and
            computer resources to facilitate system updates</p>
            </li>
            <li> 
            <p  >
            Wrote Python scripts to automate
            documentation of build containers and wrote
            shell scripts to execute the scripts, and to execute 
            build steps
            </p>
            </li>
            <li>
            <p >
            Replaced a crucial plug-in for Jenkins that was
            unreliable, using a REST API in Python 
            which was  implemented with a Jenkins job
            </p>
            </li>
            </ul>
		</div>
	</div>

</div>  
  );
}

export default Timeline;
