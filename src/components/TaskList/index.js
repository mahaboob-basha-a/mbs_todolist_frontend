import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import "./index.css";

function TaskList(prop) {
    const {id,onCheckboxClick,text,checkes,onDeleting,onEditing} = prop
    // const [check,setCheck] = useState(checkes)

    // console.log(checkes)

    const onCheckbox = ()=>{
        onCheckboxClick(id)
    }

    // console.log(check)
    return ( <li className="task-list">
        <div className="list-content">   
        <input onChange={onCheckbox} type="checkbox" checked={checkes} />
        <p className={checkes? "check-name":""}>{text}</p>
        </div>
        <div className="list-content" >
        <button onClick={()=> onEditing(id)} className="btns"><TbEdit /></button>
        <button onClick={()=> onDeleting(id)} className="btns"><AiOutlineDelete /></button>
        </div>
    </li> );
}

export default TaskList;