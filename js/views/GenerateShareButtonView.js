define([
    'ViewExtend',
    'jquery',
    'underscore',
    'backbone',
    'text!modules/aa_app_mod_share/templates/buttons/share.html',
    'text!modules/aa_app_mod_share/templates/share_bubble.html',
    'modules/aa_app_mod_share/js/models/ShareInfosModel'
], function (View, $, _, Backbone, ShareButtonTemplate, ShareBubbleTemplate, ShareInfoModel) {
    'use strict';

    return function () {
        View.namespace = 'share';

        View.code = Backbone.View.extend({
            placement: 'top',

            btn_name: _.t('share'),

            template: ShareButtonTemplate,

            extension: ShareBubbleTemplate,

            section: 'button',

            events: {
                'click .share-btn': 'showOptions',
                'click .fbshare':   'fbShare',
                'click .twshare':   'twShare',
                'click .gpshare':   'gpShare'
            },

            initialize: function () {
                _.bindAll(this, 'render', 'getButton', 'showOptions', 'fbShare', 'gpShare', 'twShare', 'shrinkUrl');

                this.shareInfos = ShareInfoModel().init({init: true});
                this.listenTo(this.shareInfos, 'change:url', this.shrinkUrl);
                this.shrinkUrl();

                this.networks = _.c('share_social_networks').split(',');

                return this;
            },

            render: function (options, callback) {
                var that = this;
                options = options || false;
                callback = callback || false;

                if (options !== false) {
                    if (_.isUndefined(options.btn_name) === false) {
                        this.btn_name = options.btn_name;
                    }
                    if (_.isUndefined(options.name) === false) {
                        this.btn_name = options.name;
                    }
                    if (!_.isUndefined(options.placement) === false) {
                        this.placement = options.placement;
                    }
                    if (_.isUndefined(options.placement) === false) {
                        this.placement = options.placement;
                    }
                    if (_.isUndefined(options.section) === false) {
                        if (options.section === 'navigation') {
                            this.section = 'navigation';
                            require([
                                'text!modules/aa_app_mod_share/templates/buttons/navi.html',
                                'text!modules/aa_app_mod_share/templates/share_navigation.html'
                            ], function (ShareNaviButtonTemplate, ShareNavigationTemplate) {
                                that.template = ShareNaviButtonTemplate;
                                that.extension = ShareNavigationTemplate;
                                that.renderData(callback);
                            });
                            return this;
                        }
                    }
                }
                this.renderData(callback);
                return this;
            },

            /**
             * generate a bit.ly short url to shrink share url
             */
            shrinkUrl: function () {
                var that = this;

                this.ajax({
                    module:   'aa_app_mod_share',
                    action:   'getShorturl',
                    obj_data: {
                        url: this.shareInfos.get('url')
                    }
                }, false, function (resp) {
                    that.shareInfos.set('short_url', resp.data.message);
                    //_.debug.log(that.shareInfos.get('url'));
                    //_.debug.log(that.shareInfos.get('short_url'));
                });
            },

            renderData: function (callback) {
                var data = {
                    name:           this.btn_name,
                    placement:      this.placement,
                    network_amount: this.networks.length,
                    content:        _.template(this.extension, {})
                };

                this.compiledtemplate = _.template(this.template, data);
                this.setElement(this.compiledtemplate);

                // add popover event to button
                if (this.networks.length > 1 && this.section === 'button') {
                    this.setElement('<div></div>');
                    this.$el.append(this.compiledtemplate);
                    this.$el.find('.share-btn').popover();
                }

                if (typeof callback === 'function') {
                    callback();
                }
            },

            getButton: function (name) {
                var that = this;
                if (typeof name !== 'undefined') {
                    this.render({name: name});
                }
                if (this.networks.length > 0) {
                    this.$el.on('click', function (elem) {
                        that.showOptions(elem);
                    });
                    return this.el;
                } else {
                    return '';
                }
            },

            showOptions: function (elem) {
                if (this.networks.length === 1) {
                    if (_.indexOf(this.networks, 'fb') !== -1) {
                        this.fbShare();
                    }
                    if (_.indexOf(this.networks, 'twitter') !== -1) {
                        this.twShare(elem);
                    }
                    if (_.indexOf(this.networks, 'gplus') !== -1) {
                        this.gpShare(elem);
                    }
                }
            },

            fbShare: function () {
                var that = this;
                require([
                    'modules/aa_app_mod_facebook/js/views/FacebookView'
                ], function (Facebook) {
                    that.log('action', 'share_fb_btn', {
                        auth_uid:      _.uid,
                        auth_uid_temp: _.uid_temp,
                        code:          4001,
                        data_obj:      {
                            admin: {
                                share_fb_btn: ''
                            }
                        }
                    });
                    var facebook = Facebook().init({init: true});
                    facebook.model_share.set({
                        link:        that.shareInfos.get('url'),
                        picture:     that.shareInfos.get('image'),
                        name:        that.shareInfos.get('title'), // title
                        caption:     '',                           // subtitle
                        description: that.shareInfos.get('desc')   // message
                    });
                    facebook.libInit().share();
                });
            },

            gpShare: function (elem) {
                var that = this;
                require([
                    'modules/aa_app_mod_google/js/views/GoogleView'
                ], function (Google) {
                    that.log('action', 'share_gp_btn', {
                        auth_uid:      _.uid,
                        auth_uid_temp: _.uid_temp,
                        code:          4003,
                        data_obj:      {
                            admin: {
                                share_gp_btn: ''
                            }
                        }
                    });
                    Google().init({init: true}).share($(elem.currentTarget), that.shareInfos.attributes);
                });
            },

            twShare: function (elem) {
                var that = this;
                require([
                    'modules/aa_app_mod_twitter/js/views/TwitterView'
                ], function (Twitter) {
                    that.log('action', 'share_tw_btn', {
                        auth_uid:      _.uid,
                        auth_uid_temp: _.uid_temp,
                        code:          4004,
                        data_obj:      {
                            admin: {
                                share_tw_btn: ''
                            }
                        }
                    });
                    Twitter().init({init: true}).share($(elem.currentTarget), that.shareInfos.attributes);
                });
            }
        });

        return View;
    };
});