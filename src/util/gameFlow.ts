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

function gameFlow(arr: Survival[]) {
  const newArr = arr.map(({ id }) => {
    return id;
  });

  let incomingArr = generateCompletFlow(newArr);

  return incomingArr;
}

function generateCompletFlow(arr: string[]) {
  let completeFlowArr = [];

  arr.map((value, index, arrCopy) => {
    // Get The Last part of the Array
    // The part after the value
    const endArr = arrCopy.slice(index, arrCopy.length);
    const startArr = arrCopy.slice(0, index);
    const concArr = [...endArr, ...startArr, "Zombie"];
    completeFlowArr = [...completeFlowArr, ...concArr];
  });

  return completeFlowArr;
}

export default gameFlow;
