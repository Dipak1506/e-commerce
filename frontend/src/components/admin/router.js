import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard'
import AddProduct from './addProduct';
import ViewProducts from './viewProducts';
import Sidebar from './adminSideBar2';
import admincss from '../../css/admin.module.css'
import Vieworders from './viewOrders';
import Home from '../Home';
const router = () =>{
    return (
        <div>
            <Sidebar />
            <div className={admincss.content}>
                <div className={admincss.nav_top}>
                    <div><div><span className="uName" style={{color:'#00a950'}}><i className="fa fa-user"></i>&nbsp;Tech Amdavad</span></div></div>      
                </div>
                <div className={admincss.app}>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="add-product" element={<AddProduct />}/>
                    <Route path="view-products" element={<ViewProducts />} />
                    <Route path="view-orders" element={<Vieworders />} />
                    <Route path="/" exact element={<Home />} />
                </Routes>
                </div>
            </div>   
        </div>
    )
}
export default router