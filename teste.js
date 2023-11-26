

import { Element404 } from './element404.js'

let value = 0;
let input_value = ''
let e = new Element404()

e.div({'test':'aa'},()=>{
     e.div(null,  "the value is" + value)
     e.input({'onfocusout':(input)=> input_value =input.value })
     e.text('aaaaaaaa')
     e.button({'click': ()=> value-=1 },'remover')
     e.button({'click': ()=>value+=1 },'adionar')
})




e.render(document.body)