import{a as u,b as t,h as a,i as s,l as i}from"/build/_shared/chunk-BRVXBROF.js";var m=u((x,l)=>{l.exports={}});var p=t(m(),1);var n="/build/_assets/FormStyles-KKCU2BT4.css";var e=t(i(),1),f=()=>[{rel:"stylesheet",href:n}];function d(){let c=a(),o=s();return(0,e.jsxs)("form",{method:"post",className:"form",children:[(0,e.jsxs)("div",{className:"form-group",children:[(0,e.jsx)("label",{htmlFor:"title",className:"form-label",children:"Title:"}),(0,e.jsx)("input",{className:"form-input",type:"text",id:"title",name:"title",required:!0}),o?.errors.title&&(0,e.jsx)("p",{children:o.errors.title})]}),(0,e.jsxs)("div",{className:"form-group",children:[(0,e.jsx)("label",{htmlFor:"body",className:"form-label",children:"Body:"}),(0,e.jsx)("textarea",{className:"form-textarea",id:"body",name:"body",required:!0}),o?.errors.body&&(0,e.jsx)("p",{children:o.errors.body})]}),(0,e.jsxs)("div",{className:"form-group",children:[(0,e.jsx)("label",{className:"form-label",htmlFor:"userName",children:"UserName:"}),(0,e.jsx)("select",{className:"form-select",id:"userName",name:"userName",required:!0,children:c.map(r=>(0,e.jsx)("option",{className:"form-option",value:r.id,children:r.name},r.id))}),o?.errors.userName&&(0,e.jsx)("p",{children:o.errors.userName})]}),(0,e.jsxs)("div",{className:"form-group",children:[(0,e.jsxs)("label",{className:"form-label",htmlFor:"isHuman",children:[(0,e.jsx)("input",{className:"form-checkbox",type:"checkbox",id:"isHuman",name:"isHuman",required:!0}),"I am a human"]}),o?.errors.isHuman&&(0,e.jsx)("p",{children:o.errors.isHuman})]}),(0,e.jsx)("button",{className:"button",type:"submit",children:"Submit"})]})}export{d as default,f as links};