# Element-404
An Extremely simple JS library to create Reactive UIS.

## Disclaimers
These Lib it's not production ready yet, and if you want to use into your application
make sure to save the current release, and be ready for bugs.

## Contributions
If you want to contribute, just read the TODO.md and then, implement the required feature.


## Run
For Running , you just need to copy the script tag into your code 

#ref:script_tag.html


## Source

if you want to edit the source code: 

[Source](https://github.com/OUIsolutions/Element-404)


## Hello World


#page_ref:start.html


## Triggers
for defining a trigger, you just need to pass, the trigger with the prefix "render_" if you want to update the ui
otherwise just pass the trigger,but the ui will not be updated.


#page_ref:triggers.html

## Dealing with Inputs 
If you don't want to use States, you can handle inputs, by using the normal input implementation


#page_ref:input.html

### Mini Dom Operations
With MiniDom you can find, and modify parts of elements individually 

#### Finding a Value
in these Example we find a value of an input , then we alert it



#page_ref:finding_input_value.html

### Render Match 
with render match system you can render specif parts of the code



#page_ref:render_match.html

### Switching Context

### Switching in The Same render 
The easiest way of switch interface context, its by adding callback modifiers
but remember that they will be affected by the render process

#page_ref:switch_in_the_same_render.html



### Switching in Different Renders

You also can switch context by creating sub elements404, the advantage of it, its that they dont 
affect other parts of the render

#page_ref:switch_in_diferent_render.html


### Styling Elements
You also can apply is_inline_style to elements by using the **is_inline_style** tag 

#page_ref:styling_elements.html


## Outline Styling 
If you want to generate response styles, or use props like hover or active you can use the tag **outline_style**

#page_ref:outline_style.html


## States  
with The States system,you can generate interactive forms easily
you just need to pass the container and the props you want to  pass 

#page_ref:states.html

## State Setter 
With State Setters you can generate a button that will define a specific point_state 
predetermined 
`
#page_ref:state_setter.html

## Locker 
With Lockers , you can lock the entire UI, to avoid concurrency problems 

#page_ref:locker.html
