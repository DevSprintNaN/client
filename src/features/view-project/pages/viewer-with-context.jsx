import { Provider } from "react-redux";
import store from "../../../context/file/store";
import Viewer from "../components/viewer";

const ViewerWithContext = () => {
    return ( 
        <Provider store={store}>
            <Viewer/>
        </Provider>
     );
}
 
export default ViewerWithContext;