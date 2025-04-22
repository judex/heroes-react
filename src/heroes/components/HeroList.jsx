import { motion } from "framer-motion";
import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from "./";

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2, // Retraso entre cada tarjeta
          },
        },
      }}
    >
      {heroes.map((hero) => (
        <motion.div
          key={hero.id}
          className="card"
          variants={{
            hidden: { opacity: 0, y: 100, scale: 0.8 }, // Estado inicial
            visible: { opacity: 1, y: 0, scale: 1 }, // Estado final
          }}
          transition={{ duration: 0.6 }}
        >
          <HeroCard {...hero} />
        </motion.div>
      ))}
    </motion.div>
  );
};
