'use client';
import AppButton from "@/Components/AppButton";
import AppInput from "@/Components/AppInput";
import { ROUTES } from "@/Constants";
import { logOut, postProducts } from "@/Services/ClientApi";
import Link from "next/link";
import React from "react";
import "./addProducts.css"

import { useRouter } from "next/navigation";
import Store from "@/Store";

export default function AddProducts(){
    const router = useRouter();

    const [loading,setLoading]= React.useState(false)

    const [formData, setFormData] = React.useState({
      itemName: null,
      price: null,
      category: null,
      description: null,
    });

    const [errors, setErrors] = React.useState({
      itemName: null,
      price: null,
      category: null,
      description: null,
    });


    const inputFields = [
      {
        key: "itemName",
        placeholder: "Item Name",
      },
      {
        key: "price",
        placeholder: "Price",
        type:'number'
      },
      {
        key: "category",
        placeholder: "Category",
      },
      {
        key: "description",
        placeholder: "Description",
      },
    ];

    function handleLogout(){
      logOut().then(()=>{
        Store.deleteUserInfo()
        router.push(ROUTES.SIGNIN)
      })
    }

    function handleAdd(){
        setLoading(true)

        const productInfo = formData

        for(const key in productInfo){
            if(productInfo[key] === null){
                  setErrors((prev) => ({
                  ...prev,
                  [key]: true,
                }));
                return
            }
        }
        postProducts({
           name:formData.itemName, ...productInfo
        }).then((res)=>{
          alert('Product added successfully!')
          setFormData({
            itemName: null,
            price: null,
            category: null,
            description: null,
          });
            setLoading(false)
        })

    }
    return (
      <div className="add-product-container">
        <div className="add-container-header"
        ><h2>Add products</h2>
        <div className="btn-area">
              <Link href={ROUTES.PRODUCTS}>
                <AppButton
              label="Product List"
              type="button"
              rounded={true}
              variant="secondary"
            />
              </Link>
                  <AppButton
              label="Logout"
              type="button"
              colorClass='color-red'
              rounded={true}
              variant="secondary"
              onClick={handleLogout}
            />

        </div>
        </div>
        <form>
          {inputFields.map((field) => (
            <AppInput
              key={field.key}
              placeholder={field.placeholder}
              error={errors[field.key]}
              type={field?.type}
              value={formData[field.key]}
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  [field.key]: value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  [field.key]: null,
                }));
              }}
            />
          ))}
          <AppButton
            label="Submit"
            type="button"
            rounded={true}
            style={{ width: "100%" }}
            variant="primary" 
            onClick={handleAdd}
          />
        </form>
      </div>
    );
}