import{k as m,r as i,j as a,p,q as u,A as x,g as y,h as S}from"./index-2c95ee77.js";const f={email:"",password:"",isLoading:!1,requestStatus:{isDone:!1,message:""},errors:{email:"",password:""},rememberMe:!1,isVerified:!1};function h(r,e){switch(e.type){case"SET_EMAIL":return{...r,email:e.payload};case"SET_LOADING":return{...r,isLoading:e.payload};case"SET_REQUEST_STATUS":return{...r,requestStatus:e.payload};case"SET_ERRORS":return{...r,errors:e.payload};default:return r}}const E=()=>{const r=m(),[e,s]=i.useReducer(h,f),n=()=>{let l={email:""};return l.email=e.email===""?"This field is required":/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)?"":"email format is not valid",s({type:"SET_ERRORS",payload:l}),Object.values(l).every(t=>t==="")},o=async l=>{if(l.preventDefault(),s({type:"SET_ERRORS",payload:{email:"",password:""}}),s({type:"SET_REQUEST_STATUS",payload:{isDone:!0,message:""}}),n())try{s({type:"SET_LOADING",payload:!0});const t={email:e.email};await y.post(`${S}/api/auth/forget-password`,t),r("reset",{state:{email:e.email}})}catch(t){t.response?s({type:"SET_REQUEST_STATUS",payload:{isDone:!0,message:t.response.data.message}}):s({type:"SET_REQUEST_STATUS",payload:{isDone:!0,message:"Please check your internet connection"}})}finally{s({type:"SET_LOADING",payload:!1})}},d=l=>{const{name:t,value:c}=l.target;switch(t){case"email":s({type:"SET_EMAIL",payload:c});break}};return a.jsxs(i.Fragment,{children:[a.jsx("div",{className:"text-center mb-2",children:a.jsx("h2",{className:"font-bold text-3xl text-gray-900 capitalize",children:"forget password"})}),a.jsx("div",{className:"text-center mb-10",children:a.jsx("h3",{className:"font-bold text-2xl text-primary capitalize",children:"please enter your email"})}),e.requestStatus.isDone?a.jsx("p",{className:"text-red-600 text-center text-lg",children:e.requestStatus.message}):null,a.jsxs("form",{onSubmit:o,children:[a.jsx("div",{className:"mb-5",children:a.jsx(p,{label:"email",placeholder:"example@example.com",value:e.email,onChange:d,isPassword:!1,Icon:a.jsx(u,{}),error:e.errors.email})}),a.jsxs("div",{className:"flex flex-col justify-center items-center -mx-3",children:[a.jsx("div",{}),a.jsx("div",{className:"w-full px-3 mb-5",children:a.jsx("button",{type:"submit",disabled:e.isLoading,className:`flex justify-center items-center w-full max-w-xs text-2xl uppercase mx-auto bg-primary hover:bg-primary/80 disabled:cursor-wait\r
             disabled:bg-primary/80 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 text-white rounded-lg px-3 py-2 font-semibold`,children:e.isLoading?a.jsx(x,{className:"text-4xl text-center animate-spin"}):a.jsx("span",{children:"login"})})})]})]})]})};export{E as default};