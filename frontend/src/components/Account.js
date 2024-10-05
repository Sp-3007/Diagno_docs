import React from "react";
import "../styles/Account.css";
import {Link, NavLink} from "react-router-dom";
import { Outlet ,useLocation} from "react-router-dom";
export function Personalinformation(){
    return(
        <div>
            
            <div className="arighttdiv">

            <h1>Personal Information</h1>
            <h3>Manage your personal information here</h3>
            </div>
            <div className="arightbdiv"></div>
        </div>
    )
}
export function  Familymembers(){
    const fm=["member1","member2","member3","member4"]
    return(
        <div>
            
            <div className="arighttdiv">
                <h1>Family members</h1>
                </div>
            <div className="arightbdiv">
                <div id="familybuttons">
                    {/* <button className="familymember">family member1</button>
                    <button className="familymember">family member2</button>
                    <button className="familymember">family member3</button>
                    <button className="familymember">family member4</button> */}
                    {
                        fm.map((item,index)=>{
                            return(
                                <button className="familymember">{item}</button>
                            )
                    })
                }

                 </div>
            </div>
            
        </div>    
    )
}
export function Billingandpayments(){
    return(
    <div>

        
        <div className="arighttdiv">
            <h1>Billing and Payments</h1>
            <h4>Billing and Payment Details</h4>
        </div>
        <div className="arightbdiv"></div>
    </div>    
    )
}
export function Yourvisits(){
    return(
       <div>

       
        <div className="arighttdiv">
           <h1>your visits</h1>
           <h4>visit history</h4>
        </div>
        <div className="arightbdiv"></div>
        
      </div>  
    )
}
function Account(props){
    console.log("inaccount",props);
    const location = useLocation();
    const isSubRoute = ["/personalinformation", "/familymembers", "/billingandpayments", "/yourvisits"].some(path => location.pathname.includes(path));
    return(
        <div>
            <h1 id="amheading">DiagnoDoc Account </h1>
            <hr></hr>
            <div id="accountdiv">
                <div id="aleft">
                    <div id="usermaininfo">
                        <div>
                            <img id="userp" src="../../projectuser.jpg"></img>
                        </div>
                        <div id="userdetails">
                            <h2 id="aname"><strong>Dr. John Doe</strong></h2>
                            <h3 id="aemail">abc@gmail.com</h3>
                        
                        </div>

                    </div>
                    <div id="usermoreinfo">

                        <NavLink style={{textDecoration:'none',color:"black"} } to="personalinformation" activeClassName="active-link"><h2><strong>Personal Information</strong></h2></NavLink>
                        <NavLink style={{textDecoration:'none',color:"black"}} to="familymembers" activeClassName="active-link"><h2><strong>Family Members</strong></h2></NavLink>
                        <NavLink style={{textDecoration:'none',color:"black"}} to="billingandpayments" activeClassName="active-link"><h2><strong>Billing and Payment</strong></h2></NavLink>
                        <NavLink style={{textDecoration:'none',color:"black"}} to="yourvisits" activeClassName="active-link"><h2><strong>Your Visits</strong></h2></NavLink>
                      
                    </div>
                    <Link to="/"><button id="sobutton" onClick={()=>{
                        props.pr();
                    }}>Sign out</button></Link>


                     
                
                </div>
                <div id="aright">
                    {
                        isSubRoute?(<Outlet></Outlet>):
                        (<div id="empty">
                            
                            </div>)

                    }
                    
                   
                </div>

                    
                  
                   

                    
                    
             </div>

               
            </div>
           
        // </div>
    )
}
export default Account;