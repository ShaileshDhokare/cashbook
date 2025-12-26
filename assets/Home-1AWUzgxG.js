import{c as s,j as e,B as o,L as n,K as i,t as d,r as h}from"./index-BDF_d_CJ.js";/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],x=s("book-open",l);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]],p=s("calendar-check",m);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 16h8",key:"srdodz"}],["path",{d:"M7 11h12",key:"127s9w"}],["path",{d:"M7 6h3",key:"w9rmul"}]],g=s("chart-bar",y);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],k=s("chart-pie",u);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],b=s("clipboard-list",j);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],N=s("coins",f);function c({icon:t,title:a,description:r}){return e.jsxs("div",{className:"bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition",children:[e.jsx(t,{className:"w-10 h-10 text-green-600 mb-3"}),e.jsx("h3",{className:"text-xl font-semibold mb-1",children:a}),e.jsx("p",{className:"text-gray-600 text-md",children:r})]})}function v(){return e.jsxs("section",{className:"flex flex-col md:flex-row items-center justify-between px-6 py-6 max-w-6xl mx-auto",children:[e.jsxs("div",{className:"flex-1 space-y-5",children:[e.jsxs("h1",{className:"text-4xl font-bold leading-tight text-gray-900",children:["Cashbook: Your ",e.jsx("br",{})," Personal Expense Tracker"]}),e.jsx("p",{className:"text-gray-600 max-w-lg text-lg",children:"Effortlessly manage your finances, organize bills, and achieve your savings goals."}),e.jsx(o,{size:"lg",className:"bg-blue-600 hover:bg-blue-700",children:e.jsx(n,{to:"/register",children:"Get Started"})})]}),e.jsx("div",{className:"flex-1 mt-10 md:mt-0 flex justify-center",children:e.jsxs("div",{className:"bg-blue-50 p-6 rounded-2xl shadow-inner flex flex-col items-center",children:[e.jsx(g,{className:"w-16 h-16 text-green-600"}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsx(N,{className:"w-10 h-10 text-green-500"}),e.jsx(p,{className:"w-10 h-10 text-blue-500"})]})]})})]})}function M(){const t=i(),a=d(r=>r.userId);return h.useEffect(()=>{a&&t("/dashboard")},[a,t]),e.jsx("div",{className:"pb-10",children:e.jsxs("div",{className:"header-margin",children:[e.jsx(v,{}),e.jsxs("section",{className:"px-6 py-16 max-w-6xl mx-auto",children:[e.jsx("h2",{className:"text-2xl font-bold mb-8 text-center",children:"Feature Highlights"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsx(c,{icon:x,title:"Organize Expenses by Book",description:"Create custom categories for home, car, and more."}),e.jsx(c,{icon:k,title:"Track Spending with Categories",description:"Visualize where your money goes with custom tags."}),e.jsx(c,{icon:b,title:"Easy Data Entry",description:"Quickly add transactions on the go."})]})]})]})})}export{M as default};
