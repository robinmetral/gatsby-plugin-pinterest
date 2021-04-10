const injectPinterestScript = ({ saveButton = false }) => {
  const addJS = () => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://assets.pinterest.com/js/pinit.js";

    if (Boolean(saveButton)) {
      script.setAttribute("data-pin-hover", "true");

      const { round = false, tall = true } =
        typeof saveButton === "boolean" ? {} : saveButton;
      if (round) {
        script.setAttribute("data-pin-round", "true");
      }

      if (tall) {
        script.setAttribute("data-pin-tall", "true");
      }
    }

    document.getElementsByTagName("body")[0].appendChild(script);
  };

  addJS();
};

let injectedPinterestScript = false;

exports.onRouteUpdate = (args, pluginOptions = {}) => {
  const hover = Boolean(pluginOptions.saveButton);

  const querySelectors = ["[data-pin-do]", hover ? "img" : ""]
    .filter(Boolean)
    .join(",");

  if (document.querySelector(querySelectors) !== null) {
    if (!injectedPinterestScript) {
      injectPinterestScript(pluginOptions);

      injectedPinterestScript = true;
    }

    if (
      !hover &&
      typeof PinUtils !== `undefined` &&
      typeof window.PinUtils.build === `function`
    ) {
      window.PinUtils.build();
    }
  }
};
