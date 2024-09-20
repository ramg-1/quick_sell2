import React from "react";
import './Section.css';
import { Card } from './Card';

export const Section = ({ group, tickets, users, groupState , orderState}) => {
  if (!tickets || !users) {
    return <div>Loading...</div>; // You can customize this loading state
  }
  const filteredTickets = tickets.filter(ticket => {
    if (groupState === "user") {
      const user = users.find(user => user.id === ticket.userId);
      return user && user.name === group;
    } else if (groupState === "status") {
      return ticket.status === group;
    } else if (groupState === "priority") {
      if (group === 'Urgent') return ticket.priority === 4;
      if (group === 'High') return ticket.priority === 3;
      if (group === 'Medium') return ticket.priority === 2;
      if (group === 'Low') return ticket.priority === 1;
      if (group === 'No priority') return ticket.priority === 0;
    }
    return false;
  });

  const getImageSrc = (group) => {
    if (group === "Urgent") return "/Assets/Untitled/icons_FEtask/SVG - Urgent Priority colour.svg";
    if (group === "High") return "/Assets/Untitled/icons_FEtask/Img - High Priority.svg";
    if (group === "Medium") return "/Assets/Untitled/icons_FEtask/Img - Medium Priority.svg";
    if (group === "Low") return "/Assets/Untitled/icons_FEtask/Img - Low Priority.svg";
    if (group === "No priority") return "/Assets/Untitled/icons_FEtask/No-priority.svg";
    if(group==="Backlog") return "/Assets/Untitled/icons_FEtask/Backlog.svg";
    if(group==="Todo") return "/Assets/Untitled/icons_FEtask/To-do.svg";
    if(group==="In progress") return "/Assets/Untitled/icons_FEtask/in-progress.svg";
    if(group==="Done") return "/Assets/Untitled/icons_FEtask/Done.svg";
    if(group==="Canceled")  return "/Assets/Untitled/icons_FEtask/Cancelled.svg";
    return "/Assets/Untitled/icons_FEtask/profile.png"; // Default image
  };

  const getUserimgsrc = (groupState)=>{
            if(groupState !== 'User')
                return "/Assets/Untitled/icons_FEtask/profile.png";
            else return "";
  }

  const getorderImageSrc = (orderState ,ticket) => {
    if(orderState==="Priority"){
    if (ticket.priority === 4) return "/Assets/Untitled/icons_FEtask/SVG - Urgent Priority colour.svg";
    if (ticket.priority === 3) return "/Assets/Untitled/icons_FEtask/Img - High Priority.svg";
    if (ticket.priority === 2) return "/Assets/Untitled/icons_FEtask/Img - Medium Priority.svg";
    if (ticket.priority === 1) return "/Assets/Untitled/icons_FEtask/Img - Low Priority.svg";
    if (ticket.priority === 0) return "/Assets/Untitled/icons_FEtask/No-priority.svg"; }
    return ""; // Default image for unknown priority
  };
 
  const getStatusImgsrc =(Status)=>{
     if(Status === 'Backlog') return "/Assets/Untitled/icons_FEtask/Backlog.svg";
     if(Status === 'Todo') return "/Assets/Untitled/icons_FEtask/To-do.svg";
     if(Status === 'In progress') return "/Assets/Untitled/icons_FEtask/in-progress.svg";
     if(Status === 'Done') return "/Assets/Untitled/icons_FEtask/Done.svg";
     if(Status === 'Canceled') return "/Assets/Untitled/icons_FEtask/Cancelled.svg";
  }

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (orderState === "Priority") {
      return b.priority - a.priority; // Sort by descending priority
    } else if (orderState === "Title") {
      return a.title.localeCompare(b.title); // Sort by ascending title
    }
    return 0;
  });
const count = sortedTickets.length;
  return (
    <div id="Section">
      <div id="top">
        <div className="container-left">
          <img src={getImageSrc(group)} alt={group} />
          <span>{group}</span>
          <span id='count'>{count}</span>
        </div>
        <div className="container-right">
          <img src="/Assets/Untitled/icons_FEtask/add.svg" alt="Add" />
          <img src="/Assets/Untitled/icons_FEtask/3 dot menu.svg" alt="Menu" />
        </div>
      </div>

      <div className="tickets-container">
        {sortedTickets.map(ticket => (
          <Card
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            tags={ticket.tag}
            orderimglink = {getorderImageSrc(orderState ,ticket)}
            statusimglink = {getStatusImgsrc(ticket.status)}
            userImgSrc = {getUserimgsrc(groupState)}
          />
        ))}
      </div>
    </div>
  );
};
