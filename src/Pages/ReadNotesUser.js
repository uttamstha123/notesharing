import './ReadNotesUser.css';
import './ReadNotesUser';
import { useState, useEffect } from 'react';


const ReadNotesUser = () => {
    let [notes, setNotes] = useState("");
    useEffect(() => {
        allNotes();
    }, []);

    const allNotes = async () => {
        let result = await fetch(`https://notesharing-backend/readnotesuser`);
        result = await result.json();
        setNotes(result);
    }
    const search = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`https://notesharing-backend/search/${key}`);
            result = await result.json();
            if (result) {
                setNotes(result);
            } else {
                allNotes();
            }
        }else{
            allNotes();
        }
    }

    return (
        <div className="row justify-content-center readnotesuser-base2">
            <div className="col-md-8 readnotesuser-base d-flex flex-column gap-3">
                <input type='search' onChange={search} className='readnotesuser-search' placeholder='Search by topic...' />
                <div className='notesBox d-flex flex-column gap-2 overflow-y-scroll'>

                {
                    notes.length > 0 ? notes.map((item, index) =>
                    <div className='readnotesuser-main'>
                            {/* <div className='readnotesuser-topic'></div> */}
                            <div className='readnotesuser-topic'> <h3> {item.topic} </h3></div>
                            <div className='readnotesuser-subtopic'> <h5> {item.subtopic} </h5></div>
                            <div className='readnotesuser-content'> <p>{item.content}</p></div>
                        </div>
                    ) :
                    <h1 align="center">No Data Found</h1>
                }
                </div>
            </div>
        </div>
    );
}

export default ReadNotesUser;