(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chatapp"],{"14c3":function(t,e,s){var n=s("c6b6"),i=s("9263");t.exports=function(t,e){var s=t.exec;if("function"===typeof s){var r=s.call(t,e);if("object"!==typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"1dde":function(t,e,s){var n=s("d039"),i=s("b622"),r=s("2d00"),a=i("species");t.exports=function(t){return r>=51||!n((function(){var e=[],s=e.constructor={};return s[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2009:function(t,e,s){},"293a":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"chat"}},[s("div",{staticClass:"chat-board"},[s("slide-bar",{attrs:{activeName:"chat"}}),s("div",{staticClass:"chat-info"},["chat"!=t.status?s("div",{staticClass:"chat-content"},[s("div",{staticClass:"chat-circle"},[s("div",{staticClass:"chat-rect"}),s("div",{staticClass:"chat-rect"}),s("div",{staticClass:"chat-rect"}),s("div",{staticClass:"time-day",on:{click:t.joinChat}},[s("span",[t._v(t._s(t.status))])])])]):t._e(),s("router-view")],1)],1)])},i=[],r=(s("96cf"),s("1da1")),a=s("bc3a"),o=s.n(a),c=s("7c08"),u={name:"Chat",components:{SlideBar:c["a"]},data:function(){return{status:"Join",connectCount:0}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null!=t.$store.state.me){e.next=5;break}return e.next=3,o.a.get(t.$root.api.UserInfo);case 3:s=e.sent,t.$store.commit("setMe",s.data.user);case 5:case"end":return e.stop()}}),e)})))()},methods:{joinChat:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,s=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(0==this.connectCount?this.status="connect...":this.status="reconnect...",!(this.connectCount<9)){t.next=9;break}return this.connectCount++,t.next=5,this.$store.dispatch("connectSocket");case 5:e=t.sent,!0===e?(this.status="chat","/chat/chatapp"!==this.$route.path&&this.$router.push({path:"/chat/chatapp"}),this.connectCount=0):setTimeout((function(){s.joinChat()}),600),t.next=11;break;case 9:this.status="failed",this.connectCount=0;case 11:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},l=u,h=(s("94dd"),s("2877")),d=Object(h["a"])(l,n,i,!1,null,null,null);e["default"]=d.exports},"3fbc":function(t,e,s){"use strict";var n=s("2009"),i=s.n(n);i.a},4788:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"chatApp"}},[s("div",{staticClass:"chat-bar"},[s("div",{staticClass:"bar-header"},[t.me?s("img",{attrs:{src:t.me.headimg,alt:""}}):t._e(),s("div",[t._v(t._s(t.username))])]),s("div",{staticClass:"bar-body"},[s("div",{class:{active:t.showChoose},on:{click:t.switchWindow}},[t._v(t._s(t.chooseName))])])]),t.islogin?s("choose-chat",{attrs:{friends:t.friends,unreadFriends:t.unreadFriends,chooseUser:t.chooseUser,showChoose:t.showChoose}}):t._e(),t.isChat?s("chat-window",{attrs:{showChoose:t.showChoose,chatUser:t.chatUser,newMsg:t.newMsg}}):t._e()],1)},i=[],r=(s("4de4"),s("c975"),s("a434"),s("ac1f"),s("5319"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:{isshow:t.showChoose},attrs:{id:"chooseUser"}},[s("div",{staticClass:"choose-title"},[t._v("Contact")]),s("div",{staticClass:"choose-group"},[s("div",{staticClass:"group-title"},[t._v("G")]),s("div",{staticClass:"group-list"},t._l(t.rooms,(function(e,n){return s("div",{key:n,staticClass:"group-item",on:{click:function(s){return t.chooseUser(e)}}},[s("div",{staticClass:"group-headimg"},[s("img",{attrs:{src:e.headimg,alt:""}}),s("div",{directives:[{name:"show",rawName:"v-show",value:-1!=t.unreadFriends.indexOf(e.id),expression:"unreadFriends.indexOf(room.id) != -1"}],staticClass:"msg-tips"})]),s("div",{staticClass:"group-name"},[t._v(t._s(e.username))])])})),0)]),s("div",{staticClass:"choose-group"},[s("div",{staticClass:"group-title"},[t._v("F")]),s("div",{staticClass:"group-list"},t._l(t.friends,(function(e,n){return s("div",{key:n,staticClass:"group-item",on:{click:function(s){return t.chooseUser(e)}}},[s("div",{staticClass:"group-headimg"},[s("img",{class:{outline:0==e.isonline},attrs:{src:e.headimg,alt:"user head image"}}),s("div",{directives:[{name:"show",rawName:"v-show",value:-1!=t.unreadFriends.indexOf(e.id),expression:"unreadFriends.indexOf(user.id) != -1"}],staticClass:"msg-tips"})]),s("div",{staticClass:"group-name"},[t._v(t._s(e.nickname?e.nickname:e.username))])])})),0)])])}),a=[],o={props:["friends","unreadFriends","chooseUser","showChoose"],data:function(){return{rooms:[{id:-1,isroom:1,isonline:1,username:"flappy",socketid:"flappy",headimg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1482435028,708850152&fm=26&gp=0.jpg"},{id:-2,isroom:1,isonline:1,username:"escape",socketid:"escape",headimg:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3357372281,722869554&fm=26&gp=0.jpg"}]}},computed:{getFriends:function(){if(null==this.$store.state.me)return[];var t=this.$store.state.me.username,e=this.users.filter((function(e,s){return item.username!=t}));return e}},mounted:function(){}},c=o,u=(s("ecf0"),s("2877")),l=Object(u["a"])(c,r,a,!1,null,null,null),h=l.exports,d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:{isshow:!t.showChoose},attrs:{id:"chatWindow"}},[s("div",{staticClass:"chat-user"},[s("img",{staticClass:"user-headimg",class:{outline:0==t.chatUser.isonline},attrs:{src:t.chatUser.headimg,alt:""}}),s("div",{staticClass:"user-name"},[t._v(t._s(t.chatUser.nickname?t.chatUser.nickname:t.chatUser.username))])]),s("div",{staticClass:"chat-w-content"},[s("div",{ref:"chatbox",staticClass:"msg-list"},t._l(t.messageList,(function(e,n){return s("div",{key:n,staticClass:"msg-item",class:{"self-msg":t.me.id==e.sender.id}},[s("div",{staticClass:"msg-content"},[t._v(t._s(e.message))])])})),0),s("div",{staticClass:"input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.inputMessage,expression:"inputMessage"}],attrs:{type:"text"},domProps:{value:t.inputMessage},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:t.sendMsg(e):null},input:function(e){e.target.composing||(t.inputMessage=e.target.value)}}}),s("div",{on:{click:t.sendMsg}},[t._v("S")])])])])},f=[],v={props:["showChoose","chatUser","newMsg","updateMsg"],data:function(){return{inputMessage:"",messageList:[]}},created:function(){this.me=this.$store.state.me,this.socket=this.$store.state.chat.socket,this.messageList=[],this.loadStorage()},mounted:function(){this.scrollBottom()},updated:function(){this.scrollBottom()},watch:{newMsg:function(t){(t.receiver.id==this.me.id||1==this.chatUser.isroom&&t.receiver.id==this.chatUser.id&&t.sender.id!=this.me.id)&&this.messageList.push(t)},chatUser:function(t){this.messageList=[],this.loadStorage()}},methods:{saveStorage:function(){var t="chatuser-"+this.me.id+"-"+this.chatUser.id;localStorage[t]=JSON.stringify(this.messageList)},loadStorage:function(){var t="chatuser-"+this.me.id+"-"+this.chatUser.id;"undefined"!==typeof localStorage[t]&&(this.messageList=JSON.parse(localStorage[t])||[])},scrollBottom:function(){var t=this.$refs.chatbox;t.scrollTop=t.scrollHeight-t.clientHeight},sendMsg:function(){var t={sender:this.me,receiver:this.chatUser,message:this.inputMessage,time:(new Date).getTime()};this.messageList.push(t),this.socket.emit("message",t),this.inputMessage="",this.saveStorage()}}},g=v,p=(s("b339"),Object(u["a"])(g,d,f,!1,null,null,null)),m=p.exports,x={components:{chooseChat:h,chatWindow:m},data:function(){return{islogin:!1,isChat:!1,friends:[],unreadFriends:[],newMsg:null,chatUser:null,chooseName:"off",showChoose:!0}},computed:{username:function(){var t=this.me;return t?t.nickname?t.nickname:t.username:""}},created:function(){this.me=this.$store.state.me,this.socket=this.$store.state.chat.socket,this.isFirst=!0},mounted:function(){if(null==this.socket)return this.changeStatus("Join"),void this.$router.replace({path:"/chat"});var t=this.socket,e=this;this.changeStatus("login..."),t.emit("login"),t.on("login",(function(t){"ok"==t.state&&e.changeStatus("friends...")})),t.on("users",(function(t){"ok"==t.state&&(e.friends=t.users.filter((function(t,s){return t.id!=e.me.id})),e.isFirst&&(e.isFirst=!1,e.changeStatus("success"),setTimeout((function(){e.changeStatus("chat"),e.islogin=!0}),500)))})),t.on("message",(function(t){e.isChat&&t.sender.id==e.chatUser.id||e.isChat&&1==t.receiver.isroom&&t.receiver.id==e.chatUser.id?e.newMsg=t:e.saveMsg(t,e.me)})),t.on("unreadMsg",(function(t){if(!("fail"==t.state||t.messages.length<1)){for(var s="chatuser-"+e.me.id+"-",n={},i=0;i<t.messages.length;i++){var r=t.messages[i],a=s+r.sender;if(-1==e.unreadFriends.indexOf(r.sender)){e.unreadFriends.push(r.sender);var o=localStorage[a]||"[]";n[a]=JSON.parse(o)}n[a].push(r)}for(var c in n)localStorage[c]=JSON.stringify(n[c])}}))},methods:{saveMsg:function(t,e){var s="chatuser-"+e.id+"-"+t.sender.id,n=localStorage[s]||"[]",i=JSON.parse(n);this.unreadFriends.push(t.sender.id),i.push(t),localStorage[s]=JSON.stringify(i)},chooseUser:function(t){this.chatUser=t,this.isChat=!0,this.switchWindow();var e=this.unreadFriends.indexOf(t.id);-1!=e&&this.unreadFriends.splice(e,1),this.socket.emit("readMsg",{sender:this.chatUser.id,receiver:this.me.id}),this.updateMsg=!0},changeStatus:function(t){this.$parent.status=t},switchWindow:function(){"on"==this.chooseName?(this.showChoose=!0,this.chooseName="off"):(this.chooseName="on",this.showChoose=!1)}},beforeRouteLeave:function(t,e,s){var n=this;this.islogin?(this.islogin=!1,this.$store.commit("discardSocket"),this.changeStatus("disconnect..."),setTimeout((function(){n.changeStatus("join"),s()}),700)):s()}},C=x,w=(s("3fbc"),Object(u["a"])(C,n,i,!1,null,"ff194eb4",null));e["default"]=w.exports},"4de4":function(t,e,s){"use strict";var n=s("23e7"),i=s("b727").filter,r=s("1dde"),a=s("ae40"),o=r("filter"),c=a("filter");n({target:"Array",proto:!0,forced:!o||!c},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},5319:function(t,e,s){"use strict";var n=s("d784"),i=s("825a"),r=s("7b0b"),a=s("50c4"),o=s("a691"),c=s("1d80"),u=s("8aa5"),l=s("14c3"),h=Math.max,d=Math.min,f=Math.floor,v=/\$([$&'`]|\d\d?|<[^>]*>)/g,g=/\$([$&'`]|\d\d?)/g,p=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,s,n){var m=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,x=n.REPLACE_KEEPS_$0,C=m?"$":"$0";return[function(s,n){var i=c(this),r=void 0==s?void 0:s[t];return void 0!==r?r.call(s,i,n):e.call(String(i),s,n)},function(t,n){if(!m&&x||"string"===typeof n&&-1===n.indexOf(C)){var r=s(e,t,this,n);if(r.done)return r.value}var c=i(t),f=String(this),v="function"===typeof n;v||(n=String(n));var g=c.global;if(g){var b=c.unicode;c.lastIndex=0}var S=[];while(1){var y=l(c,f);if(null===y)break;if(S.push(y),!g)break;var _=String(y[0]);""===_&&(c.lastIndex=u(f,a(c.lastIndex),b))}for(var E="",k=0,U=0;U<S.length;U++){y=S[U];for(var $=String(y[0]),R=h(d(o(y.index),f.length),0),M=[],A=1;A<y.length;A++)M.push(p(y[A]));var O=y.groups;if(v){var F=[$].concat(M,R,f);void 0!==O&&F.push(O);var N=String(n.apply(void 0,F))}else N=w($,f,R,M,O,n);R>=k&&(E+=f.slice(k,R)+N,k=R+$.length)}return E+f.slice(k)}];function w(t,s,n,i,a,o){var c=n+t.length,u=i.length,l=g;return void 0!==a&&(a=r(a),l=v),e.call(o,l,(function(e,r){var o;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return s.slice(0,n);case"'":return s.slice(c);case"<":o=a[r.slice(1,-1)];break;default:var l=+r;if(0===l)return e;if(l>u){var h=f(l/10);return 0===h?e:h<=u?void 0===i[h-1]?r.charAt(1):i[h-1]+r.charAt(1):e}o=i[l-1]}return void 0===o?"":o}))}}))},6547:function(t,e,s){var n=s("a691"),i=s("1d80"),r=function(t){return function(e,s){var r,a,o=String(i(e)),c=n(s),u=o.length;return c<0||c>=u?t?"":void 0:(r=o.charCodeAt(c),r<55296||r>56319||c+1===u||(a=o.charCodeAt(c+1))<56320||a>57343?t?o.charAt(c):r:t?o.slice(c,c+2):a-56320+(r-55296<<10)+65536)}};t.exports={codeAt:r(!1),charAt:r(!0)}},"65f0":function(t,e,s){var n=s("861d"),i=s("e8b5"),r=s("b622"),a=r("species");t.exports=function(t,e){var s;return i(t)&&(s=t.constructor,"function"!=typeof s||s!==Array&&!i(s.prototype)?n(s)&&(s=s[a],null===s&&(s=void 0)):s=void 0),new(void 0===s?Array:s)(0===e?0:e)}},"680c":function(t,e,s){},8418:function(t,e,s){"use strict";var n=s("c04e"),i=s("9bf2"),r=s("5c6c");t.exports=function(t,e,s){var a=n(e);a in t?i.f(t,a,r(0,s)):t[a]=s}},"8aa5":function(t,e,s){"use strict";var n=s("6547").charAt;t.exports=function(t,e,s){return e+(s?n(t,e).length:1)}},9263:function(t,e,s){"use strict";var n=s("ad6d"),i=s("9f7f"),r=RegExp.prototype.exec,a=String.prototype.replace,o=r,c=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),u=i.UNSUPPORTED_Y||i.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],h=c||l||u;h&&(o=function(t){var e,s,i,o,h=this,d=u&&h.sticky,f=n.call(h),v=h.source,g=0,p=t;return d&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),p=String(t).slice(h.lastIndex),h.lastIndex>0&&(!h.multiline||h.multiline&&"\n"!==t[h.lastIndex-1])&&(v="(?: "+v+")",p=" "+p,g++),s=new RegExp("^(?:"+v+")",f)),l&&(s=new RegExp("^"+v+"$(?!\\s)",f)),c&&(e=h.lastIndex),i=r.call(d?s:h,p),d?i?(i.input=i.input.slice(g),i[0]=i[0].slice(g),i.index=h.lastIndex,h.lastIndex+=i[0].length):h.lastIndex=0:c&&i&&(h.lastIndex=h.global?i.index+i[0].length:e),l&&i&&i.length>1&&a.call(i[0],s,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(i[o]=void 0)})),i}),t.exports=o},"94dd":function(t,e,s){"use strict";var n=s("680c"),i=s.n(n);i.a},"9f7f":function(t,e,s){"use strict";var n=s("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a434:function(t,e,s){"use strict";var n=s("23e7"),i=s("23cb"),r=s("a691"),a=s("50c4"),o=s("7b0b"),c=s("65f0"),u=s("8418"),l=s("1dde"),h=s("ae40"),d=l("splice"),f=h("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,g=Math.min,p=9007199254740991,m="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d||!f},{splice:function(t,e){var s,n,l,h,d,f,x=o(this),C=a(x.length),w=i(t,C),b=arguments.length;if(0===b?s=n=0:1===b?(s=0,n=C-w):(s=b-2,n=g(v(r(e),0),C-w)),C+s-n>p)throw TypeError(m);for(l=c(x,n),h=0;h<n;h++)d=w+h,d in x&&u(l,h,x[d]);if(l.length=n,s<n){for(h=w;h<C-n;h++)d=h+n,f=h+s,d in x?x[f]=x[d]:delete x[f];for(h=C;h>C-n+s;h--)delete x[h-1]}else if(s>n)for(h=C-n;h>w;h--)d=h+n-1,f=h+s-1,d in x?x[f]=x[d]:delete x[f];for(h=0;h<s;h++)x[h+w]=arguments[h+2];return x.length=C-n+s,l}})},ac1f:function(t,e,s){"use strict";var n=s("23e7"),i=s("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,s){"use strict";var n=s("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b339:function(t,e,s){"use strict";var n=s("e1a3"),i=s.n(n);i.a},b727:function(t,e,s){var n=s("0366"),i=s("44ad"),r=s("7b0b"),a=s("50c4"),o=s("65f0"),c=[].push,u=function(t){var e=1==t,s=2==t,u=3==t,l=4==t,h=6==t,d=5==t||h;return function(f,v,g,p){for(var m,x,C=r(f),w=i(C),b=n(v,g,3),S=a(w.length),y=0,_=p||o,E=e?_(f,S):s?_(f,0):void 0;S>y;y++)if((d||y in w)&&(m=w[y],x=b(m,y,C),t))if(e)E[y]=x;else if(x)switch(t){case 3:return!0;case 5:return m;case 6:return y;case 2:c.call(E,m)}else if(l)return!1;return h?-1:u||l?l:E}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},cbf8:function(t,e,s){},d784:function(t,e,s){"use strict";s("ac1f");var n=s("6eeb"),i=s("d039"),r=s("b622"),a=s("9263"),o=s("9112"),c=r("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),h=r("replace"),d=function(){return!!/./[h]&&""===/./[h]("a","$0")}(),f=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var s="ab".split(t);return 2!==s.length||"a"!==s[0]||"b"!==s[1]}));t.exports=function(t,e,s,h){var v=r(t),g=!i((function(){var e={};return e[v]=function(){return 7},7!=""[t](e)})),p=g&&!i((function(){var e=!1,s=/a/;return"split"===t&&(s={},s.constructor={},s.constructor[c]=function(){return s},s.flags="",s[v]=/./[v]),s.exec=function(){return e=!0,null},s[v](""),!e}));if(!g||!p||"replace"===t&&(!u||!l||d)||"split"===t&&!f){var m=/./[v],x=s(v,""[t],(function(t,e,s,n,i){return e.exec===a?g&&!i?{done:!0,value:m.call(e,s,n)}:{done:!0,value:t.call(s,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),C=x[0],w=x[1];n(String.prototype,t,C),n(RegExp.prototype,v,2==e?function(t,e){return w.call(t,this,e)}:function(t){return w.call(t,this)})}h&&o(RegExp.prototype[v],"sham",!0)}},e1a3:function(t,e,s){},e8b5:function(t,e,s){var n=s("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},ecf0:function(t,e,s){"use strict";var n=s("cbf8"),i=s.n(n);i.a}}]);