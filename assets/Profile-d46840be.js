import{P as i,e as a,j as e,N as r,d as x}from"./index-b27c7740.js";const s=({title:t,text:l})=>e.jsxs("div",{className:"flex flex-col sm:flex-row w-4/5 mx-auto pb-4 text-xl font-semibold justify-center sm:items-center items-start",children:[e.jsx("h3",{className:"w-1/2 sm:w-1/3 capitalize",children:t}),e.jsx("p",{className:"pt-2 sm:pt-0 flex-1 text-2xl sm:text-xl",children:l})]});s.propTypes={title:i.string.isRequired,text:i.string.isRequired};const c=()=>{const{user:t}=a();return Object.keys(t).length===0?e.jsx(r,{to:"/",replace:!0}):e.jsx("div",{className:"mt-16 min-h-100vh flex items-center justify-center px-5 py-5",children:e.jsx("div",{className:"w-[95%] sm:w-3/5",children:e.jsxs("div",{className:"bg-primary/20 py-8 rounded-3xl shadow-xl w-full overflow-hidden",children:[e.jsx("h1",{className:"text-4xl w-4/5 mx-auto capitalize pb-4 text-center font-bold",children:"my profile"}),e.jsx(s,{title:"first name :",text:t.first_name}),e.jsx(s,{title:"last name :",text:t.last_name}),e.jsx(s,{title:"phone number :",text:t.phone_number}),e.jsx(s,{title:"email :",text:t.email}),e.jsx("div",{className:"flex justify-center pt-4 items-center",children:e.jsx(x,{to:"/account/edit",className:"bg-primary capitalize text-white py-1 active:scale-110 hover:scale-105 transition-all duration-150 px-4 text-2xl rounded-lg",children:"edit"})})]})})})};export{c as default};
