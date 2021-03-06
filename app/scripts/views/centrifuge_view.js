/*
S2 - An open source lab information management systems (LIMS)
Copyright (C) 2013  Wellcome Trust Sanger Insitute

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 1, or (at your option)
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston MA  02110-1301 USA
*/
define(['text!labware/../images/centrifuge.svg'], function (centrifugeSvg) {
    'use strict';

    var centrifugeView = function (owner, jquerySelection) {
        this.owner = owner;
        this.container = jquerySelection;
        this.tubesList = {};

        return this;
    };


    /* Draws the centrifuge in the given container space
     *
     *
     * Arguments
     * ---------
     * data:    The spin column data object
     *
     *
     * Returns
     * -------
     * The spin column uuid
     */
    centrifugeView.prototype.renderView = function () {

        this.release();

        // Parse the SVG xml data for the spin column image
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(centrifugeSvg, "image/svg+xml");

        // Store the xml data in an object
        var importedNode = document.importNode(xmlDoc.documentElement, true);

        // Append the svn image data the chosen section placeholder     
        this.container().append(importedNode);

        // Initialise the centrifuge as Empty
        this.setTubes([]);

        return this;
    };

    /* Removes the image from the assigned view container
     *
     *
     * Arguments
     * ---------
     * 
     * 
     * Returns
     * -------
     * this
     */
    centrifugeView.prototype.release = function () {

        this.container().empty();
    };

    /* Sets which tubes are displayed on the centrifuge
     *
     *
     * Arguments
     * ---------
     * tubes:    The array of tube elements to display
     * 
     * 
     * Returns
     * -------
     * void
     */
    centrifugeView.prototype.setTubes = function (tubes) {
        var x;

        for (x = 1; x <= 12; x++) {
            var displaySwitch = "none";

            if (tubes.indexOf(x) > -1) {
                displaySwitch = "block";
            }

            // Selects the svg element and changes the display property of the current tube
            this.container().find("svg .tube" + x).css("display", displaySwitch);
        }

    };

    /* Initialises any select box associated with the centrifuge
     *
     *
     * Arguments
     * ---------
     * listContainer:    The selected jQuery element
     * 
     * 
     * Returns
     * -------
     * this
     */
    centrifugeView.prototype.initTubesList = function (listContainer) {
        this.tubesList = listContainer;
        var options = {};

        // Options aren't entirely consecutive so need to define individually
        var newOptions = {
            '0': '0',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '12': '12'
        };

        // First selection
        var selectedOption = '0';

        // Compatibility with multiple browsers
        if (listContainer.prop) {
            options = listContainer.prop('options');
        } else {
            options = listContainer.attr('options');
        }

        // Clear options
        $('option', listContainer).remove();

        // Apply new options
        $.each(newOptions, function (val, text) {
            options[options.length] = new Option(text, val);
        });

        listContainer.val(selectedOption);

        // Hook the select object to the presenter object
        // NOTE: Presenter defines the contrifugePresenter object in the window on construction
        listContainer.change(function () {
            window.centrifugePresenter.displayTubes($(this).val());
        });

        return this;
    };

    return centrifugeView;

});