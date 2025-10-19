import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Fade, Slide } from "react-awesome-reveal";
import LightRays from "./components/LightRays";
import Lanyard from "./components/Lanyard";
import "./App.css";
import "./components/LightRays.css";

function TypingAnimation() {
  const roles = [
    "Full-Stack Developer",
    "Designer",
    "Innovator",
    "Problem Solver",
  ];

  const [currentRole, setCurrentRole] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const typingSpeed = deleting ? 60 : 120;
  const pauseTime = 1500;

  useEffect(() => {
    if (index === roles.length) setIndex(0);

    if (subIndex === roles[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    setCurrentRole(roles[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="hero-subtitle"
    >
      {currentRole}
      <span className="cursor">|</span>
    </motion.p>
  );
}

function App() {
  // Intersection observer for Skills animation
  useEffect(() => {
    const skillsSection = document.getElementById("skills");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-skills");
          }
        });
      },
      { threshold: 0.3 }
    );
    if (skillsSection) observer.observe(skillsSection);
  }, []);

  return (
    <div className="App">
      {/* === NAVBAR === */}
      <nav className="navbar-centered">
        <div className="nav-container">
          <ul className="nav-buttons">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
          </ul>
        </div>
      </nav>
{/* === HERO SECTION with Light Rays / Mobile Lanyard === */}
<section id="hero" className="hero">
  {/* === Desktop Light Rays === */}
  <div className="light-rays-wrapper desktop-only">
    <LightRays
      raysOrigin="top-center"
      raysColor="#ffffff"
      raysSpeed={1.5}
      lightSpread={0.8}
      rayLength={1.2}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0.1}
      distortion={0.05}
      className="custom-rays"
    />
  </div>

  {/* === Mobile 3D Lanyard Background === */}
  <div className="lanyard-bg mobile-only">
    <Lanyard position={[0, 0, 10]} gravity={[0, -35, 0]} />
  </div>

  {/* === Site Title === */}
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="site-title"
  >
    Portfolio
  </motion.h2>

  {/* === Hero Intro === */}
  <motion.h1
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="hero-title"
  >
    Hello, I’m <span>Yusuf Badat</span>
  </motion.h1>

  {/* === Typing Animation === */}
  <TypingAnimation />

  <motion.p
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 1 }}
    className="hero-subtext"
  >
    I’m a passionate developer who thrives on creating elegant, scalable, and
    intuitive systems. I bridge design and functionality to craft experiences
    that feel effortless and perform flawlessly.
  </motion.p>
</section>

      {/* === ABOUT SECTION === */}
      <section id="about" className="section about">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* LEFT: ABOUT TEXT BOX */}
          <div className="about-box">
            <h2>About Me</h2>
            <p>
              My name is <strong>Yusuf Badat</strong>, and I’m a dedicated Full Stack Developer with a passion 
              for building modern, efficient, and visually engaging digital experiences. 
              I specialize in both front-end and back-end development, allowing me to design 
              and implement complete, scalable systems that are as elegant as they are functional.
            </p>
            <p>
              I’m driven by a genuine curiosity for technology and a desire to understand how things 
              work beneath the surface. I take pride in my ability to bridge creativity with logic, turning complex challenges 
              into seamless, user-focused results. Every project I take on is an opportunity to grow, 
              refine my skills, and contribute to something that makes a tangible impact in people’s lives.
            </p>

            {/* === BUTTONS === */}
            <div className="about-buttons">
              <a href="/resume yusuf.pdf" className="btn resume-btn" download>
                Download Resume
              </a>
              <a
                href="https://github.com/yusufbadz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn github-btn"
              >
                View my GitHub Repository
              </a>
            </div>
          </div>

          {/* RIGHT: LANYARD 3D */}
          <div className="lanyard-showcase">
            <Lanyard position={[0, 0, 12]} gravity={[0, -45, 0]} />
          </div>
        </motion.div>
      </section>

      {/* === SKILLS SECTION === */}
      <section id="skills" className="section skills">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>Skills</h2>
          <p>
            Here are the languages, frameworks, and technologies I use to build
            modern, dynamic, and high-performance applications.
          </p>

          <div className="skills-grid">
            {[
              ["csharp", "C#"],
              ["java", "Java"],
              ["javascript", "JavaScript"],
              ["kotlin", "Kotlin"],
              ["html5", "HTML"],
              ["css3", "CSS"],
              ["dotnetcore", "ASP.NET MVC"],
              ["firebase", "Firebase"],
              ["azure", "Microsoft Azure"],
              ["amazonwebservices-plain-wordmark", "AWS (Beginner)"],
              ["mysql", "MySQL"],
              ["mongodb", "MongoDB"],
              ["microsoftsqlserver", "SQL Server"],
              ["github", "GitHub"],
              ["git", "Git"],
              ["visualstudio", "Visual Studio 2022"],
              ["vscode", "Visual Studio Code"],
              ["androidstudio", "Android Studio"],
              ["docker", "Docker"],
            ].map(([icon, name], index) => (
              <motion.div
                key={name}
                className="skill-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.08 }}
              >
                {name === "AWS (Beginner)" ? (
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
                    alt="AWS"
                  />
                ) : (
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
                    alt={name}
                  />
                )}
                <p>{name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* === FOOTER === */}
      <footer>
        <p>© 2025 Yusuf Badat</p>
      </footer>
    </div>
  );
}

export default App;
