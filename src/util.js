/**
 * 打印对象树
 * printObjectTree({}, ['#','##','###'], '\n\n', 3); // 对象=>md
 * @param {*object} obj 
 * @param {*array} begin 
 * @param {*string} end 
 * @param {*number} deep 
 */
export function printObjectTree(obj, begin, end, deep) {
  var text = "";

  while(begin.length > deep) {
    begin.pop();
  }
  while(begin.length < deep) {
    begin.push(`\t${begin[begin.length-1]}`);
  }

  function objectTree(obj, begin, end, deep) {
    if (deep <= 0) return;

    let index = begin.length - deep;
    deep--;
    
    Object.entries(obj).forEach(attr => {
      start = begin[index] || begin[begin.length-1];
      text += `${start}${attr[0]}${end}`;
      if (typeof attr[1] === 'object' && attr[1] !== null) {
        objectTree(attr[1], begin, end, deep)
      }
    });
  }
  objectTree(obj, begin, end, deep);

  return text;
}