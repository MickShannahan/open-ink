import{_ as p,b as c,A as s,r as m,m as d,F as y,c as n,e as l,u as g,C as v,x as P,G as h,o as i,H as w,z as j,I as G,J as C,B as x,n as _,P as k}from"./index.3650cd92.js";const A={key:0,class:"guard"},B={__name:"GalleryPage",setup(S){const r=j(),t=c(()=>s.activeGallery);c(()=>s.projects);const a=m(!1);async function u(){try{let e=s.galleries.find(o=>o.name==r.params.gallery);_.setActive(e),await _.getGalleryProjects(r.params.artist,e.id)}catch(e){k.error(e)}}return d(()=>{G.log("gallery watch"),r.params.gallery&&u()}),y(t,async()=>{t.value.nsfw&&(a.value=!0,!await C.confirmToken())||(a.value=!1)}),(e,o)=>{const f=x("ProjectsThread");return i(),n("div",{class:h(["component p-0 my-2",{nsfw:a.value}])},[l(f),l(w,{id:"create-project"}),l(v,{id:"edit-gallery",galleryData:g(t)},null,8,["galleryData"]),a.value?(i(),n("div",A)):P("",!0)],2)}}},z=p(B,[["__scopeId","data-v-012fa687"]]);export{z as default};
