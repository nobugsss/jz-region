import region from "./region";

/**
 * 获取地址对象
 * @param Number code
 */
export function findRegion(code) {
	if (!code) return;
	function search(list, stack = []) {
		//直接命中根级
		if (list[code]) {
			if (stack.length == 0) {
				return {
					code: code,
					name: list[code].name,
					children: list[code].list
				};
			} else {
				let name = list[code].name;
				for (let i = stack.length - 1; i >= 0; i--) {
					name = stack[i].name + "-" + name;
				}
				return { code: code, name: name, children: list[code].list };
			}
		}
		let hit = 0;
		for (let i in list) {
			if (i < code) {
				hit = i;
			} else {
				stack.push({ code: hit, name: list[hit]["name"] });
				return search(list[hit].list, stack);
			}
		}
	}
	let s = search(region);
	delete s["children"];
	return s;
}

/**
 * 获取地址名称
 * @param Number code
 */
export function findRegionName(code) {
	let region = findRegion(code);
	return region ? region.name : "";
}
