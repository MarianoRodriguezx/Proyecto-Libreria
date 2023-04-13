import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
// import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
    public async register({ request, response, auth }: HttpContextContract){
        await request.validate(RegisterValidator)
        const userData = request.only(User.register)
        await User.create(userData)
        const token = await auth.use('api').attempt(userData.email, userData.password,{})

        return response.created({
            status: true,
            message: 'Usuario egistrado exitosamente',
            data: {
                "token": token,
                "user": auth.user
            }
        })
    }

    public async login({ request, response, auth }: HttpContextContract){
        await request.validate(LoginValidator)
        const userData = request.only(User.login)
        try{
            const user = await User.findByOrFail('email', userData.email)
            if (!user.status) {
                response.status(405)
                return {
                    status: true,
                    message: 'Tu cuenta no está activa. Contacta a soporte',
                    data: {},
                    isExternalApi: false
                }
            }

            const token = await auth.use('api').attempt(userData.email, userData.password,{})
            return response.redirect('/welcome')
            /* return response.ok({
                status: true,
                message: 'Sesión iniciada exitosamente',
                data: {
                    "token": token,
                    "user": auth.user
                },
                isExternalApi: false
            }) */
        }
        catch(error){
            console.log(error)
            return response.redirect('/login')
            /* return response.unauthorized({
                status: false,
                message: 'Correo o contraseña inválidos',
                data: {},
                isExternalApi: false
            }) */
        }
    }

    public async logout({ auth, response }: HttpContextContract){
        await auth.use('api').revoke()
        return response.ok({
            status: true,
            message: 'Sesión cerrada correctamente',
            data: {},
            isExternalApi: false
        })
    }

    public async profile({ auth, response }: HttpContextContract){
        return response.ok({
            status: true,
            message: 'Perfil encontrado correctamente',
            data: auth.user,
            isExternalApi: false
        })
    }
}
