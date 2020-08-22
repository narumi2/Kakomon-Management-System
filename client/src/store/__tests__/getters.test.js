import getters from '../getters'

const defaultState = {
  currentBranch: '',
  commits: {},
  contentMetadatas: {},
  branches: {
    status: 'unrequested',
    data: {}
  }
}

describe('getters.js', () => {
  it('stateにあるファイルのobjectデータをサイドバー用データ構造に加工しやすいように変形して返す', () => {
    const state = JSON.parse(JSON.stringify(defaultState))
    state.currentBranch = 'master'
    state.branches = {
      status: 'loaded',
      data: {
        master: 'commitSha1'
      }
    }
    state.commits = {
      commitSha1: {
        status: 'loaded',
        data: {
          'file1.csv': 'fileSha1',
          'file2.csv': 'fileSha2'
        }
      }
    }
    state.contentMetadatas = {
      fileSha1: {
        status: 'loaded',
        data: {
          'file1-1.jpg': {
            src: 'file1-1.jpg'
          },
          'file1-2.jpg': {
            src: 'file1-2.jpg'
          }
        }
      },
      fileSha2: {
        status: 'loaded',
        data: {
          'file2-1.jpg': {
            src: 'file2-1.jpg'
          },
          'file2-2.jpg': {
            src: 'file2-2.jpg'
          }
        }
      }
    }

    const result = {
      'file1-1.jpg': {
        src: 'file1-1.jpg'
      },
      'file1-2.jpg': {
        src: 'file1-2.jpg'
      },
      'file2-1.jpg': {
        src: 'file2-1.jpg'
      },
      'file2-2.jpg': {
        src: 'file2-2.jpg'
      }
    }

    expect(getters.currentBranchMetadatas(state)).toEqual(result)
  })

  it('branchの取得が完了していない場合にはからオブジェクトを返す', () => {
    const state = JSON.parse(JSON.stringify(defaultState))
    expect(getters.currentBranchMetadatas(state)).toEqual({})
  })

  it('指定したcommitの取得が完了してない場合には空オブジェクトを返す', () => {
    const state = JSON.parse(JSON.stringify(defaultState))
    state.currentBranch = 'master'
    state.branches = {
      status: 'loaded',
      data: {
        master: 'commitSha1'
      }
    }
    state.commits = {
      commitSha1: {
        status: 'loading',
        data: {}
      }
    }

    expect(getters.currentBranchMetadatas(state)).toEqual({})
  })

  it('一部のファイルがまだ読込中の場合、空オブジェクトを返す', () => {
    const state = JSON.parse(JSON.stringify(defaultState))
    state.currentBranch = 'master'
    state.branches = {
      status: 'loaded',
      data: {
        master: 'commitSha1'
      }
    }
    state.commits = {
      commitSha1: {
        status: 'loaded',
        data: {
          'file1.csv': 'fileSha1',
          'file2.csv': 'fileSha2'
        }
      }
    }
    state.contentMetadatas = {
      fileSha1: {
        status: 'loaded',
        data: {
          'file1-1.jpg': {
            src: 'file1-1.jpg'
          },
          'file1-2.jpg': {
            src: 'file1-2.jpg'
          }
        }
      },
      fileSha2: {
        status: 'loading', // このファイルのみ読込中の状態
        data: {
          'file2-1.jpg': {
            src: 'file2-1.jpg'
          },
          'file2-2.jpg': {
            src: 'file2-2.jpg'
          }
        }
      }
    }

    expect(getters.currentBranchMetadatas(state)).toEqual({})
  })
})