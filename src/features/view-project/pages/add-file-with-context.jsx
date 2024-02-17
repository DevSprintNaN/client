import { Provider } from "react-redux";
import AddFilePage from "../components/add-file";
import store from "../../../context/file/store";

const AddFileWithContext = () => {
    return ( 
        <Provider store={store}>
            <AddFilePage/>
        </Provider>
     );
}
 
export default AddFileWithContext;