import {LIMIT} from "../../constants/constants";


export const generalFunction = {
  linkSplitting(link) {
    if (!link) return link;

    let arrLink = link.split(`",`);

    arrLink.forEach((element, key) => {
      arrLink[key] = element.split(' ').join('').split(";");
    });

    arrLink['lastPage'] = Number(this.lastPage(this.arrayLast(arrLink)[0]));

    return arrLink;
  },
  lastPage(str) {
    return str.split('_page=').pop().split('&_limit')[0];
  },
  arrayLast(array) {
    return array[array.length - 1];
  },
  getArrPages(elementCount = null, limit = null) {
    if(elementCount && limit) {
      let pagesCount = Math.ceil(elementCount / limit),
        arrPages = [];


      for (let i = 1; i <= pagesCount; i++) {
        arrPages.push(i)
      }
      return arrPages;
    }
    return false;
  }
}

