let baseUrl:String = ""; 
switch (process.env.VUE_APP_TITLE) {
    case 'test':  
        baseUrl = "http://192.168.101.209:8080/smart-audit-admin";  
        break;
    case 'production':
        baseUrl = "https://audit-admin.hxkjmedia.cn/smart-audit-admin";   
        break;
    case 'pre':
        baseUrl = "https://audit-pre-admin.hxkjmedia.cn/smart-audit-admin";   
        break;
    default:
        baseUrl = "http://192.168.101.200:8080/smart-audit-admin";
        break;
}

export default baseUrl;

//郭
//192.168.100.175:8080
// 坤
//192.168.21.213:8080
// 测试环境
//192.168.100.141:8080
// 演示环境
// https://audit-pre-admin.hxkjmedia.cn/smart-audit-admin
