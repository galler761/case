// 写一个函数，处理innerText 和 textContent 的兼容性问题
// 获取元素之间的内容
function getInnerText(element) {
    // 判断element是否支持innerText
    if (typeof element.innerText === 'string') {
        return element.innerText;
    } else {
        return element.textContent;
    }
}

// 设置元素之间的内容
function setInnerText(element, content) {
    if (typeof element.innerText === 'string') {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}