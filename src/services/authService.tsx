import axios from "axios";

export async function authenticate(email: String, password: String) {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/auth/local";
    try {
        const response = await axios.post(url, {
            identifier: email,
            password: password,
        });

        const jwtToken = response.data.jwt;
        const user = response.data.user;
        
        console.log('User profile', user);
        console.log('User token', jwtToken);
        
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        return true; 

    } catch (error: any) {
        console.log('An error occurred:', error.response);
        return false; 
    }

}

export function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    return !!token;
};
