import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import toast from "react-hot-toast";

// --- Product Delete Confirmation Modal ---
function ProductDeleteConfirm(props) {
  const { productId, close, refresh } = props;

  function deleteProduct() {
    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/products/" + productId, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        close();
        toast.success("Product deleted successfully");
        refresh();
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex justify-center items-center p-4">
      <div className="w-full max-w-[400px] bg-white rounded-3xl p-8 relative flex flex-col items-center text-center shadow-2xl">
        <button 
          onClick={close} 
          className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-lg rounded-full text-gray-500 hover:text-red-600 font-bold transition-all border border-gray-100"
        >
          ✕
        </button>
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <FaRegTrashCan className="text-red-500 text-2xl" />
        </div>
        <h3 className="text-xl font-black text-gray-800 mb-2">Are you sure?</h3>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Do you really want to delete product <span className="font-bold text-gray-700">{productId}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-4 w-full">
          <button onClick={close} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button onClick={deleteProduct} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [IsDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios.get(import.meta.env.VITE_API_URL + "/api/products").then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-full">
      {IsDeleteConfirmVisible && (
        <ProductDeleteConfirm 
          refresh={() => setIsLoading(true)} 
          productId={productToDelete} 
          close={() => setIsDeleteConfirmVisible(false)} 
        />
      )}

      {/* Floating Add Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-6 bottom-6 lg:right-12 lg:bottom-12 z-40 bg-accent text-white p-4 rounded-2xl shadow-xl shadow-accent/30 hover:scale-110 transition-transform active:scale-95"
      >
        <CiCirclePlus size={40} strokeWidth={0.5} />
      </Link>

      <div className="mx-auto max-w-7xl p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Product Inventory</h1>
                <p className="text-sm text-gray-400">Manage your items, prices and stock levels</p>
            </div>
            <span className="bg-accent/10 text-accent px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-accent/10">
                {products.length} Products Total
            </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]"><Loader /></div>
        ) : (
          <div className="w-full">
            
            {/* --- MOBILE VIEW: Product Cards --- */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {products.map((item) => (
                <div key={item.productId} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-center">
                  <img src={item.images?.[0]} className="w-24 h-24 rounded-2xl object-cover bg-gray-50 border border-gray-100" alt="" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-tighter">{item.category}</p>
                    <h3 className="font-bold text-gray-800 leading-tight mb-1">{item.name}</h3>
                    <p className="text-sm font-black text-gray-900">LKR {item.price}</p>
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => { setProductToDelete(item.productId); setIsDeleteConfirmVisible(true); }}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <FaRegTrashCan size={18} />
                      </button>
                      <button 
                        onClick={() => navigate("/admin/update-product", { state: item })}
                        className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <FaRegEdit size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- DESKTOP VIEW: Professional Table --- */}
            <div className="hidden lg:block overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-bold uppercase tracking-widest">
                    <th className="px-6 py-5">Product Info</th>
                    <th className="px-6 py-5">Price</th>
                    <th className="px-6 py-5">Stock</th>
                    <th className="px-6 py-5">Category</th>
                    <th className="px-6 py-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((item) => (
                    <tr key={item.productId} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={item.images?.[0]} className="h-14 w-14 rounded-2xl object-cover ring-1 ring-gray-100 shadow-sm" alt="" />
                        <div>
                          <p className="font-bold text-gray-800 text-sm leading-tight">{item.name}</p>
                          <p className="font-mono text-[10px] text-gray-400 mt-1 uppercase">{item.productId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-black text-gray-800 text-sm">LKR {item.price}</span>
                          <span className="text-[10px] text-gray-400 line-through">LKR {item.labellPrice}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${item.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                          {item.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                             onClick={() => { setProductToDelete(item.productId); setIsDeleteConfirmVisible(true); }}
                             className="p-2.5 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                          >
                            <FaRegTrashCan size={20} />
                          </button>
                          <button 
                             onClick={() => navigate("/admin/update-product", { state: item })}
                             className="p-2.5 text-gray-400 hover:bg-accent/10 hover:text-accent rounded-xl transition-all"
                          >
                            <FaRegEdit size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {products.length === 0 && (
              <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">No products available in the inventory.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}