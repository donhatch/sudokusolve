// console got unusably slow, don't know why :-(
// maybe because the stuff I was printing was too complicated?
// it didn't seem that big, though.
"use strict";
console.log("in myconsole.js");

const MyConsole = () => {
  const answer = {
    log : (...args) => {

      const now = new Date();
      const hh = now.getHours();
      const mm = now.getMinutes();
      const ss = now.getSeconds();
      const ms = now.getSeconds();
      // holy moly
      const ms0 = ms%10;
      const ms1 = (ms-ms0)/10%10;
      const ms2 = (ms-ms1*10-ms0)/100;

      const thingToAdd = ""+hh+":"+mm+":"+ss+"."+ms2+ms1+ms0+" [LOG] "+args.join(' ')+"\n";

      const scrollTopMax = (element) => {
        const saved_scrollTop = element.scrollTop;
        element.scrollTop = 1e9;  // a billion pixels
        const answer = element.scrollTop;
        element.scrollTop = saved_scrollTop;
        return answer;
      };

      console.log("===========");
      console.log("before: elementholder.scrollTop = "+elementholder.scrollTop);
      console.log("before: elementholder.scrollHeight = "+elementholder.scrollHeight);
      console.log("before: elementholder.offsetHeight = "+elementholder.offsetHeight);
      console.log("before: elementholder.scrollHeight-elementholder.offsetHeight = "+(elementholder.scrollHeight-elementholder.offsetHeight));
      console.log("before: elementholder.clientTop = "+elementholder.clientTop);
      console.log("before: scrollTopMax = "+scrollTopMax(elementholder));
      console.log("before: scrollTopMax = "+scrollTopMax(elementholder));
      console.log("before: elementholder.scrollTop = "+elementholder.scrollTop);

      // https://stackoverflow.com/questions/876115/how-can-i-determine-if-a-div-is-scrolled-to-the-bottom#answer-876134 but not right, see comment
      //const wasAtBottom = elementholder.scrollTop === elementholder.scrollHeight
      const wasAtBottom = elementholder.scrollTop == scrollTopMax(elementholder);
      console.log("wasAtBottom = "+wasAtBottom);
      // Append at bottom
      element.innerText += thingToAdd;
      // Scroll to bottom

      if (wasAtBottom) {
        const newScrollTop = 1e9;
        console.log("SETTING SCROLLTOP to "+newScrollTop);
        elementholder.scrollTop = 1e9;  // a billion pixels.  gets clamped.
        console.log("AND GOT BACK "+elementholder.scrollTop);
        "If the number is greater than the maximum allowed scroll amount, the number is set to the maximum number"
      }
      console.log("after: elementholder.scrollTop = "+elementholder.scrollTop);
      console.log("after: elementholder.scrollHeight = "+elementholder.scrollHeight);
      console.log("after: elementholder.offsetHeight = "+elementholder.offsetHeight);
      console.log("after: elementholder.scrollHeight-elementholder.offsetHeight = "+(elementholder.scrollHeight-elementholder.offsetHeight));
      console.log("before: elementholder.clientTop = "+elementholder.clientTop);
      console.log("after: scrollTopMax = "+scrollTopMax(elementholder));
      console.log("===========");
    },
    info : (...args) => {
      element.innerText += "[INFO] "+args.join(' ')+"\n";
      //console.log(...args);
    },
    warn : (...args) => {
      element.innerText += "[WARN] "+args.join(' ')+"\n";
      //console.warn(...args);
    },
    error : (...args) => {
      element.innerText += "[ERROR] "+args.join(' ')+"\n";
      //console.error(...args);
    },
    clear : (...args) => {
      //console.clear(...args);
      element.innerText = '';
    },
    attachToElement : (element, elementholder) => {
      this.element = element;
      this.elementholder = elementholder;
    }
  };
  return answer;
};  // MyConsole

const TestMyConsole = (myconsole) => {
  myconsole.log("testing line 1");
  myconsole.log("testing line 2");
  myconsole.log("testing line 3");
  myconsole.log("testing line 4");
  myconsole.log("testing line 5");
  myconsole.log("testing line 6");
  myconsole.log("testing line 7");
  myconsole.log("testing line 8");
  myconsole.log("testing line 9");
  myconsole.log("testing line 10");
};  // TestMyConsole

console.log("out myconsole.js");
