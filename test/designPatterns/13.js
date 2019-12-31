// 职责链模式

var order500 = function(orderType, pay, stock){
    if(orderType === 1 && pay === true){
        console.log('500元定金预购，得到100元优惠券')
    }else{
        return 'nextSuccessor'
    }
}

var order200 = function(orderType, pay, stock){
    if(orderType === 2 && pay === true){
        console.log('200元定金预购，得到50元优惠券')
    }else{
        return 'nextSuccessor'
    }
}

var orderNormal = function(orderType, pay, stock){
    if(stock > 0){
        console.log('普通购买，无优惠券')
    }else{
        console.log('库存不足')
    }
}

Function.prototype.after = function(fn){
    var self = this

    return function(){
        var ret = self.apply(this, arguments)

        if(ret === 'nextSuccessor'){
            return fn.apply(this, arguments)
        }

        return ret
    }
}


var order = order500.after(order200).after(orderNormal)

order(1, true, 500)
order(2, true, 500)
order(1, false, 500)
order(1, false, 0)
