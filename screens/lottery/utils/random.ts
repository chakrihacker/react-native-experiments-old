export const getRandomNumberBetweenRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomIndexArray = arrayLength => {
  const originalIndices = [...new Array(arrayLength).keys()];
  let indices = [...originalIndices];
  return {
    getRandomIndex: () => {
      if (indices.length === 0) {
        indices = [...originalIndices];
      }
      const randomIndex = Math.floor(Math.random() * indices.length);
      const randomIndexVal = indices.splice(randomIndex, 1);

      return randomIndexVal[0];
    },
  };
};
