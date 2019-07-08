// import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import { jsonpOptions } from './config';

// 热门搜索数据--ajax
export const getSearchHotkeyword = () => {
  let owner = {
    'owner': ['燃气壁挂炉', '拼装模型', '铝合金门窗', '电脑桌', '小米手环', '苏打水', '按摩椅', '万宝龙钱包', '洗面奶', '电视柜', '豆浆机', '黄金项链', '摩托车跑车', '防尘鞋架', '无线扩音器', '加湿器', '游戏方向盘', '固态硬盘', '年中爆款速来抢!', '好物优选']
  };
  return Promise.resolve(owner).then(data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data.owner);
      }, 1000);
    });
  });
};

// 获取搜索结果数据--jsonp
export const getSearchResult = (keyword) => {
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.result) {
      return res.result;
    }

    throw new Error('没有成功获取到数据!');
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
