# Element-404
An Extremely simple JS library to create Reactive UIS.

## Disclaimers
These Lib it's not production ready yet, and if you want to use into your application
make sure to save the current release, and be ready for bugs.

## Contributions
If you want to contribute, just read the TODO.md and then, implement the required feature.

## Runable Example to start 
https://codesandbox.io/p/sandbox/element404-2w7clv

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
            main_interface.h1("Hello World",{inline_style:{color:'red'}})
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
### Switching Context

### Switching in The Same render 
The easiest way of switch interface context, its by adding callback modifiers
but remember that they will be affected by the render process
```js

        let target = document.body;
        createElement404((main_interface)=>{

            let page = main_interface.div();


            let nav_style = {
                "width":"33vw",
                "margin-left":"33vw",
                "display":"grid",
                "grid-template-columns":"33% 33% 33%"
            }
            let all_links = {
                cursor:"pointer"
            }

            let selected = {
                color:"red"
            }

            function default_page(){
                page.clear()
                page.nav(()=>{
                    page.p("Default",{inline_style:[selected,all_links]})
                    page.p("Page 1",{inline_style:all_links, click:page1})
                    page.p("Page 3",{inline_style:all_links, click:page2})
                },{inline_style:nav_style})

                page.h1("you are in the default page")
            }
            default_page()

            function page1(){
                page.clear()
                page.nav(()=>{
                    page.nav(()=>{
                        page.p("Default",{inline_style:all_links,click:default_page})
                        page.p("Page 1",{inline_style:[selected,all_links]})
                        page.p("Page 3",{inline_style:all_links, click:page2})
                    },{inline_style:nav_style})
                })
                page.h1("you are in the page1")
            }


            function page2(){
                page.clear()
                page.nav(()=>{
                    page.p("Default",{inline_style:all_links,click:default_page})
                    page.p("Page 1",{inline_style:all_links, click:page1})
                    page.p("Page 2",{inline_style:[selected,all_links]})
                },{inline_style:nav_style})
                page.h1("you are in the page 2")
            }


        },target).render()

 
 
```

### Switching in Different Renders

You also can switch context by creating sub elements404, the advantage of it, its that they dont 
affect other parts of the render

```js

let num = 0;
let target = document.body;
createElement404((main_interface)=>{



    let nav_style = {
        "width":"33vw",
        "margin-left":"33vw",
        "display":"grid",
        "grid-template-columns":"33% 33% 33%"
    }
    let all_links = {
        cursor:"pointer"
    }

    let selected = {
        color:"red"
    }

    let page = main_interface.div();

    let default_page = createElement404((sub)=>{
        sub.clear()
        sub.nav(()=>{
            sub.p("Default",{inline_style:[selected,all_links]})
            sub.p("Page 1",{inline_style:all_links, click:()=>page1.render()})
        },{inline_style:nav_style})

        sub.h1("you are in the default page")
    },page)
    default_page.render()


    let page1 = createElement404((sub)=>{
        sub.clear()
        sub.nav(()=>{
            sub.nav(()=>{
                sub.p("Default",{inline_style:all_links,click:()=>default_page.render()})
                sub.p("Page 1",{inline_style:[selected,all_links]})
            },{inline_style:nav_style})
        })
        sub.h1("you are in the page1")
    },page)


    let hit_counter_div = main_interface.div();
    let hit_counter =  createElement404(sub=>{
        sub.p(`the value of num is ${num}`)
        sub.button("Decrease num",{render_click:()=>num-=1})
        sub.button("Increase num",{render_click:()=>num+=1})
    },hit_counter_div).render()

},target).render()

```


### Styling Elements
You also can apply inline_style to elements by using the **inline_style** tag 

```js
    let target = document.body;
let element = createElement404((main_interface)=>{
    let div_props = {
        inline_style:{
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
            inline_style:{
                "font-size":"10rem",
                "font-weight":"bold",
                color:"red"
            }
        }
        main_interface.h1("404",h1_props)

        let h2_props = {
            inline_style:{
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
## Responsive Styling 
If you want to generate response styles, you can use the tag **responsive_style**

```js


        let target = document.body;
        createElement404(element=>{

            let old1 = {
                color:"white"
            }

            let old2  = {
                'background-color':'red'
            }

            let div_style = {
                old1: old2,
                old2: old1,
                position:"absolute",
                horizontal:{
                    mergeIf:()=>window.innerWidth > window.innerHeight,
                    width: '30vw',
                    height: '15vw'

                },
                vertical:{
                    mergeIf:()=>window.innerWidth < window.innerHeight,
                    width: '15vw',
                    height:"30vw"

                }
            }

            element.div("value of div",{responsive_style:div_style})
            element.div("value of div",{responsive_style:[div_style,{left:"60vw"}]})


        }).render(target);

```

## States  
with The States system,you can generate interactive forms easily
you just need to pass the container and the props you want to  pass 
```js


let target = document.body;
let element = createElement404((main_interface)=>{
    //make sure to enable these to allow rerender on state change
    main_interface.state_render = true;
    //creating an inline_style input more sofisticated
    let style_input = {
        border:'none',
        color:'rgb(71,78,86)',
        'background-color':'rgb(231,231,248)'
    }

    let name = main_interface.stateInput("name",{placeholder:"name",style:style_input})
    main_interface.br()
    let email = main_interface.stateInput("email",{placeholder:"email",style:style_input})
    main_interface.br()
    let age = main_interface.stateInput("age",{placeholder:"age",style:style_input, default_value:18})
    main_interface.stateDecrease("age",1,"-")
    main_interface.stateIncrease("age",1,"+")
    main_interface.br()

    let gender = main_interface.stateSelect("gender",["Man","Woman"],{default_value:"Woman"})
    main_interface.br()

    let password =main_interface.stateInput("password",{placeholder:"password",style:style_input, type:"password"})


    let p_style = {
        color:'rgb(71,78,86)',
        'font-size':'0.75em'
    }

    main_interface.p(`name: ${name}`,{inline_style:p_style})
    main_interface.p(`email: ${email}`,{inline_style:p_style})
    main_interface.p(`password: ${password}`, {inline_style:p_style})
    main_interface.p(`age: ${age}`, {inline_style:p_style})
    main_interface.p(`gender ${gender}`, {inline_style:p_style})
    const pre_props = {
        inline_style:{
            width:"30vw",
            height:"30vh",
            color:'white',
            "background-color":"rgb(38,42,85)",
        }
    }
    main_interface.pre(

        ()=> main_interface.code(
            JSON.stringify(element.getFullState(), null, 4)
        ),

        pre_props
    )

},target)

element.render()





```

## State Setter 
With State Setters you can generate a button that will define a specific point_state 
predetermined 
```js

let target = document.body;
let element = createElement404((main_interface)=>{
    main_interface.state_render = true;

    let selected_style = {
        color:"red"
    }
    let unselected_style= {
        color:"blue"
    }

    let selected_home = {
        content:"Home Selected",
        props:{
            inline_style:selected_style
        }
    }
    let unselected_home = {
        content:"Home",
        props:{
            inline_style:unselected_style
        }
    }
    main_interface.stateSetter("page","home",selected_home,unselected_home);

    let selected_about = {
        content:"About Selected",
        props:{
            inline_style:selected_style
        }
    }
    let unselected_about = {
        content:"About",
        props:{
            inline_style:unselected_style
        }
    }
    let page = main_interface.stateSetter("page","about",selected_about,unselected_about);

    if(page === "home"){
        main_interface.h1("you are in home page")
    }
    else if(page === "about"){
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


let target = document.body;
let element = createElement404((main_interface)=>{
    main_interface.state_render = true;

    main_interface.stateSelect("gender",["Man","Woman"]);
    main_interface.br()
    main_interface.stateInput("num",{placeholder:"num"})
    main_interface.stateDecrease("num",1,"-")
    main_interface.stateIncrease("num",1,"+")
    main_interface.br()


    if(main_interface.locked){

        main_interface.button("unlock",{
            inline_style:{color: "red"},
            notLock_render_click:()=>{
                main_interface.unlock();
            }
        })
    }

    if(!main_interface.locked){
        main_interface.button("lock",{
            inline_style:{color: "blue"},
            render_click:()=>{
                main_interface.lock();
                main_interface.render()
            }

        })
    }





},target)
element.render()

```