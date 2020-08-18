export default {
  // setStatusLoading: (state, req) => {
  //   req.status = 'loading'
  // },

  setStatus: (state, payload) => {
    state[payload.path].status = payload.status
  },

  upload: (state, newFile) => {
    state.files.push(newFile)
  },

  updateCurrentUser: (state, user) => {
    state.currentUser = user
  },

  updateLastPage: state => {
    const lastPageInStrage = localStorage.getItem('lastPage')
    const lastPage = lastPageInStrage == null ? 'upload' : lastPageInStrage
    if (state.lastPage === '') {
      state.lastPage = lastPage
    }
    console.log(`next page after loging in is ${state.lastPage}`)
  },

  // setMetadatas: (state, res) => {
  //   const branches = JSON.parse(JSON.stringify(res))
  //   state.metadatas = {
  //     status: 'loaded',
  //     data: branches
  //   }
  //   state.branches.data = res.reduce((pre, branch) => {
  //     if (pre[branch.name] == null) {
  //       pre[branch.name] = {}
  //     }
  //     pre[branch.name] = branch.commit.sha
  //     return pre
  //   }, {})
  // },
  setBranches: (state, payload) => {
    state.branches = {
      ...state.branches,
      status: 'loaded',
      data: payload.branches
    }
  },

  //
  setBranchesStatus: (state, payload) => {
    state.branches = {
      ...state.branches,
      status: payload.status
    }
  },

  setCurrentBranch: (state, branchName) => {
    state.currentBranch = branchName
  },

  setCommit: (state, payload) => {
    state.commits = {
      ...state.commits,
      [payload.sha]: {
        status: 'loaded',
        data: payload.data
      }
    }
  },

  setCommitStatus: (state, payload) => {
    if (state.commits[payload.sha] == null) {
      state.commits[payload.sha] = {
        status: '',
        data: {}
      }
    }
    state.commits[payload.sha].status = payload.status
  },

  setContentMetadata: (state, payload) => {
    console.log({ log: 'setContentMetadata1', payload })
    state.contentMetadatas = {
      ...state.contentMetadatas,
      [payload.sha]: {
        status: 'loadedd',
        data: payload.data
      }
    }
    console.log({
      log: 'setContentMetadata2',
      'state.contentMetadatas[payload.sha]': state.contentMetadatas[payload.sha]
    })
  },

  setContentMetadataStatus: (state, payload) => {
    state.contentMetadatas = {
      ...state.contentMetadatas,
      [payload.sha]: {
        status: payload.status
      }
    }
  },

  setCsvObj: (state, csvObj) => {
    state.setCsvObj.status = 'loaded'
    state.files = csvObj
  },

  saveBase64EncodedCsv: (state, data) => {
    if (state.setCsvObj.unparsedData[data.branchName] == null) {
      state.setCsvObj.unparsedData[data.branchName] = {}
    }
    state.setCsvObj.unparsedData[data.branchName][data.fileName] =
      data.branchData
  }
}
