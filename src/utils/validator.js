// 工具函数，验证用户名
export function accountReg(val){
    const reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;//只能输入5-20个以字母开头、可带数字、“_”、“.”  
    return reg.test(val);
}
// 验证密码
export function passwordReg(val){
    const reg =  /^.{6,30}$/;//长度6到30位 
    return reg.test(val);
}

// 验证姓名
export function nameReg(val){
    const reg = /^[\u2E80-\u9FFF]+$/;//姓名不合法
    return reg.test(val);
}

// 验证电话号码
export function telReg(val){
    const reg = /^1[345789]\d{9}$/;//电话号码不合法
    return reg.test(val);
}

// 验证课时费用
export function feesReg(val){
    const reg = /^\+?[1-9][0-9]*$/ ;//必须为大于0的正整数
    return reg.test(val);
}
// 验证积分
export function scoreReg(val){
    const reg = /^[0-9]{1,6}$/ ;//必须为不超过6位的正整数
    return reg.test(val);
}
// 验证身份证
export function IsCard(val){
    const  reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(val);
}