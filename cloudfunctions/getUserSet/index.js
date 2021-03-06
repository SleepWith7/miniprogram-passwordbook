// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    let res = await db.collection('userSet')
    .where({
      _openid: wxContext.OPENID
    })
    .field({
      bgColor: true,
      fontColor: true
    })
    .get();
    console.log(res);
    
    if(res.data.length == 0){
      await db.collection('userSet').add({
         data: {
           _openid: wxContext.OPENID,
           bgColor: 'bg-black',
           fontColor: 'font-black',
           password: null,
           createTime: db.serverDate()
         },
      })
      return res.data[0];
    }else{
      return res.data[0];
    }

  } catch (e) {
    console.error(e)
  }
}