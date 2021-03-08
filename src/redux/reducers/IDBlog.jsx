const innitialState = {
    idBlog: "novalue"
}

const idBlogReducer = (state = innitialState, action) => {
    switch (action.type){
        case  "ID_BLOG" : {
            return { type: action.type, ...action.payload}
        }

        default : 
            return  state;
    }
}

export default idBlogReducer