

import { Element404 } from './element404.js'

let value = 0;

let e = new Element404()

e.div({'test':'aa'},()=>{
    e.div(null,  "the value is" + value)

    e.div({'click': ()=>{value = value+1 }},'adiconar')

    e.br()
    e.br()

})



e.render(document.body)