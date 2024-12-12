import { useRoutes } from "react-router";
import Layout from "../layout";
import Chatbot from "../components/Chatbot";



const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "", element: <Chatbot /> }
            ]
        }

    ]);
}

export default Router;