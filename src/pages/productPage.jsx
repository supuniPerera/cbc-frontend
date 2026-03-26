import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export function ProductPage(){
    const[products,setProducts] = useState([]);
    const[isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
             axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                (response)=>{
                    setProducts(response.data);
                    setIsLoading(false);
                }
            ).catch((error)=>{
                console.error("Error fetching products:", error);
                setIsLoading(false);
                toast.error("Failed to load products");
            });
        }
    },[isLoading])


    return(
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
        <div className="w-full h-[100px] flex justify-center items-center bg-primary">
    <input 
        type="text" 
        onChange={async (e)=>{
            try{
                if(e.target.value == ""){
                    setIsLoading(true);
                }else{
                    const searchResult = await axios.get(import.meta.env.VITE_API_URL + "/api/products/search/" + e.target.value);
                    setProducts(searchResult.data);
                }

            }catch{
                toast.error("Search Failed");

            }
            
        }}
        placeholder="Search products..." 
        className="p-3 w-96 rounded-l-md border-t border-b border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-secondary"
    />
    <button className="p-3 bg-accent text-primary rounded-r-md  hover:text-primary transition-colors duration-300">
        Search
    </button>
</div>
        
            {
                isLoading? <Loader/>
                :
                <div className="w-full h-full flex flex-row flex-wrap justify-center bg-primary">
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productId} product={item}/>
                            )
                        })
                    }
                
                </div>  


            }
           
        </div>
    )
}