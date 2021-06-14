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
  userLevel: number;
  xp: number;
  levels: {
    yellow: SkillOptionsProps;
    orange: SkillOptionsProps;
    red: SkillOptionsProps;
  }[];
};

type SurvivalContextProps = {
  handleAddSurvival: (survival: Survival) => void;
  selectedSurvivals: Survival[];
  nowPlaying: Survival;
  survivals: Survival[];
  pushSelectedSurvivals: (survivals: Survival[]) => void;
  resetSelectedSurvivals: () => void;
  handleSetNowPlaying: (survival: Survival) => void;
  handleSetSurvivalXP: (
    survival: Survival,
    operation: "minus" | "plus"
  ) => void;
};

const SurvivalContext = createContext({} as SurvivalContextProps);

export default SurvivalContext;

type SurvivalProviderProps = {
  children: ReactNode;
};

export function SurvivalSelectProvider({ children }: SurvivalProviderProps) {
  const [nowPlaying, setNowPlaying] = useState({} as Survival);
  const [selectedSurvivals, setSelectedSurvivals] = useState<Survival[]>([]);

  const survivals = characters.map((survival) => {
    return {
      id: survival.id,
      name: survival.name,
      text: survival.text,
      defaultSkill: survival["default-skill"],
      levels: survival.levels,
      userLevel: 0,
      xp: 0,
    };
  });

  function saveGame() {
    localStorage.setItem(
      "@Zombicide_selectedSurvivals",
      JSON.stringify(selectedSurvivals)
    );
  }

  function loadSurvivalsInfo() {
    const survivals = JSON.parse(
      localStorage.getItem("@Zombicide_selectedSurvivals")
    );
    return survivals;
  }

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

  function handleSetNowPlaying(survival: Survival) {
    const survivals = loadSurvivalsInfo();

    survivals?.map((char: Survival) => {
      if (char.id === survivals.id) {
        survival = char;
      }
    });

    setNowPlaying(survival);
  }

  function handleSetSurvivalXP(survival: Survival, operation: string) {
    let newXP = survival.xp;

    if (operation === "minus" && survival.xp > 0) {
      newXP = survival.xp - 1;
    }

    if (operation === "plus" && survival.xp < 43) {
      newXP = survival.xp + 1;
    }

    survival = {
      id: nowPlaying.id,
      name: nowPlaying.name,
      text: nowPlaying.text,
      defaultSkill: nowPlaying["default-skill"],
      levels: nowPlaying.levels,
      userLevel: 0,
      xp: newXP,
    };

    const updatedSelecteds = selectedSurvivals?.map((char) => {
      if (char.id === survival.id) {
        char = survival;
      }

      return char;
    });

    if (updatedSelecteds.length > 0) {
      setSelectedSurvivals(updatedSelecteds);
    }

    saveGame();
    setNowPlaying(survival);
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
        handleSetNowPlaying,
        handleSetSurvivalXP,
      }}
    >
      {children}
    </SurvivalContext.Provider>
  );
}

export const useSurvival = () => {
  return useContext(SurvivalContext);
};
