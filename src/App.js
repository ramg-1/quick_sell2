import './App.css';
import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import axios from 'axios';
function App() {
  const [dropDownClick, setDropDownClick] = useState(false);
  const [groupState, setGroupState] = useState(() => localStorage.getItem('groupState') || 'status');
  const [orderState, setOrderState] = useState(() => localStorage.getItem('orderState') || 'priority');
  const [groupedData, setGroupedData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users , setUsers] = useState([]);     

  const fetchTickets = async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      console.log(response.data);
      setTickets(response.data.tickets);
      setUsers(response.data.users) // Assuming the data is stored in the response object
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Save groupState and orderState to localStorage when they change
    localStorage.setItem('groupState', groupState);
    localStorage.setItem('orderState', orderState);
  }, [groupState, orderState]);

  useEffect(() => {
    fetchTickets(); // Fetch tickets data when the component mounts
  }, []);

  const HandleDownClick = () => {
    setDropDownClick(!dropDownClick);
  };

  const handleGroupChange = (e) => {
    setGroupState(e.target.value);
    console.log("Group by:", e.target.value);
  };

  const handleSortChange = (e) => {
    setOrderState(e.target.value);
    console.log("Sort by:", e.target.value);
  };

  useEffect(() => {

    let groupedArray = [];

    // Grouping logic
    if (groupState === "user") {
      groupedArray = tickets.map(ticket => {
        const user = users.find(user => user.id === ticket.userId);
        return user ? user.name : "Unknown User";
      });
    } else if (groupState === "status") {
      groupedArray = ["Backlog" , "Todo","In progress","Done","Canceled"];
    } else if (groupState === "priority") {
      groupedArray = ['Urgent','High','Medium','Low','No priority'];
    }

    // Remove duplicates
    groupedArray = [...new Set(groupedArray)];

     // Only update state if the grouped array has changed
     if (JSON.stringify(groupedArray) !== JSON.stringify(groupedData)) {
      setGroupedData(groupedArray);
    }
  }, [groupState, tickets, users]);  // Added tickets and users as dependencies in case they change

  return (
    <div className="App">
      <div id="displaybox">
        <div id="container">
          {/* Image path adjusted */}
          <img src={process.env.PUBLIC_URL + "/Assets/Untitled/icons_FEtask/Display.svg"} alt="Display Icon" />
          <span>Display</span>
          <img 
            src={process.env.PUBLIC_URL + "/Assets/Untitled/icons_FEtask/down.svg"} 
            alt="Down Arrow" 
            onClick={HandleDownClick} 
            style={{ cursor: "pointer" }} 
          />
        </div>

        {dropDownClick && (
          <div id="dropdown">
            <ul>
              <li>
                <div className="grouping-section">
                  <label>Grouping</label>
                  <select value={groupState} onChange={handleGroupChange}>
                    <option value="">Select Group</option>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </li>
              <li> 
                Ordering
                <select value={orderState} onChange={handleSortChange}>
                  <option value="">Select Ordering</option>
                  <option value="Priority">Priority</option>
                  <option value="Title">Title</option>
                </select>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div id="content">
      {groupedData.map((group, index) => (
          <Section key={index} group={group} tickets={tickets} users={users} groupState={groupState} orderState={orderState}/>
        ))} 
      </div>
    </div>
  );
}

export default App;
