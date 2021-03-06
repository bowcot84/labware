require.config({
  shim: {
  },

  baseUrl: '.',
  paths: {
    d3: 'components/d3',
    domReady: 'components/requirejs-domready/domReady',
    mapper: 'scripts/mapper',
    views: 'scripts/views',
    json_data: 'scripts/json_data',
    presenters: 'scripts/presenters',
    images: 'images',
    config: 'test_config',
    text: 'components/requirejs-text/text',
    mapper:'/components/S2Mapper/app/scripts/mapper',
    spec: 'spec',
    json: 'json',
    labware:'scripts'
  }

});

require(['domReady!',
    'spec/tube_presenter_spec',
    'spec/plate_presenter_spec',
    'spec/spin_column_presenter_spec',
    'spec/qia_cube_presenter_spec',
    'spec/rack_presenter_spec',
    'spec/centrifuge_presenter_spec',
    'spec/gel_presenter_spec'],
    function() {
  runJasmineTests();
  //window.setTimeout(runJasmineTests, 1000);
});

