// 类目列表
export function accountReg(val){
    const reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;//只能输入5-20个以字母开头、可带数字、“_”、“.”  
    return reg.test(val);
}