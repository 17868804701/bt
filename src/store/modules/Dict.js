/**
 * Created by qismsom on 2018/8/24.
 */
import {post,fetch,patch,put,getExcel} from '../../../utils/http';
// 当前用户权限
const Dict = {
  state: {
    parseDict: {},
    allDict: {},
    CLArray: [],
    CLDict: {},
    orginazationDict: {},
    orginazationArray : [],
  },
  mutations: {
    getAllDict(state){ // 数据字典数据
      fetch(process.env.BASE_URL+'/auth/dic/getAllByCode')
      .then(res => {


        // 用于解析数据
        let dict = {};
        res.data.forEach(item => {

          let subDict = {};
          item.children.forEach(subItem => {

            if (subItem.children.length > 0) { // 如果还有子项

              let subsubDict = {};
              subItem.children.forEach(subsubItem => {
                subsubDict[subsubItem.code] = subsubItem.title;
              })
              subDict[subItem.code] = subsubDict;

            }else{ // 没有
              subDict[subItem.code] = subItem.title;
            }

          })

          state.parseDict[item.code] = subDict;
        });

        // 用于commonselect
        res.data.forEach(item => {
          state.allDict[item.code] = item.children;
          item.children.forEach(subItem => {
            if (subItem.children.length > 0) {
              state.allDict[subItem.code] = subItem.children;
            }
          })
        })
      })
    },
    getAllCLList(state){  // 车辆数据
      post(process.env.BASE_URL+'/chel/vehicleAccount/listAll')
      .then(res => {
        if (res.code === 0) {

          let data = res.page;
          data.forEach(item => {
            if (item.selfNum !== null && item.selfNum.length > 0 && item.selfNum.indexOf("null") === -1) {
              state.CLDict[item.selfNum] = item;
              state.CLArray.push(item.selfNum);
            }
          })
        }
      })
    },
    getOriganzation(state) {
      fetch(process.env.BASE_URL+'/auth/group/trees')
      .then(res => {
        if (res.success === true) {

          let ejbmarr = [];
          let ejbmdict = {};
          let jtgsarr = [];
          let jtgsdict = {};
          let sjbmarr = [];
          let sjbmdict = {};
          res.data.forEach(item => {
            if (item.grouptype === 'EJGS') {
              item.title = item.groupname;
              item.code = item.groupcode;
              state.orginazationArray.push(item);
              state.orginazationDict[item.groupcode] = item.groupname;
            }

            if (item.grouptype === 'EJBM') {
              item.title = item.groupname;
              item.code = item.groupcode;
              ejbmarr.push(item);
              ejbmdict[item.groupcode] = item.groupname;
            }

            if (item.grouptype === 'JTGS') {
              item.title = item.groupname;
              item.code = item.groupcode;
              jtgsarr.push(item);
              jtgsdict[item.groupcode] = item.groupname;
            }

            if (item.grouptype === 'SJBM') {
              item.title = item.groupname;
              item.code = item.groupcode;
              sjbmarr.push(item);
              sjbmdict[item.groupcode] = item.groupname;
            }

          })
          state.allDict.EJBM = ejbmarr;
          state.parseDict.EJBM = ejbmdict;
          state.allDict.JTGS = jtgsarr;
          state.parseDict.JTGS = jtgsdict;
          state.allDict.SJBM = sjbmarr;
          state.parseDict.SJBM = sjbmdict;
          state.allDict.EJGS = state.orginazationArray;
          state.parseDict.EJGS = state.orginazationDict;

        }
      })
    }
  }
}

export default Dict;
