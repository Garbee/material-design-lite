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
var fixedAppbarToggle = document.querySelector('#fixed-appbar-toggle');
var fixedDrawerToggle = document.querySelector('#fixed-drawer-toggle');

fixedAppbarToggle.addEventListener('click', function() {
  appbar.classList.toggle('mdl-appbar_fixed');
});

fixedDrawerToggle.addEventListener('click', function() {
  appbar.classList.toggle('mdl-appbar_temporary-drawer');
  drawerElement.classList.toggle('mdl-drawer_temporary');
});
