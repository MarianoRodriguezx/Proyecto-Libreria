import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
    public async register({ request, response, auth }: HttpContextContract){
        await request.validate(RegisterValidator)
        const userData = request.only(User.register)
        await User.create(userData)
        // await auth.use('web').attempt(userData.email, userData.password)

        return response.created({
            status: true,
            message: 'Usuario egistrado exitosamente',
            data: {
                "user": auth.user
            }
        })
    }

    public async login({ request, response, auth }: HttpContextContract){
        await request.validate(LoginValidator)
        const userData = request.only(User.login)
        const isPrivate = Env.get('IS_PRIVATE')
        try{

            const user = await User.findByOrFail('email', userData.email)

            // Validar status
            if (!user.status) {
                response.status(405)
                return {
                    status: true,
                    message: 'Tu cuenta no está activa',
                    data: {},
                }
            }

            // Validaciones de rol
            if (isPrivate) {
                if (!User.privateAccess.includes(user.role)) {
                    response.status(405)
                    return {
                        status: true,
                        message: 'Este rol no tiene acceso permitido',
                        data: {}
                    }
                }
            } else {
                if (!User.publicAccess.includes(user.role)) {
                    response.status(405)
                    return {
                        status: true,
                        message: 'Este rol no tiene acceso permitido',
                        data: {}
                    }
                }
            }

            // Iniciar sesión
            await auth.use('web').attempt(userData.email, userData.password)

            // Rederigir
            if (+user.role === User.NORMAL.id) {
                user.verified = true;
                await user.save()
                return response.redirect('/welcome')
            } else {
                return response.redirect('/sendMail')
            }
        }
        catch(error){
            console.log(error)
            return response.redirect('/login')
            /* return response.unauthorized({
                status: false,
                message: 'Correo o contraseña inválidos',
                data: {},
            }) */
        }
    }

    public async logout({ auth, response }: HttpContextContract){
        const user = await User.findByOrFail('email', auth.user!.email)
        user.verified = false;
        await user.save()
        await auth.use('web').logout()
        return response.redirect('/login')
    }

    public async profile({ auth, response }: HttpContextContract){
        return response.ok({
            status: true,
            message: 'Perfil encontrado correctamente',
            data: auth.user
        })
    }
}
