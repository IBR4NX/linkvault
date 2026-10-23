import { ScrollScene, ScrollContent } from "./scroll-scene";

export default function Home() {
  return (
    <ScrollScene className="bg-[#080b16] text-white">
      <ScrollContent title="Ibrahim Al-Mekhlafi" description="Building software with purpose." />

      <ScrollContent title="About Me" description="I build modern web applications and organized systems." />

      <ScrollContent title="My Projects" description="Explore the projects I have built." />
    </ScrollScene>
  );
}
