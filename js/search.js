var vm,loading;
$(function(){
    FastClick.attach(document.body);
	vm = new Vue({
	    el: "#main",
	    data:{
			keyword:'',
			list:[],
			allList:[]
	    },
	    mounted:function(){
			this.init();
	    },
	    methods:{
			init:function(){
				var _this = this;
				var url = 'http://www.xbiquge.la/xiaoshuodaquan/';
				loading = weui.loading("加载中");
				$.ajax({
					url:url,
					type:'GET',
					timeout:8000,
					success:function(data){
						
						var list = data.split(/<div class="novellist">([\s\S]*?)<div class="clear">/);
						var _list = [];
						for(key in list){
							var typeArr = list[key].match(/<h2>([\s\S]*?)<\/h2>/);
							var type = typeArr&&(typeArr.length==2)?typeArr[1]:'';
							if(type){
								var li_list = list[key].split(/<li>([\s\S]*?)<\/li>/);
								for(k in li_list){
									var arr = li_list[k].split(/<a href="([\s\S]*?)">([\s\S]*?)<\/a>/);
									if(arr&&arr.length==4){
										var o = {
											name:arr[2],
											href:arr[1]
										};
										_list.push(o)
									}
								}
							}
						}
						_this.allList = _list;
						_this.list = _list;
						_this.$nextTick(function(){
							loading.hide();
							mui('#scrollWrapper').scroll({
								indicators:false,
								deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
							}).scrollTo(0,0,0);
						})
					},
					error:function(xhr, errorType, error,msg){
						mui.alert(msg,'提示','确定',null,'div');
						loading.hide();
					}
				})
			},
			search:function(){
				var _this = this;
				
			},
			toTop:function(){
				mui('#scrollWrapper').scroll({
					indicators:false,
					deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				}).scrollTo(0,0,100);
			},
			selectItem:function(item){
				if(item&&item.func){
					item.func();
				}
			},
			toIndex:function(){
				window.location.href = 'index.html';
			},
			toSearch:function(){
				window.location.href = 'search.html';
			}
	    }
	});
});
