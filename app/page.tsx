import Hero from "@/components/Hero/Hero";
import HeroDynamic from "@/components/Hero/HeroDynamic";
import ProjectPortfolio from "@/components/Projects/ProjectPortfolio";
import ServicesPage from "@/pages/services";


export default function Home() {
  return (
    <>
      <main>
        <HeroDynamic/>
        <Hero/>
        <ServicesPage />
        <ProjectPortfolio/>
      </main>
    </>

  );
}
