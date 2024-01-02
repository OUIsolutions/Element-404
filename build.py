from os import listdir
import hashlib
from shutil import rmtree
from os import makedirs

SOURCES = [
    "src/constants.js",
    "src/globals.js",
    "src/args.js",
    "src/extra.js",
    "src/style/inline.js",
    "src/style/outline.js",
    "src/Element404/constructors.js",
    "src/Element404/locker.js",
    "src/Element404/render.js",
    "src/Element404/minidom.js",
    "src/Element404/states/state.js",
    "src/Element404/states/input.js",
    "src/Element404/states/increase.js",
    "src/Element404/states/decrease.js",
    "src/Element404/states/select.js",
    "src/Element404/states/setter.js",
    "src/Element404/sub_components.js",
    "src/Element404/tags.js"
]

LIB_NAME = 'Element404'
REPO_NAME = 'OUIsolutions/Element-404'


def create_output():
    output = ''
    for e in SOURCES:
        with open(e, 'r') as f:
            output += f.read() + '\n'
    version = input('version: ')

    makedirs('versions', exist_ok=True)

    output_name = f'versions/{LIB_NAME}_v{version}.js'

    with open(output_name, 'w') as f:
        f.write(output)
    return output_name


output_name = create_output()
#replacing html links 
link = f'https://cdn.jsdelivr.net/gh/{REPO_NAME}@main/{output_name}'
div = f'src="{link}"'


rmtree('internal/exemples',ignore_errors=True)
makedirs('internal/exemples')

for e in listdir('internal/exemples_not_linked'):
    with open(f'internal/exemples_not_linked/{e}', 'r') as f:
        output = f.read()
        output = output.replace('#lib#', div)
        with open(f'internal/exemples/{e}', 'w') as f:
            f.write(output)


exemples = listdir('internal/exemples')

with open('internal/readme.md', 'r') as f:
    readme_code = f.read()


for e in exemples:
    with open(f'internal/exemples/{e}', 'r') as f:
        output = f.read()
        output_data =''
        output_data+= '[Runable exemple]'
        output_data+=f'(https://ouisolutions.github.io/Element-404/internal/exemples/{e})'
        output_data+=f'\n```html\n{output}\n```'
        readme_code = readme_code.replace(f"#page_ref:{e}", output_data)


for e in exemples:
    with open(f'internal/exemples/{e}', 'r') as f:
        output = f.read()
        output_data=f'\n```html\n{output}\n```'
        readme_code = readme_code.replace(f"#ref:{e}", output_data)


if "#page_ref" in readme_code or '#ref' in readme_code:
    raise Exception(f"Missing reference {readme_code.split('#ref')[1]}")
with open('readme.md', 'w') as f:
    f.write(readme_code)
