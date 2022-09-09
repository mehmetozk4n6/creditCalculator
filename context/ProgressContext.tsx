import React, { createContext, useContext, useState } from "react";

type progress = "start" | "calculated" | "viewDetails";

interface ProgressValues {
  progress: progress;
  setProgress: React.Dispatch<React.SetStateAction<progress>>;
}

const ProgressContext = createContext<ProgressValues>({
  progress: "start",
  setProgress: () => "start",
});

type Props = {
  children: JSX.Element;
};

export const ProgressWrapper: React.FC<Props> = ({ children }) => {
  const [progress, setProgress] = useState<progress>("start");

  const progressValues = {
    progress,
    setProgress,
  };

  return (
    <ProgressContext.Provider value={progressValues}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  return useContext(ProgressContext);
};
