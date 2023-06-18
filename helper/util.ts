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
      !Number.isNaN(parseInt(queryData.skip))
    ) {
      skip = parseInt(queryData.skip);
    }
    if (
      queryData.limit &&
      parseInt(queryData.limit) &&
      !Number.isNaN(parseInt(queryData.limit))
    ) {
      limit = parseInt(queryData.limit);
    }
    return {skip,limit}
}