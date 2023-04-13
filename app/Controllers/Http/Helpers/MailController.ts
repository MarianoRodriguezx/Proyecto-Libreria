import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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

    public async submitCode({ view }: HttpContextContract) {

          const data = {
            msg: "Código inválido. Intentos restantes 9999",
            hasError: true
          }
          return view.render('pages/submit_code', data)  
    }
}
