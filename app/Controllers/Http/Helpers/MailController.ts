import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class MailController {
    public async sendMail({ view }: HttpContextContract){
        const min = 111111;
        const max = 999999;
        const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(randomNum)
        /* await Mail.send((message) => {
            message
              .to('themadnesstime@gmail.com')
              .subject('Mi primera prueba!')
              .htmlView('emails/verificationCode', { code: 5000 })
          }) */

          const data = {
            msg: "",
            hasError: false
          }
          return view.render('pages/submit_code', data)  
    }

    public async submitCode({ view, response, auth }: HttpContextContract) {
          const data = {
            msg: "Código inválido. Intentos restantes 9999",
            hasError: true
          }
          const verifiedCode = true
          // si está bien y si es admin
          if (verifiedCode && +auth.user!.role === User.ADMIN.id) {
            return response.redirect('/generate/qr')
          }

          // si está bien y es supervisor
          if (verifiedCode) {
            const user = await User.findByOrFail('email', auth.user!.email)
            user.verified = true;
            await user.save()
            return response.redirect('/welcome')
          }

          // Si está mal
          return view.render('pages/submit_code', data)  
    }
}
