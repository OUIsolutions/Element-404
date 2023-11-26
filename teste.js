

import { Element404 } from './element404.js'

let value = 0;

let e = new Element404()

e.div({'test':'aa'},()=>{
    console.log('chamou a render')
    e.div(null, ()=> "the value is" + value)

    e.div({'click': ()=> value+=1  },'adiconar')

    e.br()
    e.br()

    e.div({'click':()=>{alert("foda se")}},'aaaaaaaaaaa')
})



e.render(document.body)