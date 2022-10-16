import './Admin.css'
import { getAllUser } from "../../Redux/slice/userSlice.js"

function Admin({children, props}) {
    // async function getUser() {
    //     try {
    //       const response = await axios.get('/api/users');
    //       dispatch(getAllUser(response.data))
    //       setBody(response.data)
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    return ( 
        <div className="wrapperAdmin">
                <div className="sideBar">
                    <div className="logo text-center">
                        <a href="/">Rekeans</a>
                    </div>
                    <ul className="menu">
                        <li><a href="" className="active">Dashboard</a></li>
                        <li><a href="">User</a></li>
                        <li><a href="">Category</a></li>
                        <li><a href="">Products</a></li>
                        <li><a href="">Order</a></li>
                    </ul>
                </div>
                <div className="view">
                    
                    {children}
                </div>
        </div>
 );
}

export default Admin;