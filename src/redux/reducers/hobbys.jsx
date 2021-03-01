const innitialState = {
    list: []
}

const hobbyReducer = (state = innitialState, action) => {
    switch (action.type){
        case  "ADD_HOBBY" : {
            return state
        }

        default : 
            return  state;
    }
}

export default hobbyReducer