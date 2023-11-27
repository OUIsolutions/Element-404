
targets = []
output = 'Element404.js'

final_string = ''
for i in targets:
    with open(f'src/{i}' ,'e') as arq:
        final_string+= arq.read() + '\n'

with open(output,'w') as arq:
    arq.write(final_string)
    