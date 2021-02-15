

let bundle_script_src = document.currentScript.src

// remove bundle.js
bundle_script_src = bundle_script_src.substring(0, bundle_script_src.length - 'bundle.js'.length)

// alert('>' + bundle_script_src + '<')

window.paths = {
    css: bundle_script_src,
    css_components: bundle_script_src,
    img: bundle_script_src,
    img_category_icons: bundle_script_src,
    img_map_markers: bundle_script_src,
    img_fa_icons: bundle_script_src,
    data: bundle_script_src
};
