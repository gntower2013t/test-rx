import { of, Observable, defer, combineLatest, interval, empty } from "rxjs";
import { tap, shareReplay, map, take, switchMap, share, delay,  } from 'rxjs/operators';

const emptyS = () => { };

const complete = (msg: string) => console.log(msg + " completed");
const next = (v: any, msg:string) => console.log(`on ${msg}: *** ${v}`);
const obs = (msg: string) => ({ next:v=>next(v, msg), complete:()=>complete(msg) });
const tSub = (obr, obs) => {
  setTimeout(() => {
    obr.subscribe(obs);
  });
}

/* test share replay, defer */
// const x =defer(() => Promise.resolve("XXX"))
// const y =defer(() => Promise.resolve("YYY"))
// const source =
//   combineLatest(x,y).pipe(map(([x,y])=> x+","+y))
//   // of("XXX", "YYY")
//   .pipe(tap(() => console.log("=========start!!=====")));
// const re = source.pipe(shareReplay(1));

// let sup = re.subscribe(obs("a"));
// /* setTimeout(() => {
//   sup.add(re.subscribe(obs("b")));
//   tSub(re, obs("c"));
// }); */
// // tSub(re, obs('b0'))
// sup.add(re.subscribe(obs("b")));

// // console.log(sup.closed);

// re.subscribe(obs("c"));


/* switchMap with empty */
interval(500).pipe(
  take(10),
  switchMap(v => {
    if (v % 3 === 0) {
      // return empty() //相当于 filter
      return of(v)
    }
    return of(v).pipe(delay(600))
  }),
  tap(v=>console.log("======"))
).subscribe(obs("ss"))


/* empty pipe */
// let i = interval(500);
// let j = i.pipe();
// console.log(i===j);
