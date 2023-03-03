import fs from "node:fs"
import Cuts from "../cuts.js"
import Logger from "../../misc/logger.js"
import Product_Scraper from "../productScraper.js";
import SaveHandler from "../../misc/save_handler.js";



export default class Handler {

    /**
     * @TODO_0 : @DONE needs to be able to lunch the script TO collect all the Links One By One and save them in the file
     * @TODO_1 : @DONE needs to read a file 
     * @TODO_2 : @DONE needs to split the file on the first 200 Link
     * @TODO_3 : @DONE needs to be able to lunch the Product Scraper 
     * @TODO_4 : @DONE needs to be able to save the JSON file appending 
     */

    private static splitArrayAt200(arr: string[]) {
        let result = [];
        for (let i = 0; i < arr.length; i += 10) {
            result.push(arr.slice(i, i + 10));
        }
        return result;
    }

    public static async exec() {
        let $Logger = new Logger('Handler', 'Handler')

        $Logger.info('starting Script ...')
        $Logger.info('loading Links File ... ')

        let LinksInTheFile = fs.readFileSync('../assets/Link.txt').toString().split("\n")

        console.log(LinksInTheFile.length)

        if (LinksInTheFile.length === 1) {

            $Logger.info('File Contains 0 Links ')

            let WebSiteLinks = [
                "https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore",
                "https://shopredspirits.com/shop?category=wines_sake_cider&category=all_exclud_sale_newarrivals&title=Explore",
                "https://shopredspirits.com/shop?category=all_beers&category=all_exclud_sale_newarrivals&title=Explore"
            ]

            $Logger.info('Starting Link collection for each Link')

            for (const WebLink of WebSiteLinks) {
                $Logger.info(`Processing ${WebLink}`)
                await new Cuts(WebLink).exec()
            }

        } else {

            $Logger.info(`Resuming ${LinksInTheFile.length} Links left in the file ... `)
            // Gets The First 200 elements 
            let Links = Handler.splitArrayAt200(LinksInTheFile)

            for (var i = 0; i <= Links.length; i++) {
                let Products = await new Product_Scraper(Links[i], i.toString()).exec()

                let st: string[] = []
                $Logger.info('Deleting the 200 from the Link File ... ')
                for (var j = 0; j < Links.length - i; j++) {
                    let t = Links[j].map((item) => {
                        st.push(item)
                    })
                }
                $Logger.info('Saving the File ... ')
                fs.writeFileSync("../assets/Link.txt", st.join('\n'))
                SaveHandler.To_JSON(Products)



            }


        }

    }

}  