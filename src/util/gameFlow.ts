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
  let completeFlowArr = [...arr, "Zombie"];

  // Move the first item to the end of the line

  function getNewOrder(lastArr: string[]) {
    let tempArr = [...lastArr];
    const firstItem = tempArr.shift();
    tempArr.push(firstItem);

    if (arr[0] !== tempArr[0]) {
      completeFlowArr = [...completeFlowArr, ...tempArr, "Zombie"];
      getNewOrder(tempArr);
    }
  }

  getNewOrder(arr);

  return completeFlowArr;
}

export default gameFlow;
