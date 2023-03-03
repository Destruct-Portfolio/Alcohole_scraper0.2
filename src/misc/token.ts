import fs from 'fs'
import Logger from './logger.js'

export default class PrivacyPassToken {

    private static _path: string = '../assets/privacypass.token'


    /**
     * @description This will use the privacy pass generator to produce a new batch of tokens
     * 
     * @internal
     */

    private static _generate() {
        throw new Error('Not implemented yet.')
    }

    public static getToken() {


        let tokens = JSON.parse(fs.readFileSync(this._path).toString())


        try {
            if (tokens.length === 0) PrivacyPassToken._generate()
        } catch (error) {
            /*      PrivacyPassToken._logger.error('Refill token file.') */
            console.log('Refill token file.')
        }


        const token = JSON.parse(tokens.shift())

        fs.unlinkSync(PrivacyPassToken._path)
        fs.writeFileSync(PrivacyPassToken._path, JSON.stringify(tokens, null, 2))

        return token

    }


}
