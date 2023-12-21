
targets = [
    "args.js",
    "Element404/constructors.js",
    "Element404/locker.js",
    "Element404/render.js",
    "Element404/states/state.js",
    "Element404/states/input.js",
    "Element404/states/increase.js",
    "Element404/states/decrease.js",
    "Element404/states/select.js",
    "Element404/states/setter.js",
    "Element404/sub_components.js",
    "Element404/tags.js"
]



output = 'Element404.js'

final_string = ''
for i in targets:
    with open(f'src/{i}' ,'r') as arq:
        final_string+= arq.read() + '\n'

with open(output,'w') as arq:
    arq.write(final_string)
    