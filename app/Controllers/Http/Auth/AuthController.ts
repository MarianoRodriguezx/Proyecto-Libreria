import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
const isPrivate = Env.get('IS_PRIVATE')

export default class AuthController {
    public async register({ }: HttpContextContract) {
        return "Método obsoleto"
        /* await request.validate(RegisterValidator)
        const userData = request.only(User.register)
        await User.create(userData)
        // await auth.use('web').attempt(userData.email, userData.password)

        return response.created({
            status: true,
            message: 'Usuario egistrado exitosamente',
            data: {
                "user": auth.user
            }
        }) */
    }

    public async login({ request, response, auth, session }: HttpContextContract) {
        await request.validate(LoginValidator)
        const userData = request.only(User.login)
        const isPrivate = Env.get('IS_PRIVATE')
        try {

            const user = await User.findByOrFail('email', userData.email)

            // Validar status
            if (!user.status) {
                session.flash('form', 'Tu cuenta se encuenta desactivada, contactate con el administrador')
                return response.redirect().back()
            }

            // Validaciones de rol
            if (isPrivate) {
                if (!User.privateAccess.includes(user.role)) {
                    session.flash('form', 'Este usuario no tiene acceso permitido')
                    return response.redirect().back()
                }
            } else {
                if (!User.publicAccess.includes(user.role)) {
                    session.flash('form', 'Este usuario no tiene acceso permitido')
                    return response.redirect().back()
                }
            }

            // Iniciar sesión
            await auth.use('web').attempt(userData.email, userData.password)

            // Rederigir
            if (+user.role === User.NORMAL.id) {
                user.verified = true;
                await user.save()
                return response.redirect('/dashboard')
            } else {
                user.verified = false;
                await user.save()
                const signedRoute = Route.builder()
                    .params({ userId: auth.user!.id })
                    .makeSigned('/sendMail', { expiresIn: '1m' })
                return response.redirect(signedRoute)
            }
        }
        catch (error) {
            console.log(error)
            session.flash('form', 'Tu Email o Contraseña son Incorrectos')
            return response.redirect().back()
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        const user = await User.findByOrFail('email', auth.user!.email)
        user.verified = false;
        await user.save()
        await auth.use('web').logout()
        return response.redirect('/login')
    }

    public async profile({ auth, view }: HttpContextContract) {
        const data = {
            user: auth.user,
            isPrivate: isPrivate,
            role: auth.user?.role
        }
        return view.render('pages/auth/profile', data)
    }

    public async changePassword({ auth, view }: HttpContextContract) {
        const data = {
            user: auth.user,
            isPrivate: isPrivate,
            role: auth.user?.role
        }
        return view.render('pages/auth/change_password', data)
    }

    public async updatePassword({ auth, session, response, request }: HttpContextContract) {
        try {
            const user = await User.findOrFail(auth.user!.id)
            const password = request.input('password')
            const confirmation = request.input('confirmation')
            if (password !== confirmation) {
                session.flash('form', 'Las contraseñas no coinciden')
                return response.redirect().back()
            }
            user.password = password
            await user.save()
            session.flash('success', 'Contraseña actualizada correctamente')
            return response.redirect().back()   
        } catch (e) {
            console.log(e)
            session.flash('form', 'Formulario inválido')
            return response.redirect().back()
        }
    }

    public async getRole({ auth }: HttpContextContract) {
        return auth.user!.role
    }
}
