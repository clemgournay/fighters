class AssetsLoader {

  constructor() {
  }

  load(assetsToLoad, callback) {
    const loadedAssets = {};
    assetsToLoad.forEach((asset) => {
      if (asset.type === 'img') {
        const img = new Image();
        img.src = asset.src;
        img.id = asset.id;
        img.onload = function () {
          loadedAssets[this.id] = this;
          if (Object.keys(loadedAssets).length === assetsToLoad.length) {
            callback(loadedAssets);
          }
        }
      }
    });
  }

}

export { AssetsLoader };