import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../components/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />

            },
            {
                path: "forgot-password",
                element: <ForgotPassword />

            },
            {
                path: "signUp",
                element: <SignUp />
            },
            {
                path: "product-category",
                element: <CategoryProduct />

            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },

            {
                path:"cart",
                element:<Cart />
            },
            {
                path:"search",
                element:<SearchProduct />
            },
            {
                // use outlet tag to display this children in admin panel 
                path: "adminPanel",
                element: <AdminPanel />,
                children: [{
                    path: "all-users",
                    element: <AllUsers />
                },
                {
                    path: "all-products",
                    element: <AllProducts />
                }]

            }



        ]
    }
])

export default router;