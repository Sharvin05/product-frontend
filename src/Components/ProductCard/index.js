import "./productCard.css"
export default function ProductCard({...props}){
return(
    <div className="product-card" >
        <h4 className="card-title">{props.name}</h4>
        <p className="card-price">$ {props.price}</p>
        <p className="card-category" >{props.category}</p>
        <p className="card-description" >{props.description}</p>
    </div>
)
}