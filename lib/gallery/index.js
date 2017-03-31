import React from 'react'
var PhotoSwipe = window.PhotoSwipe;
var PhotoSwipeUI_Default = window.PhotoSwipeUI_Default;

/**
 * @description 图片
 * @param {Str} src 路径
 * @param {Str} defaultSrc 默认路径
 * @param {Str} className 样式名
 * @param {bool} layzload 懒加载
 * @param {bool} background 用背景显示
 **/
var Gallery = React.createClass({
  render: function(){
    return (
      <div ref="gallery" className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="pswp__bg"></div>
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter"></div>
              <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"></div>
            </div>
            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>
            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>
            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  show : function(src){
    var pswpElement = this.refs.gallery;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      var items = [
        {
          src: src,
          w : img.width,
          h : img.height
        }
      ];

      var options = {
        index: 0
      };

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    }
  }
});

export default Gallery;
