'use strict';

var drawerToggle = document.querySelector('.mdl-appbar__drawer-toggle');
var drawer = new MaterialDrawer(document.querySelector('.mdl-drawer'));
var menu = new MaterialMenu(document.querySelector('.appbar-overflow-menu'));
var menuToggle = document.querySelector('#overflow');

menuToggle.addEventListener('click', function(event) {
  menu.toggle(event);
});

drawerToggle.addEventListener('click', function() {
  drawer.toggle();
});

document.querySelector('.mdl-drawer__backdrop').addEventListener('click', function() {
  drawer.toggle();
});

var appbar = document.querySelector('.mdl-appbar');
var drawerElement = document.querySelector('.mdl-drawer');
var clippedToggleButton = document.querySelector('#clipped-toggle');
var fixedAppbarToggle = document.querySelector('#fixed-appbar-toggle');
var fixedDrawerToggle = document.querySelector('#fixed-drawer-toggle');

clippedToggleButton.addEventListener('click', function() {
  drawerElement.classList.toggle('mdl-drawer_clipped');
  appbar.classList.toggle('mdl-appbar_clipped-drawer');
});

fixedAppbarToggle.addEventListener('click', function() {
  appbar.classList.toggle('mdl-appbar_fixed');
});

fixedDrawerToggle.addEventListener('click', function() {
  appbar.classList.toggle('mdl-appbar_non-fixed-drawer');
  drawerElement.classList.toggle('mdl-drawer_non-fixed');
});
