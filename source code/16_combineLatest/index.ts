// https://stackblitz.com/

import {
  tap,
  from,
  of,
  switchMap,
  fromEvent,
  interval,
  map,
  zip,
  combineLatest,
} from 'rxjs';

const a1$ = interval(1200);
const a2$ = from([2, 55]);
const a3$ = zip(a1$, a2$).pipe(
  tap(([_intervalItem, x]) => {
    console.log('x = ', x);
  }),
  map(([_intervalItem, x]) => x)
);

const b1$ = interval(2000);
const b2$ = from([4, 20]);
const b3$ = zip(b1$, b2$).pipe(
  tap(([_intervalItem, y]) => {
    console.log('y = ', y);
  }),
  map(([_intervalItem, y]) => y)
);

const observables = [a3$, b3$];
const combined = combineLatest(observables);

const subscription1 = combined.subscribe(([x, y]) => {
  console.log(`a1 + b2 =  ${x + y} `);
});

// Stop stream

const stopSteamsBtn = document.getElementById('stopStreams');
if (stopSteamsBtn) {
  const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
  const stop_stream_subscription = stop_stream$.subscribe((_element) => {
    subscription1.closed ? true : subscription1.unsubscribe();
    // subscription2.closed ? true : subscription2.unsubscribe();
    stop_stream_subscription.unsubscribe();
    // console.clear();
  });
}
