

export function showMenu(menuName){
  let menuList = this.$store.state.userAuth.menuList;
  for (let i = 0; i < menuList.length; i++) {
    let menu = menuList[i];
    if (menu.mname === menuName) {
      return true;
    }
  }
  return false;
}

