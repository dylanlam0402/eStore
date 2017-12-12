import Config from '../config/webconfig';
import AuthenCookie from '../services/AuthenCookie'


import * as ErrorType  from '../types/ErrorTypes';


var _ = require('lodash');
var $ = require('jquery');

export default class  {

    constructor()
    {
        this.config = new Config();
        
    }

    get(path)
    {
        return this.ajax(path, {
            type: 'GET',
        });
    }

    post(path, data)
    {
        return this.ajax(path, {
            type: 'POST',
            data: JSON.stringify(data)
        });
    }

    buildHeader(options)
    {
        var header = {
        
        };
        
        var token = new AuthenCookie().getAuthInfoFromCache();
        if( token != "" && token !== undefined && token !== "undefined"){
            header = { 'Authorization' : "Bearer " +token};
        }
        return header;
    }
    
    resolveUrl(path)
    {
        return this.config.WebApiUrl + path;
    }

    ajax(path, options) {
        var final = _.merge({
          url: this.resolveUrl(path),
          headers : this.buildHeader(options),
          Accept : "json",
          contentType: "application/json; charset=utf-8",
          dataType: "json", crossDomain: true,
          error: function (jqXHR) {
            switch (jqXHR.status) {
                case 404:
                    jqXHR.message = "Page not found.";
                    jqXHR.type = ErrorType.PAGE_NOT_FOUND;
                  break;
                case 500:
                    jqXHR.type = ErrorType.SERVER_ERROR;
                  break;
                case 401:
                    jqXHR.message = "Require login";
                    jqXHR.type = ErrorType.UNAUTHENTICATION;
                  break;
                case 403:
                    jqXHR.message = "Unauthorized access";
                    jqXHR.type = ErrorType.UNAUTHORIZED;
                  break;
                case 0:
                    jqXHR.message = "Can not connect to API.";
                    jqXHR.type = ErrorType.UNCONNECTED;
                  break;
            }
          },
        }, options);
     
        
        return Promise.resolve($.ajax(final)).catch(ex => { 
            return {
                data: null,
                errors: [ { key: ex.responseJSON.code, type: ex.responseJSON.message, message: ex.responseJSON.details }],
                isSuccess: false
            }
        });
    }
}
