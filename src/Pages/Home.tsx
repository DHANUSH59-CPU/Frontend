import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

const Home = () => {
  return (
    <LampContainer className="bg-background">
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-40 text-center"
      >
        <motion.h1 className="bg-gradient-to-br from-foreground to-muted-foreground py-4 bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          Welcome to <br /> Talent Frame
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Discover the perfect talent for your story — powered by AI and crafted
          for the film industry.
        </motion.p>
      </motion.div>
    </LampContainer>
  );
};

export default Home;
