// Import GSAP and the Observer plugin (if it exists)
import { gsap } from 'gsap';
import { Observer, TextPlugin } from "gsap/Observer";
gsap.registerPlugin(Observer) 
gsap.registerPlugin(TextPlugin)

const to = (element, options) => {
  gsap.to(element, options);
};

const from = (element, options) => {
  gsap.from(element, options);
};

const fromTo = (element, options) => {
  gsap.fromTo(element, options);
};

const tl = (element, options) => {
  gsap.tl(element, options);
};

// Register the Observer plugin
gsap.registerPlugin(ObserverPlugin);

// Now you can use the Observer plugin in your utility functions
const observer = (element, type, onUp, onDown) => {
  Observer.create({
    target: element || window, // can be any element (selector text is fine)
    type: type || "wheel,touch", // comma-delimited list of what to listen for
    onUp: onUp,
    onDown: onDown,
  });
};

export {observer, to, from, fromTo, tl};
