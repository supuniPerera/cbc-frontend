import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom"
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart, loadCart } from "../utils/cart";


export default function ProductOverview(){
    
    const params = useParams()
    //laoding, success, error
    const [Status, setStatus] = useState("loading");
    const [product,setProduct] = useState(null);

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.Id).then(
                (res)=>{
                    setProduct(res.data)
                    setStatus("success")
                }
            ).catch(
                ()=>{
                    toast.error("Failed to fetch product details")
                    setStatus("error")
                }
            )
           
	}, []);
   

    return(
    <div className="w-full lg:h-full text-secondary bg-primary">
			{Status == "loading" && <Loader />}
			{Status == "success" && (
				<div className="w-full flex flex-col lg:flex-row p-10">
                    <h1 className="text-2xl font-bold text-center lg:hidden">{product.name}</h1>
					<div className=" w-full lg:w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images={product.images}/>
                    </div>
					<div className="w-full lg:w-[50%] h-full flex flex-col bg-primary  items-center gap-4 p-10">
                        <span className="">{product.productId}</span>
						<h1 className="text-2xl font-bold text-center">{product.name}
                            {
                                product.altNames.map(
                                    (name,index)=>{
                                        return(
                                            <span key={index} className=" font-normal text-secondary">{" | "+name}</span>
                                        )
                                    }
                                )
                            }
                        </h1>
                        {/* description */}
                        <p className="mt-[30px] max-h-[150px] overflow-y-auto text-justify">{product.description}</p>
                        {/* category */}
                        <p >Category: {product.category}</p>
                        {/* price */}
                        {
                            product.labellPrice>product.price?
                            <div className="flex gap-3 items-center">
                                <p className="text-lg text-secondary font-semibold line-through">LKR {product.labellPrice.toFixed(2)}</p>
                                <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                            </div>:
                            <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                        }
                        <div className="w-full h-[40px] flex gap-4 mt-[60px]">
                            <button className="w-[50%] h-full bg-accent text-white font-semibold hover:bg-accent/80"
                            onClick={()=>{
								addToCart(product,1)
								toast.success("Added to cart")
							}}>Add to Cart</button>
                            <Link to ="/checkout" state={[{
                                image : product.images[0],
								productId : product.productId,
								name : product.name,
								price : product.price,
								labellPrice : product.labellPrice,
								quantity : 1
                            }]} className="w-[50%] flex justify-center items-center text-center border border-accent text-accent font-semibold hover:bg-accent hover:text-white"
                            onClick={()=>{
                                console.log(loadCart())
                            }}>Buy Now</Link>
                        </div>

					</div>
				</div>
			)}
			{Status == "error" && (
				<h1 className="text-red-500">Failed to load product details</h1>
			)}
		</div>
	);
}
