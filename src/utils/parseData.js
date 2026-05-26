const parsingData = (json) => {
  try {
    return JSON.parse(json).join(", ");
  } catch (e) {
    return "-";
  }
};

export { parsingData };
