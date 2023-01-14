<?php
/*
 * Plugin Name: Continuum(s) TinyMCE
 * Description: Personalisation de TinyMCE pour optimiser la saisie et l'accessibilité
 * Version: 2014.06.10
 * Text Domain: continuums-tinymce
 * @author Luc Poupard
 * @link http://www.kloh.ch
*/

/* Ce plugin est très largement inspiré de l'article de Tomasz Dziuda
 * @link https://www.gavick.com/magazine/adding-your-own-buttons-in-tinymce-4-editor.html 
 * @see http://wiki.accede-web.com/notices/contributeurs
 */

/* ----------------------------- */
/* Sommaire */
/* ----------------------------- */
/*
  == Création d'une extension personnalisée TinyMCE
  == Ajout des boutons personnalisés
  == Ajout d'une liste de styles personnalisés
  == Personnalisation de l'éditeur
    -- Éditeur standard
    -- Éditeur Fullscreen (Distraction Free)
    -- Éditeur ACF
  == Injection du CSS
*/


/* == @section Création d'une extension personnalisée TinyMCE ==================== */
add_action( 'admin_head', 'continuums_tinymce_buttons' );

function continuums_tinymce_buttons() {
  global $typenow;
  // On vérifie les permissions utilisateurs
  if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
    return;
  }
  // On vérifie qu'on est sur un article ou une page
  if( ! in_array( $typenow, array( 'post', 'page', 'continuums_partner', 'continuums_audio', 'continuums_video' ) ) )
    return;
  // On vérifie que l'éditeur visuel est activé
  if ( get_user_option('rich_editing') == 'true') {
    // Si les 3 conditions précédentes sont remplies, on ajoute les filtres 
    add_filter( 'mce_external_plugins', 'continuums_add_tinymce_plugin' );
  }
}


/* == @section Ajout des boutons personnalisés ==================== */
function continuums_add_tinymce_plugin( $plugin_array ) {
  $plugin_array['continuums_tinymce_button'] = plugins_url( '/js/boutons.js', __FILE__ );
  return $plugin_array;
}

/* == @section Ajout d'une liste de styles personnalisés ==================== */
/* @see https://codex.wordpress.org/TinyMCE_Custom_Styles */
function continuums_tinymce_insert_formats( $formats_tinymce ) {  
  $style_formats = array(  
    array(  
      'title' => 'Orateur',  
      'selector' => 'p',  
      'classes' => 'orateur',
      'wrapper' => true,
      
    ),
  );  
  $formats_tinymce['style_formats'] = json_encode( $style_formats );  
  
  return $formats_tinymce;  
} 

add_filter( 'tiny_mce_before_init', 'continuums_tinymce_insert_formats' );  


/* == @section Personnalisation de l'éditeur ==================== */

/* -- @subsection Éditeur TinyMCE standard -------------------- */
function continuums_wysiwyg( $editeur ) {
  //$editeur['paste_as_text'] = true; // On force le copier/coller en mode texte pour éviter tout import de styles ou balisages indésirables
  $editeur['block_formats'] = 'Paragraphe=p;Titre 2=h2;Titre 3=h3;Titre 4=h4;Pre=pre;Citation longue=blockquote;Citation courte=q';
  $editeur['toolbar1'] = 'undo,redo,removeformat,formatselect,shortcode,styleselect,bold,italic,link,unlink,bullist,numlist,outdent,indent,subscript,superscript,abbr,wp_adv,wp_fullscreen';
  $editeur['toolbar2'] = 'nonbreaking,charmap,guillemet,guillemeten,troispoints,apostrophe,agrave,eaigu,egrave,ecirc,ccedille,oe,oemaj,ae,aemaj,arond,arondmaj,shatchek,shatchekmaj,zhatchek,zhatchekmaj,obarre,obarremaj,eszett';
  return $editeur;
}
add_filter( 'tiny_mce_before_init', 'continuums_wysiwyg');

/* -- @subsection Éditeur ACF -------------------- */
/* @see http://www.advancedcustomfields.com/resources/tutorials/customize-the-wysiwyg-toolbars/ */
add_filter( 'acf/fields/wysiwyg/toolbars', 'continuums_wysiwyg_acf' );

function continuums_wysiwyg_acf( $editeur_acf ) {
  $editeur_acf['Custom'] = array();
  $editeur_acf['Custom'][1] = array('undo','redo','removeformat','formatselect','shortcode','styleselect','bold','italic','link','unlink','bullist','numlist','outdent','indent','subscript','superscript','abbr','wp_adv','wp_fullscreen');
  $editeur_acf['Custom'][2] = array('nonbreaking','charmap','guillemet','guillemeten','troispoints','apostrophe','agrave','eaigu','egrave','ecirc','ccedille','oe','oemaj','ae','aemaj','arond','arondmaj','shatchek','shatchekmaj','zhatchek','zhatchekmaj','obarre','obarremaj','eszett');
  return $editeur_acf;
}


/* == @section Injection du CSS ==================== */
/* On ajoute des styles pour la mise en forme des boutons personnalisés */
function continuums_tinymce_css() {
  wp_enqueue_style('continuums_tinymce', plugins_url( '/css/boutons.css', __FILE__ ) );
}

add_action('admin_enqueue_scripts', 'continuums_tinymce_css');

/* On ajoute des styles personnalisés dans TinyMCE */
function continuums_tinymce_editeur_css() {
  add_editor_style( plugins_url( '/css/styles-editeur.css', __FILE__ ) );
}

add_action( 'init', 'continuums_tinymce_editeur_css' );