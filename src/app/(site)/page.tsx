import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import CoursesStrip from "@/components/home/CoursesStrip";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <CoursesStrip />
      <div className="pt-24">
        <CallToAction />
      </div>
    </>
  );
}