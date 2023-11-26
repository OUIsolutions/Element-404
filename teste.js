

import { Element404 } from './element404.js'



let e = new Element404()
e.div({'test':'aa'},()=>{
    e.div({'click':()=>{alert("foda se")}},'aaaaaaaaaaa')
})



e.render(document.body)