import React, { useContext, useState, useEffect } from "react";
import { OddishWaterContext } from "../../context/OddishWaterContext";
import { Droplets, Coffee, Zap } from "lucide-react";
import { Manager } from "socket.io-client";

interface VoteCount {
  water: number;
  cocaCola: number;
  redBull: number;
}

const TreatmentVote: React.FC = () => {
  const { isDarkMode } = useContext(OddishWaterContext);
  const [voteCount, setVoteCount] = useState<VoteCount>({
    water: 0,
    cocaCola: 0,
    redBull: 0,
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [socket, setSocket] = useState<ReturnType<
    typeof Manager.prototype.socket
  > | null>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const manager = new Manager("http://localhost:3001");
    const newSocket = manager.socket("/");
    setSocket(newSocket);

    // Listen for vote count updates
    newSocket.on("voteCounts", (counts: VoteCount) => {
      setVoteCount(counts);
    });

    // Check if user has already voted (using localStorage)
    const voted = localStorage.getItem("hasVoted");
    if (voted) {
      setHasVoted(true);
    }

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleVote = (treatment: keyof VoteCount) => {
    if (!hasVoted && socket) {
      socket.emit("vote", treatment);
      setHasVoted(true);
      localStorage.setItem("hasVoted", "true");
    }
  };

  return (
    <div
      className={`rounded-xl border-2 mb-6 ${
        isDarkMode ? "border-emerald-700" : "border-emerald-300"
      } overflow-hidden transition-colors duration-500`}
    >
      <div
        className={`p-3 ${
          isDarkMode ? "bg-slate-800" : "bg-emerald-100"
        } flex items-center transition-colors duration-500`}
      >
        <h2
          className={`font-medium ${
            isDarkMode ? "text-amber-200" : "text-emerald-800"
          }`}
        >
          Treatment Vote
        </h2>
      </div>

      <div
        className={`${
          isDarkMode ? "bg-slate-900" : "bg-white"
        } p-4 transition-colors duration-500`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleVote("water")}
            disabled={hasVoted}
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-slate-800 text-amber-200"
                : "bg-emerald-50 text-emerald-800"
            } 
              transition-colors duration-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center mb-2">
              <Droplets size={20} className="mr-2" />
              <h3 className="font-medium">Water</h3>
            </div>
            <p className="text-3xl font-bold text-center">{voteCount.water}</p>
          </button>

          <button
            onClick={() => handleVote("cocaCola")}
            disabled={hasVoted}
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-slate-800 text-amber-200"
                : "bg-emerald-50 text-emerald-800"
            } 
              transition-colors duration-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center mb-2">
              <Coffee size={20} className="mr-2" />
              <h3 className="font-medium">Coca Cola</h3>
            </div>
            <p className="text-3xl font-bold text-center">
              {voteCount.cocaCola}
            </p>
          </button>

          <button
            onClick={() => handleVote("redBull")}
            disabled={hasVoted}
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-slate-800 text-amber-200"
                : "bg-emerald-50 text-emerald-800"
            } 
              transition-colors duration-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center mb-2">
              <Zap size={20} className="mr-2" />
              <h3 className="font-medium">Red Bull</h3>
            </div>
            <p className="text-3xl font-bold text-center">
              {voteCount.redBull}
            </p>
          </button>
        </div>

        {hasVoted && (
          <p
            className={`text-sm text-center mt-4 ${
              isDarkMode ? "text-amber-200/70" : "text-emerald-800/70"
            }`}
          >
            Thanks for voting! You can only vote once.
          </p>
        )}
      </div>
    </div>
  );
};

export default TreatmentVote;
