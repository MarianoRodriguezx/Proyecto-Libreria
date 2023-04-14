import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
var QRCode = require('qrcode')
// import Ws from 'App/Services/Ws'


export default class MailController {
    public async generateQR({ view, auth }: HttpContextContract){
        const content = auth.user?.email
        const qrCode = await QRCode.toDataURL(content, {scale: 10})
        const data = {
            qrCode: qrCode,
            email: auth.user?.email
        }
        return view.render('pages/scan_qr', data)
    }

    public async submitQR({ response, auth }: HttpContextContract) {
        const user = await User.findByOrFail('email', auth.user!.email)
        user.verified = true;
        await user.save()
        return response.redirect('/welcome')
    }

    public async forceQr({ request }: HttpContextContract) {
        const email = request.input('email')
        console.log(email)
        return "Obsoleto"
        //Ws.io.emit(`verificate-${email}`, { my: 'data' })
    }
}
