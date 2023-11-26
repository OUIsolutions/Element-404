

import { Element404 } from './element404.js'

let value = 0;

let e = new Element404()

e.div({'test':'aa'},()=>{
    e.div(null,  "the value is" + value)
    e.input({'onfocusout':()=> e.render()})
    e.button({'click': ()=> value-=1 },'remover')
    e.button({'click': ()=>value+=1 },'adionar')
})



e.render(document.body)