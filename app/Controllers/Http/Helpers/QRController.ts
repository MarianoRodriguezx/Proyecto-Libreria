import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
var QRCode = require('qrcode')


export default class MailController {
    public async generateQR({ view }: HttpContextContract){
        console.log("Generando QR...")
        /* QRCode.toString('123456',{type:'terminal'}, function (_err, url) {
            console.log(url)
        }) */
        const content = 'carlos.lpz.2k02@gmail.com'
        const qrCode = await QRCode.toDataURL(content, {scale: 10})
        const data = {
            qrCode: qrCode
        }
        console.log(qrCode)
        return view.render('pages/scan_qr', data)
    }
}
