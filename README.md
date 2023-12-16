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