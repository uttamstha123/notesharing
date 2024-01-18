import './MyNotes.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const MyNotes = () => {
    let [notes, setNotes] = useState([]);
    let useId = JSON.parse(localStorage.getItem('user'))._id;

    const getNotes =async ()=>{
        let result = await fetch(`https://notesharing-backend.onrender.com:4500/mynotes/${useId}`,{
            method:'post'
        });
        result = await result.json();
        setNotes(result);
    }
    getNotes();

    const deleteNote =async (id)=>{
        let result = await fetch(`https://notesharing-backend.onrender.com/deletenotesadmin/${id}`,{
            method:'delete'
        });
        if(result){console.log("Deleted");}
    }
    
    return (
        <div className='row justify-content-center mynotes-base mt-3'>
            <div className='col-md-8 mynotes-base2 d-flex flex-column gap-3'>
                <h1 align="center">My Notes</h1>
                <div className='myNotesBox overflow-y-scroll d-flex flex-column gap-2'>

                {
                    notes.length>0 ? notes.map((item, index) =>
                    <div className='mynotes-notes'>
                            {/* <div className='mynotes-topic'>{ index+1 }. </div> */}
                            <div className='mynotes-topic'> <h3>{ item.topic }  
                            <span className='mynotes-edit'> <Link to={"/editnotesuser/"+item._id}> <i class="fa-solid fa-pen-to-square"></i></Link>  </span>
                            <span onClick={ ()=>deleteNote(item._id) } className='mynotes-delete'><i class="fa-solid fa-trash"></i></span></h3>
                            </div>
                            <div className='mynotes-subtopic'><h5>{ item.subtopic }</h5></div>
                            <div className='mynotes-content'><p>{ item.content }</p></div>
                        </div>
                    ):
                    <h1 align="center">Notes Not Found</h1>
                }
                </div>
            </div>
        </div>
    );
}


export default MyNotes;