function hook(o1, o2) {
    const old_print = o1.print;

    function f (print) {
        return function (...args) {
            print.apply(o2, args);
        }
    }

    o1.print = f (o1.print)

    return function () {
        o1.print = old_print
    }
}


let rect =   {
    name : 'rect',
    print  ()  {
        console.log('R je suis un ' + this.name)
    }
}

let circle =   {
    name : 'circle',
    print ()  {
        console.log('C je suis un ' + this.name)
    }
}


rect.print()

const unhook = hook(rect, circle)
rect.print()
unhook()
rect.print()