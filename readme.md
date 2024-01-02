# Element-404
An Extremely simple JS library to create Reactive UIS.

## Disclaimers
These Lib it's not production ready yet, and if you want to use into your application
make sure to save the current release, and be ready for bugs.

## Contributions
If you want to contribute, just read the TODO.md and then, implement the required feature.


## Run
For Running , you just need to copy the script tag into your code 


```html

<script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>

```


## Hello World


[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/start.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
    function main(){
        let target = document.body;
        let element = createElement404((main_interface)=>{
            main_interface.div(()=>{
                main_interface.h1("Hello World",{inline_style:{color:'red'}})
            })

        },target)

        element.render()
    }

    window.addEventListener('load',main);
</script>

</body>
</html>
```


## Triggers
for defining a trigger, you just need to pass, the trigger with the prefix "render_" if you want to update the ui
otherwise just pass the trigger,but the ui will not be updated.


[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/triggers.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
    function main(){
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

    }

    window.addEventListener('load',main);
</script>

</body>
</html>
```

## Dealing with Inputs 
If you don't want to use States, you can handle inputs, by using the normal input implementation


[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/input.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
    function main(){
        let target = document.body;
        let element = createElement404((main_interface)=>{
            main_interface.div(()=>{
                main_interface.h1("Hello World",{inline_style:{color:'red'}})
            })

        },target)

        element.render()
    }

    window.addEventListener('load',main);
</script>

</body>
</html>
```

### Mini Dom Operations
With MiniDom you can find, and modify parts of elements individually 

#### Finding a Value
in these Example we find a value of an input , then we alert it



[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/finding_input_value.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
    function main(){
  
        let target = document.body;
        createElement404(element=>{

             element.div(()=>{
                 element.div(()=>{
                     let created_input = element.input({placeholder:"type something"})
                     created_input.input_name = 'test';
                 })
             })

            let button =element.button("visualize");
             button.set_prop('click',()=>{
                 let founded_input = element.findOne(value => value.input_name === 'test');
                 alert("you typed: "+ founded_input.domElement.value);
             })

        },target).render();

    }

    window.addEventListener('load',main);
</script>

</body>
</html>
```

### Render Match 
with render match system you can render specif parts of the code



[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/render_match.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
    
    let value1 = 0;
    let value2 = 0;
    
    function main(){
  
        let target = document.body;
        createElement404(element=>{

            element.div((current)=>{
                current.div_name = 'div1';
                element.p("the value1 is " + value1);
            })

            element.div((current)=>{
                current.div_name = 'div2';
                element.p("the value2 is " + value2);
            })


            let button1 =element.button("update div1");

            button1.set_prop('click',()=>{
                value1+=1;
                element.renderMatch(value => value.div_name === 'div1');
            })

            let button2 =element.button("update div2");
            button2.set_prop('click',()=>{
                value2+=1;
                element.renderMatch(value => value.div_name === 'div2');
            });

        },target).render();
    }

    window.addEventListener('load',main);
</script>

</body>
</html>
```

### Switching Context

### Switching in The Same render 
The easiest way of switch interface context, its by adding callback modifiers
but remember that they will be affected by the render process

[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/switch_in_the_same_render.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
    function main(){
     
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
                cursor:"pointer",
                hover_state:{
                    state:"hover",
                    color:"red"
                }
            }

            let selected = {
                color:"red"
            }

            function default_page(){
                page.clear()
                page.nav(()=>{
                    page.p("Default",{outline_style:[selected,all_links]})
                    page.p("Page 1",{outline_style:all_links, click:page1})
                    page.p("Page 3",{outline_style:all_links, click:page2})
                },{outline_style:nav_style})

                page.h1("you are in the default page")
            }
            default_page()

            function page1(){
                page.clear()
                page.nav(()=>{
                    page.nav(()=>{
                        page.p("Default",{outline_style:all_links,click:default_page})
                        page.p("Page 1",{outline_style:[selected,all_links]})
                        page.p("Page 3",{outline_style:all_links, click:page2})
                    },{outline_style:nav_style})
                })
                page.h1("you are in the page1")
            }


            function page2(){
                page.clear()
                page.nav(()=>{
                    page.p("Default",{outline_style:all_links,click:default_page})
                    page.p("Page 1",{outline_style:all_links, click:page1})
                    page.p("Page 2",{outline_style:[selected,all_links]})
                },{outline_style:nav_style})
                page.h1("you are in the page 2")
            }


            },target).render()

    }

    window.addEventListener('load',main);
</script>

</body>
</html>
```



### Switching in Different Renders

You also can switch context by creating sub elements404, the advantage of it, its that they dont 
affect other parts of the render

[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/switch_in_diferent_render.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
let num = 0;

function main(){
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



        function default_page(){
            page.clear()
            page.nav(()=>{
                page.p("Default",{inline_style:[selected,all_links]})
                page.p("Page 1",{inline_style:all_links, click:page1})
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
                },{inline_style:nav_style})
            })
            page.h1("you are in the page1")
        }




        let hit_counter_div = main_interface.div();
        let hit_counter =  createElement404(sub=>{
            sub.p(`the value of num is ${num}`)
            sub.button("Decrease num",{render_click:()=>num-=1})
            sub.button("Increase num",{render_click:()=>num+=1})
        },hit_counter_div).render()

    },target).render()

}

window.addEventListener('load',main);
</script>

</body>
</html>
```


### Styling Elements
You also can apply is_inline_style to elements by using the **is_inline_style** tag 

[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/styling_elements.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>

    
function main(){


    let target = document.body;
    let element = createElement404((main_interface)=>{
    
    let div_props = {
        is_inline_style:{
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
            is_inline_style:{
                "font-size":"10rem",
                "font-weight":"bold",
                color:"red"
            }
        }
        main_interface.h1("404",h1_props)

        let h2_props = {
            is_inline_style:{
                "font-size":"2rem",
                "font-weight":"bold",
                color:"red"
            }
        }
        main_interface.h2("Page Not Found",h2_props)
    },div_props)


    },target)

    element.render()

}

    window.addEventListener('load',main);
</script>

</body>
</html>
```


## Outline Styling 
If you want to generate response styles, or use props like hover or active you can use the tag **outline_style**

[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/outline_style.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
function main(){
    let target = document.body;
createElement404(element=>{
    const  NORMAL = {
        color:"white",
        position:"absolute"
    }

    const HORIZONTAL = {
        media:'screen and (orientation: landscape)',
        'background-color':'green',
        width: '30vw',
        height: '15vw'
    };
    const VERTICAL = {
        media:'screen and (orientation: portrait)',
        width: '15vw',
        height:"30vw",
        'background-color':'blue'
    };


    const  MOUSE_PROPS = {
        state:['hover','active'],
        'background-color':'yellow'
    }


    let div_style = [NORMAL,MOUSE_PROPS,HORIZONTAL,VERTICAL]
    let right_div = [div_style,{left:"60vw"}];

    element.div("value of div",{outline_style:div_style})
    element.div("value of div",{outline_style:right_div})


},target).render();


}

window.addEventListener('load',main);
</script>

</body>
</html>
```


## States  
with The States system,you can generate interactive forms easily
you just need to pass the container and the props you want to  pass 

[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/states.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
function main(){
    let target = document.body;
    let element = createElement404((main_interface)=>{
    //make sure to enable these to allow rerender on state change
    main_interface.state_render = true;
    //creating an is_inline_style input more sofisticated
    let style_input = {
        border:'none',
        color:'rgb(71,78,86)',
        'background-color':'rgb(231,231,248)'
    }

    let name = main_interface.stateInput("name",{placeholder:"name",inline_style:style_input})
    main_interface.br()
    let email = main_interface.stateInput("email",{placeholder:"email",inline_style:style_input})
    main_interface.br()
    let age = main_interface.stateInput("age",{placeholder:"age",inline_style:style_input, default_value:18})
    main_interface.stateDecrease("age",1,"-")
    main_interface.stateIncrease("age",1,"+")
    main_interface.br()

    let gender = main_interface.stateSelect("gender",["Man","Woman"],{default_value:"Woman"})
    main_interface.br()

    let password =main_interface.stateInput("password",{placeholder:"password",inline_style:style_input, type:"password"})


    let p_style = {
        color:'rgb(71,78,86)',
        'font-size':'0.75em'
    }

    main_interface.p(`name: ${name}`).inline_style(p_style);
    main_interface.p(`email: ${email}`).inline_style(p_style);
    main_interface.p(`password: ${password}`).inline_style(p_style);
    main_interface.p(`age: ${age}`).inline_style(p_style);
    main_interface.p(`gender ${gender}`).inline_style(p_style);



    main_interface.pre(()=> {
        main_interface.code(
            JSON.stringify(element.getFullState(), null, 4)
        )
    }).inline_style({
        width:"30vw",
        height:"30vh",
        color:'white',
        "background-color":"rgb(38,42,85)",
    })

},target)

element.render()

}

window.addEventListener('load',main);
</script>

</body>
</html>
```

## State Setter 
With State Setters you can generate a button that will define a specific point_state 
predetermined 
`
[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/state_setter.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
function main(){


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
            is_inline_style:selected_style
        }
    }
    let unselected_home = {
        content:"Home",
        props:{
            is_inline_style:unselected_style
        }
    }
    main_interface.clickableStateSetter("page","home",selected_home,unselected_home);

    let selected_about = {
        content:"About Selected",
        props:{
            is_inline_style:selected_style
        }
    }
    let unselected_about = {
        content:"About",
        props:{
            is_inline_style:unselected_style
        }
    }
    let page = main_interface.clickableStateSetter("page","about",selected_about,unselected_about);

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

}

window.addEventListener('load',main);
</script>

</body>
</html>
```

## Locker 
With Lockers , you can lock the entire UI, to avoid concurrency problems 

[Runable exemple](https://ouisolutions.github.io/Element-404/internal/exemples/locker.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Element-404@main/versions/Element404_v0.5.js"></script>
</head>
<body>
<script>
function main(){

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
}

window.addEventListener('load',main);
</script>

</body>
</html>
```
