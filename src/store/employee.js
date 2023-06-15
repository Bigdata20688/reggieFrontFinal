export default {
    // 启用命名空间，这将使得在使用该模块的 mutations、actions 和 getters 时，我们需要指定模块名称作为前缀。
    namespaced: true,
    state: {
        userInfo: null
    },
    getters: {
        getUserInfo: (state) => state.userInfo,
    },
    mutations: {
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        }
    },
    actions: {
        updateUserInfo: ({commit}, userInfo) => {
            commit('setUserInfo', userInfo);
        },
        clearUserInfo: ({commit}) => {
            commit('clearUserInfo');
        }
    }
};
