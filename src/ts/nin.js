export default function () {
    const load = "asd";
    const str ="AAAABBBCCDAABBB";
    const art = [2,5,2,23,6,23,56,1,8];

    const res1 = {
        set: {
            block: 12
        }
    };


    const res = str.toString().split("");


    res.forEach((item, i ,array) => {
        //console.log(item);
        //
        // if (array[i] !== array[i + 1]) {
        //     res3.push(item)
        // }

    });


   // console.log(res);


    const res3 = [];

    res.forEach((item, i ,array) => {
        if (array[i] !== array[i + 1]) {
            res3.push(item)
        }

    });



    // const res2 = res.map((item, i ,array) => {
    //     if (array[i] !== array[i + 1]) {
    //         return item
    //     }
    //
    // });
    //
    // //return ;

    //console.log(res3);


}



