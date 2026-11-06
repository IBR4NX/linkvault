import { ScrollSections, ScrollContent } from "./ScrollSections";
import { Button } from "../../components/ui/button";
export const colors = {
  primary: "#6e4836",
  primaryPressed: "#5a3a2b",
  textPrimary: "#261d16",
  textSecondary: "#72665e",
  // and forty more
};
export default function Home() {

  return (
    <>
      <Button className="fixed"  aria-label={colors.primary}>
        hi
      </Button>
      <ScrollSections>
        <ScrollContent
          id="1"
          to="2"
          title="Ibrahim Al-Mekhlafi"
          description="Building software with purpose. I build modern web applications, desktop software, and organized systems
              with a focus on clean code, performance, and maintainability."
        />
        <ScrollContent
          id="2"
          to="1"
          title="Turning Ideas Into Reality"
          description="              I'm a software developer who enjoys solving problems and building software that is simple, efficient, and
              easy to maintain. I focus on understanding the root cause of problems, writing clean code, and creating
              solutions that can grow and evolve over time."
        />
      </ScrollSections>
    </>
  );
}
