import axios from 'axios';
import { SUSS_CODE, TIMEOUT } from './config';

const CancelToken = axios.CancelToken;
let cancel;

// 获取内容数据--ajax
export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次请求');
  cancel = null;
  return axios.get(`https://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  }).then(res => {
    if (res.data.code === SUSS_CODE) {
      // console.log(res.data.content);
      return res.data.content;
    }

    throw new Error('没有成功获取到数据!');
  }).catch(err => {
    if (axios.isCancel(err)) { // 取消前一次请求
      console.log(err);
    } else {
      // handle error
      console.log(err);
    }
  });
};
