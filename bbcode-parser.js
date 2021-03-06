function bbparse(text) {
	// Match unescaped tags (those preceded by an even number of backslashes).
	// This does not match the closing bracket.
	var tagRegex = /([^\\]|^)(\\\\)*(\[[^\]]+)/g;

	var d = document;
	var dc = val => d.createElement(val);

	var oneToOne = "b,i,s,u,img,code,pre,ul,ol,li".split(",");

	var elem = dc("div");

	var stack = [elem];

	var lastLastIndex = tagRegex.lastIndex = 0;
	var match;

	text = text + "[/]";
	elem.style.whiteSpace = "pre-wrap";

	while (match = tagRegex.exec(text)) {
		var tagName = match[3];
		var lastIndex = tagRegex.lastIndex;
		var textSlice = text.slice(lastLastIndex, lastIndex - tagName.length);
		if (textSlice.length) {
			switch ((elem.tagName || "").toLowerCase()) {
				case "img": elem.src = textSlice; break;
				case "a": elem.href = elem.href || textSlice; // note that this falls through!
				default: elem.appendChild(d.createTextNode(textSlice));
			}
		}
		if (tagName[1] == "/") {
			var popped = stack.pop();
			if (elem == popped) return elem;
			popped.appendChild(elem);
			elem = popped;
		} else {
			tagName = tagName.slice(1).split("=");
			var tagVal = tagName[1];
			tagName = tagName[0];
			if (tagName == "*") {
				var newlineIndex = text.indexOf("\n", lastIndex);
				text = text.slice(0, newlineIndex) + "[/]" + text.slice(newlineIndex);
				tagName = "li";
			}
			if (tagName == "list") tagName = "ul";
			stack.push(elem);
			if (oneToOne.indexOf(tagName) + 1) {
				elem = dc(tagName);
			} else {
				if (tagName == "url") {
					elem = dc("a");
					if (tagVal) elem.href = tagVal;
				} else if (tagName == "color") {
					elem = dc("span");
					// This saves bytes once tagName is minified to 1 character.
					// It's definitely safe because switch statements use strict equality,
					// so this is always equivalent to `elem.style.color`.
					elem.style[tagName] = tagVal;
				} else if (tagName == "size") {
					elem = dc("span");
					elem.style.fontSize = tagVal + "px";
				}
			}
		}
		lastLastIndex = lastIndex + 1;
	}
}