import{r as l,e as d,j as e,N as o,L as m,d as p}from"./index-b27c7740.js";import{u}from"./useFetch-6c64c193.js";const j=()=>{const{data:a,isLoading:s,error:r}=u("/api/party/my-tickets"),[i,n]=l.useState([]),{user:c}=d();return l.useEffect(()=>{!s&&!r&&n(a.data.sort((t,x)=>new Date(x.created_at).getTime()-new Date(t.created_at).getTime()))},[s,r,a]),Object.keys(c).length===0?e.jsx(o,{to:"/",replace:!0}):e.jsxs("div",{className:"mt-16 min-h-100vh flex-col flex items-center justify-center px-5 py-5",children:[e.jsx("h1",{className:"font-bold text-primary text-4xl capitalize pb-4",children:"my tickets"}),e.jsx("div",{className:"w-[95%] sm:w-4/5 flex justify-between items-center flex-wrap gap-4",children:s?e.jsx(m,{}):i.length!==0?i.map(t=>e.jsx("div",{className:"w-[250px] h-[125px] bg-[#EEE] rounded-lg shadow-lg",children:e.jsxs("div",{className:"px-4 font-bold",children:[e.jsx("h2",{className:"text-center cursor-default text-primary font-bold text-xl py-3",children:t.party_name}),e.jsxs("div",{className:"flex cursor-default text-xl justify-around items-center",children:[e.jsx("p",{children:"seat number"}),e.jsx("p",{children:t.booked_seat_number})]}),e.jsx("div",{className:"flex text-xl justify-center items-center",children:e.jsx(p,{className:"text-purple capitalize pt-3 hover:underline",to:`${t.id}`,children:"ticket information"})})]})},t.id)):e.jsx("p",{className:"text-center flex justify-center items-center w-full font-bold text-xl capitalize",children:"You haven't registered for any party yet"})})]})};export{j as default};
