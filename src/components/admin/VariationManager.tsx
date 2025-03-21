import React, { useState } from "react";
import { Plus, X, Save, Edit, Trash } from "lucide-react";
import { ProductVariation } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface VariationManagerProps {
  variations: ProductVariation[];
  availableColors?: string[];
  availableSizes?: string[];
  onAdd: (variation: ProductVariation) => void;
  onUpdate: (variation: ProductVariation) => void;
  onRemove: (size: string, color: string) => void;
}

const VariationManager: React.FC<VariationManagerProps> = ({
  variations,
  availableColors = [],
  availableSizes = [],
  onAdd,
  onUpdate,
  onRemove
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState(0);
  
  const handleAddNew = () => {
    setIsAdding(true);
    setSize(availableSizes[0] || "");
    setColor(availableColors[0] || "");
    setStock(0);
  };
  
  const handleSave = () => {
    if (!size || !color) return;
    
    onAdd({
      size,
      color,
      stock
    });
    
    setIsAdding(false);
    setSize("");
    setColor("");
    setStock(0);
  };
  
  const handleEdit = (variation: ProductVariation, index: number) => {
    setSize(variation.size);
    setColor(variation.color);
    setStock(variation.stock);
    setEditIndex(index);
  };
  
  const handleUpdate = () => {
    if (editIndex === null) return;
    
    onUpdate({
      size,
      color,
      stock
    });
    
    setEditIndex(null);
    setSize("");
    setColor("");
    setStock(0);
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditIndex(null);
    setSize("");
    setColor("");
    setStock(0);
  };
  
  return (
    <div className="space-y-4 overflow-x-auto w-full">
      <div className="flex items-center justify-between flex-wrap" >
        <h3 className="text-lg font-medium">Stock Variations</h3>
        <Button 
          onClick={handleAddNew} 
          size="sm"
          className="bg-mutedTeal hover:bg-mutedTeal/90"
          disabled={isAdding || editIndex !== null}
        >
          <Plus size={16} className="mr-1" />
          Add Variation
        </Button>
      </div>
      
      {/* Add/Edit Form */}
      {(isAdding || editIndex !== null) && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-medium mb-3">
            {isAdding ? "Add New Variation" : "Edit Variation"}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="input-field w-full"
                disabled={editIndex !== null} // Can't change size/color combo when editing
              >
                <option value="">Select Size</option>
                {availableSizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="input-field w-full"
                disabled={editIndex !== null} // Can't change size/color combo when editing
              >
                <option value="">Select Color</option>
                {availableColors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                className="input-field w-full"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            {isAdding ? (
              <Button 
                onClick={handleSave} 
                size="sm"
                disabled={!size || !color}
              >
                <Save size={16} className="mr-1" />
                Save
              </Button>
            ) : (
              <Button 
                onClick={handleUpdate} 
                size="sm"
              >
                <Save size={16} className="mr-1" />
                Update
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Variations Table */}
      <div className="border rounded-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No variations added yet
                </td>
              </tr>
            ) : (
              variations.map((variation, index) => (
                <tr key={`${variation.size}-${variation.color}`} className={variation.stock === 0 ? "bg-red-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variation.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variation.color}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${variation.stock === 0 ? "text-red-600 font-medium" : "text-gray-900"}`}>
                      {variation.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(variation, index)}
                      className="text-mutedTeal hover:text-mutedTeal/80 mr-3"
                      disabled={isAdding || editIndex !== null}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onRemove(variation.size, variation.color)}
                      className="text-dustyRose hover:text-dustyRose/80"
                      disabled={isAdding || editIndex !== null}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariationManager;
