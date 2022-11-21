import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { useQuery } from "react-query";
import './Fixture.css';
//import Item from 'react-css-grid'
//import 'bootstrap/dist/css/bootstrap.min.css';

const dummyList = [{HomeTeam:"Trabzonspor", AwayTeam:"Fenerbahçe", MatchDate:"14 March"} ]

async function Get_Fixture()
{
  let response = await fetch('http://127.0.0.1:8000/fixture/fixtureShow', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      })
        /*
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              console.log(data[0].choices[0].option);
              return data;
              // Handle data
          })

          .catch((err) => {
          console.log(err.message);
          })*/
    //console.log(response.json());
    return response.json();

}



export default function Fixture(){

    const {data, status} = useQuery(["Fixture"], Get_Fixture)
    //console.log(data)
    return (

        <div class = 'container'>
            { status==="loading" && <div></div>}

            { status==="error" && <div>Error fetching</div>}
        
            { status === "success" &&
                    <ul class="cards">
                        {
                                data.map(element => {
                                    return(
                                        <li class = "card">
                                            <div>
                                            <h3 class="card-title">{element.MatchDate}</h3>
                                            <div class="card-content">
                                                <p >
                                                    {element.HomeTeam} - {element.AwayTeam}
                                                </p>
                                            </div>
                                            </div>
                                        </li>
                                    );
                                })
                        }
            
                    </ul>
            }
        </div>
    )
}

