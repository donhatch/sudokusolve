// console got unusably slow, don't know why :-(
// maybe because the stuff I was printing was too complicated?
// it didn't seem that big, though.
"use strict";
console.log("in myconsole.js");

const MyConsole = () => {
  let element = null;
  let countElement = null;
  let buffered = false;
  let bufferedOutput = '';
  let numLinesOutput = 0;
  const stack = [];

  // None of the answers on the web for this work.  Seriously.
  const isScrolledToBottom = (element) => {
    const saved_scrollTop = element.scrollTop;
    element.scrollTop += 1;
    const answer = element.scrollTop == saved_scrollTop;
    element.scrollTop = saved_scrollTop;
    return answer;
  };
  const zeropad = (n,minwidth) => n.toString().padStart(minwidth,'0');

  const myconsole = {
    log : (...args) => {

      const now = new Date();
      const hh = now.getHours();
      const mm = now.getMinutes();
      const ss = now.getSeconds();
      const ms = now.getSeconds();

      let message = args[0] + args.slice(1).map(s=>JSON.stringify(s)).join(' ');
      let thingToAdd = ""+hh+":"+zeropad(mm,2)+":"+zeropad(ss,2)+"."+zeropad(ms,3)+" [LOG] "+message+'\n';
      if (false) {  // nah, the separator at the end of flush looks cleaner
        if (!buffered) thingToAdd = "[unbuffered] "+thingToAdd;  // 
      }
      bufferedOutput += thingToAdd;

      if (!buffered) myconsole.flush();
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
      numLinesOutput = 0;
      countElement.innerHTML = ''+numLinesOutput;
    },
    attachToElement : (elementToAttachTo,countElementToAttachTo) => {
      element = elementToAttachTo;
      countElement = countElementToAttachTo;
    },
    flush : () => {
      const wasAtBottom = isScrolledToBottom(element);
      // Append at bottom
      if (false) {
        if (wasAtBottom) {
          bufferedOutput += '[scrolling to bottom]\n';
        } else {
          bufferedOutput += '[not scrolling to bottom]\n';
        }
      }
      if (element.innerText.length != 0) bufferedOutput = "-----------------\n" + bufferedOutput;
      element.innerText += bufferedOutput;
      numLinesOutput += bufferedOutput.split('\n').length - 1;  // CBB: not really right I don't think, and inefficient
      bufferedOutput = '';
      if (wasAtBottom) {
        // Scroll to bottom
        element.scrollTop = 1e9;  // a billion pixels.  gets clamped.
      }
      countElement.innerHTML = ''+numLinesOutput;
    },
    // Callers actually shouldn't use this; use doWhileBuffered instead,
    // which is exception-safe and nests properly.
    setBuffered : (newBuffered) => {
      buffered = newBuffered;
      if (!buffered) {
        myconsole.flush();
      }
    },
    doWhileBuffered : (fun) => {
      stack.push(buffered);
      myconsole.setBuffered(true);
      let answer = null;
      try {
        answer = fun();
      } finally {
        myconsole.setBuffered(stack.pop());
      }
      return answer;
    },
  };
  return myconsole;
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
