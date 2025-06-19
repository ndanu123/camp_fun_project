import React from 'react'
import { useState} from 'react'

function CamperForm() {
    const [name,setName]= useState('');
    const [age,setAge]= useState('');

    function handleSubmit(e){
        e.preventDefault();

        fetch('http://127.0.0.1:5555/campers',{
            method:'POST',
            headers:{
                'Content-type':'application/json'    
            },
            body:JSON.stringify({name,age:parseInt(age)}),
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error('Failed to add Camper. Please try again')
            }
            return res.json();
        })
        .then((data)=>{
            console.log('Camper added',data);
            setName('');
            setAge('');
        })
        .catch((err)=>{console.error(err);
        });
    }
  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Camper</h2>
        <input placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}required/>
        <button type='submit'>Add</button>
        </form>
  );
}

export default CamperForm