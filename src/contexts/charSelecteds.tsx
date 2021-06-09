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
  handleAddSurvival: (survival: Survival) => void;
  selectedSurvivals: Survival[];
  nowPlaying: string;
  survivals: Survival[];
  pushSelectedSurvivals: (survivals: Survival[]) => void;
  resetSelectedSurvivals: () => void;
};

const SurvivalContext = createContext({} as SurvivalContextProps);

export default SurvivalContext;

type SurvivalProviderProps = {
  children: ReactNode;
};

export function SurvivalSelectProvider({ children }: SurvivalProviderProps) {
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [selectedSurvivals, setSelectedSurvivals] = useState<Survival[]>([]);

  const survivals = characters.map((survival) => {
    return {
      id: survival.id,
      name: survival.name,
      text: survival.text,
      defaultSkill: survival["default-skill"],
      levels: survival.levels,
    };
  });

  function handleAddSurvival(survival: Survival) {
    setSelectedSurvivals([...selectedSurvivals, survival]);
  }

  function pushSelectedSurvivals(survivals: Survival[]) {
    setSelectedSurvivals(survivals);
  }

  function resetSelectedSurvivals() {
    setSelectedSurvivals([]);
    localStorage.removeItem("@Zombicide_selectedSurvivals");
  }

  return (
    <SurvivalContext.Provider
      value={{
        handleAddSurvival,
        selectedSurvivals,
        nowPlaying,
        survivals,
        pushSelectedSurvivals,
        resetSelectedSurvivals,
      }}
    >
      {children}
    </SurvivalContext.Provider>
  );
}

export const useSurvival = () => {
  return useContext(SurvivalContext);
};
