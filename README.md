# Element-404
An Extremely simple JS library to create Reactive UIS.


## Install
Just download the **Element404.js** file into your project and then reference into your html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="Element404.js"></script>
</head>
<body>
<script>

    let target = document.body;
    let element = createElement404((main_interface)=>{
        main_interface.div(()=>{
            main_interface.h1("Hello World",{style:{color:'red'}})
        })

    },target)

    element.render()



</script>

</body>
</html>
```
## Triggers
for defining a trigger, you just need to pass, the trigger with the prefix "render_" if you want to update the ui
otherwise just pass the trigger,but the ui will not be updated.
```js


var num =0;

let target = document.body;
let element = createElement404((main_interface)=>{
    main_interface.div(()=>{
        main_interface.h1(`the value of num is ${num}`)
        main_interface.button(`remove 1 from num`,{render_click:()=> num--},)
        main_interface.button(`add 1 to num`,{render_click:()=> num++})

    })

},target)

element.render()

    

```


## Dealing with Inputs 
If you don't want to use States, you can handle inputs, by using the normal input implementation
```js


let input_text =  ''

let target = document.body;
let element = createElement404((main_interface)=>{

    main_interface.input({
        placeholder:'Type something',
        value:input_text,
        render_focusout:(input)=>{
            input_text = input.value
        }
    })

    main_interface.p(`You typed: ${input_text}`)

},target)

element.render()






```

### Styling Elements
You also can apply style to elements by using the **style** tag 

```js
    let target = document.body;
let element = createElement404((main_interface)=>{
    let div_props = {
        style:{
            position:"absolute",
            top:"50vh",
            left:"50vw",
            transform:"translate(-50%,-50%)",
            width:"100%",
            "text-align":"center"
        }
    }
    main_interface.div(()=>{
        let h1_props = {
            style:{
                "font-size":"10rem",
                "font-weight":"bold",
                color:"red"
            }
        }
        main_interface.h1("404",h1_props)

        let h2_props = {
            style:{
                "font-size":"2rem",
                "font-weight":"bold",
                color:"red"
            }
        }
        main_interface.h2("Page Not Found",h2_props)
    },div_props)


},target)

element.render()




```

## States  
with The States system,you can generate interactive forms easily
you just need to pass the container and the props you want to  pass 
```js

var user_data = {
    age:18
}

let target = document.body;
let element = createElement404((main_interface)=>{


    main_interface.stateInput(user_data,"name",{placeholder:"name"})
    main_interface.br()
    main_interface.stateInput(user_data,"email",{placeholder:"email"})
    main_interface.br()
    main_interface.stateInput(user_data,"age",{placeholder:"age"})
    main_interface.stateDecrease(user_data,"age",1,"-")
    main_interface.stateIncrease(user_data,"age",1,"+")
    main_interface.br()
    main_interface.stateSelect(user_data,"gender",["Man","Woman"])
    main_interface.br()

    main_interface.stateInput(user_data,"password",{placeholder:"password",type:"password"})
    main_interface.p(`name: ${user_data.name}`)
    main_interface.p(`email: ${user_data.email}`)
    main_interface.p(`password: ${user_data.password}`)
    main_interface.p(`age: ${user_data.age}`)
    main_interface.p(`gender ${user_data.gender}`)

},target)
element.render()



```

## State Setter 
With State Setters you can generate a button that will define a specific state 
predetermined 
```js
var data = {}

let target = document.body;
let element = createElement404((main_interface)=>{
    let selected_style = {
        color:"red"
    }
    let unselected_style= {
        color:"blue"
    }



    let selected_home = {
        content:"Home Selected",
        props:{
            style:selected_style
        }
    }
    let unselected_home = {
        content:"Home",
        props:{
            style:unselected_style
        }
    }
    main_interface.stateSetter(data,"page","home",selected_home,unselected_home);

    let selected_about = {
        content:"About Selected",
        props:{
            style:selected_style
        }
    }
    let unselected_about = {
        content:"About",
        props:{
            style:unselected_style
        }
    }
    main_interface.stateSetter(data,"page","about",selected_about,unselected_about);

    if(data.page === "home"){
        main_interface.h1("you are in home page")
    }
    else if(data.page === "about"){
        main_interface.h1("you are in about page")
    }

    else{
        main_interface.h1("404")
    }
},target)
element.render()


```

## Locker 
With Lockers , you can lock the entire UI, to avoid concurrency problems 
```js

var data = {}

let target = document.body;
let element = createElement404((main_interface)=>{

    main_interface.stateSelect(data,"gender",["Man","Woman"]);
    main_interface.br()

    main_interface.stateInput(data,"num",{placeholder:"num"})
    main_interface.stateDecrease(data,"num",1,"-")
    main_interface.stateIncrease(data,"num",1,"+")
    main_interface.br()


    if(main_interface.locked){

        main_interface.button("unlock",{
            style:{color: "red"},
            notLock_render_click:()=>{
                main_interface.unlock();
            }
        })
    }

    if(!main_interface.locked){
        main_interface.button("lock",{
            style:{color: "blue"},
            render_click:()=>{
                main_interface.lock();
                main_interface.render()
            }

        })
    }





},target)
element.render()




```