/**
 * Created by qismsom on 2018/7/31.
 */

export function getNow() {
  let date =  new Date();
  return date;
}

export function formatDate(now) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if(month<10){
    month = '0'+month
  }
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
};

//   console.log('时间戳转时间');

export function timesToDate(time) {
  let date =  new Date(time);
  let y = 1900+date.getYear();
  let m = "0"+(date.getMonth()+1);
  let d = "0"+date.getDate();
  return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}

export function yyyyddFormatDate(date) {
  if (date === null || date === '') {
    return '';
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month<10){
    month = '0'+month
  }
  return year + "-" + month;
}

// 转换成  yyyy-mm-dd格式
export function yyyymmddFormatDate(date) {
  if (date === null || date === '') {
    return '';
  }
  let y = date.getFullYear();
  let m = "0"+(date.getMonth()+1);
  let d = "0"+date.getDate();
  return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}

// 转换成  某年某月1号格式
export function yyyymm01FormatDate(date) {
  if (date === null || date === '') {
    return '';
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month<10){
    month = '0'+month
  }
  return year + "-" + month + "-01";
}

export function getFirstDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  if (month < 10) {
    month = "0" + month;
  }
  let firstDay = year + "-" + month + "-" + "01";
  console.log('第一天');
  console.log(firstDay);
  return firstDay;
}

export function getLastDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  if (month < 10) {
    month = "0" + month;
  }
  let myDate = new Date(year, month, 0);
  let lastDay = year + "-" + month + "-" + myDate.getDate();
  return lastDay;
}



export function formatDate_hs (now) {
  now = new Date(new Date(now).getTime());
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if(month<10){
    month = '0'+month
  }
  if(date<10) {
    date = '0'+date
  }
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}


