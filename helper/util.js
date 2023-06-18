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
 
export const getTopSkip = (queryData) => {
    let skip = 0
    let limit = 20
    if (
      queryData.skip &&
      parseInt(queryData.skip) &&
      parseInt(queryData.skip) !== NaN
    ) {
      skip = parseInt(queryData.skip);
    }
    if (
      queryData.limit &&
      parseInt(queryData.limit) &&
      parseInt(queryData.limit) !== NaN
    ) {
      limit = parseInt(queryData.limit);
    }
    return {skip,limit}
}