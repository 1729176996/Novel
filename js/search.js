var vm,loading;
$(function(){
    FastClick.attach(document.body);
	vm = new Vue({
	    el: "#main",
	    data:{
			keyword:'',
			list:[]
	    },
	    mounted:function(){
			this.init();
	    },
	    methods:{
			init:function(){
				var _this = this;
				_this.list = [];
				_this.$nextTick(function(){
					loading.hide();
					mui('#scrollWrapper').scroll({
						indicators:false,
						deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
					}).scrollTo(0,0,0);
				})
			},
			search:function(){
				var _this = this;
				var url = 'https://qxs.la/s_'+_this.keyword+'/1/';
				loading = weui.loading("加载中");
				$.ajax({
					url:url,
					type:'GET',
					dataType:'json',
					timeout:8000,
					success:function(data){
						console.log(data);
						/*if(data){
							if(data.code == "10000"){
								if(data.result){
									if(data.result.result&&data.result.result&&data.result.result.list&&data.result.result.list.length>0){
										_this.list = data.result.result.list;
									}
								}else{
									mui.alert('查询错误','提示','确定',null,'div');
								}
							}else{
								mui.alert(data.msg,'提示','确定',null,'div');
							}
						}else{
							mui.alert('查询错误','提示','确定',null,'div');
						}*/
						_this.$nextTick(function(){
							mui('#scrollWrapper').scroll({
								indicators:false,
								deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
							}).scrollTo(0,0,0);
							
							if(loading){
								loading.hide();
							}
						})
					},
					error:function(xhr, errorType, error,msg){
						if(loading){
							loading.hide();
						}
						mui.alert(msg,'提示','确定',null,'div');
					}
				})
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
