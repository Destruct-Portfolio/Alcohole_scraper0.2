import fs from "node:fs"
import { product } from "../types"

export default class SaveHandler {

    public static To_JSON(Data: any[]) {
        console.log(`[+] Saving to json file ...`)
        try {
            let t: product[] = JSON.parse(fs.readFileSync('../output/products.json').toString())
            Data.forEach((item) => t.push(item))
            fs.writeFileSync('../output/products.json', JSON.stringify(t))
            console.log(`[+] Saving Succsefull...`)

        } catch (error) {
            console.log(`[-] saving Failed ...`)
            console.log(error)
        }

    }
}