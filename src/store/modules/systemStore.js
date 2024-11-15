const Store = {
  state: {
    isLogin: false, // 是否登陆
    userInfo: {}, // 用户信息
    gamePath: '', //游戏地址
    config: {},
    payPath: '',
    channelInfo: {},
    currentTheme: 'theme1',
    currentTab: 0,
    rechargeFlag: 1,
    scoreInfo: {},
    tags: []
  },
  getters: {
    isLogin: state => {
      return state.isLogin
    },
    userInfo: state => {
      return state.userInfo
    },
    gamePath: state => {
      return state.gamePath
    },
    config: state => {
      return state.config
    },
    payPath: state => {
      return state.payPath
    },
    channelInfo: state => {
      return state.channelInfo
    },
    currentTheme: state => {
      return state.currentTheme
    },
    currentTab: state => {
      return state.currentTab
    },
    rechargeFlag: state => {
      return state.rechargeFlag
    },
    scoreInfo: state => {
      return state.scoreInfo
    },
    tags: state => {
      return state.tags
    }
  },
  mutations: {
    SET_IS_LOGIN: (state, value) => {
      // uni.setStorageSync('isLogin', value)
      state.isLogin = value
    },
    SET_USERINFO: (state, value) => {
      // uni.setStorageSync('userInfo', value)
      state.userInfo = value
    },
    SET_GAMEPATH: (state, value) => {
      state.gamePath = value
    },
    SET_CONFIG: (state, value) => {
      // uni.setStorageSync('config', value)
      state.config = value
    },
    SET_PAYPATH: (state, value) => {
      state.payPath = value
    },
    SET_CHANNELINFO: (state, value) => {
      state.channelInfo = value
    },
    SET_Theme(state, theme) {
      state.currentTheme = theme;
    },
    SET_TAB(state, tab) {
      state.currentTab = tab
    },
    SET_RECHARGEFLAG: (state, value) => {
      state.rechargeFlag = value
    },
    SET_SCOREINFO: (state, value) => {
      state.scoreInfo = value
    },
    SET_TAGS: (state, value) => {
      state.tags = value
    }
  },
  actions: {
    setIsLogin: ({commit}, obj) => commit('SET_IS_LOGIN', obj),
    setUserinfo: ({commit}, obj) => commit('SET_USERINFO', obj),
    setGamePath: ({commit}, obj) => commit('SET_GAMEPATH', obj),
    setRechargeFlag: ({commit}, obj) => commit('SET_RECHARGEFLAG', obj),
    setConfig: ({commit}, obj) => commit('SET_CONFIG', obj),
    setPayPath: ({commit}, obj) => commit('SET_PAYPATH', obj),
    setChannelInfo: ({commit}, obj) => commit('SET_CHANNELINFO', obj),
    setTheme: ({commit}, obj) => commit('SET_Theme', obj),
    setTab: ({commit}, obj) => commit('SET_TAB', obj),
    setRechargeFlag: ({commit}, obj) => commit('SET_RECHARGEFLAG', obj),
    setScoreInfo: ({commit}, obj) => commit('SET_SCOREINFO', obj),
    setTags: ({commit}, obj) => commit('SET_TAGS', obj)
  }
};

export default Store
