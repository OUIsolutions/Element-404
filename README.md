# Element-404
An extremaly simple js framework to create Reactive UIS

## Install 

Just download the **Element404.js** file into your project an than reference into your html

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
            main_interface.div({},()=>{
                main_interface.h1({style:{color:'red'}},"Hello World")

            })

        },target)

        element.render()
           


    </script>

</body>
</html>
```
## Triggers
for defining an trigger, you just need to pass, the trigger with the prefix "render_" if you want to update the ui

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
        var num =0;

        let target = document.body;
        let element = createElement404((main_interface)=>{
            main_interface.div({},()=>{
                main_interface.h1({},`the value of num is ${num}`)
                main_interface.button({render_click:()=> num--},`remove 1 from num`)
                main_interface.button({render_click:()=> num++},`add 1 to num`)
            })

        },target)

        element.render()
           


    </script>

</body>
</html>

```


## Dealing with Inputs 


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

            main_interface.p({},`You typed: ${input_text}`)


        },target)

        element.render()
           


    </script>

</body>
</html>
```

### Styling Elements
You alson can aplly style to elements by using the **style** tag 

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
                main_interface.div(div_props,()=>{
                    let h1_props = {
                        style:{
                            "font-size":"10rem",
                            "font-weight":"bold",
                            color:"red"
                        }
                    }
                    main_interface.h1(h1_props,"404")

                    let h2_props = {
                        style:{
                            "font-size":"2rem",
                            "font-weight":"bold",
                            color:"red"
                        }
                    }
                    main_interface.h2(h2_props,"Page Not Found")
                })


        },target)

        element.render()
           


    </script>

</body>
</html>
```

## States  
with The States system,you can generate interactive forms easly
you just need to pass the container and the props you want to  pass 
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
            main_interface.stateDecreaser(user_data,"age",1,{},"-")
            main_interface.stateIncreaser(user_data,"age",1,{},"+")
            main_interface.br()
            main_interface.stateSelect(user_data,"gender",["Man","Woman"])
            main_interface.br()

            main_interface.stateInput(user_data,"password",{placeholder:"password"})
            main_interface.p({},`name: ${user_data.name}`)
            main_interface.p({},`email: ${user_data.email}`)
            main_interface.p({},`password: ${user_data.password}`)
            main_interface.p({},`age: ${user_data.age}`)
            main_interface.p({},`gender ${user_data.gender}`)
        
        },target)
        element.render()
           


    </script>

</body>
</html>

```

## State Setter 
With State Setters you can generate an button that will define an especific state 
predetermined 
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
        var data = {}

        let target = document.body;
        let element = createElement404((main_interface)=>{
            let seted_props = {
                style:{
                    color:"red"
                }
            }
            let unseted_props = {
                style:{
                    color:"blue"
                }
            }
            main_interface.stateSetter(data,"page","home",seted_props,unseted_props,"Home");
            main_interface.stateSetter(data,"page","about",seted_props,unseted_props,"About");

            if(data.page == "home"){
                main_interface.h1({},"you are in home page")
            }
            else if(data.page == "about"){
                main_interface.h1({},"you are in about page")
            }

            else{
                main_interface.h1({},"404")
            }
        },target)
        element.render()
           


    </script>

</body>
</html>
```