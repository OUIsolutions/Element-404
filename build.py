
targets = [
    'constructors.js',
    'sub_components.js',
    'render.js',
    'locker.js',
    'tags.js',
    'point_state.js',

]


output = 'Element404.js'

final_string = ''
for i in targets:
    with open(f'src/{i}' ,'r') as arq:
        final_string+= arq.read() + '\n'

with open(output,'w') as arq:
    arq.write(final_string)
    