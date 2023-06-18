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
    let page = 20
    if (
      queryData.skip &&
      parseInt(queryData.skip) &&
      parseInt(queryData.skip) !== NaN
    ) {
      skip = parseInt(queryData.skip);
    }
    if (
      queryData.page &&
      parseInt(queryData.page) &&
      parseInt(queryData.page) !== NaN
    ) {
      page = parseInt(queryData.page);
    }
    return {skip,page}
}