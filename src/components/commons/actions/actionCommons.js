
export const handleEverageStar = (review ) => {
  if(review?.length === 0){
    return [];
  }
  let temp = 0;
  const arrTemp = review?.map(e => temp += e.star);
  const arr = Array(...Array(parseInt(arrTemp)).keys());
  return arr;
}


export const everageStar = (review ) => {
  if(review?.length === 0){
    return 0;
  }
  let temp = 0;
  const arrTemp = review?.map(e => temp += e.rate);
  return temp / review?.length;
}

export const handleConvertArr = (number) => {
  const arr = Array(...Array(parseInt(number)).keys());
  return arr;
}