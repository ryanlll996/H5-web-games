import request from '../utils/request'

const AD = '/api/Index/ad'
// 轮播图
function getAd (params) {
	return request(AD, 'POST', params).then(res => res)
}
// 站点
function getWebsite (params) {
    return request('/api/index/website', 'POST', params).then(res => res)
}

// 首页游戏推荐列表
function getHome (params) {
    return request('/api/index/home', 'POST', params).then(res => res)
}

// 游戏列表
function getGameList (params) {
    return request('/api/index/index', 'POST', params).then(res => res)
}

// 推荐标签
function getHotTag (params) {
    return request('/api/index/hot_tag', 'POST', params).then(res => res)
}


// 热门标签
function getTags (params) {
    return request('/api/index/tag', 'POST', params).then(res => res)
}

// 首页新游戏列表
function getNewGame (params) {
    return request('/api/index/new_game', 'POST', params).then(res => res)
}
// 游戏详情
function gameDetail (params) {
    return request('/api/index/game', 'POST', params).then(res => res)
}

// 分类游戏列表
function getCatGame (params) {
    return request('/api/index/cat_game', 'POST', params).then(res => res)
}

export default {
    getAd,
    getWebsite,
    getGameList,
    getHotTag,
    getTags,
    getNewGame,
    gameDetail,
    getCatGame,
    getHome
}

