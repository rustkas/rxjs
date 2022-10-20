// https://stackblitz.com/

import { mergeMap, fromEvent, interval, map, take } from 'rxjs';

let outer = interval(1000).pipe(take(2));
let combined = outer.pipe(
  mergeMap((x) => {
    return interval(400).pipe(
      take(3),
      map((y) => `outer ${x}: inner ${y}`)
    );
  })
);

const subscription1 = combined.subscribe((res) => console.log('result ', res));

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
