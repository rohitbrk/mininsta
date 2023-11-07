const getDate = () => {
  const date = new Date().toDateString().split(" ");
  const dateString = `${date[1]}${date[2]}, ${date[3]}`;
  return dateString;
};

export { getDate };
