import { createContext, ReactNode, useContext, useState } from "react";

import { characters } from "../../chars";
import gameFlow from "../util/gameFlow";

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
  wave: number;
  selectedSurvivals: Survival[];
  nowPlaying: Survival;
  survivals: Survival[];
  nextWave: () => void;
  prevWave: () => void;
  startGame: (flow: string[]) => void;
  pushSelectedSurvivals: (survivals: Survival[]) => void;
  pushGameFlow: (flow: string[]) => void;
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
  const [gameLine, setGameLine] = useState<string[]>([]);
  const [wave, setWave] = useState(0);

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

    localStorage.setItem("@Zombicide_GameFlow", JSON.stringify(gameLine));
  }

  function loadSurvivalsInfo() {
    const survivals = JSON.parse(
      localStorage.getItem("@Zombicide_selectedSurvivals")
    );

    return survivals;
  }

  function loadGameFlow() {
    const flow = JSON.parse(localStorage.getItem("@Zombicide_GameFlow"));
    return flow;
  }

  function startGame(flow: string[]) {
    setGameLine(flow);
    handleSetNowPlaying(null, wave);
    saveGame();
  }

  function handleAddSurvival(survival: Survival) {
    setSelectedSurvivals([...selectedSurvivals, survival]);
  }

  function pushSelectedSurvivals(survivals: Survival[]) {
    setSelectedSurvivals(survivals);
  }

  function pushGameFlow(flow: string[]) {
    setGameLine(flow);
  }

  function resetSelectedSurvivals() {
    setSelectedSurvivals([]);
    localStorage.removeItem("@Zombicide_selectedSurvivals");
    localStorage.removeItem("@Zombicide_GameFlow");
  }

  function handleSetNowPlaying(survival?: Survival, wave?: number) {
    const survivals = loadSurvivalsInfo();
    loadGameFlow();

    if (survival) {
      survivals?.map((char: Survival) => {
        if (char.id === survival.id) {
          survival = char;
        }
      });
    }

    if (wave >= 0 && gameLine[wave] !== "Zombie") {
      survivals?.map((char: Survival) => {
        if (char?.id === gameLine[wave]) {
          survival = char;
        }
      });
    } else {
      survival = nowPlaying;
      alert("Rodada dos Zumbis");
    }

    setNowPlaying(survival);
    saveGame();
  }

  function nextWave() {
    if (wave < gameLine?.length - 1) {
      setWave(wave + 1);
      handleSetNowPlaying(null, wave);
      return;
    }

    setWave(0);
    handleSetNowPlaying(null, 0);
  }

  function prevWave() {
    if (wave >= 0) {
      setWave(wave - 1);
      handleSetNowPlaying(null, wave);
      return;
    }

    setWave(gameLine?.length - 1);
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
        wave,
        survivals,
        pushSelectedSurvivals,
        pushGameFlow,
        resetSelectedSurvivals,
        handleSetNowPlaying,
        handleSetSurvivalXP,
        nextWave,
        prevWave,
        startGame,
      }}
    >
      {children}
    </SurvivalContext.Provider>
  );
}

export const useSurvival = () => {
  return useContext(SurvivalContext);
};
