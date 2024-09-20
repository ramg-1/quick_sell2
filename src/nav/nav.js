import React , {useState}from "react";
import './nav.css'

export const Nav = ()=>{
    const [dropDownClick , setDropDownClick] = useState(false);
    const [groupState , setGroupState] = useState("status");
    const [orderState , setOrderstate ] = useState("Priority");

    const HandleDownClick=()=>{
             setDropDownClick(!dropDownClick);
    }

    const handleGroupChange = (e) => {
      setGroupState(e.target.value);
      console.log("Group by:", e.target.value);
  };

  // Handle change for sort selection
  const handleSortChange = (e) => {
      setOrderstate(e.target.value);
      console.log("Sort by:", e.target.value);
  };

     return(<div id="displaybox">
        <div id='container'>
           <img src="\Assets\Untitled\icons_FEtask\Display.svg" alt=""></img>
         <span>Display</span>
          <img src="\Assets\Untitled\icons_FEtask\down.svg" alt="" onClick={HandleDownClick} style={{ cursor: "pointer" } }></img>
          </div>

           

          {dropDownClick && (
        <div id="dropdown">
          <ul>
            <li>     <div className="grouping-section">
                <label>Grouping</label>
                <select value={groupState} onChange={handleGroupChange}>
                    <option value="">Select Group</option>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>
            </div></li>
            <li> Ordering
            <select value={orderState} onChange={handleSortChange}>
                    <option value="">Select Ordering</option>
                    <option value="Priority">Priority</option>
                    <option value="Title">Title</option>
                </select>
            </li>
           
          </ul>
        </div>
      )}

     </div>);
}