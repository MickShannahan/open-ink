import{_ as k,d as P,m as B,h as S,P as m,n as l,A as t,b as a,u as o,c as n,a as p,e as r,q as V,s as E,x as u,y as N,z as j,B as c,o as i,C as q,D as M,E as R}from"./index.3650cd92.js";const z={key:0,class:"container-fluid"},D={class:"row artist-cover"},I={class:"row bg-theme"},L={key:0,class:"row"},$={key:1,class:"slow-reveal d-flex align-items-center"},F={__name:"ArtistPage",setup(H){M(e=>({"73b4c302":o(G)}));const d=N(),s=j();P(()=>{s.params,g(),y()}),B(()=>{document.title=s.params.artist});async function g(){try{await S.getArtist(s.params.artist),document.querySelector("#app").classList.add("bg-bg")}catch(e){m.error(e,"Get Artist")}}async function y(){try{if(await l.getArtistGalleries(s.params.artist),s.params.gallery){let e=t.galleries.find(_=>_.name==s.params.gallery);l.setActive(e)}else if(t.galleries.length){let e=t.galleries[0];l.setActive(e),d.push({name:"Gallery",params:{gallery:e.name}})}}catch(e){m.error(e,"Get Galleries")}}const f=a(()=>t.artist),h=a(()=>{var e;return(e=t.artist)==null?void 0:e.theme}),v=a(()=>t.activeGallery),A=a(()=>t.projects);a(()=>t.account);const G=a(()=>h.primaryColor);return(e,_)=>{const w=c("ArtistProfile"),C=c("ArtistCover"),b=c("ArtistGalleries"),x=c("router-view");return o(f).id?(i(),n("div",z,[p("section",D,[r(C,null,{default:V(()=>[r(w)]),_:1})]),p("section",I,[r(b)]),o(v).id?(i(),n("section",L,[r(x),r(q,{id:"create-gallery"})])):(i(),n("section",$," nothing to see here. ")),o(A).length?(i(),E(R,{key:2})):u("",!0)])):u("",!0)}}},K=k(F,[["__scopeId","data-v-b174e10a"]]);export{K as default};
