import { defineAppSetup } from '@slidev/types'

// test
import * as Scenes from './scenes'
import * as Icons from './icons'


export default defineAppSetup(({app}) => {
    const Comps = {...Icons, ...Scenes}
    for(const i in Comps) {
        app.component(i, Comps[i])
    }
})
