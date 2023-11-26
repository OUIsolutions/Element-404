

import { Element404 } from './element404.js'



let e = new Element404()
e.div({'test':'aa'},()=>{
    e.create('input',
        {'focusout':(v)=>{console.log(v.value)}}    
    )


    e.br()
    e.br()

    e.div({'click':()=>{alert("foda se")}},'aaaaaaaaaaa')
})



e.render(document.body)