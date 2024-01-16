import { data } from "@/lib/data";

import Link from "next/link";
import  Image  from "next/image";
import AddToCart from "@/components/products/AddtoCart";

export default function ProductDetails({
    params
}:
{params:{slug : string}}){
    console.log(params)
    const product = data.products.find((x) => x.slug === params.slug)
    if(!product){
        return <div>Product not found</div>
    }
  return(
    <>
    <div className="my-2">
        <Link href="/"> BAck to product</Link>
    </div>
    <div className="grid md:grid-cols-4 md:gap-4">
    <div className="md:col-span-2 md:w-200">
        <Image src={product.image}
        alt={product.name}
        sizes ="100vw"
        width={600} 
          height={300}
       ></Image>
    </div>
    <div>
        <ul className=" space-y-4">
            <li> <h1 className="text-xl">{product.name}</h1></li>
            <li>{product.rating} of {product.numReviews}</li>
            <li>{product.brand}</li>
            <li>
                <div className="divider"></div>
            </li>
            <li>Description:{product.description}</li>
        </ul>
    </div>
    <div>
        <div className="card bg-base-300 shadow-xl mt-3 md:mt-8">
            <div className="card-body">
                <div className="mb-2 flex justify-between">
                    <div>Price</div>
                    <div>{product.price}</div>
                </div>
                <div className="mb-2 flex justify-between">
                    <div>Status</div>
                    <div>{product.countInStock > 0 ? 'Instock': 'unavailable'}</div>
                </div>
                {product.countInStock !== 0 && (
                <div className="card-actions justify-center">
                  <AddToCart
                    item={{
                      ...product,
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                </div>
              )}
            </div>
        </div>
    </div>
    </div>
    </>
  )
}