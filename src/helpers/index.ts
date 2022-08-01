export const getRandomItemsFromArray = (
  arr: { item: any; dropRate: number }[]
) => {
  if (!arr) return;

  let items = arr.map((item) => {
    let randomNumber = getRandomNumber(100);
    if (item.dropRate >= randomNumber) {
      return item;
    }

    return null;
  });

  return items.filter((i) => i);
};

export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};
