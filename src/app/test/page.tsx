import Profile from "./Profile";
import { ScrollSections, ScrollContent } from "./ScrollSections";

export default function Home() {
  return (
    <>
      <ScrollSections>
        <ScrollContent id="1" to="2"
          title="Ibrahim Al-Mekhlafi"
          description="Building software with purpose. I build modern web applications, desktop software, and organized systems
              with a focus on clean code, performance, and maintainability."
        />
        <ScrollContent id="2" to="1"
          title="Turning Ideas Into Reality"
          description="              I'm a software developer who enjoys solving problems and building software that is simple, efficient, and
              easy to maintain. I focus on understanding the root cause of problems, writing clean code, and creating
              solutions that can grow and evolve over time."
        />
      </ScrollSections>
    </>
  );
}
