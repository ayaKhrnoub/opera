import{r as s,j as e,R as g,i as j,A as h}from"./index-8ae3b2fc.js";import{T as v,C as P}from"./ContactUs-47958a2c.js";import{E as w,a as y}from"./EventCardLoading-a34364e9.js";import{u as b}from"./useFetch-c8e1373c.js";import{P as S}from"./PageHeader-20604a3e.js";import"./ContactUsForm-3a900903.js";const T=()=>{const[a,m]=s.useState(1),{data:o,isLoading:r,error:n}=b(`/api/party/opened?page=${a}`),[l,d]=s.useState([]),[c,f]=s.useState(1),[p,x]=s.useState(8),u=()=>{window.sessionStorage.setItem("scrollPosition",window.pageYOffset)};return s.useEffect(()=>{!r&&!n&&(d(t=>[...t,...o.data.data]),f(o.data.last_page),x(o.data.per_page))},[o,r,n]),s.useEffect(()=>{const t=sessionStorage.getItem("scrollPosition");t&&(window.scrollTo(0,parseInt(t)),sessionStorage.removeItem("scrollPosition"))},[l]),e.jsxs(g.Fragment,{children:[e.jsx(S,{img:j.intro1,text:"Damascus Opera"}),e.jsxs("main",{className:"w-full mb-8 relative after:top-0 after:left-0 after:z-[-1] after:absolute after:w-full after:h-[75vh] after:bg-[#0C2024]/90 pt-4 ",children:[e.jsxs("div",{className:"w-10/12 mx-auto",children:[e.jsx(v,{text1:"our",text2:"event",white:!0}),e.jsx("p",{className:"text-white py-4 mx-auto text-3xl",children:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration"}),e.jsx("div",{className:"mt-8 gap-8 flex justify-center items-center flex-wrap",children:r&&a===1?Array(p*a).fill(0).map((t,i)=>e.jsx(w,{},i)):l.map(t=>e.jsx(y,{party:t},t.id))})]}),a===c?null:e.jsx("div",{className:"flex justify-center items-center mt-12",children:e.jsx("button",{onClick:t=>{t.preventDefault(),t.stopPropagation(),u(),a!==c&&m(i=>i+1)},disabled:r,className:"bg-secondary uppercase w-24 flex justify-center disabled:bg-secondary/80 items-center py-2 rounded-lg mt-5 text-xl text-white hover:bg-secondary/80 active:scale-105",children:r&&a>1?e.jsx(h,{className:"text-3xl animate-spin"}):e.jsx("span",{children:"more"})})}),e.jsx(P,{})]})]})};export{T as default};
