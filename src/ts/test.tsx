


export function test1():void {

    const user: { [ key: string ]: string } = { login: "bob"};

    interface Point { x: number; }
    interface PointZ extends Point  { y: number; }


    interface Generic {
        foo: <T>(n: T) => T
    }

    const roll: Generic = {
        foo:(n) => n
    };



    function foo<T>(input: T):T {
        return input;
    }


    foo(12);


}


















































