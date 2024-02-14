import store from "../../../context/file/store";
import {Provider} from 'react-redux';
import ViewProject from "./view-project";
const ViewProjectContext = () => {
    return ( 
        <Provider  store={store}>
            <ViewProject/>
        </Provider>
     );
}
 
export default ViewProjectContext;