"use client";
import React from "react";
import Store from "@/Store";
import AppButton from "@/Components/AppButton";
import { ROUTES } from "@/Constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "@/Components/ProductCard";
import { getProducts, logOut } from "@/Services/ClientApi";
import "./products.css"

export default function Products() {

  const [products, setProducts] = React.useState([]);
  const router = useRouter()

  let userInfo = Store.getUserInfo();


  function handleLogout() {
    logOut().then((res)=>{
      router.push(ROUTES.SIGNIN);
    })
  }

  React.useEffect(() => {
    
    getProducts()
      .then((data) => {
        setProducts(data?.products);
      })
      .catch((err) => {
        redirect(ROUTES.SIGNIN);
      });
  },[]);

  return (
    <div className="products-page-container">
      <div className="products-page-header">
        <h1 className="product-page-heading">Products Page</h1>
        <div className="btn-area">
          {userInfo?.role === "admin" && (
            <Link href={ROUTES.ADDPRODUCTS}>
              <AppButton
                label="Add Product"
                type="button"
                rounded={true}
                variant="secondary"
              />
            </Link>
          )}

           <AppButton
              label="Log out"
              rounded={true}
              colorClass={"color-red"}
              variant="secondary"
              onClick={handleLogout}
            />
        </div>
      </div>
      <div className="product-card-list">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <ProductCard {...product} key={product?.id} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
