// import { fetch, baseUrl } from 'config/index'
import axios from 'axios';
var instance = axios.create({ headers: { 'content-type': 'application/x-www-form-urlencoded' } });

let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8456' : '';
console.log(baseUrl);
// 登陆
export const requestLogin = params => {
  return instance.post(`${baseUrl}/login`, params).then(res => res.data).catch((err) => {
    console.log(err);
  })
};
// 获取session
export const getSession = params => {
  return instance.post(`${baseUrl}/getSession`, params).then(res => res.data).catch((err) => {
    console.log(err);
  })
};
// module.exports = {
//   baseUrl
// }

// 获取任务列表
export const getTaskLists = params => { return instance.post(`${baseUrl}/tasks/getTaskLists`, { params: params }); };

// 任务
export const addTasks = params => { return instance.post(`${baseUrl}/tasks/addTasks`, { params: params }); };
// 获取用户列表
export const getYangmaoUserList = params => { return instance.post(`${baseUrl}/tasks/getUserList`, { params: params }); };
// 注册用户 注意参数和上面不同
export const addUser = params => { return instance.post(`${baseUrl}/tasks/regUser`, params); };
// 根据任务id 获取日志
export const getGameLog = params => { return instance.post(`${baseUrl}/tasks/getGameLog`, { params: params }) };
// 获取礼物
export const getGifts = params => { return instance.post(`${baseUrl}/tasks/getGifts`, { params: params }) };
