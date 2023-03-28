// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import GitopiaGitopiaGitopia from './gitopia.gitopia.gitopia'
import GitopiaGitopiaRewards from './gitopia.gitopia.rewards'


export default { 
  GitopiaGitopiaGitopia: load(GitopiaGitopiaGitopia, 'gitopia.gitopia.gitopia'),
  GitopiaGitopiaRewards: load(GitopiaGitopiaRewards, 'gitopia.gitopia.rewards'),
  
}


function load(mod, fullns) {
    return function init(store) {        
        if (store.hasModule([fullns])) {
            throw new Error('Duplicate module name detected: '+ fullns)
        }else{
            store.registerModule([fullns], mod)
            store.subscribe((mutation) => {
                if (mutation.type == 'common/env/INITIALIZE_WS_COMPLETE') {
                    store.dispatch(fullns+ '/init', null, {
                        root: true
                    })
                }
            })
        }
    }
}