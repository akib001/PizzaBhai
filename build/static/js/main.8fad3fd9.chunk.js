(this["webpackJsonpreact-complete-guide"]=this["webpackJsonpreact-complete-guide"]||[]).push([[0],[,,,,function(e,t,n){e.exports={form:"CheckoutForm_form__3EtY_",control:"CheckoutForm_control__2IXgy",actions:"CheckoutForm_actions__3t6N_",submit:"CheckoutForm_submit__1wc7E",invalid:"CheckoutForm_invalid__5HZ22"}},,,,,,function(e,t,n){e.exports={"cart-items":"Cart_cart-items__2EDBu",total:"Cart_total__2FIh_",actions:"Cart_actions__1yR8T","button--alt":"Cart_button--alt__3LIoe",button:"Cart_button__1Kz4X"}},,,function(e,t,n){e.exports={"cart-item":"CartItem_cart-item__2pvxx",summary:"CartItem_summary__TAUXf",price:"CartItem_price__3qt9S",amount:"CartItem_amount__1jYm-",actions:"CartItem_actions__1TpFI"}},,,function(e,t,n){e.exports={button:"HeaderCartButton_button__1t7MM",icon:"HeaderCartButton_icon__2voYa",badge:"HeaderCartButton_badge__3a1fS",bump:"HeaderCartButton_bump__VWNZg"}},function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(12),c={token:localStorage.getItem("token"),isLoggedIn:!1,error:"",totalOrderedQuantity:0,totalOrderedPrice:0},r=Object(a.b)({name:"auth",initialState:c,reducers:{isUserLoggedIn:function(e){e.isLoggedIn=!!e.token},login:function(e,t){e.token=t.payload,localStorage.setItem("token",e.token)},logout:function(e){e.token="",localStorage.removeItem("token"),e.totalOrderedQuantity=0,e.totalOrderedPrice=0},setError:function(e,t){e.error=t.payload},calculateOrderSummary:function(e,t){e.totalOrderedQuantity+=t.payload.totalQuantity,e.totalOrderedPrice+=t.payload.totalPrice}}}),i=r.actions;t.b=r},,function(e,t,n){e.exports={backdrop:"Modal_backdrop__3JfYX",modal:"Modal_modal__3nmNF","slide-down":"Modal_slide-down__b2pSU"}},function(e,t,n){e.exports={meal:"MealItem_meal__i2uN3",description:"MealItem_description__3bCu0",price:"MealItem_price__1vevr"}},,,,function(e,t,n){e.exports={header:"Header_header__30Xgv","main-image":"Header_main-image__3cRvR",button:"Header_button__29R5J"}},,,function(e,t,n){"use strict";var a=n(30),c=n.n(a),r=n(0);t.a=function(e){return Object(r.jsx)("div",{className:c.a.card,children:e.children})}},,function(e,t,n){e.exports={summary:"MealsSummary_summary__381aV"}},function(e,t,n){e.exports={card:"Card_card__JxALy"}},function(e,t,n){e.exports={input:"Input_input__1WSyJ"}},function(e,t,n){e.exports={form:"MealItemForm_form__1G19N"}},function(e,t,n){e.exports={meals:"AvailableMeals_meals__39bRZ","meals-appear":"AvailableMeals_meals-appear__3U5dL"}},,,,,,,,function(e,t,n){},,,function(e,t,n){"use strict";n.r(t);var a=n(11),c=n.n(a),r=n(12),i=Object(r.b)({name:"cart",initialState:{items:[],totalQuantity:0,totalAmount:0,changed:!1},reducers:{replaceCart:function(e,t){e.totalQuantity=t.payload.totalQuantity,e.totalAmount=t.payload.totalAmount,e.items=t.payload.items},clearCart:function(e){e.items=[],e.totalQuantity=0,e.totalAmount=0},addToCart:function(e,t){var n=t.payload,a=e.items.find((function(e){return e.id===n.id}));a?(a.quantity++,a.totalPrice+=n.price,e.totalAmount+=a.price):(e.items.push({id:n.id,title:n.title,quantity:1,price:n.price,totalPrice:n.price}),e.totalAmount+=n.price),e.totalQuantity++,e.changed=!0},removeFromCart:function(e,t){var n=t.payload,a=e.items.find((function(e){return e.id===n}));e.totalQuantity--,e.totalAmount=e.totalAmount-a.price,e.changed=!0,1===a.quantity?e.items=e.items.filter((function(e){return e.id!==n})):(a.quantity--,a.totalPrice=a.totalPrice-a.price)}}}),o=i.actions,l=i,s=n(17),u=Object(r.a)({reducer:{cart:l.reducer,auth:s.b.reducer}}),d=n(5),j=n(14),b=(n(41),n(1)),m=n.n(b),h=n(9),p=n(7),O=n.n(p),f=n(3),x=n(0),v=function(){return Object(x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:Object(x.jsx)("path",{d:"M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"})})},_=n(16),C=n.n(_),y=function(e){var t=Object(d.c)((function(e){return e.cart.items})),n=Object(d.c)((function(e){return e.cart.totalQuantity})),a=Object(b.useState)(!1),c=Object(f.a)(a,2),r=c[0],i=c[1],o="".concat(C.a.button," ").concat(r?C.a.bump:"");return Object(b.useEffect)((function(){if(0!==t.length){i(!0);var e=setTimeout((function(){i(!1)}),300);return function(){clearTimeout(e)}}}),[t]),Object(x.jsxs)("button",{className:o,onClick:e.onClick,children:[Object(x.jsx)("span",{className:C.a.icon,children:Object(x.jsx)(v,{})}),Object(x.jsx)("span",{children:"Your Cart"}),Object(x.jsx)("span",{className:C.a.badge,children:n})]})},g=n.p+"static/media/meals.2971f633.jpg",k=n(24),N=n.n(k),w=n(2),S=function(e){var t=Object(d.c)((function(e){return e.auth.token})),n=Object(d.b)(),a=Object(w.g)();return Object(x.jsxs)(b.Fragment,{children:[Object(x.jsxs)("header",{className:N.a.header,children:[Object(x.jsx)("h1",{onClick:function(){a("/")},children:"ReactMeals"}),t?Object(x.jsx)("button",{onClick:function(){n(s.a.logout())},children:"Logout"}):Object(x.jsx)("button",{onClick:function(){a("/auth")},children:"Login"}),Object(x.jsx)(y,{onClick:e.onShowCart})]}),Object(x.jsx)("div",{className:N.a["main-image"],children:Object(x.jsx)("img",{src:g,alt:"A table full of delicious food!"})})]})},I=n(19),F=n.n(I),P=function(e){return Object(x.jsx)("div",{className:F.a.backdrop,onClick:e.onClose})},A=function(e){return Object(x.jsx)("div",{className:F.a.modal,children:Object(x.jsx)("div",{className:F.a.content,children:e.children})})},H=document.getElementById("overlays"),B=function(e){return Object(x.jsxs)(b.Fragment,{children:[c.a.createPortal(Object(x.jsx)(P,{onClose:e.onClose}),H),c.a.createPortal(Object(x.jsx)(A,{children:e.children}),H)]})},T=n(13),E=n.n(T),Q=function(e){var t="$".concat(e.price.toFixed(2));return Object(x.jsxs)("li",{className:E.a["cart-item"],children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("h2",{children:e.title}),Object(x.jsxs)("div",{className:E.a.summary,children:[Object(x.jsx)("span",{className:E.a.price,children:t}),Object(x.jsxs)("span",{className:E.a.quantity,children:["x ",e.quantity]})]})]}),Object(x.jsxs)("div",{className:E.a.actions,children:[Object(x.jsx)("button",{onClick:e.onRemove,children:"\u2212"}),Object(x.jsx)("button",{onClick:e.onAdd,children:"+"})]})]})},M=n(10),R=n.n(M),L=n(4),q=n.n(L),V={value:"",isTouched:!1},U=function e(t,n){return"INPUT"===n.type?{value:n.value,isTouched:t.value}:"BLUR"===n.type?{value:t.value,isTouched:!0}:"RESET"===n.type?{value:"",isTouched:!1}:e},J=function(e){var t=Object(b.useReducer)(U,V),n=Object(f.a)(t,2),a=n[0],c=n[1],r=e(a.value),i=!r&&a.isTouched;return{value:a.value,isValid:r,isInvalid:i,valueChangeHandler:function(e){c({type:"INPUT",value:e.target.value})},valueChangeBlueHandler:function(){c({type:"BLUR"})},reset:function(){c({type:"RESET"})}}},D=function(e){var t=J((function(e){return""!==e.trim()})),n=t.value,a=t.isValid,c=t.isInvalid,r=t.valueChangeHandler,i=t.valueChangeBlueHandler,o=t.reset,l=J((function(e){return e.includes("@")})),s=l.value,u=l.isValid,d=l.isInvalid,j=l.valueChangeHandler,b=l.valueChangeBlueHandler,m=l.reset,h=J((function(e){return 11===e.trim().length})),p=h.value,O=h.isValid,f=h.isInvalid,v=h.valueChangeHandler,_=h.valueChangeBlueHandler,C=h.reset,y=J((function(e){return""!==e.trim()})),g=y.value,k=y.isValid,N=y.isInvalid,w=y.valueChangeHandler,S=y.valueChangeBlueHandler,I=y.reset,F=J((function(e){return""!==e.trim()})),P=F.value,A=F.isValid,H=F.isInvalid,B=F.valueChangeHandler,T=F.valueChangeBlueHandler,E=F.reset,Q=J((function(e){return""!==e.trim()})),M=Q.value,R=Q.isValid,L=Q.isInvalid,V=Q.valueChangeHandler,U=Q.valueChangeBlueHandler,D=Q.reset,Y=!1;a&&u&&O&&k&&A&&R&&(Y=!0);var z=c?"".concat(q.a.invalid," ").concat(q.a.control):q.a.control,X=d?"".concat(q.a.invalid," ").concat(q.a.control):q.a.control,Z=f?"".concat(q.a.invalid," ").concat(q.a.control):q.a.control,$=N?"".concat(q.a.invalid," ").concat(q.a.control):q.a.control,W=H?"".concat(q.a.invalid," ").concat(q.a.control):q.a.control,G=L?"".concat(q.a.invalid," ").concat(q.a.control):q.a.control;return Object(x.jsxs)("form",{onSubmit:function(t){t.preventDefault(),Y&&(e.onConfirm({name:n,email:s,phone:p,street:g,city:P,postal:M}),o(),m(),C(),I(),E(),D())},children:[Object(x.jsxs)("div",{className:z,children:[Object(x.jsx)("label",{htmlFor:"name",children:"Your Name"}),Object(x.jsx)("input",{id:"name",onBlur:i,onChange:r,value:n,type:"text"}),c&&Object(x.jsx)("p",{children:"Please enter a valid Name!"})]}),Object(x.jsxs)("div",{className:X,children:[Object(x.jsx)("label",{htmlFor:"email",children:"Email"}),Object(x.jsx)("input",{id:"email",type:"email",onBlur:b,onChange:j,value:s}),d&&Object(x.jsx)("p",{children:"Please enter a valid email!"})]}),Object(x.jsxs)("div",{className:Z,children:[Object(x.jsx)("label",{htmlFor:"phone",children:"Phone"}),Object(x.jsx)("input",{id:"phone",type:"text",onBlur:_,onChange:v,value:p}),f&&Object(x.jsx)("p",{children:"Please enter a valid Phone Number!"})]}),Object(x.jsxs)("div",{className:$,children:[Object(x.jsx)("label",{htmlFor:"street",children:"Street"}),Object(x.jsx)("input",{id:"street",type:"text",onBlur:S,onChange:w,value:g}),N&&Object(x.jsx)("p",{children:"Please enter a valid street!"})]}),Object(x.jsxs)("div",{className:W,children:[Object(x.jsx)("label",{htmlFor:"city",children:"City"}),Object(x.jsx)("input",{id:"city",type:"text",onBlur:T,onChange:B,value:P}),H&&Object(x.jsx)("p",{children:"Please enter a valid city!"})]}),Object(x.jsxs)("div",{className:G,children:[Object(x.jsx)("label",{htmlFor:"postal",children:"Postal"}),Object(x.jsx)("input",{id:"postal",type:"text",onBlur:U,onChange:V,value:M}),L&&Object(x.jsx)("p",{children:"Please enter a valid postal!"})]}),Object(x.jsxs)("div",{className:q.a.actions,children:[Object(x.jsx)("button",{type:"button",onClick:e.onCancel,children:"Cancel"}),Object(x.jsx)("button",{className:q.a.submit,children:"Confirm"})]})]})},Y=function(e){var t=Object(d.b)(),n=Object(d.c)((function(e){return e.cart.totalAmount})),a=Object(d.c)((function(e){return e.cart.totalQuantity})),c=Object(d.c)((function(e){return e.cart.items})),r=Object(b.useState)(!1),i=Object(f.a)(r,2),l=i[0],s=i[1],u=Object(b.useState)(!1),j=Object(f.a)(u,2),p=j[0],v=j[1],_=Object(b.useState)(!1),C=Object(f.a)(_,2),y=C[0],g=C[1],k="$".concat(n.toFixed(2)),N=c.length>0,w=function(e){t(o.removeFromCart(e))},S=function(e){t(o.addToCart(e))},I=function(){var e=Object(h.a)(O.a.mark((function e(r){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.next=3,fetch("https://react-http-597d3-default-rtdb.firebaseio.com/orders.json",{method:"POST",body:JSON.stringify({userData:r,orderData:c,totalOrderedPrice:n,totalOrderedQuantity:a})});case 3:v(!1),g(!0),t(o.clearCart());case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=Object(x.jsx)("ul",{className:R.a["cart-items"],children:c.map((function(e){return Object(x.jsx)(Q,{title:e.title,quantity:e.quantity,price:e.price,totalPrice:e.totalPrice,onRemove:w.bind(null,e.id),onAdd:S.bind(null,e)},e.id)}))}),P=Object(x.jsxs)("div",{className:R.a.actions,children:[Object(x.jsx)("button",{className:R.a["button--alt"],onClick:e.onClose,children:"Close"}),N&&Object(x.jsx)("button",{className:R.a.button,onClick:function(){s(!0)},children:"Order"})]}),A=Object(x.jsxs)(m.a.Fragment,{children:[F,Object(x.jsxs)("div",{className:R.a.total,children:[Object(x.jsx)("span",{children:"Total Amount"}),Object(x.jsx)("span",{children:k})]}),l&&Object(x.jsx)(D,{onConfirm:I,onCancel:e.onClose}),!l&&P]}),H=Object(x.jsx)("p",{children:"Order Sending..."}),T=Object(x.jsxs)(m.a.Fragment,{children:[Object(x.jsx)("p",{children:"Order Complete!"}),Object(x.jsx)("div",{className:R.a.actions,children:Object(x.jsx)("button",{className:R.a.button,onClick:e.onClose,children:"Close"})})]});return Object(x.jsxs)(B,{onClose:e.onClose,children:[!p&&!y&&A,p&&H,y&&!p&&T]})},z=function(e){var t=Object(b.useState)(!1),n=Object(f.a)(t,2),a=n[0],c=n[1];return Object(x.jsxs)(m.a.Fragment,{children:[a&&Object(x.jsx)(Y,{onClose:function(){c(!1)}}),Object(x.jsx)(S,{onShowCart:function(){c(!0)}}),Object(x.jsx)("main",{children:e.children})]})},X=n(29),Z=n.n(X),$=function(){return Object(x.jsxs)("section",{className:Z.a.summary,children:[Object(x.jsx)("h2",{children:"Delicious Food, Delivered To You"}),Object(x.jsx)("p",{children:"Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home."}),Object(x.jsx)("p",{children:"All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!"})]})},W=n(27),G=n(15),K=n(31),ee=n.n(K),te=m.a.forwardRef((function(e,t){return Object(x.jsxs)("div",{className:ee.a.input,children:[Object(x.jsx)("label",{htmlFor:e.input.id,children:e.label}),Object(x.jsx)("input",Object(G.a)({ref:t},e.input))]})})),ne=n(32),ae=n.n(ne),ce=function(e){var t=Object(b.useState)(!0),n=Object(f.a)(t,2),a=n[0],c=n[1],r=Object(b.useRef)();return Object(x.jsxs)("form",{className:ae.a.form,onSubmit:function(t){t.preventDefault();var n=r.current.value,a=+n;0===n.trim().length||a<1||a>5?c(!1):e.onAddToCart(a)},children:[Object(x.jsx)(te,{ref:r,label:"Amount",input:{id:"amount_"+e.id,type:"number",min:"1",max:"5",step:"1",defaultValue:"1"}}),Object(x.jsx)("button",{children:"+ Add"}),!a&&Object(x.jsx)("p",{children:"Please enter a valid amount (1-5)."})]})},re=n(20),ie=n.n(re),oe=function(e){var t=Object(d.b)(),n="$".concat(e.price.toFixed(2));return Object(x.jsxs)("li",{className:ie.a.meal,children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("h3",{children:e.title}),Object(x.jsx)("div",{className:ie.a.description,children:e.description}),Object(x.jsx)("div",{className:ie.a.price,children:n})]}),Object(x.jsx)("div",{children:Object(x.jsx)(ce,{id:e.id,onAddToCart:function(n){t(o.addToCart({id:e.id,title:e.title,quantity:n,price:e.price,totalPrice:e.price}))}})})]})},le=n(33),se=n.n(le),ue=function(){var e=Object(b.useState)([]),t=Object(f.a)(e,2),n=t[0],a=t[1],c=Object(b.useState)(null),r=Object(f.a)(c,2),i=r[0],o=r[1],l=Object(b.useState)(!1),s=Object(f.a)(l,2),u=s[0],d=s[1];Object(b.useEffect)((function(){function e(){return(e=Object(h.a)(O.a.mark((function e(){var t,n,c,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(null),d(!0),e.prev=2,e.next=5,fetch("https://react-http-597d3-default-rtdb.firebaseio.com/meals.json");case 5:if((t=e.sent).ok){e.next=8;break}throw new Error("Something went wrong");case 8:return e.next=10,t.json();case 10:for(r in n=e.sent,c=[],n)c.push({id:r,title:n[r].title,description:n[r].description,price:n[r].price});a(c),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(2),o(e.t0.message);case 19:d(!1);case 20:case"end":return e.stop()}}),e,null,[[2,16]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var j=n.map((function(e){return Object(x.jsx)(oe,{id:e.id,title:e.title,description:e.description,price:e.price},e.id)})),m=Object(x.jsx)("p",{children:"Found no meals."});return j.length>0&&(m=j),i&&(m=Object(x.jsx)("p",{children:i})),u&&(m=Object(x.jsx)("p",{children:"Loading..."})),Object(x.jsx)("section",{className:se.a.meals,children:Object(x.jsx)(W.a,{children:Object(x.jsx)("ul",{children:m})})})},de=function(){return Object(x.jsxs)(b.Fragment,{children:[Object(x.jsx)($,{}),Object(x.jsx)(ue,{})]})},je=function(){return Object(x.jsx)(de,{})},be=m.a.lazy((function(){return Promise.all([n.e(3),n.e(5)]).then(n.bind(null,68))})),me=m.a.lazy((function(){return n.e(4).then(n.bind(null,67))})),he=!0;var pe=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.cart})),n=Object(d.c)((function(e){return e.auth.token}));return Object(b.useEffect)((function(){e(function(){var e=Object(h.a)(O.a.mark((function e(t){var n,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=Object(h.a)(O.a.mark((function e(){var t,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://react-http-597d3-default-rtdb.firebaseio.com/cart.json");case 2:if((t=e.sent).ok){e.next=5;break}throw new Error("Could not fetch cart data!");case 5:return e.next=7,t.json();case 7:return n=e.sent,e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.prev=1,e.next=4,n();case 4:a=e.sent,t(o.replaceCart({items:a.items||[],totalQuantity:a.totalQuantity,totalAmount:a.totalAmount})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())}),[e]),Object(b.useEffect)((function(){he?he=!1:t.changed&&e(function(e){return function(){var t=Object(h.a)(O.a.mark((function t(n){var a;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=function(){var t=Object(h.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://react-http-597d3-default-rtdb.firebaseio.com/cart.json",{method:"PUT",body:JSON.stringify({items:e.items,totalQuantity:e.totalQuantity,totalAmount:e.totalAmount})});case 2:if(t.sent.ok){t.next=5;break}throw new Error("Cart Sending Error!");case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),t.prev=1,t.next=4,a();case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.log(t.t0.message);case 9:case"end":return t.stop()}}),t,null,[[1,6]])})));return function(e){return t.apply(this,arguments)}}()}(t))}),[t,e]),Object(x.jsx)(z,{children:Object(x.jsx)(b.Suspense,{fallback:Object(x.jsx)("p",{children:"Loading.."}),children:Object(x.jsxs)(w.d,{children:[Object(x.jsx)(w.b,{path:"/",element:Object(x.jsx)(je,{})}),Object(x.jsx)(w.b,{path:"/auth",element:Object(x.jsx)(be,{})}),Object(x.jsx)(w.b,{path:"/admin",element:n?Object(x.jsx)(me,{}):Object(x.jsx)(w.a,{to:"/auth"})})]})})})};c.a.render(Object(x.jsx)(d.a,{store:u,children:Object(x.jsx)(j.a,{children:Object(x.jsx)(pe,{})})}),document.getElementById("root"))}],[[44,1,2]]]);
//# sourceMappingURL=main.8fad3fd9.chunk.js.map