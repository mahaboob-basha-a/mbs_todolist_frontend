import Navbar from "../Navbar";
import './index.css';
import Cookies from "js-cookie";
import { useEffect, useState ,useCallback} from "react";
import { Navigate } from "react-router-dom";
import TaskList from '../TaskList';
import {v4 as uuid} from "uuid";
import {ThreeDots} from "react-loader-spinner";

function Home() {
    const tokenExists = Cookies.get("jwt_token")
    const [task,setTask] = useState("")
    const [taskList,setTaskList] = useState([])
    const [edit,setEdit] = useState({edits:false,id:""})
    const [usern,setUsern] = useState("")
    const [loader,setLoader] = useState(true)
    const [token,setToken] = useState("")

    const onLoading = useCallback(async ()=>{
        setLoader(true)
        const url = "https://mbs-todo-list-backend-1.onrender.com/"
        const payload = {
            headers: {
                token:token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        }
        const res = await fetch(url,payload)
        const datas = await res.json()
        setLoader(false)
        const {username,todolist} = datas[0]
        setUsern(username)
        setTaskList(todolist)
    },[token])

    const onSaveclick = async ()=>{
        setLoader(true)
        const url2 = `https://mbs-todo-list-backend-1.onrender.com/update/${usern}`
        const payload = {
            headers: {
                token:tokenExists,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body:JSON.stringify(taskList)
        }
        const saving = await fetch(url2,payload)
        const res = await saving.text()
        setLoader(false)
        alert(res)
    }
    

    
    useEffect(()=>{
        const tokenExists = Cookies.get("jwt_token")
        setToken(tokenExists)
        onLoading()
    },[onLoading])

    const onAdding = (e)=>{
        e.preventDefault()
        const obj = {
            id:uuid(),
            task:task,
            check:false
        }
        if(task !== ""){
            setTaskList(prev => [...prev,obj])
            setTask("")
        }
    }

    const onCheckboxClick = (id)=>{
        // console.log(id)
        const cheboxupdate = taskList.map(item=>{
            if(item.id === id){
                const bool = !item.check
                // console.log(bool)
                return {...item,check:bool}
            }else{
                return item
            }
        })
        setTaskList(cheboxupdate)
    }
    // console.log(taskList)

    const onDeleting = (id)=>{
        const deleteList = taskList.filter(item=>{
            return item.id !== id
        })
        setTaskList(deleteList)
    }

    const onEditing = (id)=>{
        const editText = taskList.filter(item=>{
            return item.id === id
        })

        setTask(editText[0].task)
        setEdit({edits:true,id:id})

    }

    const onUpdate = (e)=>{
        e.preventDefault()
        const afterEdit = taskList.map(item=>{
            if(item.id === edit.id){
                return {...item,task:task}
            }else{
                return item
            }
        })
        setTaskList(afterEdit)
        setTask("")
        setEdit(false)
    }

    if(tokenExists === undefined){
        return <Navigate to="/login" />
    } 
    return ( <div className="home-page">
        <Navbar />
        {loader ?<div className="loader-container"> <ThreeDots
  visible={true}
  height="20"
  width="60"
  color="#006aff"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> </div>:
        <div className="app-content">
            <form>
                <input value={task} onChange={e=> setTask(e.target.value)} type="text" placeholder="Enter your task" />
                {
                    edit.edits ? <button onClick={onUpdate} className="add-save-btn" >Edit</button> :
                    <button onClick={onAdding} className="add-save-btn">Add</button>
                }
            </form>
            {taskList.length > 0 ?
            <div>
            <ul>
                {taskList.map((item)=>{
                    const {id,task,check} = item
                    return <TaskList key={id} id={id} text={task} onEditing={onEditing} onDeleting={onDeleting} checkes={check} onCheckboxClick={onCheckboxClick} />
                })}
            </ul>
            <button onClick={onSaveclick} className="save-btn">Save</button>
            </div>
        : <h1 className="empty-todo">No TodoLists Found</h1>}
        </div>}
    </div> );
}

export default Home;