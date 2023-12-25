
## Short Time

### Fix all type issues 
Fix all problems with JsDocs type hints, and specify complex types

### Implement a Runtime type Checker (debug version)
implement a way to verify types at compile time, with a way to disable in production

## Future
### Implement a form control system 
Implement a form control system  that can generate if struct data, as an CLI apllication
example:
```js


let target = document.body;
let element = createElement404((main_interface)=>{


    let form = main_interface.form("my_form");
    let name = form.askInput("name","type your name");
    let age = form.askNumber("age","type your age");
    if(age > 18){
        let drink = form.askUnique("drink","can drink ?",["yes","no"])
        
    }


},target)
element.render()


``` 
### Server side render
Implement a way to generate server side render, that allows to generate plain text html
by using nodejs for example

### Increase css elements 
Implement functions for css parameters, that allows to make calcs

```js 


let target = document.body;
let element = createElement404((main_interface)=>{


    main_interface.div("Nothing",{
        style_data:{
            position:"absolute",
            "left":css.pixel(19),
            "rigth":css.vh(30)
        }
    })
},target)
element.render()


```
