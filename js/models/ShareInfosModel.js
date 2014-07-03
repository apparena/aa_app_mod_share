define([
    'ModelExtend',
    'backbone',
    'underscore'
], function (Model, Backbone, _) {
    'use strict';

    return function () {
        Model.namespace = 'ShareInfosModel';

        Model.code = Backbone.Model.extend({
            defaults: {
                image:     _.c('share_image', 'src'),
                title:     _.c('general_title'),
                desc:      _.c('general_desc'),
                url:       _.aa.instance.share_url,
                short_url: ''
            }
        });

        return Model;
    };
});