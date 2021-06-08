import { createContext, ReactNode, useContext, useState } from "react";

import { characters } from "../../chars";

type SkillOptionsProps = {
  "skill-options": {
    skill: string;
  }[];
};

type Survival = {
  id: string;
  name: string;
  text: string;
  defaultSkill: string;
  levels: {
    yellow: SkillOptionsProps;
    orange: SkillOptionsProps;
    red: SkillOptionsProps;
  }[];
};

type SurvivalContextProps = {
  handleSetSelectedSurvival: (survival: Survival) => void;
  selectedSurvival: Survival;
  nowPlaying: string;
  survivals: Survival[];
};

const SurvivalContext = createContext({} as SurvivalContextProps);

export default SurvivalContext;

type SurvivalProviderProps = {
  children: ReactNode;
};

export function SurvivalSelectProvider({ children }: SurvivalProviderProps) {
  const [selectedSurvival, setSelectedSurvival] = useState<Survival>();
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  const survivals = characters.map((survival) => {
    return {
      id: survival.id,
      name: survival.name,
      text: survival.text,
      defaultSkill: survival["default-skill"],
      levels: survival.levels,
    };
  });

  function handleSetSelectedSurvival(survival: Survival) {
    setSelectedSurvival(survival);
  }

  return (
    <SurvivalContext.Provider
      value={{
        handleSetSelectedSurvival,
        selectedSurvival,
        nowPlaying,
        survivals,
      }}
    >
      {children}
    </SurvivalContext.Provider>
  );
}

export const useSurvival = () => {
  return useContext(SurvivalContext);
};
