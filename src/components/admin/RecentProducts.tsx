
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/lib/data";

interface RecentProductsProps {
  products: Product[];
}

const RecentProducts: React.FC<RecentProductsProps> = ({ products }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-sm">Recent Products</h2>
        <Link 
          to="/admin/products" 
          className="text-sm text-mutedTeal hover:underline"
        >
          View all
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-champagne/20 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.slice(0, 5).map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded overflow-hidden mr-3">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900">fgg{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${product.stock > 5 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'}`}
                  >
                    {product.stock > 0 ? product.stock : 'Out of stock'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    to={`/admin/products/edit/${product.id}`} 
                    
                    className="text-mutedTeal hover:text-mutedTeal/80 mr-3"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentProducts;
