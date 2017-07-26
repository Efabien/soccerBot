 //find the left space before the 300th char, take a string as param
const breakingPoint=  function (text){
  var hold=text.split(' ');
  var i=1;
  var count;
  var result=hold[0];
  while(true){
  result+=hold[i]+' ';
  if(result.length>=300){
  count=result.length;
  break;
  }
  i++;    
  }
  return count;
  }

const urlBuilder = (params, queryParams) => {
  let result = '';
  let parameters = '';

  result = params.join('/');
  if (queryParams) {
    queryParams.forEach((element, index) => {
      for(key in element) {
        parameters += index === 0
        ? '?' + key + '=' + element[key]
        : '&' + key + '=' + element[key];
      }
    });
  }
  return result + parameters;
} 

  
exports.bkp = breakingPoint;
exports.urlBuilder = urlBuilder;

