export const parameterCheck = (keyData, checkParam) => {
  if (
    keyData &&
    (Object.keys(keyData).find((key) => !checkParam.includes(key)) ||
      !(keyData?.year && parseInt(keyData.year)))
  ) {
    return false;
  }
  return true;
};
