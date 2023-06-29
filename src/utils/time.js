const cookingTime = (time) => {
  if (time < 60) {
    return `${time} min`;
  } else if (time > 60) {
    return `${Math.floor(time / 60)} hr ${time % 60} min`;
  }
};

export default cookingTime;
