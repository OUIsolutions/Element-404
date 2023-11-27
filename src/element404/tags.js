


class Element404Tags extends Element404Base{
    
    
    /**
     * @param {{'click':function, 'focusout':function}} props -The props of elemment
     */
    input(props){
        this.create('input',props,null)
    }


    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    div(props,content){
        this.create('div',props,content)
    }

    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    p(props,content){
        this.create('p',props,content)
    }



    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h1(props,content){
        this.create('h1',props,content)
    }



    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h2(props,content){
        this.create('h2',props,content)
    }


    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h3(props,content){
        this.create('h3',props,content)
    }


    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h4(props,content){
        this.create('h4',props,content)
    }

    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    h5(props,content){
        this.create('h5',props,content)
    }


    /**
     * @param {function | string | number} content - The content of the element
     */
    text(message){
        this.create(null,null,message)
    }

    /**
     * @param {{'click':function}} props -The props of elemment
     * @param {function | string} content - The content of the element
     */
    button(props,content){
        this.create('button',props,content)
    }

    br(){
        this.create('br')
    }
}