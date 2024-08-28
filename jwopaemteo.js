import { $, $a, copy } from "./lyra/lyra-module.js";

(() => {
  const rank = $("#input-rank");
  const max = $("#input-max");

  const perc = $("#range-perc-main");
  const threshold = $("#range-threshold");
  const percAlt = $("#range-perc-alt");

  const reset = $("#button-reset");
  const up = $("#button-up");
  const adds = $a(".button-add");

  const getValueInt = (node) => parseInt(node.value);
  const doCalc = () => {
    const i = getValueInt(rank);
    if (Number.isNaN(i)) return;

    const a = getValueInt(threshold);
    const b = getValueInt(percAlt)/100;
    const c = getValueInt(perc)/100;

    const res = Math.floor((i <= a) ? (i * b) : (i * c));
    max.value = `${res}`;
  };
  const doReset = () => {
    perc.value = "92";
    threshold.value = "99";
    percAlt.value = "35";

    const refreshStyles = new Event("refreshstyles");
    perc.dispatchEvent(refreshStyles);
    threshold.dispatchEvent(refreshStyles);
    percAlt.dispatchEvent(refreshStyles);

    doCalc();
  };

  rank.addEventListener("input", doCalc);
  perc.addEventListener("input", doCalc);
  threshold.addEventListener("input", doCalc);
  percAlt.addEventListener("input", doCalc);

  up.addEventListener("click", () => {
    rank.value = copy(max.value);
    doCalc();
  });
  reset.addEventListener("click", doReset);

  for (const btn of adds) {
    btn.addEventListener("click", () => {
      const i = getValueInt(rank);
      if (Number.isNaN(i)) return;
  
      const a = getValueInt(btn);
  
      rank.value = i + a;
      doCalc();
    });
  };

  doCalc();
})();