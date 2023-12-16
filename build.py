
targets = [
    'Element404/Element404.js',
    'Element404/internal_methods.js',
    'Element404/main_methods.js',
    'Element404/tags.js',
    'Element404/state.js',

]


output = 'Element404.js'

final_string = ''
for i in targets:
    with open(f'src/{i}' ,'r') as arq:
        final_string+= arq.read() + '\n'

with open(output,'w') as arq:
    arq.write(final_string)
    