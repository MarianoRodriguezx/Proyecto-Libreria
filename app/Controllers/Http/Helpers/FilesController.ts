import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class FilesController {
    public async uploadImage({ request, response }: HttpContextContract) {
        try {

            // Validate
        const fileDataSchema = schema.create({
            my_file: schema.file({
                size: '10mb',
                extnames: ['jpg', 'jpeg' ,'gif', 'png'],
            })
        })
        const fileData = await request.validate({ schema: fileDataSchema })
        const myFile = fileData.my_file;

        // Path
        const path = Env.get('NODE_ENV') === 'development' ? 'testing/images/' :  'oficial/images/';
        const filename = cuid()
        const filePath = `${path}${filename}.${myFile.extname}`
        await myFile.move(Application.tmpPath('uploads'), {
            name: filename,
            overwrite: true
        })
        await Drive.putStream(filePath, fs.createReadStream(Application.tmpPath(`uploads/${filename}`)), {})
        return response.status(200).send({ success: true })
        } catch (error) {
        console.error(error)
        return response.status(500).send({ success: false, error: 'Error al cargar el archivo' })
        }
      }

    public async getImage({ request, response }: HttpContextContract) {
        try {
            // Path
            const path = Env.get('NODE_ENV') === 'development' ? 'testing/images/' :  'oficial/images/';
            const filename = request.input("filename")
            const filePath = `${path}${filename}`
            const url = await Drive.getSignedUrl(filePath, {
                expiresIn: '30mins'
                })
                console.log(url)
                return response.redirect(url)
        } catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, error: 'Error al descargar el archivo' })
        }
    }

    public async uploadPDF({ request, response }: HttpContextContract) {
        try {

        // Validate
        const fileDataSchema = schema.create({
            my_file: schema.file({
                size: '50mb',
                extnames: ['pdf'],
            })
        })
        const fileData = await request.validate({ schema: fileDataSchema })
        const myFile = fileData.my_file;

        // Path
        const path = Env.get('NODE_ENV') === 'development' ? 'testing/pdf/' :  'oficial/pdf/';
        const filename = cuid()
        const filePath = `${path}${filename}.${myFile.extname}`
        await myFile.move(Application.tmpPath('uploads'), {
            name: filename,
            overwrite: true
        })
        await Drive.putStream(filePath, fs.createReadStream(Application.tmpPath(`uploads/${filename}`)), {})
        console.log(filePath)
        return response.status(200).send({ success: true })
        } catch (error) {
        console.error(error)
        return response.status(500).send({ success: false, error: 'Error al cargar el archivo' })
        }
      }

    public async getPDF({ request, response }: HttpContextContract) {
        try {
            // Path
            const path = Env.get('NODE_ENV') === 'development' ? 'testing/pdf/' :  'oficial/pdf/';
            const filename = request.input("filename")
            const filePath = `${path}${filename}`
            const url = await Drive.getSignedUrl(filePath, {
                expiresIn: '30mins'
                })
                console.log(url)
                return response.redirect(url)
        } catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, error: 'Error al descargar el archivo' })
        }
    }
}
