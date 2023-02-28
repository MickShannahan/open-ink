import{_ as q,r as m,b as C,A as P,w as B,c,a as e,d as M,t as d,e as D,f as _,g as b,h as i,v,u as f,i as x,j as g,k as L,o as n,U as j,p as E,l as T,m as K,n as R,P as k,q as U,s as $,x as z}from"./index.b6f909f4.js";const l=p=>(E("data-v-7f9b7961"),p=p(),T(),p),F={class:"container-fluid height-screen pt-5 align-items-center themeless"},G={class:"row justify-content-around px-5"},H=["onSubmit"],J={class:"row justify-content-center"},O={id:"helpId",class:"form-text text-muted"},Q={class:"my-3 col-8 text-center picture-wrapper rounded"},W=["src"],X={key:0,class:"my-1"},Y={key:1,class:"my-1"},Z={key:0},ee={key:1},te=l(()=>e("i",{class:"mdi mdi-map-marker"},null,-1)),ae={class:"mb-3"},se=l(()=>e("label",{for:"",class:"form-label"},"Name",-1)),oe={class:"mb-3"},le=l(()=>e("label",{for:"",class:"form-label"},"Username",-1)),ne={key:0,class:"form-text text-danger"},ie={key:1,id:"helpId",class:"form-text text-muted"},ce=l(()=>e("i",{class:"mdi mdi-check text-success darken-10"},null,-1)),de={class:"mb-3"},re=l(()=>e("label",{for:"displayName"},"display on profile",-1)),ue={class:"d-flex"},me={class:"form-check me-5"},pe=l(()=>e("small",null,"name",-1)),_e={class:"form-check"},ve=l(()=>e("small",null,"username",-1)),he={class:"mb-3"},fe=l(()=>e("label",{for:"",class:"form-label"},"bio",-1)),be={class:"mb-3"},ye=l(()=>e("label",{for:"",class:"form-label"},"location",-1)),xe=["required"],ge={class:"col-12"},ke=["disabled"],Ue=b("save "),we=l(()=>e("i",{class:"mdi mdi-account"},null,-1)),Ne=[Ue,we],Ie={class:"col-12 col-md-7 px-0 px-md-4 mt-3 mt-md-0"},Se={class:"text-dark bg-light rounded elevation-3 p-3 mb-3"},Ve={class:"text-dark bg-light rounded elevation-3 p-3"},Ae={__name:"AccountPage",setup(p){const t=m({}),u=C(()=>P.account),h=m(null);m(!1);const y=m(!0),r=m("");B(()=>{t.value={...u.value}});function w(o,a="picture"){t.value[a]=o.url,h.value=o.file}async function N(){try{let o=await L.checkUsername(t.value.username);r.value=o.username}catch{r.value=""}}async function I(){try{if(h.value){let o=await K.upload(h.value,u.value.id,"profile-picture");t.value.picture=o.smallUrl+`?picture=${Math.floor(Math.random()*100)}`}await R.update(t.value),k.toast("Profile Updated","success","top")}catch(o){k.error(o)}}return(o,a)=>{const S=U("AccountLimitsCard"),V=U("InvitesComponent"),A=$("tooltip");return n(),c("div",F,[e("section",G,[e("form",{class:"col-12 col-md-5 text-dark bg-light rounded elevation-3 p-3",onSubmit:M(I,["prevent"])},[e("div",J,[e("small",O,d(t.value.email),1),e("div",Q,[e("img",{class:"account-picture elevation-3",src:t.value.picture,alt:""},null,8,W),D(j,{id:"picture",onUploading:w,options:{required:!1},class:"upload-account on-hover"}),t.value.displayName=="username"?(n(),c("h5",X,[e("b",null,d(t.value.username),1)])):(n(),c("h5",Y,[e("b",null,d(t.value.name),1)])),e("div",null,[t.value.bio?(n(),c("small",Z,d(t.value.bio)+"\u205F\u200A",1)):_("",!0),t.value.location?(n(),c("small",ee,[te,b(d(t.value.location),1)])):_("",!0)])]),e("div",ae,[se,i(e("input",{type:"text",required:"","onUpdate:modelValue":a[0]||(a[0]=s=>t.value.name=s),class:"form-control",name:"name","aria-describedby":"helpId",placeholder:"",minlength:"3",maxlength:"25"},null,512),[[v,t.value.name]])]),e("div",oe,[le,i(e("input",{type:"text",required:"",minLength:"3",maxLength:"15","onUpdate:modelValue":a[1]||(a[1]=s=>t.value.username=s),class:"form-control",name:"username","aria-describedby":"helpId",placeholder:"",onKeyup:N},null,544),[[v,t.value.username]]),r.value.length&&r.value!=f(u).username?(n(),c("small",ne,d(r.value)+" is already taken",1)):i((n(),c("small",ie,[b("https://open-ink.art/"+d(t.value.username)+" ",1),ce])),[[A,"this username is available"]])]),e("div",de,[re,e("div",ue,[e("div",me,[pe,i(e("input",{type:"radio",class:"form-check-input",name:"displayName","onUpdate:modelValue":a[2]||(a[2]=s=>t.value.displayName=s),value:"name"},null,512),[[x,t.value.displayName]])]),e("div",_e,[ve,i(e("input",{type:"radio",class:"form-check-input",name:"displayName","onUpdate:modelValue":a[3]||(a[3]=s=>t.value.displayName=s),value:"username"},null,512),[[x,t.value.displayName]])])])]),e("div",he,[fe,i(e("input",{type:"text","onUpdate:modelValue":a[4]||(a[4]=s=>t.value.bio=s),class:"form-control",name:"bio","aria-describedby":"helpId",placeholder:"Digital artist",minlength:"0",maxlength:"30"},null,512),[[v,t.value.bio]])]),e("div",be,[ye,i(e("input",{type:"text","onUpdate:modelValue":a[5]||(a[5]=s=>t.value.location=s),class:"form-control",name:"location","aria-describedby":"helpId",placeholder:"nowhere, usa",minlength:"0",maxlength:"25"},null,512),[[v,t.value.location]])]),i(e("input",{type:"checkbox",required:!y.value},null,8,xe),[[z,!1]]),e("div",ge,[e("button",{class:"btn-theme text-info w-100",disabled:!y.value||r.value.length},Ne,8,ke)])])],40,H),e("div",Ie,[e("div",Se,[f(u).id?(n(),g(S,{key:0})):_("",!0)]),e("div",Ve,[f(u).id?(n(),g(V,{key:0})):_("",!0)])])])])}}},Ce=q(Ae,[["__scopeId","data-v-7f9b7961"]]);export{Ce as default};