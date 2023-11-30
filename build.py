
targets = [
    'element404/Element404.js',
    'element404/internal_methods.js',
    'element404/main_methods.js',
    'element404/tags.js',

     'stateElements/stateButton.js',
    'stateElements/stateInput.js',

]


output = 'Element404.js'

final_string = ''
for i in targets:
    with open(f'src/{i}' ,'r') as arq:
        final_string+= arq.read() + '\n'

with open(output,'w') as arq:
    arq.write(final_string)
    