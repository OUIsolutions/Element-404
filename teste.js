


let value = 0;
let input_value = ''
let e = new Element404()

e.div({'test':'aa'},()=>{
     e.div(null,  "the value is" + value)
    console.log('chamou')

     e.input({'focusout':(input)=> input_value  =input.value })
     
     e.br()
 
     e.text('the value of the input its'+input_value)
     e.br()
     e.br()

     e.button({'click': ()=> value-=1 },'remover')
     e.button({'click': ()=>value+=1 },'adionar')
})




e.render(document.body)