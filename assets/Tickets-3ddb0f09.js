import{P as p,r as s,b as g,e as N,j as e,O as C,f as O,g as T,h as I}from"./index-b27c7740.js";import{u as w}from"./useFetch-6c64c193.js";import{S as q}from"./Square-c18796a3.js";const k=({userBooked:t,setShowModal:l,ticketPrice:r})=>{const[a,n]=s.useState(0),[o,h]=s.useState(""),{eventId:m}=g(),{token:c}=N(),d=()=>{const f=t.map(i=>O.post(`${T}/api/party/book-place`,{number:i,party_id:m},{headers:{Authorization:`Bearer ${c}`}}));Promise.all(f).then(i=>{i.forEach(x=>{console.log(x.data)})}).catch(i=>{console.error(i)})};return s.useEffect(()=>{n(0)},[]),t.length===0?e.jsxs("div",{children:[e.jsx("p",{className:"text-center pb-6 pt-10 text-3xl",children:"Please choose a seat before continuing."}),e.jsx("div",{className:"flex justify-center mt-2 items-center",children:e.jsx("button",{onClick:()=>l(!1),className:"uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary",children:"back"})})]}):a===0?e.jsxs(s.Fragment,{children:[e.jsx("div",{className:"w-1/2 mt-4 mx-auto",children:e.jsx("div",{className:"mx-auto my-8 capitalize relative",children:e.jsxs("div",{className:"w-full flex justify-between items-center mx-auto",children:[e.jsx(q,{}),e.jsxs("h3",{className:"font-bold uppercase text-3xl",children:[t.length," seats"]})]})})}),e.jsxs("div",{className:"w-full sm:w-10/12 mx-auto",children:[e.jsxs("p",{className:"text-2xl capitalize text-center font-semibold",children:["Seat price: ",r," S.P"]}),e.jsxs("p",{className:"text-2xl capitalize text-center font-semibold",children:["total price: ",r*t.length," S.P"]})]}),e.jsxs("div",{className:"flex justify-center gap-4 mt-2 items-center",children:[e.jsx("button",{onClick:()=>l(!1),className:"uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary",children:"cancel"}),e.jsx("button",{onClick:()=>n(1),className:"uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-purple",children:"pay"})]})]}):e.jsxs(s.Fragment,{children:[e.jsx("h3",{className:"text-center text-3xl capitalize font-semibold pt-4",children:"please enter code"}),e.jsx("p",{className:"text-center text-base capitalize text-gray-600 font-semibold pt-2",children:"We have sent you a verification code to your email. Please paste the code to verify"}),e.jsx("div",{className:"pt-2",children:e.jsx(C,{otp:o,setOtp:h,valueLength:4})}),e.jsx("div",{className:"flex justify-center items-center py-4",children:e.jsx("button",{onClick:d,className:"capitalize flex justify-center hover:bg-primary/80 duration-300 bg-primary rounded-lg text-2xl font-bold text-white items-center w-24 h-12 ",children:"sent"})})]})};k.propTypes={userBooked:p.arrayOf(p.number).isRequired,setShowModal:p.func.isRequired,ticketPrice:p.number.isRequired};function R(t,l){let r=[],a=0;for(l.forEach(n=>{r.push(t.slice(a,a+n)),a+=n});a<t.length;)r.push(t.slice(a,a+l[2])),a+=l[2];return r}const S=({userSeats:t,isLoggedIn:l})=>{const{eventId:r}=g(),[a,n]=s.useState([]),{user:o}=N(),[h,m]=s.useState(!1),[c,d]=s.useState([]),[f,i]=s.useState([]),{data:x,isLoading:y,error:v}=w(`/api/party/show/${r}`);return s.useEffect(()=>{Object.keys(o).length!==0?l||console.log("خالصة الجلسة"):console.log("مالو مسجل دخولو")},[o,l]),s.useEffect(()=>{d(t)},[t]),s.useEffect(()=>{i(c.filter(b=>!t.includes(b)))},[c,t]),s.useEffect(()=>{y||(v?console.log("navigate to 404"):n(R(JSON.parse(x.seats),[22,26,30])))},[x,y,v]),e.jsxs(s.Fragment,{children:[e.jsx("div",{className:"w-[95%] px-12 overflow-x-auto mx-auto",children:e.jsxs("div",{className:"min-w-[750px] sm:w-full mx-auto",children:[e.jsx("div",{style:{transform:"perspective(700px) rotateX(-70deg)"},className:"w-[95%] mx-auto h-28 bg-primary/80 relative"}),e.jsx("div",{className:`w-[88.5%] -translate-y-10 mx-auto h-20 relative bg-gradient-to-t\r
                 to-primary/30 from-transparent`}),a.map((b,P)=>e.jsx("div",{className:"flex w-full justify-center items-start mb-4 gap-1 md:gap-2",children:b.map((u,z)=>e.jsx("button",{onClick:()=>{if(!u.booked&&!(t.length>=o.allowed_tickets))if(c.includes(u.number))d(j=>j.filter(E=>E!==u.number));else{if(c.length>=o.allowed_tickets)return;d(j=>[...j,u.number])}},disabled:u.booked,className:`${c.includes(u.number)?"bg-purple":"bg-gray-500"} disabled:bg-primary hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm`,children:e.jsx("span",{className:"sr-only",children:`seats number ${u.number}`})},z))},P))]})}),e.jsx("div",{className:"flex justify-center mt-8 items-center",children:e.jsx("button",{onClick:()=>m(!0),className:"uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary",children:"next"})}),e.jsx(I,{isOpen:h,onClose:m,clickOutSide:!0,children:e.jsx(k,{userBooked:f,setShowModal:m,ticketPrice:+(x==null?void 0:x.ticket_price)})})]})};S.propTypes={userSeats:p.arrayOf(p.number).isRequired,isLoggedIn:p.bool.isRequired};const F=()=>{const{data:t,isLoading:l,error:r,errorMessage:a}=w("/api/party/my-tickets"),[n,o]=s.useState([]),{eventId:h}=g(),[m,c]=s.useState(!0);return s.useEffect(()=>{var d,f;l||(r?typeof a!="string"&&((f=(d=a==null?void 0:a.response)==null?void 0:d.data)==null?void 0:f.message)==="Unauthenticated."&&c(!1):t!=null&&t.data&&o(t.data.filter(i=>+i.party_id==+h).map(i=>+i.booked_seat_number)))},[t,l,r,h,a]),s.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"})},[]),e.jsxs("div",{className:"mt-16 min-h-100vh px-5 py-5",children:[e.jsx("h2",{className:"text-center text-xl sm:text-2xl md:text-3xl font-bold capitalize",children:"select your seats"}),e.jsx("div",{className:"w-[95%] px-12 mt-8 overflow-x-auto mx-auto",children:e.jsxs("div",{className:"flex w-full justify-evenly items-start mb-4 gap-1 md:gap-2",children:[e.jsxs("div",{className:"flex justify-center items-center gap-4",children:[e.jsx("button",{className:"bg-gray-500 hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm",children:e.jsx("span",{className:"sr-only",children:"seat"})}),e.jsx("p",{className:"text-xl font-semibold capitalize",children:"available"})]}),e.jsxs("div",{className:"flex justify-center items-center gap-4",children:[e.jsx("button",{className:"bg-primary hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm",children:e.jsx("span",{className:"sr-only",children:"seat"})}),e.jsx("p",{className:"text-xl font-semibold capitalize",children:"sold"})]}),e.jsxs("div",{className:"flex justify-center items-center gap-4",children:[e.jsx("button",{className:"bg-purple hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm",children:e.jsx("span",{className:"sr-only",children:"seat"})}),e.jsx("p",{className:"text-xl font-semibold capitalize",children:"selected"})]})]})}),l?null:e.jsx(S,{userSeats:n,isLoggedIn:m})]})};export{F as default};