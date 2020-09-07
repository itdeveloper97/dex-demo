import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reqres.in/api/'
});


export const userAPI = {
    login(email, password) {
        return instance.post('login', {
            email,
            password
        }).then((response) => {
            return response;
        })
    },
    logout() {
        instance.delete('login')
    }
}