interface IState {
  basicData: object
}
const basic = {
  state: {
    basicData: {}
  },

  mutations: {
    SET_BASIC_DATA: (state: IState, basicData: object) => {
      state.basicData = basicData;
    }
  },

  actions: {
    commitBasicData: ({ commit }: { commit: any }, basicData: object) =>
      commit('SET_BASIC_DATA', basicData)
  }
};

export default basic;
