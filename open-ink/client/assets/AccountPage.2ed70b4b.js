import{_ as g,r as n,b as U,A as k,d as w,c as m,a as e,e as I,t as _,w as c,v as d,u as S,f as V,g as A,h as P,o as v,U as q,p as N,i as B,j as D,k as M,P as b,l as j}from"./index.c05d4ebf.js";const r=i=>(N("data-v-08d51070"),i=i(),B(),i),L={class:"container d-flex flex-column pt-5 align-items-center"},T=["onSubmit"],E={class:"mb-3 col-6 text-center"},K=["src"],z={id:"helpId",class:"form-text text-muted"},C={class:"mb-3"},F=r(()=>e("label",{for:"",class:"form-label"},"Name",-1)),G={class:"mb-3"},H=r(()=>e("label",{for:"",class:"form-label"},"Username",-1)),J={key:0,class:"form-text text-danger"},O={key:1,id:"helpId",class:"form-text text-muted"},Q=r(()=>e("i",{class:"mdi mdi-check"},null,-1)),R={class:"mb-3"},W=r(()=>e("label",{for:"",class:"form-label"},"bio",-1)),X={class:"mb-3"},Y=r(()=>e("label",{for:"",class:"form-label"},"location",-1)),Z=["required"],$={class:"col-12"},ee=["disabled"],te={__name:"AccountPage",setup(i){const t=n({}),u=U(()=>k.account),p=n(null);n(!1);const h=n(!0),l=n("");w(()=>{t.value={...u.value}});function f(a){t.value.picture=a.url,p.value=a.file}async function x(){try{let a=await P.checkUsername(t.value.username);l.value=a.username}catch{l.value=""}}async function y(){try{if(p.value){let a=await D.upload(p.value,u.id,"profile-picture");t.value.picture=a.smallUrl}await M.update(t.value),b.toast("Profile Updated","success","top")}catch(a){b.error(a)}}return(a,s)=>(v(),m("div",L,[e("form",{class:"row text-light justify-content-center",onSubmit:A(y,["prevent"])},[e("div",E,[e("img",{src:t.value.picture,alt:""},null,8,K),I(q,{onUploading:f,options:{required:!1}}),e("small",z,_(t.value.email),1)]),e("div",C,[F,c(e("input",{type:"text",required:"","onUpdate:modelValue":s[0]||(s[0]=o=>t.value.name=o),class:"form-control",name:"name","aria-describedby":"helpId",placeholder:""},null,512),[[d,t.value.name]])]),e("div",G,[H,c(e("input",{type:"text",required:"",minLength:"3",maxLength:"15","onUpdate:modelValue":s[1]||(s[1]=o=>t.value.username=o),class:"form-control",name:"username","aria-describedby":"helpId",placeholder:"",onKeyup:x},null,544),[[d,t.value.username]]),l.value.length&&l.value!=S(u).username?(v(),m("small",J,_(l.value)+" is already taken",1)):(v(),m("small",O,[V("https://open-ink.art/"+_(t.value.username)+" ",1),Q]))]),e("div",R,[W,c(e("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=o=>t.value.bio=o),class:"form-control",name:"bio","aria-describedby":"helpId",placeholder:"Digital artist"},null,512),[[d,t.value.bio]])]),e("div",X,[Y,c(e("input",{type:"text","onUpdate:modelValue":s[3]||(s[3]=o=>t.value.location=o),class:"form-control",name:"location","aria-describedby":"helpId",placeholder:"nowhere, usa"},null,512),[[d,t.value.location]])]),c(e("input",{type:"checkbox",required:!h.value},null,8,Z),[[j,!1]]),e("div",$,[e("button",{class:"btn-primary w-100",disabled:!h.value||l.value.length},"save",8,ee)])],40,T)]))}},se=g(te,[["__scopeId","data-v-08d51070"]]);export{se as default};