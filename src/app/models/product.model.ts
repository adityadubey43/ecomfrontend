export interface Product {
    _id: string;
    productName: string;
    productDesc: string;
    productImages: string[];
    Indprice: number;
    USAprice: number;
    UKprice: number;
    category: string;
    stockQuantity: number;
    // Add more properties as needed
  }