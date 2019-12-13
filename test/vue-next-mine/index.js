let currentEffectt;
let effectMap = new Map();
function reactive(obj) {
    const proxied = new Proxy(obj, {
        get: function (target, key, receiver) {
            if (currentEffectt) {
                if (effectMap.has(key)) {
                    const effects = effectMap.get(key);
                    if (effects.indexOf(currentEffectt) === -1) {
                        effects.push(currentEffectt);
                    }
                }
                else {
                    effectMap.set(key, [currentEffectt]);
                }
            }
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            if (effectMap.has(key)) {
                effectMap.get(key).forEach(effect => effect());
            }
            return result;
        }
    });
    return proxied;
}
function effect(fn) {
    const effected = function () {
        fn();
    };
    currentEffectt = effected;
    effected();
    currentEffectt = undefined;
    return effected;
}
const state = reactive({
    foo: 0
});
const $counter = document.querySelector('.counter');
const $inc = document.querySelector('.inc');
const $dec = document.querySelector('.dec');
$inc.addEventListener('click', () => {
    state.foo++;
});
$dec.addEventListener('click', () => {
    state.foo--;
});
// 收集依赖
effect(() => {
    $counter.textContent = state.foo;
});
