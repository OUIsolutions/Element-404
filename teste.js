

import { Element404 } from './element404.js'

let e = new Element404()
e.create('div',{'test':'aa'},()=>{
    e.create('div',null,'aaaaaaaaaaa')
})

e.render(document.body)