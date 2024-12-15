import './InformationContainer.css'
import { useNavigate } from "react-router-dom"; 
function InformationContainer(){
    const navigate = useNavigate();
    return(
        <>
            <div className="information-block">
                <nav className="information-li">
                  <p className="information-item" onClick={() => navigate("/about")}>О нас</p>
                  <p className="information-item" onClick={() => navigate("/contacts")}>Контакты</p>
                  <p className="information-item" onClick={() => navigate("/stores")}>Магазины</p>
                </nav>
                <p className="copy-right-bebezians">ⒸBebezians - все права защищены</p>
             </div>
        </>
    )
}

export default InformationContainer