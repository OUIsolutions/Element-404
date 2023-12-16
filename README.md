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