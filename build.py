
targets = [
    'Element404.js',
    'internal_methods.js',
    'main_methods.js',
    'tags.js',
    'state.js',

]


output = 'Element404.js'

final_string = ''
for i in targets:
    with open(f'src/{i}' ,'r') as arq:
        final_string+= arq.read() + '\n'

with open(output,'w') as arq:
    arq.write(final_string)
    