import React, { Profiler, useState}from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../../pages/Cart/Cart';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react'
const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("menu");
  
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
   
 
 
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
          <ul className="navbar-menu">
              <Link to='/' onClick={()=>setMenu("home")} className={menu=="home"?"active":""}>home</Link>
              <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu=="menu"?"active":""}>menu</a>
              <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu=="mobile-app"?"active":""}>mobile-app</a>
              <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu=="contact-us"?"active":""}>contact us</a>
          </ul>
          <div className="navbar-right">
              <img src={assets.search_icon} alt="" />
              <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                  <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)} className='navbar-button'>Sign in</button> :
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" />LogOut</li>
            </ul>
            </div>
        }
          </div>    
   </div>
    
  )
}


export default Navbar
