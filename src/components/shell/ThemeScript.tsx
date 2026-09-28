/**
 * Pre-paint script.
 *
 * Runs synchronously in <head> so the correct theme and the `js` class are in
 * place before first paint. Without this the page would render light, then
 * flip to dark after hydration — a visible flash on every load.
 *
 * Keep in sync with src/lib/theme.ts.
 */
export function ThemeScript() {
  const script = `(function(){try{
var d=document.documentElement;d.classList.add('js');
var s=null;try{s=localStorage.getItem('ps-theme')}catch(e){}
var p=(s==='light'||s==='dark')?s:'system';
var r=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;
d.dataset.theme=r;}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
