import { of, Observable, defer, combineLatest } from "rxjs";
import { tap, shareReplay, map,  } from 'rxjs/operators';

const emptyS = () => { };

const complete = (msg: string) => console.log(msg + " completed");
const next = (v: any, msg:string) => console.log(`on ${msg}: *** ${v}`);
const obs = (msg: string) => ({ next:v=>next(v, msg), complete:()=>complete(msg) });
const tSub = (obr, obs) => {
  setTimeout(() => {
    obr.subscribe(obs);
  });
}

/* test share replay */
const x =defer(() => Promise.resolve("XXX"))
const y =defer(() => Promise.resolve("YYY"))
const source =
  combineLatest(x,y).pipe(map(([x,y])=> x+","+y))
  // of("XXX", "YYY")
  .pipe(tap(() => console.log("=========start!!=====")));
const re = source.pipe(shareReplay(1));

let sup = re.subscribe(obs("a"));
/* setTimeout(() => {
  sup.add(re.subscribe(obs("b")));
  tSub(re, obs("c"));
}); */
// tSub(re, obs('b0'))
sup.add(re.subscribe(obs("b")));

// console.log(sup.closed);

re.subscribe(obs("c"));
