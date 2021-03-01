export const AddNewHobby = (hobby) => {
    return {
        type: "ADD_HOBBY",
        payload: hobby
    }
}
export const setActiveHobby = (hobby) => {
    return {
        type: "SET_ACTIVE_HOBBY",
        payload: hobby
    }
}
