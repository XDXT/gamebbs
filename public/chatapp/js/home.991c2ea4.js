(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"0309":function(e,t,a){},"414d":function(e,t,a){"use strict";var n=a("0309"),s=a.n(n);s.a},bb51:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"home"}},[a("div",{staticClass:"home-board"},[a("slide-bar",{attrs:{activeName:"home"}}),a("div",{staticClass:"home-info"},[a("div",{staticClass:"home-title"},[e._v(" "+e._s(e.username)+" - welcome back ")]),a("div",{staticClass:"home-content"},[a("div",{staticClass:"home-circle"},[a("div",{staticClass:"time-day"},[a("span",[e._v(e._s(e.date))]),a("span",[e._v(e._s(e.timeDay))])])])])])],1)])},s=[],i=(a("96cf"),a("1da1")),r=a("bc3a"),o=a.n(r),c=a("7c08"),u={name:"Home",components:{SlideBar:c["a"]},data:function(){return{timer:0,date:"无法获取时间",timeDay:""}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.updateTime(),e.timer=setInterval((function(){e.updateTime()}),6e4),null!=e.$store.state.me){t.next=7;break}return t.next=5,o.a.get(e.$root.api.UserInfo);case 5:a=t.sent,e.$store.commit("setMe",a.data.user);case 7:case"end":return t.stop()}}),t)})))()},computed:{user:function(){return null!=this.$store.state.me?this.$store.state.me:{}},username:function(){var e=this.$store.state.me;return e?e.nickname?e.nickname:e.username:""}},methods:{updateTime:function(){var e=new Date,t=e.getHours(),a=e.getMinutes();t<10&&(t="0"+t),a<10&&(a="0"+a),this.timeDay=t<12?"早上好":t<18?"下午好":"晚上好";var n=t+" : "+a;this.date=n}},beforeRouteLeave:function(e,t,a){clearInterval(this.timer),a()}},m=u,d=(a("414d"),a("2877")),l=Object(d["a"])(m,n,s,!1,null,"1e347b38",null);t["default"]=l.exports}}]);