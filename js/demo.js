define([
    'jquery',
    'underscore',
    'modules/aa_app_mod_share/js/views/GenerateShareButtonView'
], function ($, _, GenerateShareButtonView) {
    'use strict';

    return function () {
        var shareBtnNavi = GenerateShareButtonView().init({id: '1'}),
            shareBtnContent = GenerateShareButtonView().init({id: '2'});

        // remove old buttons
        shareBtnNavi.remove();
        shareBtnContent.remove();

        // generate a new button in the navigation
        shareBtnNavi.render({section: 'navigation'}, function () {
            $('.navbar-right').prepend(shareBtnNavi.getButton());
        });
        // generate a new button in the content area, with name changed to 'Share Button' and a top bubble placement
        shareBtnContent.render({section: 'button', name: 'Share Button', placement: 'top'}, function () {
            $('.content-wrapper').html(shareBtnContent.getButton());
        });
    };
});