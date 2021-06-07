import { createContext, ReactNode, useState } from "react";

type SelectedSurvival = {
  survivalsIds: string[];
};

export const SurvivalContext = createContext({} as SelectedSurvival);

type SurvivalProviderProps = {
  children: ReactNode;
};

export function SurvivalSelectProvider({ children }: SurvivalProviderProps) {
  const [survivalsIds, setSurvivalsIds] = useState<string[] | null>(null);

  return (
    <SurvivalContext.Provider value={{ survivalsIds }}>
      {children}
    </SurvivalContext.Provider>
  );
}
