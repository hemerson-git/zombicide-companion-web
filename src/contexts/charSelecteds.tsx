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
  wave: number;
  isZombieTurn: boolean;
  highestLevel: {
    level: number;
    survival: string;
  };
  selectedSurvivals: Survival[];
  nowPlaying: Survival;
  survivals: Survival[];
  handleHideZombie: () => void;
  nextWave: () => void;
  prevWave: () => void;
  startGame: (flow: string[]) => void;
  loadGame: () => void;
  pushSelectedSurvivals: (survivals: Survival[]) => void;
  pushGameFlow: (flow: string[]) => void;
  resetSelectedSurvivals: () => void;
  handleSetNowPlaying: (wave?: number) => void;
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
  const [highestLevel, setHighestLevel] = useState({ level: 0, survival: "" });
  const [isZombieTurn, setIsZombieTurn] = useState(false);

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
    localStorage.setItem("@Zombicide_Wave", JSON.stringify(wave));
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

  function loadWave() {
    const loadedWave = JSON.parse(localStorage.getItem("@Zombicide_Wave"));
    return loadedWave;
  }

  function startGame(flow: string[]) {
    setGameLine(flow);
    setNowPlaying(selectedSurvivals[0]);
    setWave(0);
    saveGame();
  }

  function loadGame() {
    const storagedFlow = loadGameFlow();
    const loadedSelectedSurvivals = loadSurvivalsInfo();
    const loadedWave = loadWave();

    if (storagedFlow && selectedSurvivals) {
      setSelectedSurvivals(loadedSelectedSurvivals);
      setGameLine(storagedFlow);
      handleSetNowPlaying(loadedWave);
      setWave(loadedWave);
    }
  }

  function handleAddSurvival(survival: Survival) {
    setSelectedSurvivals([...selectedSurvivals, survival]);
  }

  function handleHideZombie() {
    setIsZombieTurn(false);
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

  function handleSetNowPlaying(wave?: number) {
    loadGameFlow();

    if (gameLine[wave] !== "Zombie") {
      selectedSurvivals[wave];
    }

    if (wave >= 0 && gameLine[wave] !== "Zombie") {
      setIsZombieTurn(false);
      selectedSurvivals.map((char) => {
        if (char.id === gameLine[wave]) {
          setNowPlaying(char);
        }
      });
    } else {
      setIsZombieTurn(true);
    }

    saveGame();
  }

  function nextWave() {
    if (wave <= gameLine?.length - 1) {
      handleSetNowPlaying(wave);
      setWave(wave + 1);
      return;
    }

    setWave(0);
    handleSetNowPlaying(0);
  }

  function prevWave() {
    if (wave >= 0) {
      handleSetNowPlaying(wave);
      setWave(wave - 1);
      return;
    }

    setWave(gameLine?.length - 1);
  }

  function handleSetSurvivalXP(survival: Survival, operation: string) {
    let newXP = survival.xp;

    if (operation === "minus" && survival.xp > 0) {
      newXP = survival.xp - 1;
      let highestXp = 0;

      selectedSurvivals?.map((survival) => {
        if (survival.xp > highestXp) {
          highestXp = survival.xp;
          highestLevel.survival = survival.id;
        }
      });

      setHighestLevel({
        level: survival.id !== highestLevel.survival ? highestXp : newXP,
        survival: survival.id,
      });
    }

    if (operation === "plus" && survival.xp < 43) {
      newXP = survival.xp + 1;
      if (newXP > highestLevel.level) {
        setHighestLevel({
          level: newXP,
          survival: survival.id,
        });
      }
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
        isZombieTurn,
        pushSelectedSurvivals,
        pushGameFlow,
        resetSelectedSurvivals,
        handleSetNowPlaying,
        handleSetSurvivalXP,
        nextWave,
        prevWave,
        startGame,
        loadGame,
        highestLevel,
        handleHideZombie,
      }}
    >
      {children}
    </SurvivalContext.Provider>
  );
}

export const useSurvival = () => {
  return useContext(SurvivalContext);
};
