import $ from "jquery";

let ajaxUtil = {

    sendGet(url,params){
        return this.sendHttpRequest("GET",url,params);
    },
    sendPost(url,params){
        return this.sendHttpRequest("POST",url,params);
    },
    sendHttpRequest(requestMethod,url,params){

        let p = new Promise((resolve,reject) => {
            $.ajax({
                type:requestMethod,
                url: url,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: params,
                success: function (data) {

                    if (data.code == 101){
                        reject(data);
                    }else{
                        resolve(data);
                    }

                },
                error: function (err) {
                    reject(err);
                }
            })
        });
        return p;
    },

}

export default ajaxUtil;
