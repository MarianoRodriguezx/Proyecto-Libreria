import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import VerificationCode from 'App/Models/VerificationCode';

export default class MailController {
    public async sendMail({ view, auth }: HttpContextContract){
        const min = 111111;
        const max = 999999;
        const generatedCode = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("Código de verificación:", generatedCode)
        /* await Mail.send((message) => {
            message
              .to('themadnesstime@gmail.com')
              .subject('Mi primera prueba!')
              .htmlView('emails/verificationCode', { code: 5000 })
          }) */


          // Guardar código
          await this.resetCodes(auth.user!.id)

          await VerificationCode.create({
            user_id: auth.user!.id,
            code: await Hash.make(generatedCode.toString())
          })

          const data = {
            msg: "",
            hasError: false
          }
          return view.render('pages/submit_code', data)  
    }

    public async submitCode({ view, response, auth, request }: HttpContextContract) {
          const data = {
            msg: "Código inválido. Intentos restantes 9999",
            hasError: true
          }
          // Verificar código
          const verificationCode = await VerificationCode.findByOrFail('user_id', auth.user!.id)
          let submitedCode = request.input('code')
          if (!submitedCode) submitedCode = "nocode"
          const verifiedCode = await Hash.verify(verificationCode.code, submitedCode)

          // si está bien y si es admin
          if (verifiedCode && +auth.user!.role === User.ADMIN.id) {
            await this.resetCodes(auth.user!.id)
            return response.redirect('/generate/qr')
          }

          // si está bien y es supervisor
          if (verifiedCode) {
            await this.resetCodes(auth.user!.id)
            const user = await User.findByOrFail('email', auth.user!.email)
            user.verified = true;
            await user.save()
            return response.redirect('/welcome')
          }

          // Si está mal
          return view.render('pages/submit_code', data)  
    }

    private async resetCodes(userId) {
        await VerificationCode.query()
          .where('user_id', userId)
          .delete()
    }
}
