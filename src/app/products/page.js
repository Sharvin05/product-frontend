export const dynamic = 'force-dynamic';  
import { cookies } from "next/headers";
import { getProductsSSR, serverSign } from "@/Services/ServerApi/server";
import Store from "@/Store";
import AppButton from "@/Components/AppButton";
import { redirect } from "next/navigation";
import { ROUTES } from "@/Constants";
import Link from "next/link";
import "./products.css"

export default async function Products() {

  // console.log("Store.setUserInfo()",Store.setUserInfo());
  
  // await serverSign().then((data)=>{
  //   console.log('data');
  // })

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  console.log("accessToken",accessToken)
  console.log("cookieStore",cookieStore)

  async function getUserInfo() {
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get("userInfo");

    if (!userInfoCookie) {
      return null;
    }

    let cookieValue = userInfoCookie.value;

    if (cookieValue.startsWith("j:")) {
      cookieValue = cookieValue.substring(2);
    }

    try {
      return JSON.parse(cookieValue);
    } catch (error) {
      return null;
    }
  }

const userInfo = await getUserInfo()


  async function handleLogout() {
    "use server";
    Store.deleteUserInfo();

    const cookiestore = await cookies();

    cookiestore.delete("accessToken");
    cookiestore.delete("refreshToken");
    redirect(ROUTES.SIGNIN);
  }

  let products = ['']
  console.log(" accessToken, refreshToken", accessToken, refreshToken)

  await getProductsSSR({ accessToken, refreshToken }).then((data)=>{
    products = data
    console.log("products",data);
    
  }).catch((err)=>{
    // console.log('err',err);
    redirect(ROUTES.SIGNIN)
  });

  console.log("products",products);
  

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

         <form action={handleLogout}>
          <AppButton
             label="Log out"
              rounded={true}
              colorClass={'color-red'}
              variant="secondary"
            />
        </form>
         
        </div>
      </div>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))
        ) : (
          <li>No products found.</li>
        )}
      </ul>
    </div>
  );
}
