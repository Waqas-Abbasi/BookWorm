const defaultUser = {
    username: '',
    email: '',
    loggedIN: false,
};

const userReducer = (state = defaultUser, action) => {
    console.log(action);
    return state;
};

export default userReducer
