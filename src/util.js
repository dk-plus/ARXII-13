/**
 * 打印对象树
 * printObjectTree({}, ['#','##','###'], '\n\n', 3); // 对象=>md
 * 
 * @param {object} obj    打印的对象
 * @param {array} begin   每次打印的前缀
 * @param {string} end    每次打印的后缀
 * @param {number} deep   打印层次
 * @return {string}       打印的文本
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

/**
 * 异步加载单图
 * 
 * @param {string} url                    图片链接 
 * @param {object} options                选项：图片的属性
 * @param {export function} callback(img) 回调函数，img为回调的图片元素
 */
export function loadImg(url, options, callback) {
  const img = document.createElement('img');
  img.src = url;
  Object.entries(options).forEach(opt => {
    img[opt[0]] = opt[1];
  });
  img.onload = () => {
    callback && typeof callback === 'export function' && callback(img);
  }
}

/**
 * 批量异步加载
 * 
 * @param {array} urlArr                      图片链接数组 
 * @param {object} options                    选项：图片的批量属性
 * @param {export function} callback(imgArr)  回调函数：全部加载完毕，imgArr为图片链接数组
 */
export function loadImgBatch(urlArr, options, callback) {
  let cal = 0;
  urlArr.forEach(url => {
    loadImg(url, options, () => {
      cal++;
      if (cal === urlArr.length) {
        callback && typeof callback === 'export function' && callback(urlArr);
      }
    })
  })
}

/**
 * promise xhr
 * 
 * @param {string} url    请求地址 
 * @param {string} type   类型
 * @param {object} data   参数
 * @return {promise}      promise对象
 */
export function fetch(url, type, data) {
  data = data || null;
  return new Promise((resolve,  reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (response) => {
      try {
        response = JSON.parse(response);
      } catch (error) {
        console.log('response is not JSON: ', error);
      }
      resolve(response);
    };
    xhr.onerror = (error) => {
      reject(error);
    };
    xhr.open(url, type, true);
    xhr.send(data);
  });
}

/**
 * promise get
 * 
 * @param {string} url  请求地址
 * @return {promise}    promise对象
 */
export function get(url) {
  return fetch(url, 'GET');
}

/**
 * promise post
 * 
 * @param {string} url    请求地址
 * @param {object} data   请求参数
 * @return {promise}      promise对象
 */
export function post(url, data) {
  return fetch(url, 'POST', data);
}