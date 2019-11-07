export default function classnames(obj: { [className:string]:any }){
    return Object.entries(obj).map( ([k,v]) => v?k:'' ).join(' ');
   }