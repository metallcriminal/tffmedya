import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import Poll from 'react-polls';
import { Container } from "react-bootstrap";

export var Q = "";
export var OPTION_LIST = [];


export default function PollCreate () {
    const [errorMessage, setErrorMessage] = useState('')
    const Navigate = useNavigate()

    const [question, setQuestion] = useState('')

    /*
    const pollQuestion = 'Is react-polls useful?'
    const pollAnswers = [
      { option: 'Yes', votes: 6 },
      { option: 'No', votes: 2 }
    ]
    
    /*
    const handleVote = voteAnswer => {
        const { pollAnswers } = this.state
        const newPollAnswers = pollAnswers.map(answer => {
          if (answer.option === voteAnswer) answer.votes++
          return answer
        })
        this.setState({
          pollAnswers: newPollAnswers
        })
    }*/

      const [inputList, setinputList]= useState([{ option:''}]);
    
      const handleinputchange=(e, index)=>{
        console.log("QQ:", question);
        const {value}= e.target;
        const list= [...inputList];
        list[index]= value;
        setinputList(list);
    
      }
     
      const handleremove= (e,index)=>{
        e.preventDefault();
        const list=[...inputList];
        console.log("Before splice remove: ", list)
        list.splice(index,1);
        console.log("Handleremove: ", list)
        setinputList(list);
        
      }
    
      const handleaddclick=(e)=>{ 
        console.log(inputList);
        setinputList([...inputList, e.target.value]);
        console.log("List:", inputList);
      }

    
    const handleSubmit = (e) => {

        e.preventDefault();
        var choices = [];
        Q = question;
        for (var i in inputList)
        {
          var d = {"option":inputList[i], "votes":0}
          choices.push(d)
          console.log(choices[i])

        }


        console.log(choices)
        //Navigate("/poll");
        //console.log(email );
        //console.log(pass);

        

        
        fetch('http://127.0.0.1:8000/poll/create', {
            method: 'POST',
            body: JSON.stringify({
              // Add parameters here
              'question_text' : question,
              'pub_date' : '2022-11-14',
              'choices' : choices
              
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                if (data === "Question Added Successfully") {

                    Navigate("/poll", { state: data })
                }
                else {
                   
                    setErrorMessage("Could not create the poll")

                }

             })
             .catch((err) => {
                console.log(err.message);
             })

    }

    
    return (

<div style={{ display: 'block',                   width: 700, padding: 30 }}>

    <Container fluid>
    <form role="form" onSubmit={handleSubmit}>

     <div className="row">
       <div className="col-sm-12">   
          <div class="form-group col-md-4">
            <label >Enter your poll question</label>
            <br></br>
            <input type="text"  name="firstName" class="form-control" value={question} placeholder="Poll question" onChange={e => setQuestion(e.target.value)} />
          </div>

            { 
            inputList.map( (x,i)=>{
              return(
              <div className="row mb-3">
                 
               <div class="form-group col-md-4">
               <label >Add option {i+1}</label>
               <br></br>
                  <input value = {inputList[i] === "[object Object]" ? '' : inputList[i]} type="text" name="option" class="form-control" placeholder="Option i+1" onChange={ e=>handleinputchange(e,i) }/>
                  
                  <view style= {{marginLeft: 10}} >
                  {
                  inputList.length!==1 &&
                  <button  className="btn btn-danger mx-1" onClick={e => handleremove(e,i)}>Remove</button>
                  }
                  </view>
                  <view style= {{marginLeft: 10}}>
                  { inputList.length-1===i &&
                      <button  className="btn btn-success" onClick={ e=>handleaddclick(e)}>Add More</button>
                  }
                  </view>


               </div>

             
            </div>
              );
             } )} 

               
       </div>
     </div>
     <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
    </form>
    </Container>
    </div>
        /*
        //<div className="col-md-5">
          //<div className="form-area">  
              <form role="form" onSubmit={handleSubmit}>
              <br styles="clear:both" />
                <div className="form">
                  <h2>Create polls</h2>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
                            
                <div className="form">
                <input type="text" className="form-control" id="question" name="question" placeholder="Your poll question" required />
                </div>
                   
              <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>

          //</div>
        //</div>
        /*<div>
        <Poll question={pollQuestion} answers={pollAnswers} onVote={handleVote} />
        </div>*/

 
        
       
    
           
         
       
           
    )   
}