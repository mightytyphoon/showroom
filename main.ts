// import { Subject , Observable } from 'rxjs';

import { Subject } from "rxjs";
const startDate = new Date().getTime();


export async function main() {
    subject.subscribe(data => {
        console.log(data);
        subject.complete();
    })
    setTimeout(() => {
        subject.next('truc ' + (new Date().getTime() - startDate));
    } , 1200);
    const result = await test().catch(handleError);
    const otherResult = await promise(1000 , true).catch(handleError);
    // const otherResultWithoutCatch = await promise(1000 , true); // .catch(handleError); // unhandled rejections are deprecated
    const otherResult2 = await promise(0).catch(handleError);
    console.log(result);
    console.log(otherResult2);
    setTimeout(() => {
        subject.next('truc 2 ' + (new Date().getTime() - startDate)); // already complete, won't show, needs new subscription
    } , 1200);
}

export async function test() : Promise<string>{
    return new Promise((res , rej) => {
        setTimeout(() => {
            res('bonjour ' + (new Date().getTime() - startDate) + 'ms');
        } , 1000);
    })
}

export function handleError(err: any){
    console.log(err);
}

export function promise(timeout: number = 1000 , throwError: boolean = false): Promise<string>{
    return new Promise((res , rej)=> {
        // if(throwError) throw new Error('hi'); // can throw error as well as reject
        if(throwError) rej('error')
        setTimeout(() => {
            res('promise ' + (new Date().getTime() - startDate) + 'ms');
        } , timeout);
    } )
}

export const subject = new Subject<string>();

export async function asynchronous(){
    /*
    to get true async, create functions that can be launched without depending on others, without await
    */
}

export async function parallel(){
    const results = await Promise.all([promise(2000) , promise(3000) , promise(1000)]); // to launch several promises in parallel and wait for all 
    console.log(results);
}


// add subject + subscription

console.time('start');
main();
parallel();
console.log('i wont wait for await in main ! ' + (new Date().getTime() - startDate) + 'ms');
console.timeEnd('start'); // this will be executed without waiting for main => async
