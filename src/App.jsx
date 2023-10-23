import "./App.css"
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Message from "./pages/Message";
import Add from "./pages/Add";
import { UserProvider } from "./context/UserContext";
import Product from "./pages/Product";
import MyCart from "./pages/MyCart";
import Checkout from "./pages/Checkout";
import Confirm from "./pages/Confirm";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import WishList from "./pages/WishList";
import Account from "./pages/Account";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import ProfileEdit from "./pages/ProfileEdit";
import LocationEdit from "./pages/LocationEdit";
import Forgot from "./pages/Forgot";

const queryClient = new QueryClient()

const App = () => {
    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Navbar />
                    <div className="w-full bg-gray-900 sm:bg-white">
                        <Outlet />
                        <Footer />
                    </div>
                </UserProvider>
            </QueryClientProvider>
        )
    }
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/products",
                    element: <Products />
                },
                {
                    path: "/orders",
                    element: <Orders />
                },
                {
                    path: "/:title",
                    element: <Product />
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/messages",
                    element: <Messages />
                },
                {
                    path: "/message",
                    element: <Message />
                },
                {
                    path: "/add",
                    element: <Add />
                },
                {
                    path: "/cart",
                    element: <MyCart />
                },
                {
                    path: "/checkout",
                    element: <Checkout />
                },
                {
                    path: "/confirm",
                    element: <Confirm />
                },
                {
                    path: "/dashboard",
                    element: <Dashboard />
                },
                {
                    path: "/wishlist",
                    element: <WishList />
                },
                {
                    path: "/categories",
                    element: <Categories />
                },
                {
                    path: "/account",
                    element: <Account />
                },
                {
                    path: "/payment",
                    element: <Payment />
                },
                {
                    path: "/profile/edit",
                    element: <ProfileEdit />
                },
                {
                    path: "/location/edit",
                    element: <LocationEdit />
                }
            ]
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/forgot",
            element: <Forgot />
        }
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
