/** @format */
import dotenv from "dotenv";
dotenv.config({
    path: "../.env"
})

export default class Locals {
    static Country = process.env.COUNTRY!
    static User = process.env.USER!
    static Password = process.env.PASSWORD!
    static Server = process.env.SERVER!
    static DataBase = process.env.DATABASE!
    static Encrypt = process.env.ENCRYPT!
    static TableName = process.env.TABLENAME!
}