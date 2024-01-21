import { cache } from "react";
import dbConnect from "../dbConnect";
import ProductModel, { Product } from "../models/ProductModel";

export const revaidate = 3000

const getlatest = cache(async()=>{
    await dbConnect()
    const product = await ProductModel.find({}).sort({_id : -1}).limit(4).lean()
    return product as Product[]
})

const getFeatured = cache(async()=>{
    await dbConnect()
    const product = await ProductModel.find({isFeatured : true}).limit(3).lean()
    return product 
})

const getBySlug = cache(async(slug : string)=>{
    await dbConnect()
    const product = await ProductModel.findOne({ slug }).lean()
    return product as Product
})


const productService = {
    getlatest,
    getFeatured,
    getBySlug
}

export default productService