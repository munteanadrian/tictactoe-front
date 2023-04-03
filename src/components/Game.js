import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Game({ trigger }) {
  const [result, setResult] = useState(() => {
    const storedResult = localStorage.getItem("result");
    try {
      return storedResult ? JSON.parse(storedResult) : "";
    } catch (error) {
      return "";
    }
  });

  const [occupied, setOccupied] = useState(() => {
    const storedOccupied = localStorage.getItem("occupied");
    try {
      return storedOccupied ? JSON.parse(storedOccupied) : false;
    } catch (error) {
      return false;
    }
  });

  const [gameOver, setGameOver] = useState(() => {
    const storedGameOver = localStorage.getItem("gameOver");
    return storedGameOver ? JSON.parse(storedGameOver) : false;
  });

  const [board, setBoard] = useState(() => {
    const storedBoard = localStorage.getItem("board");
    return storedBoard
      ? JSON.parse(storedBoard)
      : [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
  });

  // deploy and upload to adrianmuntean.tech/tictactoe

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board), [board]);
  });

  useEffect(() => {
    localStorage.setItem("occupied", JSON.stringify(occupied));
  });

  useEffect(() => {
    localStorage.setItem("gameOver", JSON.stringify(gameOver));
  }, [gameOver]);

  useEffect(() => {
    localStorage.setItem("result", JSON.stringify(result));
  }, [result]);

  useEffect(() => {
    if (trigger) {
      restartGame();
    }
  }, [trigger]);

  const restartGame = async () => {
    const response = await axios.get("https://164.90.223.91:8080/restart");
    setBoard(response.data);
    setGameOver(false);
    setOccupied(false);
  };

  // make a move
  const makeMove = async (row, col) => {
    let response = { code: -1, player: "", message: "" };

    await axios
      .post("https://164.90.223.91:8080/", { x: row, y: col })
      .then((res) => {
        response = res.data;

        setOccupied(false);
        const tempGame = [...board];

        if (response.code === 0 || response.code === 3) {
          tempGame[row][col] = response.player;
          setBoard(() => tempGame);

          if (response.code === 3) {
            setResult(response.message);
            setGameOver(true);
          }
        } else if (response.code === 1) {
          setOccupied(true);
        } else {
          setGameOver(true);
        }
      });
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative ${
          gameOver ? "border-2 border-black overflow-hidden rounded-2xl" : ""
        }`}
      >
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 z-10"
          >
            <h2 className="text-2xl font-bold mb-2">{result}</h2>
          </motion.div>
        )}

        <div
          className={`overflow-hidden bg-white text-4xl border-2 ${
            gameOver
              ? "rounded-2xl blur border-gray-200"
              : "rounded-lg border-black"
          }`}
        >
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((col, colIndex) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={
                    "h-1 w-1 cursor-pointer flex items-center justify-center p-14 border-black " +
                    (colIndex < 2 ? "border-r-2 " : " ") +
                    (rowIndex < 2 ? "border-b-2" : " ")
                  }
                  key={colIndex}
                  onClick={() => {
                    makeMove(rowIndex, colIndex);
                  }}
                >
                  <span className="text-4xl">{col}</span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
        {occupied && (
          <div>
            <p className="font-semibold text-center text-red-500 pqqt-2">
              Occupied, Choose another square!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
