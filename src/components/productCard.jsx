import { Link } from "react-router-dom";

export default function ProductCard(props) {
	const product = props.product;

	return (
		<div className="w-[300px] h-[400px] rounded-2xl shadow-2xl m-3 flex flex-col p-[15px] hover:scale-105 transition-transform">
			<img className="w-full h-[250px] rounded-xl object-cover" src={product.images[0]}/>
			<h1 className="text-xl font-bold text-secondary">{product.name}</h1>
			{
				product.labellPrice>product.price?
				<div className="flex gap-2 items-center">
					<p className="text-lg text-secondary font-semibold line-through">LKR {product.labellPrice.toFixed(2)}</p>
					<p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
				</div>:
				<p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
			}
			<p className="text-xs text-secondary/70">{product.productId}</p>
			<p className="text-sm text-secondary/70">{product.category}</p>
			<Link to={"/overview/"+product.productId} className="w-full h-[36px] mt-[5px] rounded-xl border text-center p-0.5 border-accent text-accent hover:bg-accent hover:text-white">
				View Product
				</Link>
			
			
		</div>
	);
}
