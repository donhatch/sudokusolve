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

      const zeropad = (n,minwidth) => {
        return n.toString().padStart(minwidth,'0');
      };

      let thingToAdd = ""+hh+":"+zeropad(mm,2)+":"+zeropad(ss,2)+"."+zeropad(ms,3)+" [LOG] "+args.join(' ')+"\n";

      // None of the answers on the web for this work.  Seriously.
      const isScrolledToBottom = (element) => {
        const saved_scrollTop = element.scrollTop;
        element.scrollTop += 1;
        const answer = element.scrollTop == saved_scrollTop;
        element.scrollTop = saved_scrollTop;
        return answer;
      };

      const wasAtBottom = isScrolledToBottom(element);
      // Append at bottom
      if (false) {
        if (wasAtBottom) {
          thingToAdd = '[was at bottom] '+thingToAdd;
        } else {
          thingToAdd = '[was not at bottom] '+thingToAdd;
        }
      }
      element.innerText += thingToAdd;
      if (wasAtBottom) {
        // Scroll to bottom
        element.scrollTop = 1e9;  // a billion pixels.  gets clamped.
      }
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
    attachToElement : (element) => {
      this.element = element;
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
