import{r as i,e as c,j as e,N as o,L as p}from"./index-b27c7740.js";import{u as m}from"./useFetch-6c64c193.js";const g=()=>{const{data:a,isLoading:r,error:s}=m("/api/theater/my-booking-requests"),[d,l]=i.useState([]),{user:x}=c();return i.useEffect(()=>{!r&&!s&&l(a.data.sort((t,n)=>new Date(n.created_at).getTime()-new Date(t.created_at).getTime()))},[r,s,a]),Object.keys(x).length===0?e.jsx(o,{to:"/",replace:!0}):r?e.jsx(p,{}):e.jsx("div",{className:"mt-16 min-h-100vh px-5 py-5",children:e.jsx("div",{className:"container mx-auto px-4 sm:px-8",children:e.jsxs("div",{className:"py-8",children:[e.jsx("div",{children:e.jsx("h2",{className:"text-2xl font-semibold leading-tight",children:"My Reservation"})}),e.jsx("div",{className:"-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto",children:e.jsx("div",{className:"inline-block min-w-full shadow rounded-lg overflow-hidden",children:e.jsxs("table",{className:"min-w-full leading-normal",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"email"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"phone"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"party_reason"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"number_of_people"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"date"}),e.jsx("th",{className:"px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider",children:"status"})]})}),e.jsx("tbody",{children:d.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm",children:e.jsx("div",{className:"flex items-center",children:e.jsx("div",{className:"ml-3",children:e.jsx("p",{className:"text-gray-900 whitespace-no-wrap",children:t.email})})})}),e.jsx("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm",children:e.jsx("p",{className:"text-gray-900 whitespace-no-wrap",children:t.phone})}),e.jsx("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm",children:e.jsx("p",{className:"text-gray-900 whitespace-no-wrap",children:t.party_reason})}),e.jsx("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm",children:e.jsx("p",{className:"text-gray-900 whitespace-no-wrap",children:t.number_of_people})}),e.jsx("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm",children:e.jsx("p",{className:"text-gray-900 whitespace-no-wrap",children:t.created_at})}),e.jsx("td",{className:"px-5 py-5 border-b border-gray-200 bg-white text-sm",children:e.jsx("span",{className:"relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight",children:e.jsx("span",{className:"relative",children:t.status})})})]},t.id))})]})})})]})})})};export{g as default};
