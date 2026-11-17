(function(){
  var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var bar=$('#scrollProgress');
  function onScroll(){var h=document.documentElement;var max=h.scrollHeight-h.clientHeight;if(bar)bar.style.width=(max>0?h.scrollTop/max*100:0)+'%'}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var toggle=$('#menuToggle'),links=$('#navLinks');
  function setMenu(o){links.classList.toggle('open',o);toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'Close navigation':'Open navigation')}
  toggle.addEventListener('click',function(){setMenu(!links.classList.contains('open'))});
  $$('a',links).forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  var items=$$('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    items.forEach(function(el){io.observe(el)});
  }else items.forEach(function(el){el.classList.add('in')});
  var btns=$$('.filter-btn'),cards=$$('.project-card');
  function count(){var all=$('.filter-btn[data-filter="all"] span');if(all)all.textContent=String(cards.length).padStart(2,'0')}
  count();
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.classList.remove('active')});b.classList.add('active');
    var f=b.dataset.filter;
    cards.forEach(function(c){var show=f==='all'||c.dataset.category.split(' ').indexOf(f)>-1;c.classList.toggle('is-hidden',!show);if(show)c.classList.add('in')});
  })});
  var toast=$('#toast'),t;
  function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(t);t=setTimeout(function(){toast.classList.remove('show')},2200)}
  var copy=$('#copyEmail');
  if(copy)copy.addEventListener('click',function(){
    var email=copy.dataset.email;
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(email).then(function(){say('Email copied to clipboard')},function(){say(email)});
    else say(email);
  });
  var y=$('#year');if(y)y.textContent=new Date().getFullYear()+' Lindani Buthelezi';
})();
