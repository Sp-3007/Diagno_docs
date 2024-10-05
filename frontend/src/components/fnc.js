import React, { useState } from "react";
import "../styles/fnc.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Fnc(props) {
    const vhl = ["abc", "bcd", "cde"];
    const sa = ["center1", "center2", "center3", "center4","center5","center6"];
    const [loc, setLoc] = useState(false);
    const [lval,setlval]=useState("");
    const [map,setmap]=useState(-1);
    console.log("lval: ",lval);
    function submitlocation(data){
        axios.post(`${URL}/fnc`,data).then(
            (res)=>{
                console.log(res);
            }
        ).catch((error)=>{
            console.log("incatch");
            console.log(error);
        })
    }
    console.log(loc);
    return (
       
        
            <div id="mdivfnc">
            <h1 id="fmh">Find Nearest Center</h1>
            <hr id="hr" />
            <div id="locationd">
                {/* <div id="dateinpdiv"></div> */}
                <input type="date" id="dateinp" ></input>
                <input type="text" placeholder="Enter Your Location" id="locationinp" onChange={(e)=>{
                    setlval(e.target.value);
                }} />
                <input type="text" id="testinp" placeholder="enter the test you need"></input>

                <button id="locsub" onClick={() => {
                    setLoc(true);
                }}>Search</button>
            </div>
            <div id="rvhparent">
                {loc ? (
                    <div id="rvhchild1">
                        <div id="rvhchild1l">

                        {sa.map((val, index) => (
                            <div id="rvhdiv" key={index}>
                                <button className="visitedcentersbuttonl" onClick={()=>{
                                    setmap(val);
                                    
                                }}>{val}</button>
                            </div>
                        ))}
                        </div>
                        <div id="rvhchild1r">
                            <h1 style={{textAlign:"center"}}>{`map of ${map}`}</h1>
                        </div>
                    </div>
                ) : (
                    <div id="rvhchild2">
                        <h2 style={{ marginLeft: '1vw', color: 'rgb(79,82,142)' }}>visited centers</h2>
                        {vhl.map((val, index) => (
                            <div id="rvhdiv" key={index}>
                                <button className="visitedcentersbutton" >{val}</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
            
        
    );
}

export default Fnc;
