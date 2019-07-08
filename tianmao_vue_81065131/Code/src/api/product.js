import jsonp from 'assets/js/jsonp';
import {jsonpOptions} from './config';

export const getProductInfo = (cid) => {
  const url = 'https://athena.ju.taobao.com/api/recommend.htm';
  const params = {
    app: 'item_detail',
    cid: cid
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.list) {
      return res.list;
    }

    throw new Error('没有获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(res => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  });
};

export const getProductData = (cid) => {
  const url = `https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?data=%7B"itemNumId"%3A"${cid}"%7D`;

  return jsonp(url, {}, jsonpOptions).then(res => {
    if (res.ret[0] === 'SUCCESS::调用成功') {
      return res.data;
    }

    throw new Error('没有获取到数据！');
  }).catch(err => {
    if (err) {
      console.log(err);
    }
  }).then(data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  });
};
