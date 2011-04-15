/* !
 * file : zwork.button
 * extend : zwork.view
 * author : 赵振华
 * 	按钮对象，继承自view。
 */

(function($z,$){
	
	/**
	 * button实例化入口
	 * 参数	配置对象（json）
	 * 		父级对象（对象）
	 * 返回	窗口对象（对象）
	 * */
	var button = function(_config,_parent){
		var obj = new button.button(_config);
		if(_parent == undefined){
			pid = "root";
		}else{
			pid = _parent.uid;
		}
		$z.memory.tree.add(pid,obj);
		return obj;
	};
	
	/**
	 * button对象
	 * */
	button.button = function(_config){
		$z.extend(this,new $z.view());	//继承zwork.view
		
		//配置对象
		var config = {
			id : undefined,
			container : $("body"),	//所在的容器
			containerStyle:undefined,	//容器的样式
			label : "按钮",	//按钮显示的文字
			width : 100,	//宽度
			fitWidth : true,	//是否根据文字的宽度自适应宽度	可选值：true|false
			click : undefined,	//点击时出发的事件
			action : "button",	//按钮的类型	可选值：button|submit|reset
			position : undefined,	//位置	可选值：right|left
			active : false,	//是否是活动的
			
			original : undefined,
			type : "button"
		};
		this.config = config;
		$.extend(this.config, _config);
		
		//被父类回调
		this.initQueue.push(function(_this){
			_this.label(config.label);
			_this.fitWidth(config.fitWidth);
			_this.width(config.width);
			_this.click(config.click);
			_this.action(config.action);
			_this.position(config.position);
			_this.active(config.active);
			
		});
		
		//jQuery对象
		var jqobj ={
			obj : undefined,
			left : undefined,
			center:undefined,
			right:undefined
		};
		this.jqobj = jqobj;
		
		/**
		 * 初始化jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var initjqobj = function(){
			if(config.original == undefined){
				jqobj.obj = $($z.html.button);
			}else{
				jqobj.obj = config.original;
				jqobj.obj.html($($z.html.button).html());
			}
			jqobj.obj.addClass("zwork-button");
			
			jqobj.obj.click(function(){
				if(config.action == "button"){
					if(config.click != undefined){
						eval(config.click);
					}
				}else if(config.action == "submit"){
					jqobj.obj.parents("form").get(0).submit();
				}else if(config.action == "reset"){
					jqobj.obj.parents("form").get(0).reset();
				}
			}).mouseoverout("zwork-button_hover");
			
			jqobj.left = jqobj.obj.children(".button_left");
			jqobj.center = jqobj.obj.children(".button_center");
			jqobj.right = jqobj.obj.children(".button_right");
			return this;
		};
		this.initjqobj = initjqobj;
		
		/**
		 * 清除jQuery对象
		 * 参数	无
		 * 返回	当前对象（对象）
		 * */
		var clearjqobj = function(){
			jqobj.obj = undefined;
			jqobj.left = undefined;
			jqobj.center = undefined;
			jqobj.right = undefined;
			return this;
		};
		this.clearjqobj = clearjqobj;
		
		/**
		 * 设置或返回按钮上显示的文字
		 * 参数	无或文字（字符串）
		 * 返回	当前对象（对象）或按钮文字（字符串）
		 * */
		var label = function(_label){
			if(_label == undefined){
				return config.label;
			}else{
				config.label = _label;
				if(jqobj.obj != undefined){
					jqobj.center.html(_label);
					$z(jqobj.center,this);
					this.width(config.width);
				}
				return this;
			}
		};
		this.label = label;
		
		/**
		 * 设置宽度
		 * 参数	无
		 * 返回	无
		 * */
		var setWidth = function(_width){
			if(config.fitWidth){
				jqobj.center.width(10);
				var center_width = jqobj.center.get(0).scrollWidth;
				jqobj.center.width(center_width);
				jqobj.obj.width(center_width + jqobj.left.width() + jqobj.right.width());
			}else{
				jqobj.obj.width(_width);
				jqobj.center.width(_width - jqobj.left.width() - jqobj.right.width());
			}
		};
		this.setWidth = setWidth;
		
		/**
		 * 设置是否适应文字宽度
		 * 参数	无或是否适应（布尔值）
		 * 返回	当前对象（对象）或是否适应（布尔值）
		 * */
		var fitWidth = function(_fitWidth){
			if(_fitWidth == undefined){
				return config.fitWidth;
			}else{
				config.fitWidth = _fitWidth;
				this.width(config.width);
				return this;
			}
		};
		this.fitWidth = fitWidth;
		
		/**
		 * 设置或返回按钮点击事件
		 * 参数	无或事件（字符串）
		 * 返回	当前对象（对象）或事件（字符串）
		 * */
		var click = function(_click){
			if(_click == undefined){
				return config.click;
			}else{
				config.click = _click;
				return this;
			}
		};
		this.click = click;
		
		/**
		 * 设置或返回按钮操作类型
		 * 参数	无或操作类型（字符串）
		 * 返回	当前对象（对象）或操作类型（字符串）
		 * */
		var action = function(_action){
			if(_action == undefined){
				return config.action;
			}else{
				config.action = _action;
				return this;
			}
		};
		this.action = action;
		
		/**
		 * 设置或返回按钮位置
		 * 参数	无或位置（字符串）
		 * 返回	当前对象（对象）或按钮位置（字符串）
		 * */
		var position = function(_position){
			if(_position == undefined){
				return config.position;
			}else{
				config.position = _position;
				if(jqobj.obj != undefined){
					jqobj.obj.css("float",_position);
				}
				return this;
			}
		};
		this.position = position;
		
		/**
		 * 设置或返回按钮当前是否是活动的
		 * 参数	无或是否为活动状态（布尔值）
		 * 返回	当前对象（对象）或是否为活动状态（布尔值）
		 * */
		var active = function(_active){
			if(_active == undefined){
				return config.active;
			}else{
				config.active = _active;
				if(jqobj.obj != undefined){
					if(config.active){
						jqobj.obj.addClass("zwork-button_active");
					}else{
						jqobj.obj.removeClass("zwork-button_active");
					}
				}
				return this;
			}
		};
		this.active = active;
		
		var resizEvent = function(){
			this.width(config.width);
		};
		this.resizEvent = resizEvent;
		
	};
	
	//注册到zwork
	$z.button = button;
	
})(zwork,jQuery);