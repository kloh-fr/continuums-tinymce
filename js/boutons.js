(function() {
  tinymce.PluginManager.add('continuums_tinymce_button', function( editor, url ) {
    editor.addButton('guillemet', {
      title: 'Guillemets français',
      icon: 'continuums-guillemet',
      onclick: function() {
        editor.selection.setContent('«&nbsp;' + editor.selection.getContent() + '&nbsp;»');
      }
    });
    editor.addButton('guillemeten', {
      title: 'Guillemets anglais',
      icon: 'continuums-guillemeten',
      onclick: function() {
        editor.selection.setContent('“' + editor.selection.getContent() + '”');
      }
    });
    editor.addButton('troispoints', {
      title: 'Points de suspension',
      icon: 'continuums-troispoints',
      onclick: function() {
        editor.insertContent('…');
      }
    });
    editor.addButton('apostrophe', {
      title: 'Apostrophe',
      icon: 'continuums-apostrophe',
      onclick: function() {
        editor.insertContent('’');
      }
    });
    editor.addButton('agrave', {
      title: 'A grave majuscule',
      icon: 'continuums-agrave',
      onclick: function() {
        editor.insertContent('À');
      }
    });
    editor.addButton('eaigu', {
      title: 'E aigu majuscule',
      icon: 'continuums-eaigu',
      onclick: function() {
        editor.insertContent('É');
      }
    });
    editor.addButton('egrave', {
      title: 'E grave majuscule',
      icon: 'continuums-egrave',
      onclick: function() {
        editor.insertContent('È');
      }
    });
    editor.addButton('ecirc', {
      title: 'E circonflexe majuscule',
      icon: 'continuums-ecirc',
      onclick: function() {
        editor.insertContent('Ê');
      }
    });
    editor.addButton('ccedille', {
      title: 'C cédille majuscule',
      icon: 'continuums-ccedille',
      onclick: function() {
        editor.insertContent('Ç');
      }
    });
    editor.addButton('oe', {
      title: 'E dans l’O',
      icon: 'continuums-oe',
      onclick: function() {
        editor.insertContent('œ');
      }
    });
    editor.addButton('oemaj', {
      title: 'E dans l’O majuscule',
      icon: 'continuums-oemaj',
      onclick: function() {
        editor.insertContent('Œ');
      }
    });
    editor.addButton('nonbreaking', {
      title: 'Espace insécable',
      icon: 'continuums-nonbreaking',
      onclick: function() {
        editor.selection.setContent('&nbsp;');
      }
    });
    editor.addButton('ae', {
      title: 'E dans l’A',
      icon: 'continuums-ae',
      onclick: function() {
        editor.insertContent('æ');
      }
    });
    editor.addButton('aemaj', {
      title: 'E dans l’A majuscule',
      icon: 'continuums-aemaj',
      onclick: function() {
        editor.insertContent('Æ');
      }
    });
    editor.addButton('arond', {
      title: 'A rond',
      icon: 'continuums-arond',
      onclick: function() {
        editor.insertContent('å');
      }
    });
    editor.addButton('arondmaj', {
      title: 'A rond majuscule',
      icon: 'continuums-arondmaj',
      onclick: function() {
        editor.insertContent('Å');
      }
    });
    editor.addButton('shatchek', {
      title: 'S hatchek',
      icon: 'continuums-shatchek',
      onclick: function() {
        editor.insertContent('š');
      }
    });
    editor.addButton('shatchekmaj', {
      title: 'S hatchek majuscule',
      icon: 'continuums-shatchekmaj',
      onclick: function() {
        editor.insertContent('Š');
      }
    });
    editor.addButton('zhatchek', {
      title: 'Z hatchek',
      icon: 'continuums-zhatchek',
      onclick: function() {
        editor.insertContent('ž');
      }
    });
    editor.addButton('zhatchekmaj', {
      title: 'Z hatchek majuscule',
      icon: 'continuums-zhatchekmaj',
      onclick: function() {
        editor.insertContent('Ž');
      }
    });
    editor.addButton('obarre', {
      title: 'O barré obliquement',
      icon: 'continuums-obarre',
      onclick: function() {
        editor.insertContent('ø');
      }
    });
    editor.addButton('obarremaj', {
      title: 'O barré obliquement majuscule',
      icon: 'continuums-obarremaj',
      onclick: function() {
        editor.insertContent('Ø');
      }
    });
    editor.addButton('eszett', {
      title: 'Eszett',
      icon: 'continuums-eszett',
      onclick: function() {
        editor.insertContent('ß');
      }
    });
    editor.addButton('abbr', {
      title: "Abréviation",
      icon: 'continuums-abbr',
      onclick: function() {
        editor.windowManager.open( {
          title: 'Abréviation',
          body: [{
            type: 'textbox',
            name: 'title',
            label: 'Signification de l\'abréviation'
          }],
          onsubmit: function( e ) {
            editor.insertContent( '<abbr title="' + e.data.title + '">' + editor.selection.getContent() + '</abbr>');
          }
        });
      }
    });
    editor.addButton('shortcode', {
      type: 'menubutton',
      text: 'Shortcode',
      icon: false,
      menu: [{
        text: 'Inventaire (←)', onclick: function() {
          editor.insertContent( '[inventaire]' + editor.selection.getContent() + '[/inventaire]');
        }
      },{
        text: 'Reportage (↔)', onclick: function() {
          editor.insertContent( '[reportage]' + editor.selection.getContent() + '[/reportage]');
        }
      },{
        text: 'Dérive (→)', onclick: function() {
          editor.insertContent( '[derive]' + editor.selection.getContent() + '[/derive]');
        }
      },{
        text: 'Renvoi vers une note', onclick: function() {
          editor.windowManager.open( {
            title: 'Renvoi vers une note',
            body: [{
              type: 'textbox',
              name: 'id',
              label: 'Numéro du renvoi'
            }],
            onsubmit: function( e ) {
              editor.insertContent( '[renvoi id="' + e.data.id + '"]');
            }
          });
        }
      }]
    });
  });
})();