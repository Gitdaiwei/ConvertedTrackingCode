/**
 * @author IvanCai
 * @description 此函数用动态计算 rem 所需的 font-size
 */

/* eslint-disable */
(function(doc, win) {
  const docEl = doc.documentElement;

  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';

  const recalc = function() {
    const { clientWidth } = docEl;
    if (!clientWidth) return;
    docEl.style.fontSize = `${clientWidth / 7.5}px`;
  };

  if (!doc.addEventListener) return;

  win.addEventListener(resizeEvt, recalc, false);

  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
