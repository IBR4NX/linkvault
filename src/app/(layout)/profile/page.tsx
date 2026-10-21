const projects = [
  {
    number: "01",
    name: "Markets YE",
    subtitle: "Yemen Prices",
    description:
      "A platform for tracking product prices across Yemeni cities, helping people explore prices by location and category.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    className: "profile-project-card profile-project-markets",
  },
  {
    number: "02",
    name: "LinkVault",
    subtitle: "Link Management",
    description: "A web application for organizing and managing links through a structured, modern interface.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    className: "profile-project-card profile-project-linkvault",
  },
  {
    number: "03",
    name: "Business Intelligence",
    subtitle: "Desktop Application",
    description:
      "A desktop application for exploring business data through structured queries, analysis, and reporting.",
    technologies: ["C#", ".NET", "SQL Server"],
    className: "profile-project-card profile-project-bi",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    number: "01",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML & CSS", "Tailwind CSS"],
  },
  {
    title: "Backend & Data",
    number: "02",
    skills: ["Node.js", "REST APIs", "SQL & Databases", "Python"],
  },
  {
    title: "Desktop Development",
    number: "03",
    skills: ["C#", ".NET"],
  },
  {
    title: "Tools & Workflow",
    number: "04",
    skills: ["Git & GitHub", "VS Code", "Visual Studio", "n8n"],
  },
];

const approaches = [
  {
    number: "01",
    title: "Clean Code",
    description: "Writing readable, organized code that is easier to understand and maintain.",
  },
  {
    number: "02",
    title: "Problem Solving",
    description: "Finding the root cause instead of treating only the symptoms.",
  },
  {
    number: "03",
    title: "Performance",
    description: "Building lightweight applications that use resources efficiently.",
  },
  {
    number: "04",
    title: "Continuous Improvement",
    description: "Refining code structure and development practices with every project.",
  },
];

export default function HomePage() {
  return (
    <main dir="ltr" className="profile-page min-h-screen overflow-hidden bg-[#09090b] text-zinc-100">
      {/* Navigation */}
      <header className="profile-nav hidden border-b border-white/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#home" className="profile-logo text-lg font-bold tracking-tight">
            Ibrahim<span className="text-fokreground">.</span>
          </a>

          <div className="profile-nav-links hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            <a className="transition hover:text-white" href="#about">
              About
            </a>
            <a className="transition hover:text-white" href="#skills">
              Skills
            </a>
            <a className="transition hover:text-white" href="#projects">
              Projects
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="profile-nav-cta rounded-full border border-white/20 px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
          >
            Let&apos;s Talk
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="profile-hero mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-6 py-24"
      >
        <p className="profile-hero-eyebrow mb-6 font-mono text-sm tracking-[0.25em] text-primary">SOFTWARE DEVELOPER</p>

        <h1 className="profile-hero-title max-w-4xl  font-bold leading-[1.1] tracking-tight text-xl lg:text-8xl">
          Ibrahim
          <span className=" ml-2 text-zinc-500">Al-Makhlafi.</span>
        </h1>

        <h2 className="profile-hero-subtitle mt-8 text-xl font-medium text-zinc-200 sm:text-2xl">
          Building software with purpose.
        </h2>

        <p className="profile-hero-description mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
          I build modern web applications, desktop software, and organized systems with a focus on clean code,
          performance, and maintainability.
        </p>

        <div className="profile-hero-actions mt-9 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="profile-hero-button profile-hero-button-primary rounded-full bg-primary px-6 py-3 font-semibold text-zinc-950 transition hover:bg-primary/70"
          >
            View My Work <span aria-hidden="true">↗</span>
          </a>

          <a
            href="#contact"
            className="profile-hero-button profile-hero-button-secondary rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-white/50"
          >
            Contact Me
          </a>
        </div>

        <a
          href="#about"
          className="profile-hero-scroll mt-20 w-fit font-mono text-xs tracking-widest text-zinc-500 transition hover:text-primary"
        >
          SCROLL TO EXPLORE ↓
        </a>
      </section>

      {/* About */}
      <section id="about" className="profile-about border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 md:grid-cols-[1fr_2fr] md:gap-20">
          <div className="profile-about-label">
            <p className="font-mono text-sm text-primary">01 / ABOUT ME</p>
          </div>

          <div className="profile-about-content">
            <h2 className="profile-about-title text-3xl font-bold leading-tight sm:text-5xl">
              Turning ideas into
              <span className="text-zinc-500"> practical solutions.</span>
            </h2>

            <p className="profile-about-description mt-8 text-lg leading-8 text-zinc-400">
              I&apos;m a software developer who enjoys solving problems and building software that is simple, efficient,
              and easy to maintain.
            </p>

            <p className="profile-about-details mt-5 text-lg leading-8 text-zinc-400">
              I focus on understanding the root cause of problems, writing clean code, and creating solutions that can
              grow and evolve over time.
            </p>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="profile-services border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="profile-services-heading mb-14">
            <p className="font-mono text-sm text-primary">02 / WHAT I DO</p>

            <h2 className="profile-services-title mt-5 text-3xl font-bold sm:text-5xl">Building useful things.</h2>
          </div>

          <div className="profile-services-grid grid gap-5 md:grid-cols-3">
            <article className="profile-service-card rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-primary/40">
              <span className="profile-service-number font-mono text-sm text-primary">01</span>

              <h3 className="profile-service-title mt-10 text-xl font-semibold">Web Development</h3>

              <p className="profile-service-description mt-4 leading-7 text-zinc-400">
                Building responsive, modern web applications with a focus on usability, performance, and maintainable
                code.
              </p>
            </article>

            <article className="profile-service-card rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-primary/40">
              <span className="profile-service-number font-mono text-sm text-primary">02</span>

              <h3 className="profile-service-title mt-10 text-xl font-semibold">Desktop Applications</h3>

              <p className="profile-service-description mt-4 leading-7 text-zinc-400">
                Developing practical desktop software that simplifies workflows and organizes complex tasks.
              </p>
            </article>

            <article className="profile-service-card rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-primary/40">
              <span className="profile-service-number font-mono text-sm text-primary">03</span>

              <h3 className="profile-service-title mt-10 text-xl font-semibold">System Design & Integration</h3>

              <p className="profile-service-description mt-4 leading-7 text-zinc-400">
                Connecting APIs, organizing data, and building systems where different components work together
                efficiently.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="skills" className="profile-skills border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="profile-skills-heading mb-14">
            <p className="font-mono text-sm text-primary">03 / TECH STACK</p>

            <h2 className="profile-skills-title mt-5 text-3xl font-bold sm:text-5xl">Tools I work with.</h2>
          </div>

          <div className="profile-skills-grid grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <article key={group.number} className="profile-skill-group rounded-2xl border border-white/10 p-7">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="profile-skill-group-title text-lg font-semibold">{group.title}</h3>

                  <span className="profile-skill-group-number font-mono text-sm text-primary">{group.number}</span>
                </div>

                <div className="profile-skill-list mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="profile-skill-item rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="profile-projects border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="profile-projects-heading mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-sm text-primary">04 / SELECTED PROJECTS</p>

              <h2 className="profile-projects-title mt-5 text-3xl font-bold sm:text-5xl">Things I&apos;ve built.</h2>
            </div>

            <p className="profile-projects-description max-w-sm leading-7 text-zinc-400">
              A selection of projects focused on solving practical problems through software.
            </p>
          </div>

          <div className="profile-projects-grid grid gap-5">
            {projects.map((project) => (
              <article
                key={project.number}
                className={`${project.className} grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-primary/40 md:grid-cols-[100px_1fr] md:p-10`}
              >
                <span className="profile-project-number font-mono text-sm text-primary">/{project.number}</span>

                <div className="profile-project-content">
                  <p className="profile-project-subtitle text-sm text-zinc-500">{project.subtitle}</p>

                  <h3 className="profile-project-title mt-2 text-2xl font-bold sm:text-3xl">{project.name}</h3>

                  <p className="profile-project-description mt-4 max-w-2xl leading-7 text-zinc-400">
                    {project.description}
                  </p>

                  <div className="profile-project-technologies mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="profile-project-tech rounded-full bg-white/[0.06] px-3 py-1.5 font-mono text-xs text-zinc-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="profile-approach border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="profile-approach-heading mb-14">
            <p className="font-mono text-sm text-primary">05 / MY APPROACH</p>

            <h2 className="profile-approach-title mt-5 text-3xl font-bold sm:text-5xl">How I build software.</h2>
          </div>

          <div className="profile-approach-grid grid gap-0 sm:grid-cols-2">
            {approaches.map((item) => (
              <article key={item.number} className="profile-approach-card border-t border-white/10 py-8 sm:px-6">
                <span className="profile-approach-number font-mono text-sm text-primary">{item.number}</span>

                <h3 className="profile-approach-item-title mt-5 text-xl font-semibold">{item.title}</h3>

                <p className="profile-approach-description mt-3 max-w-md leading-7 text-zinc-400">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="profile-contact border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-32">
          <p className="profile-contact-eyebrow font-mono text-sm text-primary">06 / CONTACT</p>

          <h2 className="profile-contact-title mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
            Have an idea worth
            <span className="text-zinc-500"> building?</span>
          </h2>

          <p className="profile-contact-description mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            I&apos;m interested in building useful software, solving technical challenges, and collaborating on
            meaningful projects.
          </p>

          <div className="profile-contact-links mt-9 flex flex-wrap gap-4">
            <a
              href="https://github.com/IBR4NX"
              target="_blank"
              rel="noreferrer"
              className="profile-contact-link rounded-full border border-white/20 px-5 py-3 transition hover:border-primary hover:text-primary"
            >
              GitHub ↗
            </a>

            <a
              href="#contact"
              className="profile-contact-link rounded-full border border-white/20 px-5 py-3 transition hover:border-primary hover:text-primary"
            >
              LinkedIn ↗
            </a>

            <a
              href="mailto:"
              className="profile-contact-link rounded-full bg-primary px-5 py-3 font-semibold text-zinc-950 transition hover:bg-lime-300"
            >
              Email ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="profile-footer border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="profile-footer-copyright">© {new Date().getFullYear()} Ibrahim Al-Makhlafi</p>

          <p className="profile-footer-credit">Designed & built with purpose.</p>
        </div>
      </footer>
    </main>
  );
}
