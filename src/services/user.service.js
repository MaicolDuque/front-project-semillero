import ApiService from './api.service'
import { TokenService } from './storage.service'


class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    
    /**
     * Info by user
     */
    infoUserDirector(id){
        return ApiService.get(`/director/${id}`)
            .then(res => res.data)
    },

    infoUserCoordinador(id){
        return ApiService.get(`/coordinador/${id}`)
            .then(res => res.data)
    },

    infoUser(id){
        return ApiService.get(`/usuario/${id}`)
            .then(res => res.data)
    },

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
    logout() {
        // Remove the token and remove Authorization header from Api Service as well 
        TokenService.removeToken()
        TokenService.removeRefreshToken()
        ApiService.removeHeader()
        
        // NOTE: Again, we'll cover the 401 Interceptor a bit later. 
        ApiService.unmount401Interceptor()
    }
}

export default UserService

export { UserService, AuthenticationError }