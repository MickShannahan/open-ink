import{_ as P,d as k,m as B,h as S,P as u,n as i,A as t,b as a,u as o,c as p,a as m,e as r,q as V,s as l,x as E,y as N,z as j,B as c,o as n,C as q,D as M,E as R}from"./index.5166db56.js";const z={key:0,class:"container-fluid"},D={class:"row artist-cover"},I={class:"row bg-theme"},L={key:0,class:"row"},$={__name:"ArtistPage",setup(F){M(e=>({"7a9b6bc4":o(G)}));const d=N(),s=j();k(()=>{s.params,g(),f()}),B(()=>{document.title=s.params.artist});async function g(){try{await S.getArtist(s.params.artist),document.querySelector("#app").classList.add("bg-bg")}catch(e){u.error(e,"Get Artist")}}async function f(){try{if(await i.getArtistGalleries(s.params.artist),s.params.gallery){let e=t.galleries.find(_=>_.name==s.params.gallery);i.setActive(e)}else if(t.galleries.length){let e=t.galleries[0];i.setActive(e),d.push({name:"Gallery",params:{gallery:e.name}})}}catch(e){u.error(e,"Get Galleries")}}const y=a(()=>t.artist),A=a(()=>{var e;return(e=t.artist)==null?void 0:e.theme}),h=a(()=>t.activeGallery),v=a(()=>t.projects);a(()=>t.account);const G=a(()=>A.primaryColor);return(e,_)=>{const C=c("ArtistProfile"),w=c("ArtistCover"),b=c("ArtistGalleries"),x=c("router-view");return o(y).id?(n(),p("div",z,[m("section",D,[r(w,null,{default:V(()=>[r(C)]),_:1})]),m("section",I,[r(b)]),o(h).id?(n(),p("section",L,[r(x),r(q,{id:"create-gallery"})])):l("",!0),o(v).length?(n(),E(R,{key:1})):l("",!0)])):l("",!0)}}},J=P($,[["__scopeId","data-v-8f82e32f"]]);export{J as default};