
import { connectToDatabase, Product } from '@/lib/mongodb';

export type ProductType = {
  id?: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  created_at?: string;
};

export async function getProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ created_at: -1 }).exec();
    return products.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      price: doc.price,
      image_url: doc.image_url,
      created_at: doc.created_at.toISOString()
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function createProduct(productData: ProductType) {
  try {
    await connectToDatabase();
    const newProduct = new Product({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image_url: productData.image_url,
      created_at: new Date()
    });
    
    const savedProduct = await newProduct.save();
    return {
      id: savedProduct._id.toString(),
      name: savedProduct.name,
      description: savedProduct.description,
      price: savedProduct.price,
      image_url: savedProduct.image_url,
      created_at: savedProduct.created_at.toISOString()
    };
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(id: string, productData: Partial<ProductType>) {
  try {
    await connectToDatabase();
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...productData },
      { new: true }
    ).exec();
    
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    
    return {
      id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      image_url: updatedProduct.image_url,
      created_at: updatedProduct.created_at.toISOString()
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    const deletedProduct = await Product.findByIdAndDelete(id).exec();
    
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    
    return {
      id: deletedProduct._id.toString(),
      name: deletedProduct.name
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
