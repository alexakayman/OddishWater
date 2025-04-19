import React, { useContext } from "react";
import Header from "./Header";
import VideoFeed from "../video/VideoFeed";
import ControlPanel from "../controls/ControlPanel";
import StatsPanel from "../stats/StatsPanel";
import TreatmentVote from "../stats/TreatmentVote";
import { OddishWaterContext } from "../../context/OddishWaterContext";

const AppLayout: React.FC = () => {
  const { isDarkMode } = useContext(OddishWaterContext);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-slate-900" : "bg-amber-50"
      } transition-colors duration-500`}
    >
      <Header />

      <main className="flex-grow flex flex-col items-center justify-start px-4 py-6 md:py-8">
        <div className="max-w-4xl w-full space-y-6">
          <ControlPanel />
          <TreatmentVote />
          <VideoFeed />
          <StatsPanel />
        </div>
      </main>

      <footer
        className={`py-4 px-6 text-center text-sm ${
          isDarkMode ? "text-amber-200/70" : "text-emerald-800/70"
        }`}
      >
        <p>
          OddishWater &copy; {new Date().getFullYear()} - Made with 💧 for
          plants
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
