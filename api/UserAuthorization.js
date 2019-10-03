
export const registerUser = async (user) => {
    const result = {
        success: false,
    };

    const response = await setTimeout(() => {
        return Math.floor(Math.random() * Math.floor(3)) < 1.5 ? true : false;
    }, 2000);

    result.success = response;
    return result;
};


export const loginUser = async (user) => {
    console.log(user);
    try {
        const response = await fetch('http://localhost:3000/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

        const result = await response.text();
        console.log(result);

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }catch (e) {
        console.log(e)
    }
};
