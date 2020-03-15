const PAGE = {
  data:{
    navigatorBarldArr:['section-1','section-2','section-3','section-4','section-5'],
    navigatorBarActiveId:'',
    navigatorBarFixed: false,
    navigatorBarFixedOffset: 340,
    navigatorBarHeight: 60,
  },
  init:function(){
    this.bind();
  },
  bind:function(){
    window.addEventListener('scroll',this.refreshNavigator);
    let navigatorBar = document.getElementById('navigator-bar');
    this.onEventLister(navigatorBar,'click','navigator-bar-item',this.goNavigator);
  },
  onEventLister:function(parentNode,action,childClassName,callback){
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  refreshNavigator:function(){
    PAGE.fixedNavigator();
    PAGE.heightLightNavigator();
  },
  fixedNavigator:function(){
    let scrollTop = document.documentElement.scrollTop;
    let navigatorBarTop = (PAGE.data.navigatorBarFixedOffset + PAGE.data.navigatorBarHeight);
    let navigatorBarFixed = scrollTop >= navigatorBarTop;
    if(PAGE.data.navigatorBarFixed !== navigatorBarFixed){
      PAGE.data.navigatorBarFixed = navigatorBarFixed;
      let navigatorBar = document.getElementById('navigator-bar');
      if(navigatorBarFixed){
        navigatorBar.className = 'navigator-bar fixed-top';
      }else{
        navigatorBar.className = 'navigator-bar';
      }
    }
  },
  heightLightNavigator:function(){
    let scrollTop = document.documentElement.scrollTop;
    let filterNav = PAGE.data.navigatorBarldArr.filter( data =>{
      let offsetTop = document.getElementById(data).offsetTop;
      return scrollTop >= offsetTop - PAGE.data.navigatorBarHeight
    })
    let navigatorBarActiveId = filterNav.length ? filterNav[filterNav.length - 1]:'';
    if(PAGE.data.navigatorBarldArr !== navigatorBarActiveId){
      PAGE.data.navigatorBarActiveId = navigatorBarActiveId
      let navigatorBarItems = document.getElementsByClassName('navigator-bar-item');
      for(i = 0 ;i < navigatorBarItems.length ; i++){
        let navigatorBarItem = navigatorBarItems[i];
        let dataNav = navigatorBarItem.dataset.nav;
        if(dataNav === navigatorBarActiveId){
          navigatorBarItem.className = 'navigator-bar-item active';
        }else{
          navigatorBarItem.className = 'navigator-bar-item';
        }
      }
    }
  },
  goNavigator:function(e){
    let id = e.target.dataset.nav;
    let offsetTop = document.getElementById(id).offsetTop - PAGE.data.navigatorBarHeight;
    document.documentElement.scrollTop = offsetTop;
  }
}
PAGE.init();