function proxylogin(url, config) {
    var data = config.data || [];
    var paraArr=[],paraString='';
    var urlArr;
    var callbackName;
    var script,head;
    var supportLoad;
    var onEvent;
    var timeout = config.timeout || 0;
    for(var i in data){
        if(data.hasOwnProperty(i)){
            paraArr.push(encodeURIComponent(i) + "=" +encodeURIComponent(data[i]));
        }
    }
    urlArr = url.split("?");//链接中原有的参数。
    if(urlArr.length>1){
        paraArr.push(urlArr[1]);
    }

    callbackName = 'callback'+new Date().getTime();
    paraArr.push('callback='+callbackName);
    paraString = paraArr.join("&");
    url = urlArr[0] + "?"+ paraString;

    script = document.createElement("script");
    script.loaded = false;

    window[callbackName] = function(arg){
        var callback = config.callback;
        callback(arg);
        script.loaded = true;
    }

    head = document.getElementsByTagName("head")[0];
    head.insertBefore(script, head.firstChild) //chrome下第二个参数不能为null
    script.src = url;

    supportLoad = "onload" in script;
    onEvent = supportLoad ? "onload" : "onreadystatechange";

    script[onEvent] = function(){

        if(script.readyState && script.readyState !="loaded"){
            return;
        }
        if(script.readyState == 'loaded' && script.loaded == false){
            script.onerror();
            return;
        }
        //删除节点。
        (script.parentNode && script.parentNode.removeChild(script))&& (head.removeNode && head.removeNode(this));
        script = script[onEvent] = script.onerror = window[callbackName] = null;

    }

    script.onerror = function(){
        if(window[callbackName] == null){
            console.log("请求超时，请重试！");
        }
        config.error && config.error();//如果有专门的error方法的话，就调用。
        (script.parentNode && script.parentNode.removeChild(script))&& (head.removeNode && head.removeNode(this));
        script = script[onEvent] = script.onerror = window[callbackName] = null;
    }

    if(timeout!= 0){
        setTimeout(function() {
            if(script && script.loaded == false){
                window[callbackName] = null;//超时，且未加载结束，注销函数
                script.onerror();
            }
        }, timeout);
    }
}

export{
    proxylogin
};
