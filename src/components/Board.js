import Game from "./Game";
import { useState } from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";

export default function Board() {
  const [trigger, setTrigger] = useState(0);

  return (
    <div className="h-screen w-screen bg-light text-dark font-inter flex items-center justify-center">
      <div className="flex flex-col mb-20 items-center lg:flex-row gap-5 lg:gap-20">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-sm">
          <motion.img
            whileHover={{ scale: 1.02 }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            src="favicon.ico"
            alt="Tic tac Toe"
            className="w-3/12 my-3"
          />
          <motion.h1
            whileHover={{ scale: 1.02 }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-6/12 text-2xl font-semibold py-4"
          >
            Tic-Tac-Toe
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.02 }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
          >
            <p className="mx-auto lg:mx-0 lg:mb-2 text-md leading-8 w-10/12">
              Classic Tic-Tac-Toe two-player game. Win the match by scoring
              three in a row!
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setTrigger((trigger) => trigger + 1);
            }}
            className="p-2 w-44 bg-green-500 text-light rounded-lg text-lg shadow-black/25 shadow-md lg:mt-4 hover:bg-green-600 mt-7 mb-2"
          >
            Restart
          </motion.button>
        </div>
        <div className="py-4">
          <Game trigger={trigger} />
        </div>
      </div>
      <motion.a
        whileHover={{
          scale: 1.02,
          backgroundColor: "#121212",
          color: "#FFFFFF",
        }}
        className="border-2 cursor-pointer border-black rounded-lg py-2 px-4 flex gap-2 items-center absolute bottom-4 mx-auto"
        href="https://github.com/munteanadrian"
        target="_blank"
      >
        <AiFillGithub className="text-xl" />
        <h1 className="font-semibold">See on Github</h1>
      </motion.a>
    </div>
  );
}
