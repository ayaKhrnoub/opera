import{P as f,r as t,c as k,f as z,j as e,A,O as _,g as F,h as $,Q as U,k as Q,l as P,m as H}from"./index-f048c21e.js";import{u as E}from"./useFetch-58dc82b3.js";import{S as J}from"./Square-5c5348e2.js";const T=({userBooked:s,setShowModal:i,ticketPrice:n})=>{const[a,u]=t.useState(0),[j,r]=t.useState(""),{eventId:b}=k(),{token:x}=z(),[c,d]=t.useState(!1),m=async()=>{try{d(!0);for(let p=0;p<s.length;p++){const v=s[p];await F.post(`${$}/api/party/book-place`,{number:v,party_id:b},{headers:{Authorization:`Bearer ${x}`}})}U("done",{position:"bottom-left",autoClose:2e3,pauseOnFocusLoss:!1,pauseOnHover:!1,draggable:!0,type:"success",theme:"colored"})}catch(p){console.error(p)}finally{d(!1),i(!1)}};return t.useEffect(()=>{u(0)},[]),s.length===0?e.jsxs("div",{children:[e.jsx("p",{className:"text-center pb-6 pt-10 text-3xl",children:"Please choose a seat before continuing."}),e.jsx("div",{className:"flex justify-center mt-2 items-center",children:e.jsx("button",{onClick:()=>i(!1),className:"uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary",children:"back"})})]}):a===0?e.jsxs(t.Fragment,{children:[e.jsx("div",{className:"w-1/2 mt-4 mx-auto",children:e.jsx("div",{className:"mx-auto my-8 capitalize relative",children:e.jsxs("div",{className:"w-full flex justify-between items-center mx-auto",children:[e.jsx(J,{}),e.jsxs("h3",{className:"font-bold uppercase text-3xl",children:[s.length," seats"]})]})})}),e.jsxs("div",{className:"w-full sm:w-10/12 mx-auto",children:[e.jsxs("p",{className:"text-2xl capitalize text-center font-semibold",children:["Seat price: ",n," S.P"]}),e.jsxs("p",{className:"text-2xl capitalize text-center font-semibold",children:["total price: ",n*s.length," S.P"]})]}),e.jsxs("div",{className:"flex justify-center gap-4 mt-2 items-center",children:[e.jsx("button",{onClick:()=>i(!1),className:"uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary",children:"cancel"}),e.jsx("button",{disabled:c,onClick:m,className:"uppercase h-10 w-24 text-xl sm:text-2xl flex justify-center items-center text-white rounded-lg bg-purple",children:c?e.jsx(A,{className:"animate-spin"}):"pay"})]})]}):e.jsxs(t.Fragment,{children:[e.jsx("h3",{className:"text-center text-3xl capitalize font-semibold pt-4",children:"please enter code"}),e.jsx("p",{className:"text-center text-base capitalize text-gray-600 font-semibold pt-2",children:"We have sent you a verification code to your email. Please paste the code to verify"}),e.jsx("div",{className:"pt-2",children:e.jsx(_,{otp:j,setOtp:r,valueLength:4})}),e.jsx("div",{className:"flex justify-center items-center py-4",children:e.jsx("button",{onClick:m,className:"capitalize flex justify-center hover:bg-primary/80 duration-300 bg-primary rounded-lg text-2xl font-bold text-white items-center w-24 h-12 ",children:"sent"})})]})};T.propTypes={userBooked:f.arrayOf(f.number).isRequired,setShowModal:f.func.isRequired,ticketPrice:f.number.isRequired};const W="/opera/assets/sold-a8685a60.png";function X(s,i){let n=[],a=0;for(i.forEach(u=>{n.push(s.slice(a,a+u)),a+=u});a<s.length;)n.push(s.slice(a,a+i[2])),a+=i[2];return n}const q=({userSeats:s,isLoggedIn:i})=>{const{eventId:n}=k(),a=Q(),[u,j]=t.useState([]),{user:r}=z(),[b,x]=t.useState(!1),[c,d]=t.useState([]),[m,p]=t.useState([]),[v,S]=t.useState(!1),[I,L]=t.useState(!1),{data:y,isLoading:O,error:C,errorMessage:l}=E(`/api/party/show/${n}`);return t.useEffect(()=>{Object.keys(r).length!==0?i||console.log("خالصة الجلسة"):S(!0)},[r,i]),t.useEffect(()=>{d(s)},[s]),t.useEffect(()=>{p(c.filter(h=>!s.includes(h)))},[c,s]),t.useEffect(()=>{var h,g,o,N;O||(C?(console.log(l),l!=null&&l.response&&(console.log((h=l==null?void 0:l.response)==null?void 0:h.status),((g=l==null?void 0:l.response)==null?void 0:g.status)===404?a("/not-found"):((o=l==null?void 0:l.response)==null?void 0:o.status)===401?a("/"):((N=l==null?void 0:l.response)==null?void 0:N.status)===400&&L(!0))):j(X(JSON.parse(y.seats),[22,26,30])))},[y,O,C,l,a]),I?e.jsx("div",{className:"w-2/5 mx-auto",children:e.jsx("img",{className:"w-full object-contain",src:W})}):e.jsxs(t.Fragment,{children:[e.jsx("div",{className:"w-[95%] px-12 overflow-x-auto mx-auto",children:e.jsxs("div",{className:"min-w-[750px] sm:w-full mx-auto",children:[e.jsx("div",{style:{transform:"perspective(700px) rotateX(-70deg)"},className:"w-[95%] mx-auto h-28 bg-primary/80 relative"}),e.jsx("div",{className:`w-[88.5%] -translate-y-10 mx-auto h-20 relative bg-gradient-to-t\r
               to-primary/30 from-transparent`}),u.map((h,g)=>e.jsx("div",{className:"flex w-full justify-center items-start mb-4 gap-1 md:gap-2",children:h.map((o,N)=>e.jsx("button",{onClick:()=>{if(Object.keys(r).length!==0)if(i){if(o.booked||s.length>=r.allowed_tickets)return;if(c.includes(o.number))d(w=>w.filter(R=>R!==o.number));else{if(c.length>=r.allowed_tickets)return;d(w=>[...w,o.number])}}else return},disabled:o.booked,className:`${c.includes(o.number)?"bg-purple":"bg-gray-500"} disabled:bg-primary hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm`,children:e.jsx("span",{className:"sr-only",children:`seats number ${o.number}`})},N))},g))]})}),e.jsx("div",{className:"flex justify-center mt-8 items-center",children:e.jsx("button",{onClick:()=>x(!0),className:"uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary",children:"next"})}),e.jsx(P,{isOpen:b,onClose:x,clickOutSide:!0,children:e.jsx(T,{userBooked:m,setShowModal:x,ticketPrice:+(y==null?void 0:y.ticket_price)})}),e.jsx(P,{isOpen:v,onClose:S,clickOutSide:!1,children:e.jsx(H,{})})]})};q.propTypes={userSeats:f.arrayOf(f.number).isRequired,isLoggedIn:f.bool.isRequired};const K=()=>{const{data:s,isLoading:i,error:n,errorMessage:a}=E("/api/party/my-tickets"),[u,j]=t.useState([]),{eventId:r}=k(),[b,x]=t.useState(!0);return t.useEffect(()=>{var c,d;i||(n?typeof a!="string"&&((d=(c=a==null?void 0:a.response)==null?void 0:c.data)==null?void 0:d.message)==="Unauthenticated."&&x(!1):s!=null&&s.data&&j(s.data.filter(m=>+m.party_id==+r).map(m=>+m.booked_seat_number)))},[s,i,n,r,a]),t.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"})},[]),e.jsxs("div",{className:"mt-16 min-h-100vh px-5 py-5",children:[e.jsx("h2",{className:"text-center text-xl sm:text-2xl md:text-3xl font-bold capitalize",children:"select your seats"}),e.jsx("div",{className:"w-[95%] px-12 mt-8 overflow-x-auto mx-auto",children:e.jsxs("div",{className:"flex w-full justify-evenly items-start mb-4 gap-1 md:gap-2",children:[e.jsxs("div",{className:"flex justify-center items-center gap-4",children:[e.jsx("button",{className:"bg-gray-500 hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm",children:e.jsx("span",{className:"sr-only",children:"seat"})}),e.jsx("p",{className:"text-lg font-semibold capitalize",children:"available"})]}),e.jsxs("div",{className:"flex justify-center items-center gap-4",children:[e.jsx("button",{className:"bg-primary hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm",children:e.jsx("span",{className:"sr-only",children:"seat"})}),e.jsx("p",{className:"text-lg font-semibold capitalize",children:"sold"})]}),e.jsxs("div",{className:"flex justify-center items-center gap-4",children:[e.jsx("button",{className:"bg-purple hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm",children:e.jsx("span",{className:"sr-only",children:"seat"})}),e.jsx("p",{className:"text-lg font-semibold capitalize",children:"selected"})]})]})}),i?null:e.jsx(q,{userSeats:u,isLoggedIn:b})]})};export{K as default};