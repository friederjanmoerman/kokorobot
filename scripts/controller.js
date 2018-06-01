function Controller()
{
  this.el = null;
  this.database = null;

  this.install = function(el = document.getElementById("main"))
  {
    this.el = el;
    this.database = new Indental(DATABASE).parse();
  }

  this.start = function()
  {
    this.load()
  }

  this.load = function(target = "Home")
  {
    console.info(`Loading ${target}.`)

    var content = this.database[target.toUpperCase()];
    if(!content){
      this.missing(target);
      return;
    }

    this.el.innerHTML = `<page>${new Runic(content.LONG)}</page>`;
  }

  this.missing = function(target)
  {
    console.warn(`Could not find ${target}.`)
    this.el.innerHTML = `<page><p>Could not find page ${target}</p></page>`;
  }

  this.touch = function(target)
  {
    var link = target.getAttribute("href")
    if(!link){ return; }
    if(link.substr(0,1) != "#"){ return; }

    this.load(link.substr(1,link.length-1))
  }

  document.addEventListener('mouseup',  (e)=>{ this.touch(e.target); e.preventDefault(); });
}