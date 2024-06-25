    import homecss from "../css/home.module.css";
    import { useDispatch,useSelector } from "react-redux";
    import { useEffect,useState} from "react";
    import api from '../Api'
    import { setProducts } from "../redux/reducers/productsReducer";
    import Product from "./Product";
    import {Link} from "react-router-dom";
    import Navbar from './Navbar.js'
    
    const Home2 = () =>{
        const products = useSelector((state)=>state.products.value);
        const dispatch = useDispatch();
        const [loadingState, setLoadingState] = useState("loading");
        const [shouldShow, setShouldShow] = useState(true);
        
       const fetchMoreProducts = () => {
            api.getApi(`${process.env.REACT_APP_BACKEND_URL}/products`)
            .then(response=>response.json())
            .then(result=>{    console.log(result,"result") 
                dispatch(setProducts(result.data))
                setLoadingState("ready")
            })
            .catch(err=>{
                console.log(err, 'error')
                setLoadingState("error");
            })
    }
    
       
        useEffect(()=>{
            setShouldShow(true);
            if(products.length === 0){
                fetchMoreProducts();
               // fetchMoreProducts();
            }
            else{
                if(shouldShow) setLoadingState("ready")        
            }
            return ()=>{
                setShouldShow(false);
            }
        },[]);
        
    
        return(
            <div>
                <Navbar />
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                   <h2>Best Deals On Fashion And Accessories</h2> 
                </div>
                <div className={`${homecss.product_div} col-12`}>
                    {loadingState==="loading" ?
                        (<h2>Loading Products</h2>) :
                    loadingState==="error" ?
                        (<h2>Error loading products</h2>) :
                        ( <p> Products </p>
                        )   
                    }
                </div>
            </div>
        )
    }
    
    export default Home2;