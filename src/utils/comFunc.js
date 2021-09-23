//手机号验证
export function checkPhone(rule, value, callback) {
  const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error('请输入正确的手机号'));
  }
};

//只能数字
export function checkNumber(rule, value, callback) {
  const reg = /^\d+$|^\d+[.]?\d+$/
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error('只能输入数字'));
  }
};

//数字(小数点)
export function checkPointNum(rule, value, callback) {
  if (value) {
    const reg = /^\d+$|^\d*\.\d+$/g
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('只能输入数字和小数'));
    }
  } else {
    callback();
  }
};

//数字和英文
export function checkEngNum(rule, value, callback) {
  const reg = /^[a-zA-Z0-9]{1,}$/
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error('只能输入字母和数字'));
  }
};

//分数验证
export function checkFract(rule, value, callback) {
  const reg = /^(\d+)\/(\d+)$/
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error('只能输入分数'));
  }
};

//数字或分数
export function checkNumFra(rule, value, callback) {
  const fra = /^(\d+)\/(\d+)$/
  const num = /^\d+$|^\d+[.]?\d+$/
  if (fra.test(value) || num.test(value)) {
    callback();
  } else {
    return callback(new Error('只能输入分数和数字'));
  }
};