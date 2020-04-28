import request from "./_request";

// 1获取菜单数据接口
function getMenuApi(data) {
  return request({
    url: "/Api/GetAppConfigs",
    method: 'post',
    data
  });
}

export {
  getMenuApi, // 1获取菜单数据接口
}