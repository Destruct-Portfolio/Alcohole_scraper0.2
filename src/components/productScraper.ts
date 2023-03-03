import Hero_Scrapper from "./scrapper.js";
import { product } from "../types/index.js";
import Sleep from "../misc/sleep.js";
import fs from "node:fs"
import Logger from "../misc/logger.js";

export default class Product_Scraper extends Hero_Scrapper {
    private Links: string[]

    #logger: Logger

    constructor(Links: string[], BachNumber: string) {
        super()

        this.Links = Links


        this.#logger = new Logger(BachNumber, "Product_Scrapper")

    }

    protected async $extract() {
        this.#logger.info(`Starting scraping the :: ${this.Links.length} Link`)
        if (!this.$client) return
        await this.$bypass("https://shopredspirits.com/")

        for (var i = 0; i <= this.Links.length; i++) {
            let url = this.Links[i]
            let Attempts = 1

            while (Attempts < 5) {
                try {
                    let Product: any = {}
                    await this.$client!.goto(url, { timeoutMs: 0 })
                    await this.$client!.waitForLoad("AllContentLoaded")
                    this.#logger.info(`Navigating to ${await this.$client.url}`)
                    fs.writeFileSync('fe.jpeg', await this.$client!.takeScreenshot())
                    let t = JSON.parse(await this.$client!.document.querySelector('#product-metadata').innerText)

                    let content = this.$client!.xpathSelector('/html/body/main/div/div/article/ch-elements.product.page/div/div[1]/div[3]/div[2]/div[6]/div[2]');

                    Product["name"] = t.name ? t.name : null
                    Product["url"] = t.url ? t.url : null
                    Product["image"] = t.image ? t.image : null
                    Product["description"] = t.description ? t.description : null
                    Product["Address"] = t.offers.seller.address ? t.offers.seller.address : null
                    Product["PhoneNumber"] = t.offers.seller.telephone ? t.offers.seller.telephone : null
                    Product["price"] = t.offers.price ? t.offers.price : null
                    Product["priceCurrency"] = t.offers.priceCurrency ? t.offers.priceCurrency : null
                    Product["ratingValue"] = t.aggregateRating ? t.aggregateRating.ratingValue : null

                    let ProductDetails = await content.$exists ? (await content.innerText).split('\n') : null

                    if (ProductDetails !== null) {
                        for (let i = 0; i < ProductDetails.length; i += 2) {
                            let key = ProductDetails[i].replace(/\s+/g, "_");
                            let value = ProductDetails[i + 1];
                            if (value !== undefined) {
                                if (value.endsWith(',')) {
                                    value = value.slice(0, -1);

                                    value = ProductDetails[i + 1] + `${ProductDetails[i + 2]}`
                                    i += 1
                                }
                                Product[key] = value;
                            }
                        }
                    }

                    console.log(Product)
                    this.$payload.push(Product)
                    Attempts = 99

                } catch (error) {

                    if (error instanceof Error) {
                        this.#logger.error(`${error.message}`)
                        Attempts++
                        this.#logger.info(`Number of Attempts on this URL :: ${5 - Attempts}`)
                    }
                }
            }
        }
    }
}