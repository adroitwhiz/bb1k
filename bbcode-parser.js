function bbparse(text) {
	// Match unescaped tags (those preceded by an even number of backslashes).
	// This does not match the closing bracket.
	var tagRegex = /([^\\]|^)(\\\\)*(\[[^\]]+)/g;

	var d = document;
	var dc = val => d.createElement(val);
	text = text + "[/]";

	var oneToOne = "b,i,s,u,img,code,pre,ul,ol,li".split(",");

	var elem = dc("div");
	elem.style.whiteSpace = "pre-wrap";

	var stack = [elem];

	var lastLastIndex = tagRegex.lastIndex = 0;
	var match;

	while (match = tagRegex.exec(text)) {
		var tagName = match[3];
		var textSlice = text.slice(lastLastIndex, tagRegex.lastIndex - tagName.length);
		if (textSlice.length) {
			switch ((elem.tagName || "").toLowerCase()) {
				case "img": elem.src = textSlice; break;
				case "a": elem.href = elem.href || textSlice;
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
			if (tagName == "*") {
				var newlineIndex = text.indexOf("\n", tagRegex.lastIndex);
				text = text.slice(0, newlineIndex) + "[/]" + text.slice(newlineIndex);
				tagName[0] = "li";
			}
			if (tagName == "list") tagName[0] = "ul";
			stack.push(elem);
			var tagVal = tagName[1];
			tagName = tagName[0];
			if (oneToOne.indexOf(tagName) + 1) {
				elem = dc(tagName);
			} else {
				switch (tagName) {
					case "url":
						elem = dc("a");
						if (tagVal) elem.href = tagVal;
						break;
					case "color":
						elem = dc("span");
						elem.style.color = tagVal;
						break;
					case "size":
						elem = dc("span");
						elem.style.fontSize = tagVal + "px";
						break;
				}
			}
		}
		lastLastIndex = tagRegex.lastIndex + 1;
	}
}