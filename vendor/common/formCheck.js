function toArray(target) {
    if (!target) return [];
    return Array.prototype.slice.call(target)
}

const Rules = [
    {
        rule: 'phone',
        reg(data) {
            return /^(1(([35789][0-9])|(47)|[8][01236789]))\d{8}$/.test(data)
        }
    }, {
        rule: 'length',
        reg(data, reg) {
            return (new RegExp(`.{${reg}}`)).test(data)
        }
    }
];

class FormCheck {
    static inputCheck(input) {
        let result = {};
        for (let key in input.dataset) {
            // 仅匹配单个全小写单词的data属性
            if (!(/^[a-z]*$/.test(key))) continue;
            const tester=
            Rules.map(rule => {
                if (rule.rule !== key) return;
                if (!rule.reg(input.value, input.dataset[key])) result[key] = input.dataset[key + 'Msg'];
            })
        }

        // 通过检查
        if (Object.keys(result).length <= 0) result = true;
        return result;
    }

    constructor({el}) {
        /**
         * 获取所有输入标签
         */
        if (!el || el.constructor !== String) throw new Error('formcheck require root element selector String');
        this.root = document.querySelector(el);
        if (!this.root) return;
        this.inputs = toArray(this.root.querySelectorAll('input,textarea'));
    }

    check() {
        const result = [];
        this.inputs.map(input => {
            const checkResult = FormCheck.inputCheck(input);
            if (checkResult === true) return;
            result.push({
                target: input,
                result: checkResult
            });
        });
        return result;
    }
}

export default FormCheck;
